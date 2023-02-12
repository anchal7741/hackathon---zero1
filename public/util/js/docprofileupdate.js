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

// update firestore settings
db.settings({ timestampsInSnapshots: true });


auth.onAuthStateChanged(user => {
    if (user) {
        console.log("logged in");
        const form = document.getElementById('docprofileupdate');
        form.addEventListener('submit', (e) => {

            e.preventDefault();
            let name = form['name'].value;
            let email = document.getElementById("email").value;
            let address = document.getElementById("address").value;
            let field = document.getElementById("field").value;
            let phone = document.getElementById("phone").value;
            let aboutme = document.getElementById("aboutme").value;
            console.log(name, email, address);

            db.collection("doctors").doc(user.uid).set({
                Name: name,
                email: email,
                address: address,
                Field: field,
                Phone: phone,
                About: aboutme

            });
            alert("Uploaded");

        });

    } else {
        console.log("logged out");
    }
});

