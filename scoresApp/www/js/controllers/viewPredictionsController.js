angular.module("scoresApp")

  .controller("viewPredictionsController", viewPredictionsController);

viewPredictionsController.$inject = [
  "$scope",
  "$firebase",
  "$http",
  "$state",
  "dataService"
];

function viewPredictionsController(
  $scope,
  $firebase,
  $http,
  $state,
  dataService
  ) {

dataService.checkUserAuthenticated();

  var userPredictions = new Firebase('https://ionic-scores.firebaseio.com/scores/user/'.concat(dataService.authenticatedUser.uid));
  //var userPredictions = new Firebase('https://ionic-scores.firebaseio.com/scores/user/'.concat(authenticatedUser.uid).concat('/matchday/10'));
  userPredictions.on("value", function (snapshot) {
    $scope.predictions = snapshot.val();
  });
  
  $scope.matchdayChanged = function () {    
  var userPredictions = new Firebase('https://ionic-scores.firebaseio.com/scores/user/'.concat(dataService.authenticatedUser.uid).concat('/matchday/'.concat($scope.selectedMatchday)));
  userPredictions.on("value", function (snapshot) {
    $scope.predictions = snapshot.val();
  });
  }
};