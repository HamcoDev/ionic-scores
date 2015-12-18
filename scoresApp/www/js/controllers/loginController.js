angular.module("scoresApp")
  .controller("loginController", loginController);

loginController.$inject = [
  "$scope",
  "dataService"
];

function loginController(
  $scope,
  dataService
  ) {
  $scope.login = function (email, password) {
    dataService.login(email, password);
  }
};