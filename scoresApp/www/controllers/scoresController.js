var app = angular.module("scoresApp", []);

app.controller("ScoresCtrl", function($scope, $http) {
  $http({
  headers: {'X-Auth-Token': 'b435bb252dad4a63ab0ab09b10314773'},
  method: 'GET',
  url: 'http://api.football-data.org/alpha/soccerseasons/398/fixtures'
}).then(function successCallback(response) {
    $scope.fixtureList = response.data;
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  
  $scope.currentWeek = function(fixture) {
  return fixture.matchday === 7;
}
}
);