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
var storage = firebase.storage();
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


function upload() {
    //get your image
    var image = document.getElementById('image').files[0];
    //get image name
    var imageName = image.name;
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef = storage.ref('blogs/' + imageName);
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask = storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed', function (snapshot) {
        //get task progress by following code
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + " done");
    }, function (error) {
        //handle error here
        console.log(error.message);
    }, function () {
        //handle successfull upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            //get your image download url here and upload it to databse
            //our path where data is stored ...push is used so that every post have unique id
            //document.querySelector("#submit-blog").addEventListener("click", function () {
            let postAuthor = document.querySelector("#name").value;
            let postTitle = document.querySelector("#heading").value;
            let postContent = document.querySelector("#content").value;
            let category = document.querySelector("#Categories").value;
            console.log(category);
            if (
                postAuthor === "" ||
                postTitle === "" ||
                postContent === "" ||
                category === ""
            ) {
                alert("Fields Empty");
            } else {
                if (category == "1") {
                    db.collection("blogtech")
                        .doc()
                        .set({
                            author: postAuthor,
                            postName: postTitle,
                            postContent: postContent,
                            category: category,
                            imageURL: downloadURL
                        });
                    console.log("Uploaded");
                   // window.location.href = '/view/tech';

                }
                if (category == "2") {
                    db.collection("blogfood")
                        .doc()
                        .set({
                            author: postAuthor,
                            postName: postTitle,
                            postContent: postContent,
                            category: category,
                            imageURL: downloadURL
                        });
                        console.log("Uploaded");
                        //window.location.href = '/view/food';
                }
                if (category == "4") {
                    db.collection("bloghumour")
                        .doc()
                        .set({
                            author: postAuthor,
                            postName: postTitle,
                            postContent: postContent,
                            category: category,
                            imageURL: downloadURL
                        });
                        console.log("Uploaded");
                        //window.location.href = '/view/blog';
                }
                if (category == "3") {
                    db.collection("blogtravel")
                        .doc()
                        .set({
                            author: postAuthor,
                            postName: postTitle,
                            postContent: postContent,
                            category: category,
                            imageURL: downloadURL
                        });
                        console.log("Uploaded");
                       // window.location.href = '/view/travel';
                }

            };

           // window.location.href = '/view/blog';


        });
    });
}