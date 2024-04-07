#!/usr/bin/node

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

// Form validation
$('document').ready(function(){
  $("#signup").validate({
    // rules
    debug: false,
    rules: {
      email: {
        required: true,
        email: true
      },
      phone: {
        required: false,
        minlength: 10,
        maxlength: 10
      },
      password: {
        required: true,
        minlength: 8,
        maxlength: 20
      },
      password2: {
        required: true,
        equalTo: '#password'
      }
    },
    messages: {
      // custom messages
      email: {
        required: "Email is required",
        email: "Please enter a valid email address"
      },
      phone: {
        minlength: "The phone number is a 10 digit number",
        maxlength: "Enter the phone number in the format shown"
      },
      password: {
        required: "Password is required",
        minlength: "Password must be at least 8 characters",
        maxlength: "Password is too long"
      },
      password2: {
        required: "Please retype your password",
        equalTo: "Your password doesn't match the one above!"
      }
    }
  });
});

// Listen to submit event
document.getElementById("signup").addEventListener('submit', function(e){
  e.preventDefault();
  $("#signup").submit(function () {
    // if form was valid
    if ($(this).valid()) {  
      // prevent double submissions
      if ($(this).data("submitted")) {
        e.preventDefault();
      } else {
        $(this).data("submitted", true);
      }          
      // pick the users input
      var email = document.getElementById("email").value;
      var phone = document.getElementById("phone").value;
      var password = document.getElementById("password").value;

      // Firebase to create account based on email / password 
      // createUserWithEmailAndPassword
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(response){
        console.log(response);
        // alert("account created ");
        swal({
          title: "Account Created!",
          text: "Your account at mkoolima has been created. Check your email shortly.",
          icon: "success",
        });
      })
      .then(function(){
        // send email
        sendVerificationEmail();
      })
      .then(function(){
        // take user details to real time db 
        firebase.database().ref("user_information/").push({
          email: email,
          phone: phone
        })
        .then(function(response){
          swal({
            title: "Details Saved!",
            text: "Redirecting you to the login page. Check email to verify your email address.",
            icon: "success",
          });
          // transition to login
          redirect_after("login.html", 5000);
        })
        .catch(function(error){
          alert("something went wrong " + error);
        });
      })
      .catch(function(error){
        swal({
          title: "Error",
          text: error.message,
          icon: "error",
        });
        reload_after(6000);
      });
    }
  });
});

// Function called right after the signUpWithEmailAndPassword to send verification emails
function sendVerificationEmail() {
  // Built in firebase function responsible for sending the verification email
  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    console.log('Verification Email Sent Successfully !');
    // redirecting the user to the profile page once everything is done correctly
    // window.location.assign('../profile');
  })
  .catch(error => {
    console.error(error);
  });
}

// Utility function to reload the page after a specified delay
function reload_after(ms) {
  setTimeout(function () {
    if (ms > 0) {
      location.reload();
    }
  }, ms);
}

// Utility function to redirect to another page after a specified delay
function redirect_after(page, ms) {
  setTimeout(function () {
    if (ms > 0) {
      window.location.replace(page);
    }
  }, ms);
}