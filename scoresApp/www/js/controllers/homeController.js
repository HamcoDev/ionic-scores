angular.module("scoresApp")
.controller("homeController", homeController);

homeController.$inject = [
  "$scope",
  "$firebase",
  "$state",
  "dataService"
];

function homeController(
  $scope,
  $firebase,
  $state,
  dataService
  ) {
    
 dataService.checkUserAuthenticated();
  
};