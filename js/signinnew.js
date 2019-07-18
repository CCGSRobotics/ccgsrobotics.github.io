var version = 'concept-1f3f8'

var config = {
  apiKey: "AIzaSyB8r3dDr-4aCRuA4VgnKhBCSC3ctsQwZjM",
  authDomain: "ccgsrobotics-d4422.firebaseapp.com",
  databaseURL: "https://ccgsrobotics-d4422.firebaseio.com"
};


function passwordErrorON() {
    $("#password").css("border","1.5px solid red")
    console.log("passerror");
}

function emailErrorON() {
    $("#email").css("border","1.5px solid red")
    console.log("emailerror");
}

function passwordErrorOFF() {
    $("#password").css("border","")
    console.log("passerror remove");
}

function emailErrorOFF() {
    $("#email").css("border","")
    console.log("emailerror remove");
}

function startLoading() {
    $("#quickstart-sign-in").css("-webkit-animation"," Gradient 4s ease infinite");
    $("#quickstart-sign-in").css("-moz-animation"," Gradient 4s ease infinite");
    $("#quickstart-sign-in").css("animation"," Gradient 4s ease infinite");

    $("#quickstart-sign-in").css("animation-name","Gradient");
    $("#quickstart-sign-in").css("-webkit-animation-name","Gradient");
}

function endLoading() {
    $("#quickstart-sign-in").css("animation","0s");
    $("#quickstart-sign-in").css("-webkit-animation","");
    $("#quickstart-sign-in").css("-moz-animation","");

    $("#quickstart-sign-in").css("animation-name","none");
    $("#quickstart-sign-in").css("-webkit-animation-name","none");
}

function checkEmails() {
    $("#statetext").css("display","block");
    $("#quickstart-password-reset").css("display","none");
    $("#rem").css("display","none");
}

function update() {
    if (/Edge/.test(navigator.userAgent)) {
        alert('Page not available on edge, please use Chrome.');

        $("#text").html("Site does not work on edge");

        $("#quickstart-sign-in").prop("disabled",true);
    }
}

update();
/**
   * Handles the sign in button press.
   */
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    alert("Already signed in.")
    window.location = "actions.html";
    // [END signout]
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        emailErrorON();
      return;
    }
    emailErrorOFF();
    if (password.length < 4) {
        passwordErrorON();
      return;
    }

    passwordErrorOFF();
    // Sign in with email and pass.
    // [START authwithemail]
    startLoading();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        passwordErrorON();
      } else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });

    passwordErrorOFF();
    // [END authwithemail]
  }
  
  console.log("done");
  //window.location = "actions.html";
  document.getElementById('quickstart-sign-in').disabled = true;
}


/**
 * Sends an email verification to the user.
 */

function sendPasswordReset() {
  var email = document.getElementById('email').value;

  startLoading();
  console.log("start");
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    endLoading();
    checkEmails();
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      endLoading();
      emailErrorON();
    } else if (errorCode == 'auth/user-not-found') {
      endLoading();
      emailErrorON();
      alert(errorMessage);
    }

    console.log(error);
    endLoading();
    emailErrorON();
    // [END_EXCLUDE]
  });
  
  emailErrorOFF();
  // [END sendpasswordemail];
}
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */

function login() {
    if (firebase.auth().currentUser) {
        // [START signout]
        console.log("logged in");
        $("#title").html("Logged In");

        $("#text").html("Redirecting in 4");

        setTimeout(function(){
            $("#text").html("Redirecting in 3");
            endLoading();
            setTimeout(function(){
              $("#text").html("Redirecting in 2");

              setTimeout(function(){
                $("#text").html("Redirecting in 1");

                setTimeout(function(){
                  $("#text").html("Redirecting");
                  window.location = "actions.html";
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);  
        // [END signout]
      }
}

function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    // [START_EXCLUDE silent]
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      
      

      // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      // document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);

  document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
  
  // Disabled for DEV
  console.log("start");
  
   setInterval(login, 1000)
  
}
window.onload = function() {
  initApp();
};
