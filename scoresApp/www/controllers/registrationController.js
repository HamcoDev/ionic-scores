var app = angular.module("scoresApp", ['ionic', 'firebase']);

app.controller("registrationController", registrationController);

registrationController.$inject = [
  "$scope",
  "$firebase"
];

function registrationController(
  $scope,
  $firebase
  ) {
  
  var ref = new Firebase('https://ionic-scores.firebaseio.com');
  
  };