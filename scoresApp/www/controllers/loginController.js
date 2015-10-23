var app = angular.module("scoresApp", ['ionic', 'firebase']);

app.controller("loginController", loginController);

loginController.$inject = [
  "$scope",
  "$firebase"
];

function loginController(
  $scope,
  $firebase
  ) {
  
  var ref = new Firebase('https://ionic-scores.firebaseio.com');
  
  };