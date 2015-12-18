angular.module("scoresApp")
  .controller("viewPredictionsController", viewPredictionsController);

viewPredictionsController.$inject = [
  "$scope",
  "dataService"
];

function viewPredictionsController(
  $scope,
  dataService
  ) {
  dataService.checkUserAuthenticated();

  $scope.matchWeeks = [];

  $scope.init = function () {

    var i;
    for (i = 1; i <= 38; i++) {
      $scope.matchWeeks.push(i);
    }
  }

  var userPredictions = new Firebase('https://ionic-scores.firebaseio.com/scores/user/'.concat(dataService.authenticatedUser.uid));
  userPredictions.on("value", function (snapshot) {
    $scope.predictions = snapshot.val();
  });

  $scope.matchdayChanged = function () {
    var userPredictions = new Firebase('https://ionic-scores.firebaseio.com/scores/user/'.concat($scope.selectedUser).concat('/matchday/'.concat($scope.selectedMatchday)));
    userPredictions.on("value", function (snapshot) {
      $scope.predictions = snapshot.val();
    });
  }

  $scope.userChanged = function () {
    var userPredictions = new Firebase('https://ionic-scores.firebaseio.com/scores/user/'.concat($scope.selectedUser).concat('/matchday/'.concat($scope.selectedMatchday)));
    userPredictions.on("value", function (snapshot) {
      $scope.predictions = snapshot.val();
    });
  }
};