angular.module("scoresApp")
  .controller("loginController", loginController);

loginController.$inject = [
  "$scope",
  "$state",
  "dataService"
];

function loginController(
  $scope,
  $state,
  dataService
  ) {

  $scope.login = function (email, password) {
    dataService.login(email, password);
  }

};