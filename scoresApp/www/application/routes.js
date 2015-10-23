angular.module("scoresApp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    "use strict";

    $stateProvider.state("predictions/enter", {
        url: "/predictions/enter",
        templateUrl: "ng-templates/enter-predictions.html",
        controller: "scoresController"
    });

    $stateProvider.state("predictions/view", {
        url: "/predictions/view",
        templateUrl: "ng-templates/view-predictions.html",
        controller: "scoresController"
    });
    
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: "ng-templates/login.html",
        controller: "loginController"
    });
    
    $stateProvider.state("registration", {
        url: "/registration",
        templateUrl: "ng-templates/registration.html",
        controller: "registrationController"
    });
    
    $urlRouterProvider.otherwise("/login");
    
}]);