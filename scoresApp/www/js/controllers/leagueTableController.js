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

    dataService.getLeagueData()
      .then(function (leagueData) {
        $scope.leagueData = leagueData;
      });
  }
};