  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB1q7lyp5sUJqhzYcFlcplhRWzPoFZ7S0M",
    authDomain: "nestec-41396.firebaseapp.com",
    databaseURL: "https://nestec-41396-default-rtdb.firebaseio.com/",
    projectId: "nestec-41396",
    storageBucket: "nestec-41396.appspot.com",
    messagingSenderId: "687954154959",
    appId: "1:687954154959:web:494db0b797c0ed451b6eba",
    measurementId: "G-YNB63MQKR8"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    // User is signed in.
    console.log("logged in");

    const nestec_user = firebase.auth().currentUser;

    //what will displayed on the header
    var jina = nestec_user.displayName;

    var photo = nestec_user.photoURL;

    if (jina === null){
    //if no dispaly name, we use the email address
    jina = nestec_user.email;
    }
    $('#user_profile').html(jina);
    if (photo != null){
        //use the google photo
        $("#avatar").attr("hidden", true);
        $("#user_photo").attr("hidden", false);
        $("#user_photo").attr("src", photo);
    }
} else {
    console.log("Not logged in");
}
});

document.onreadystatechange = function () {
  var state = document.readyState;
  if (state == 'complete') {
         document.getElementById('interactive');
         document.getElementById('load').style.visibility="hidden";
  }
}
