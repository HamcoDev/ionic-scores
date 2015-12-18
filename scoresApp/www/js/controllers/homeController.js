angular.module("scoresApp")
  .controller("homeController", homeController);

homeController.$inject = [
  "dataService"
];

function homeController(
  dataService
  ) {
  dataService.checkUserAuthenticated();
};