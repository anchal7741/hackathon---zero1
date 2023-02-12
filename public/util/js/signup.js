//signup
const signedup = document.getElementById("signup");
signedup.addEventListener('submit', event => {
  event.preventDefault();
  const username = signedup['signup-name'].value;
  const email = signedup['signup-email'].value;
  const password = signedup['signup-pass'].value;


  auth.createUserWithEmailAndPassword(email, password).then(cred => {  
    return db.collection('users').doc(cred.user.uid).set({
      username: username,
      email: email 
    });
  }).catch(err => {
    console.log(err);
    alert(err.message);
  }); 
  alert("Signed up successfully");
  signedup.reset();
 // window.location.href = '/';
});

//sign in with Google
const google = document.getElementById("google");

google.addEventListener('click', event => {
  event.preventDefault();

  let provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider).then(() => {
    alert('Logged in with google');
    window.location.href = '/';
  }).catch(e => {
    alert(e.message);
  });
});


//sign in with Facebook
const facebook = document.getElementById("facebook");

facebook.addEventListener('click', event => {
  event.preventDefault();

  let provider = new firebase.auth.FacebookAuthProvider();

  auth.signInWithPopup(provider).then(cred => {
    alert('Logged in with Facebook');
    window.location.href = '/';
  }).catch(e => {
    alert(e.message);
  });
});
