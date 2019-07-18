var version = 'concept-1f3f8'

var config = {
  apiKey: "AIzaSyB8r3dDr-4aCRuA4VgnKhBCSC3ctsQwZjM",
  authDomain: "ccgsrobotics-d4422.firebaseapp.com",
  databaseURL: "https://ccgsrobotics-d4422.firebaseio.com"
};

/**
   * Handles the sign in button press.
   */
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      $(document.getElementById("email")).addClass("alert");
      return;
    }
    $(document.getElementById("email")).removeClass("alert");
    if (password.length < 4) {
      $(document.getElementById("password")).addClass("alert");
      return;
    }

    $(document.getElementById("password")).removeClass("alert");
    // Sign in with email and pass.
    // [START authwithemail]
    $(document.getElementById("quickstart-sign-in")).addClass("loadit");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        $(document.getElementById("password")).addClass("alert");
      } else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });

    $(document.getElementById("password")).removeClass("alert");
    // [END authwithemail]
  }

  document.getElementById('quickstart-sign-in').disabled = true;
}
/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]
}
/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  // [START sendemailverification]
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    // Email Verification sent!
    // [START_EXCLUDE]
    alert('Email Verification Sent!');
    // [END_EXCLUDE]
  });
  // [END sendemailverification]
}
function sendPasswordReset() {
  var email = document.getElementById('email').value;

  $(document.getElementById("quickstart-password-reset")).addClass("loadit");
  console.log("start");
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    $(document.getElementById("quickstart-password-reset")).removeClass("loadit");
    $(document.getElementById("quickstart-password-reset")).addClass("finished");
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      $(document.getElementById("quickstart-password-reset")).removeClass("loadit");
      $(document.getElementById("email")).addClass("alert");
    } else if (errorCode == 'auth/user-not-found') {
      $(document.getElementById("quickstart-password-reset")).removeClass("loadit");
      $(document.getElementById("email")).addClass("alert");
      alert(errorMessage);
    }

    console.log(error);
    $(document.getElementById("quickstart-password-reset")).removeClass("loadit");
    $(document.getElementById("email")).addClass("alert");
    // [END_EXCLUDE]
  });
  
  $(document.getElementById("email")).removeClass("alert");
  // [END sendpasswordemail];
}
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-verify-email').disabled = true;
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
      $(document.getElementById("quickstart-blog")).removeClass("alert");
      document.getElementById("quickstart-blog").disabled = false;
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      $(document.getElementById("quickstart-sign-in")).removeClass("loadit");

      // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      if (!emailVerified) {
        document.getElementById('quickstart-verify-email').disabled = false;
      }
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      $(document.getElementById("quickstart-blog")).addClass("alert");
      document.getElementById("quickstart-blog").disabled = true;
      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      // document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
  document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}
window.onload = function() {
  initApp();
};


function PostABlog() {
  window.location = "blogcreate.html";
}
