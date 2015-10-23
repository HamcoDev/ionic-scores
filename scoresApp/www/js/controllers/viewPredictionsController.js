angular.module("scoresApp")

  .controller("viewPredictionsController", viewPredictionsController);

viewPredictionsController.$inject = [
  "$scope",
  "$firebase",
  "$http",
  "$state"
];

function viewPredictionsController(
  $scope,
  $firebase,
  $http,
  $state
  ) {

  var ref = new Firebase('https://ionic-scores.firebaseio.com');

  var user = ref.getAuth();

  if (!user) {
    $state.go('login');
    return;
  }
};