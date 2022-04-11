// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzAFnus9jw3Df3dVnUvG5NmimbJ86SMUg",
  authDomain: "cms-vg.firebaseapp.com",
  databaseURL: "https://cms-vg-default-rtdb.firebaseio.com",
  projectId: "cms-vg",
  storageBucket: "cms-vg.appspot.com",
  messagingSenderId: "1040006850602",
  appId: "1:1040006850602:web:8e4e389432cf6ff761fb53",
  measurementId: "G-G7RLW64V9S"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
var check = 0;

function validate_user(email, callback) {
  firebase.database().ref('users/').once('value',
      function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var check_mail = CurrentRecord.val().email;
          if(check_mail == email) {
            alert(check_mail);
            check++;
          }
        }
      );
    });
  callback();
}

function login () {
    email = document.getElementById('admin_email').value;
    password = document.getElementById('admin_password').value;
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password incorrect !');
      return
    }
    if(email == "admin@gmail.com" && password == "123456") {
      auth.signInWithEmailAndPassword(email, password)
      .then(function() {
      window.location.href = "admin.html";
      alert('Logged In !');
      })
      .catch(function(error) {
        var error_message = error.message;
        alert(error_message);
      })
    }else {
      alert('You dont have access to login');
    }
}
function fcLogin() {
    email = document.getElementById('fc_email').value
    password = document.getElementById('fc_password').value
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password incorrect !')
      return
    }
    if(email == "fc@gmail.com" && password == "123456") {
      auth.signInWithEmailAndPassword(email, password)
        .then(function() {
        window.location.href = "fc.html";
        alert('Logged In !');
        })
      .catch(function(error) {
          var error_message = error.message;
          alert(error_message);
      })
    }
    else {
      alert('You dont have access to login');
    }
}
function staffLogin() {
  email = document.getElementById('staff_email').value
  password = document.getElementById('staff_password').value
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password incorrect !')
    return
  }
  auth.signInWithEmailAndPassword(email, password)
      .then(function() {
      window.location.href = "staff.html";
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          
          // User logged in already or has just logged in.
          //console.log(user.uid);
          
        } else {
          // User not logged in or has just logged out.
        }
      });
      alert('Logged In !');
      })
    .catch(function(error) {
        var error_message = error.message;
        alert(error_message);
    })
}
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      return true
    } else {
      return false
    }
}
  
function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

