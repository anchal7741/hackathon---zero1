

//login
const signin = document.getElementById("login");

signin.addEventListener('submit', event => {
  event.preventDefault();

  const email = signin['login-email'].value;
  const password = signin['login-pass'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    console.log(1);
    alert("Logged in successfully");
    signin.reset();
    window.location.href = '/';
  }).catch(err => {
    console.log(err);
    alert(err.message);
  });

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

