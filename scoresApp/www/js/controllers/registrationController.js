angular.module("scoresApp")

  .controller("registrationController", registrationController);

registrationController.$inject = [
  "$scope",
  "$state"
];

function registrationController(
  $scope,
  $state
  ) {

  var ref = new Firebase('https://ionic-scores.firebaseio.com');

  $scope.register = function (name, email, password) {

    ref.createUser({
      email: email,
      password: password
    }, function (error, userData) {
      if (error) {
        alert(error);
        console.log("Error creating user:", error);
      } else {

        alert("Successfully created user account with uid: " + userData.uid);

        var userRef = ref.child("users");
        userRef.push({
          id: userData.uid,
          name: name,
          email: email
        });
        
        $state.go('login');
        
      }
    });
  }

};