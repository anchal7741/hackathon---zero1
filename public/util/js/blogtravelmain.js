// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyB_iQ5XjUypbMoju5eDSbWqrx6acViYVVM",
    authDomain: "postivae-db0ec.firebaseapp.com",
    databaseURL: "https://postivae-db0ec.firebaseio.com",
    projectId: "postivae-db0ec",
    storageBucket: "postivae-db0ec.appspot.com",
    messagingSenderId: "238036476910",
    appId: "1:238036476910:web:0023f9ddc8b04cca8224ff",
    measurementId: "G-98V01C8KWF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
auth = firebase.auth();
const db = firebase.firestore();
//var storage = firebase.storage();
// update firestore settings
db.settings({ timestampsInSnapshots: true });


auth.onAuthStateChanged(user => {
  if (user) {
    console.log("logged in");
    setupUI(user);

  } else {
      console.log("logged out");
    setupUI();
  }
});


const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const users = document.querySelector('.user');
const doctors = document.querySelector('.doctor');



const setupUI = (user) => {
  if (user) {
    console.log(user.uid);

    db.collection('users').onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if(change.doc.id == user.uid){
          console.log(change.doc.id);
          users.style.display = 'block';
          doctors.style.display = 'none';
        }
        
      });
    });
    db.collection('doctors').onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if(change.doc.id == user.uid){
          console.log(change.doc.id);
          users.style.display = 'none';
          doctors.style.display = 'block';
        }
        
      });
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');

  } else {

    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    users.style.display = 'none';
    doctors.style.display = 'none';
  }
};
const guideList = document.querySelector('.entry');
const recent = document.querySelector('.recent-posts');

var str=window.location.pathname;
var requrl = str.substring(13,);
console.log(requrl);


auth.onAuthStateChanged(user => {
    if (user) {
        console.log("logged in");
        
        db.collection("blogtravel").onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            recentpost(snapshot.docs);
        }, err => console.log(err.message));     
        
    } else {
        console.log("logged out");
        setupGuides([]);
        recentpost([]);
    }
});


// setup guides
const setupGuides = (data) => {
  if(data.length){
      let html = '';
   data.forEach(doc => {
          let blog = doc.data();  
          let key= doc.id;  
          //console.log(key);   
          //console.log(blog.postName); 
          if(key==requrl)
          {
            let bl=" ";
            bl = 
            '<div class="entry-img"><img src="'+blog.imageURL+'" alt="" class="img-fluid"> </div>'+
            ' <h2 class="entry-title"><a href="/view/travel/'+key+'">'+blog.postName+'</a></h2>'+
          '<div class="entry-meta"><ul>'+
              '<li class="d-flex align-items-center"><i class="icofont-user"></i> <a href="blog-single.html">'+blog.author+'</a></li>'+
              '<li class="d-flex align-items-center"><i class="icofont-calendar"></i> <a href="blog-single.html"><time datetime="2020-01-01"></time></a></li>'+
             '</ul></div>'+
          '<div class="entry-content"><p>'+blog.postContent+'</p>    </div>'+
          '<div class="entry-footer clearfix">'+
          '<div class="float-left">'+
          '<a href="#"><i class="icofont-ui-delete" id="'+ key +'" onclick="delpost(this.id);"></i></a>'+
           '</div>'  +  bl;
           
         html=bl;
          }
         
  });
  guideList.innerHTML = html;
  //console.log(guideList.innerHTML);
  }
  else{
      guideList.innerHTML = `<h1 class="center-align">Login to view blogs</h1>`;
  }
}

const recentpost = (data) => {
  if(data.length){
      let html = '';
  data.forEach(doc => {
          let blog = doc.data();  
          let key= doc.id;  
          //console.log(key);   
          //console.log(blog.postName); 
          let bl=" ";
       bl = 
      '<div class="post-item clearfix">'+
      '<img src="'+blog.imageURL+'" alt="">'+
      '<h4><a href="/view/travel/'+key+'">'+blog.postName+'</a></h4>'+
      '<time datetime="2020-01-01">Jan 1, 2020</time>'+
    '</div>'  +  bl;
      
    html+=bl;
  });
  recent.innerHTML = html;
  console.log(guideList.innerHTML);
  }
  else{
      guideList.innerHTML = `<h1 class="center-align">Login to view blogs</h1>`;
  }
}

    function delpost(key){
    db.collection("blogtravel").doc(key).delete().then(() => {
      alert("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
    
    }
