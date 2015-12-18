angular.module("scoresApp")

  .controller("enterPredictionsController", enterPredictionsController);

enterPredictionsController.$inject = [
  "$scope",
  "$http",
  "$state",
  "dataService"
];

function enterPredictionsController(
  $scope,
  $http,
  $state,
  dataService
  ) {

dataService.checkUserAuthenticated();

  var currentMatchdayURL = new Firebase('https://ionic-scores.firebaseio.com/currentMatchday');
  var currentMatchday;
  currentMatchdayURL.on("value", function (snapshot) {
    currentMatchday = snapshot.val();
    $http({
      headers: { 'X-Auth-Token': 'b435bb252dad4a63ab0ab09b10314773' },
      method: 'GET',
      url: 'http://api.football-data.org/alpha/soccerseasons/398/fixtures/?matchday='.concat(currentMatchday)
    }).then(function successCallback(response) {
      $scope.fixtureList = response.data;
    }, function errorCallback(response) {
    });
  });

  $scope.submit = function () {
    var user = dataService.ref.child("scores/user");
    var userRef = user.child(dataService.authenticatedUser.uid)

    var matchday = userRef.child("matchday");
    var matchdayRef = matchday.child(currentMatchday);

    var fixture = matchdayRef.child("fixture");

    var predictions = [];

    $scope.fixtureList.fixtures.forEach(function (fixture) {

      predictions.push({
        homeTeam: fixture.homeTeamName,
        homePrediction: fixture.homePrediction == null ? 0 : fixture.homePrediction,
        awayTeam: fixture.awayTeamName,
        awayPrediction: fixture.awayPrediction == null ? 0 : fixture.awayPrediction,
        date: fixture.date,
        status: fixture.status
      });
    });

    fixture.set(predictions);
  };

$scope.matchdayChanged = function () {    
     $http({
      headers: { 'X-Auth-Token': 'b435bb252dad4a63ab0ab09b10314773' },
      method: 'GET',
      url: 'http://api.football-data.org/alpha/soccerseasons/398/fixtures/?matchday='.concat($scope.selectedMatchday)
    }).then(function successCallback(response) {
      $scope.fixtureList = response.data;
    }, function errorCallback(response) {
    });
  }
};