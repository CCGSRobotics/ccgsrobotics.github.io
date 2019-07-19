var version = 'concept-1f3f8'

var config = {
  apiKey: "AIzaSyB8r3dDr-4aCRuA4VgnKhBCSC3ctsQwZjM",
  authDomain: "ccgsrobotics-d4422.firebaseapp.com",
  databaseURL: "https://ccgsrobotics-d4422.firebaseio.com"
};

function signOut() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    }
    window.location = "signin.html";
}

document.getElementById('signout').addEventListener('click', signOut, false);

function check() {
    if (firebase.auth().currentUser) {
        console.log("state correct");
    } else {
        window.location = "signin.html";
    }
}

setInterval(check, 2000)

document.getElementById('pro').addEventListener('click', profile, false);

document.getElementById('blo').addEventListener('click', blog, false);

function profile() {
    $("#blo").removeClass("is-active")
    $("#pro").addClass("is-active")
    document.getElementById('cont').src = "profile.html";
}

function blog() {
    $("#blo").addClass("is-active")
    $("#pro").removeClass("is-active")
    document.getElementById('cont').src = "blogcreate.html";
}

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

      if (displayName != null) {
        $("#displayname").text(displayName);
      } else {
        $("#displayname").text("Displayname not set.");
      }

      if (photoURL != null) {
        $("#displayicon").attr("src",photoURL);
      }

      
      console.log(displayName);
      console.log(photoURL);
      
      // [END_EXCLUDE] loadit finished
    } else {
      // User is signed out.
      // [START_EXCLUDE]
     
      // document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]

    // [END_EXCLUDE]
  });

function liveupdate() {
    var displayName = firebase.auth().currentUser.displayName;
    var photoURL = firebase.auth().currentUser.photoURL;

    if (displayName != null) {
      $("#displayname").text(displayName);
    } else {
      $("#displayname").text("Displayname not set.");
    }

    if (photoURL != null) {
      $("#displayicon").attr("src",photoURL);
    }

    
    
}

setInterval(liveupdate, 2000)