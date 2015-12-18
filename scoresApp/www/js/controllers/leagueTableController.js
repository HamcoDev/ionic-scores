angular.module("scoresApp")
  .controller("leagueTableController", leagueTableController);

leagueTableController.$inject = [
  "$scope",
  "dataService",
  "$state"
];

function leagueTableController(
  $scope,
  dataService,
  $state
  ) {

  var authenticatedUser = dataService.authenticatedUser;

  if (!authenticatedUser) {
    $state.go('login');
    return;
  }

  $scope.leagueData = [];

  $scope.init = function () {

    // get all users in firebase
    dataService.getUsers()
      .then(function (data) {

        //loop through users and get totalPoints value    
        angular.forEach(data, function (user) {

          dataService.getTotalScore(user.id)
            .then(function (totalPoints) {
              // push onto scope results array
              $scope.leagueData.push({
                name: user.name,
                points: totalPoints
              });
            });
        })
      });
  }
};