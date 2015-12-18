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

  function getCurrentMatchday() {
    return $q(function (resolve, reject) {
      var url = "https://ionic-scores.firebaseio.com/currentMatchday";
      var currentMatchdayRef = new Firebase(url);
      currentMatchdayRef.on("value", function (snapshot) {
        resolve(snapshot.val());
      });
    });
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

  function getLeagueTotals(total) {
    return $q(function (resolve, reject) {
      getUsers()
        .then(function (users) {
          var leagueData = [];

          if (total) {
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
          }
          else {
            //loop through users and get weekPoints value    
            angular.forEach(users, function (user) {

              getLastWeekScore(user.id)
                .then(function (weekPoints) {
                  // push onto scope results array
                  leagueData.push({
                    name: user.name,
                    points: weekPoints
                  });
                });
            })
          }
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

  function getLastWeekScore(userId) {
    return $q(function (resolve, reject) {
      getCurrentMatchday()
        .then(function (currentMatchday) {
          var lastMatchday = currentMatchday - 1;
          var lastMatchdayPointsURL = "https://ionic-scores.firebaseio.com/scores/user/".concat(userId).concat("/matchday/").concat(lastMatchday).concat("/points");
          var lastMatchdayPointsRef = new Firebase(lastMatchdayPointsURL);
          lastMatchdayPointsRef.on("value", function (snapshot) {
            resolve(snapshot.val());
          });
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
    getCurrentMatchday: getCurrentMatchday,
    getUsers: getUsers,
    getTotalScore: getTotalScore,
    getLastWeekScore: getLastWeekScore,
    getLeagueTotals: getLeagueTotals
  }
};
