angular.module("scoresApp")
  .controller("menuController", menuController);

menuController.$inject = [
  "$scope",
  "$state"
];

function menuController(
  $scope,
  $state
  ) {

  var ref = new Firebase('https://ionic-scores.firebaseio.com');

  $scope.logout = function () {
    ref.unauth();
    $state.go('login');
  }
};

