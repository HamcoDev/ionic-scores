angular.module("scoresApp")
  .controller("loginController", loginController);

loginController.$inject = [
  "$scope",
  "$firebase",
  "$state"
];

function loginController(
  $scope,
  $firebase,
  $state
  ) {

  var ref = new Firebase('https://ionic-scores.firebaseio.com');

  $scope.login = function (email, password) {

    ref.authWithPassword({
      email: email,
      password: password
    }, function (error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        $state.go('menu.home');
      }
    });
  }
};