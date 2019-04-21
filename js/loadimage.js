var version = 'concept-1f3f8'

var config = {
  apiKey: "AIzaSyB8r3dDr-4aCRuA4VgnKhBCSC3ctsQwZjM",
  authDomain: "ccgsrobotics-d4422.firebaseapp.com",
  databaseURL: "https://ccgsrobotics-d4422.firebaseio.com"
};



function chooseFile() {
  $("#inputfile").click();
}

$(document).ready(function(){
        $('input[type="file"]').change(function(e){
            var fileName = e.target.files[0].name;
            document.getElementById("ChooseFile").textContent = fileName;
            $(document.getElementById("ChooseFile")).addClass("buttonselected");
        });
});

function Submit() {

  if (document.getElementById("Title").value.length == 0) {
      $(document.getElementById("Title")).addClass("alert");
      //if (document.getElementById("inputfile").value.length == 0) {
        //$(document.getElementById("ChooseFile")).addClass("alert");
      //} else {
        //$(document.getElementById("ChooseFile")).removeClass("alert");
      //}
  //} else if (document.getElementById("inputfile").value.length == 0) {
  //    $(document.getElementById("Title")).removeClass("alert");
  //    $(document.getElementById("ChooseFile")).addClass("alert");
  } else {
  //$(document.getElementById("ChooseFile")).removeClass("alert");
  $(document.getElementById("Title")).removeClass("alert");

  document.getElementById("buttonsubmit").disabled = true;
  $(document.getElementById("buttonsubmit")).addClass("loadit");
  document.getElementById("buttonsubmit").textContent = "Loading";
  Upload()

}
}
function ReloadPage() {
  $(document.getElementById("buttonsubmit")).removeClass("loadit");
  $(document.getElementById("buttonsubmit")).addClass("finished");
  document.getElementById("buttonsubmit").textContent = "Finished!";
  setTimeout(ReloadText, 1000)
  setTimeout(Reload, 5000)
}

function ReloadText() {
  document.getElementById("buttonsubmit").textContent = "Reloading.";
}

function Reload() {
  location.reload();
}



function Upload() {
  var titleText = document.getElementById("Title");
  var title = titleText.value;


  var body = quill.root.innerHTML;


  var articleRef = '/article_group/';
  var articleData = {
  	title: title,
    body: body,
    date_edited: firebase.database.ServerValue.TIMESTAMP,
    uid: 'user1',
    slug_name: title.replace(/\s/g, '-')
  };
  var key = firebase.database().ref(articleRef + 'article').push().key;

  var updates = {};
  updates[articleRef + 'article/' + key] = articleData;
  updates[articleRef + 'article_list/' + key] = {
  published: firebase.database.ServerValue.TIMESTAMP
}

  return firebase.database().ref().update(updates)

  .then(function(){


    setTimeout(ReloadPage, 5000)



  })
  .catch(function(error) {
    console.log(error);
    alert(error.message)
  });
}

function showError(err) {
	var el = document.createElement('div');
  el.innerHTML = err.message
  document.getElementById('content').appendChild(el)
}
