angular.module("scoresApp")
  .controller("leagueTableController", leagueTableController);

leagueTableController.$inject = [
  "$scope",
  "$firebase",
  "$state"
];

function leagueTableController(
  $scope,
  $firebase,
  $state
  ) {

  var ref = new Firebase('https://ionic-scores.firebaseio.com');

  var authenticatedUser = ref.getAuth();

  if (!authenticatedUser) {
    $state.go('login');
    return;
  }

  $scope.leagueData = [];

  $scope.init = function () {

    var userRef = new Firebase('https://ionic-scores.firebaseio.com/users');

    // get all users in firebase
    userRef.on("value", function (snapshot) {
      var data = snapshot.val();
      angular.forEach(data, function (user, index) {
        var totalPoints = 0;

        // for each user, get all matchday node
        // loop through matchday node and find points value
        var matchday = "9";
        
        var url = "https://ionic-scores.firebaseio.com/scores/user/".concat(user.id).concat("/matchday/".concat(matchday).concat("/points"));

        var pointsRef = new Firebase(url);

        pointsRef.on("value", function (snap) {
          var matchdayPoints = snap.val();
          totalPoints += matchdayPoints;
        }, function (errorObject) {

        });
        
        // push onto scope results array
        $scope.leagueData.push({
          name: user.name,
          points: totalPoints
        });
      })
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  $scope.logout = function () {
    ref.unauth();
    $state.go('login');
  }

  // $scope.currentWeek = function (fixture) {
  //   return fixture.matchday === 8;
  // }
};