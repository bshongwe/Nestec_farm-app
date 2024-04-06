// Nestec Firebase configuration
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

// Function to update UI for authenticated user
function updateUserUI(user) {
    const nestec_user = firebase.auth().currentUser;
    var jina = nestec_user.displayName;
    var photo = nestec_user.photoURL;

    if (jina === null){
        // If no display name, use email address
        jina = nestec_user.email;
    }
    $('#user_profile').html(jina);
    
    if (photo != null){
        // If user has photo, display it
        $("#avatar").attr("hidden", true);
        $("#user_photo").attr("hidden", false);
        $("#user_photo").attr("src", photo);
    }
}

// Function to update UI for guest mode
function updateGuestUI() {
    // Display default UI for guest mode
    $('#user_profile').html("Guest");
    $("#avatar").attr("hidden", false);
    $("#user_photo").attr("hidden", true);
}

// Firebase user configs
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in
        console.log("logged in");
        updateUserUI(user);
    } else {
        // Default display for guest mode
        console.log("Not logged in");
        updateGuestUI();
    }
});

// Executed when state of document changes
document.onreadystatechange = function () {
    // Get current state of the document
    var state = document.readyState;

    // Elements visibility: Check if document is fully loaded
    if (state == 'complete') {
        // ID checks: interactive, load
        document.getElementById('interactive').style.visibility = "hidden";
        document.getElementById('load').style.visibility="hidden";
    }
}
