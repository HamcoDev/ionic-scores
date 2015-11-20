angular.module("scoresApp")

  .controller("enterPredictionsController", enterPredictionsController);

enterPredictionsController.$inject = [
  "$scope",
  "$firebase",
  "$http",
  "$state"
];

function enterPredictionsController(
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
    var user = ref.child("scores/user");
    var userRef = user.child(authenticatedUser.uid)

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

  

  // $scope.currentWeek = function (fixture) {
  //   return fixture.matchday === 8;
  // }
};