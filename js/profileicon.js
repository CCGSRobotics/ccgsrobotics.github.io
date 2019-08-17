function liveupdate() {
    var photoURL = firebase.auth().currentUser.photoURL;

    if (photoURL != null) {
      $("#proficon").attr("src",photoURL);
    }
}


function checker() {
    if (firebase.auth().currentUser) {
        console.log("state correct");
        setInterval(liveupdate, 2000)
        clearInterval(p)
    } else {
        console.log("npoe");
    }
    
}

p = setInterval(checker, 2000)