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
  console.log(id);
	var el = document.createElement('div');
  el.className = "blogpost ql-editor " + data.title;
  var title = document.createElement('h1');
  var body = document.createElement('p');
  var byline = document.createElement('span');
  title.innerHTML = data.title;
  //body.innerHTML = '<a onclick="LoadBlog(' + data.title + ')" href="#">Read More...</a>'
  body.innerHTML = '<button class=\"' + id + '\" onclick="ReadMore(\'' + data.title + '\',\'' + id + '\')">Read More...</button>';
  var date = new Date(published) + '';

  byline.innerHTML = 'Date: '+ date.split(" ").slice(0,4).join(" ") +'<hr>';
  el.appendChild(title)
  el.appendChild(byline)
  el.appendChild(body)
  document.getElementById('content').appendChild(el)

}



let provider = new firebase.auth.GoogleAuthProvider();
function Test() {
  firebase.auth().signInWithPopup(provider);
}

function SignInPage() {
  if (firebase.auth().currentUser) {
    window.location = "actions.html";
} else {
  window.location = "signin.html";
}
}

function ReadMore(name, id) {
  var data = "";
  var button = document.getElementsByClassName(id)[0];
  var blogitem = document.getElementsByClassName(name)[0];

  firebase.database().ref('/article_group/article/'+id+'/body/').on('value', function(articleData) {
      data = articleData.val()
  });


  button.style.opacity = "0";

  setTimeout(deleteitem, 1000, button, data, blogitem);
}

function deleteitem(x, data, blogitem) {
  x.parentNode.removeChild(x);
  blogitem.insertAdjacentHTML('beforeend', data);
}
