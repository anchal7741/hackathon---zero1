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
const guideList = document.querySelector('.tab-content');


const doctor = db.collection('doctors');
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("logged in");
        console.log(user.uid)
        doctor.onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            
        }, err => console.log(err.message));     
        
    } else {
        console.log("logged out");
        setupGuides([]);
       
    }
});


// setup guides
const setupGuides =(data) => {
  if(data.length){
      let html = '';
  data.forEach(doc => {
          let blog = doc.data();  
          let key= doc.id;  
          //console.log(key);   
          //console.log(blog.postName); 
          let li='';
       li = 
      ` <div class="card-avatar">
      <a href="">
        <img class="img" src="/img/WhatsApp ).jpeg" >
      </a>
    </div>
    <div class="card-body">
              <h4 class="card-title">${blog.Name}</h4>
              <p class="card-description">${blog.email}</p>
              <p class="card-description">${blog.Field}</p>
              <p class="card-description">${blog.address}</p>
              <p class="card-description">${blog.Phone}</p>
              
              <p class="card-description">
              ${blog.About}
              </p>
              <a href=" /docprofileupdate/45" class="btn btn-primary btn-round">Update</a>
      </div>` +li ;
      
    html=li;
  });
  guideList.innerHTML = html;
  //console.log(guideList.innerHTML);
  }
  else{
      guideList.innerHTML = `<h1 class="center-align">Login to view blogs</h1>`;
  }
}



