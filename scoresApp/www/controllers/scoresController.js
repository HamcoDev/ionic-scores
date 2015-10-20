var app = angular.module("scoresApp", ['ionic', 'firebase']);

app.controller("ScoresCtrl", ScoresCtrl);

ScoresCtrl.$inject = [
  "$scope",
  "$firebase",
  "$http"
];

function ScoresCtrl(
  $scope,
  $firebase,
  $http
  ) {
  var ref = new Firebase('https://ionic-scores.firebaseio.com');
  $http({
    headers: { 'X-Auth-Token': 'b435bb252dad4a63ab0ab09b10314773' },
    method: 'GET',
    url: 'http://api.football-data.org/alpha/soccerseasons/398/fixtures/?matchday=8'
  }).then(function successCallback(response) {
    $scope.fixtureList = response.data;
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $scope.submit = function () {
    var user = ref.child("scores/user");
    var userRef = user.child(4)
    
    var matchday = userRef.child("matchday");  
    var matchdayRef = matchday.child(8);
    
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
  }

  $scope.currentWeek = function (fixture) {
    return fixture.matchday === 8;
  }
};