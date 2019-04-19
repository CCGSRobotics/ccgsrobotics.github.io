var version = 'concept-1f3f8'

var config = {
  apiKey: "AIzaSyB8r3dDr-4aCRuA4VgnKhBCSC3ctsQwZjM",
  authDomain: "ccgsrobotics-d4422.firebaseapp.com",
  databaseURL: "https://ccgsrobotics-d4422.firebaseio.com"
};

 var limit = 4;
 var count = 0;
 var trueData = 4;
 var flag = true;
var articles = [];

firebase.database().ref('/article_group/article_list')
  .orderByChild('published').limitToLast(limit).startAt(1)
	.on('child_added', function(data) {

  	firebase.database().ref('/article_group/article/' + data.key)
      .on('value', function(articleData) {
      	count ++;
        articles.push({
        	id: data.key,
          published: data.val().published,
          data: articleData.val()
        });
      	articles.sort(function(a, b) {
          return a.published < b.published
        });
        producer();

      }, function(err) {
      	count ++;
      	showError(err);
        producer()
      });
  }, function(err) {
    alert(err);
  })

function producer() {
  console.log(count, trueData)
  if (count === trueData && flag) {
    for (var i in articles) {
      createArticle(articles[i].id, articles[i].published, articles[i].data)
    }
    flag = false
  }
}

function showError(err) {
	var el = document.createElement('div');
  el.innerHTML = err.message
  document.getElementById('content').appendChild(el)
}

function createArticle(id, published, data) {
  console.log(id)
	var el = document.createElement('div');
  el.className = "blogpost";
  var title = document.createElement('h1');
  var body = document.createElement('p');
  var byline = document.createElement('span');
  title.innerHTML = data.title;
  //body.innerHTML = '<a onclick="LoadBlog(' + data.title + ')" href="#">Read More...</a>'
  body.innerHTML = '<button onclick="LoadBlog(' + data.title + ')" href="#">Read More...</button>'
  byline.innerHTML = 'Date: '+ new Date(published) +'<hr>';
  el.appendChild(title)
  el.appendChild(byline)
  el.appendChild(body)
  document.getElementById('content').appendChild(el)

}

var submitButton = document.querySelector('#submit-button');
var titleText = document.querySelector('#title');
var bodyText = document.querySelector('#body');

submitButton.addEventListener('click', function(){
	var title = titleText.value;
  var body = bodyText.value;
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
  	alert('Added '+ title);
  })
  .catch(function(error) {
  console.log(error);
  alert(error.message)
  });

});

let provider = new firebase.auth.GoogleAuthProvider();
function Test() {
  firebase.auth().signInWithPopup(provider);
}
