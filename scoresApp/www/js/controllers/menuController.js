angular.module("scoresApp")
  .controller("menuController", menuController);

loginController.$inject = [
  "$scope",
  "$state"
];

function menuController(
  $scope,
  $firebase,
  $state
  ) {

  var ref = new Firebase('https://ionic-scores.firebaseio.com');

  $scope.logout = function () {
    ref.unauth();
    $state.go('login');
  }
};

