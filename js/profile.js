var version = 'concept-1f3f8'

var config = {
  apiKey: "AIzaSyB8r3dDr-4aCRuA4VgnKhBCSC3ctsQwZjM",
  authDomain: "ccgsrobotics-d4422.firebaseapp.com",
  databaseURL: "https://ccgsrobotics-d4422.firebaseio.com"
};


function Submit() {
    var e = document.getElementById("display");
    var i = document.getElementById("prof");

    $("#display").css("border", "");
    $("#prof").css("border", "");
    $("#updateprof").addClass("loadit")

    if (e.value == "" && i.value == "") {
        $("#display").css("border", "1.5px solid red");
        $("#prof").css("border", "1.5px solid red");
        $("#updateprof").removeClass("loadit");
        alert("Fill at least one box.")
    } else {

        if (e.value != "" && i.value != "") {
        firebase.auth().currentUser.updateProfile({
            displayName: e.value,
            photoURL: i.value
          }).then(function() {

            var displayName =  firebase.auth().currentUser.displayName;
            var photoURL =  firebase.auth().currentUser.photoURL;
            
            $("#updateprof").removeClass("loadit");
            $("#updateprof").addClass("finished");

            console.log(displayName, photoURL);
            
          }, function(error) {
              console.log(error);
              console.log("errr");
              
            // An error happened.
          });
        } else if (e.value != "" && i.value == "") {
            firebase.auth().currentUser.updateProfile({
                displayName: e.value

              }).then(function() {
    
                var displayName =  firebase.auth().currentUser.displayName;
                var photoURL =  firebase.auth().currentUser.photoURL;
                
                $("#updateprof").removeClass("loadit");
                $("#updateprof").addClass("finished");
    
                console.log(displayName, photoURL);
                
              }, function(error) {
                  console.log(error);
                  console.log("errr");
                  
                // An error happened.
              }); 
        } else if (e.value == "" && i.value != "") {
            firebase.auth().currentUser.updateProfile({
                photoURL: i.value
              }).then(function() {
    
                var displayName =  firebase.auth().currentUser.displayName;
                var photoURL =  firebase.auth().currentUser.photoURL;
                
                $("#updateprof").removeClass("loadit");
                $("#updateprof").addClass("finished");
    
                console.log(displayName, photoURL);
                
              }, function(error) {
                  console.log(error);
                  console.log("errr");
                  
                // An error happened.
              });
        }
    } 
}

// loadit finished