angular.module("scoresApp")
  .factory("dataService", dataService);

dataService.$inject = [
  "$state"
];

function dataService(
  $state
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
    }
  }
};
