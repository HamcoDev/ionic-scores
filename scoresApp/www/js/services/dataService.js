angular.module("scoresApp")
  .factory("dataService", dataService);

dataService.$inject = [
  "$state",
  "$q"
];

function dataService(
  $state,
  $q
  ) {

  var ref = new Firebase('https://ionic-scores.firebaseio.com');
  var authenticatedUser = ref.getAuth();

  function checkUserAuthenticated() {
    if (!authenticatedUser) {
      $state.go('login');
    }
  }

  function logout() {
    ref.unauth();
    authenticatedUser = ref.getAuth();
    $state.go('login');
  }

  function getUsers() {
    return $q(function (resolve, reject) {
      var url = "https://ionic-scores.firebaseio.com/users";
      var userRefs = new Firebase(url);
      userRefs.on("value", function (snapshot) {
        resolve(snapshot.val());
      });
    });
  }

  function getLeagueData() {
    return $q(function (resolve, reject) {
      getUsers()
        .then(function (users) {
          var leagueData = [];
                
          //loop through users and get totalPoints value    
          angular.forEach(users, function (user) {

            getTotalScore(user.id)
              .then(function (totalPoints) {
                // push onto scope results array
                leagueData.push({
                  name: user.name,
                  points: totalPoints
                });
              });
          })

          resolve(leagueData);
        });
    });
  }

  function getTotalScore(userId) {
    return $q(function (resolve, reject) {
      var url = "https://ionic-scores.firebaseio.com/scores/user/".concat(userId).concat("/totalPoints");
      var pointsRef = new Firebase(url);
      pointsRef.on("value", function (snapshot) {
        resolve(snapshot.val());
      });
    });
  }

  return {
    ref: ref,
    authenticatedUser: authenticatedUser,
    checkUserAuthenticated: checkUserAuthenticated,
    logout: logout,
    login: function (email, password) {
      ref.authWithPassword({
        email: email,
        password: password
      }, function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          authenticatedUser = ref.getAuth();
          $state.go('menu.home');
        }
      });
    },
    getUsers: getUsers,
    getTotalScore: getTotalScore,
    getLeagueData: getLeagueData
  }
};
