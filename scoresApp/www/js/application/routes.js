angular.module("scoresApp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    "use strict";
    
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: "ng-templates/login.html",
        controller: "loginController"
    });

    $stateProvider.state("predictions/enter", {
        url: "/predictions/enter",
        templateUrl: "ng-templates/enter-predictions.html",
        controller: "enterPredictionsController"
    });

    $stateProvider.state("predictions/view", {
        url: "/predictions/view",
        templateUrl: "ng-templates/view-predictions.html",
        controller: "viewPredictionsController"
    });   
    
    
    $stateProvider.state("registration", {
        url: "/registration",
        templateUrl: "ng-templates/registration.html",
        controller: "registrationController"
    });
    
    $stateProvider.state("home", {
        url: "/home",
        templateUrl: "ng-templates/home.html"
    });
    
    $urlRouterProvider.otherwise("/login");
    
}]);