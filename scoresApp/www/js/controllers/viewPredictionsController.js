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

  var authenticatedUser = ref.getAuth();

  if (!authenticatedUser) {
    $state.go('login');
    return;
  }

  var userPredictions = new Firebase('https://ionic-scores.firebaseio.com/scores/user/'.concat(authenticatedUser.uid));
  //var userPredictions = new Firebase('https://ionic-scores.firebaseio.com/scores/user/'.concat(authenticatedUser.uid).concat('/matchday/10'));
  var predictions;
  userPredictions.on("value", function (snapshot) {
    $scope.predictions = snapshot.val();
  });
  
  $scope.matchdayChanged = function () {    
  var userPredictions = new Firebase('https://ionic-scores.firebaseio.com/scores/user/'.concat(authenticatedUser.uid).concat('/matchday/'.concat($scope.selectedMatchday)));
  userPredictions.on("value", function (snapshot) {
    $scope.predictions = snapshot.val();
  });
  }
};