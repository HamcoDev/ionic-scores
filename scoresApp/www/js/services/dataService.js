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
      userRefs.once("value", function (snapshot) {
        resolve(snapshot.val());
      });
    });
  }

  function getTotalScore(userId) {
    return $q(function (resolve, reject) {
      var url = "https://ionic-scores.firebaseio.com/scores/user/".concat(userId).concat("/totalPoints");
      var pointsRef = new Firebase(url);
      pointsRef.once("value", function (snapshot) {
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
    getTotalScore: getTotalScore
  }
};
