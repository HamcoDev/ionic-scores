angular.module("scoresApp")
  .controller("menuController", menuController);

menuController.$inject = [
  "$scope",
  "dataService"
];

function menuController(
  $scope,
  dataService
  ) {

  $scope.logout = function() {
    dataService.logout();
  }
};

