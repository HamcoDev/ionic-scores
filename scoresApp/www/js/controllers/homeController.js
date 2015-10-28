angular.module("scoresApp")
.controller("homeController", homeController);

homeController.$inject = [
  "$scope",
  "$firebase",
  "$state"
];

function homeController(
  $scope,
  $firebase,
  $state
  ) {

  var ref = new Firebase('https://ionic-scores.firebaseio.com');

  var authenticatedUser = ref.getAuth();

  if (!authenticatedUser) {
    $state.go('login');
    return;
  }

};