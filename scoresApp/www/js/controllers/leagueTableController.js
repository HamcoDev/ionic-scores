angular.module("scoresApp")
  .controller("leagueTableController", leagueTableController);

leagueTableController.$inject = [
  "$scope",
  "dataService"
];

function leagueTableController(
  $scope,
  dataService
  ) {
  dataService.checkUserAuthenticated();
  $scope.leagueData = [];

  $scope.init = function () {
    
    dataService.getLeagueTotals(false)
      .then(function(weekScore) {
        $scope.weekScore = weekScore;
      });

    dataService.getLeagueTotals(true)
      .then(function (leagueTotals) {
        $scope.leagueData = leagueTotals;
      });
  }
};