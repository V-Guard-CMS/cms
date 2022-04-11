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
const auth = firebase.auth()
const database = firebase.database()
var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged((user) => {
  //console.log(user.uid);
  try {
    if(user.uid == "MNoC4xUd1tZQ3EjnA9nF898dPgt2") {
    }
    else {
      window.location.href = "index.html";
    }
  }catch(err) {
    window.location.href = "index.html";
  }
});
function register () {
  user_id = document.getElementById('user_id').value
  full_name = document.getElementById('full_name').value
  dept = document.getElementById('dept').value
  category = document.getElementById('category').value
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  wallet = document.getElementById('wallet').value
  
  if (validate_email(email) == false) {
    alert('Email incorrect !!')
    return
  }
  if (validate_field(full_name) == false || validate_field(user_id) == false || validate_field(wallet) == false) {
    alert('One or More Extra Fields is incorrect !!')
    return
  }else {
    var uid = "";
    var database_ref = database.ref();
    var user_data = {
      user_id : user_id,
      email : email,
      dept : dept,
      category : category,
      full_name : full_name,
      password : password,
      wallet : wallet,
      uid : uid
    }
    //alert(user_id+" "+email+" " + dept + " " +category+" "+full_name+" " +password+" "+wallet+" "+uid);
    database_ref.child('users/').child(user_id).set(user_data);
    alert('User Created Successfull !!');
    modal.style.display = "none";
    //location.reload(); 
  }
  /*auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })*/
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

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
var modal = document.getElementById("myModal");
var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");
var btn = document.getElementById("Add_User");
var topup = document.getElementById("top-up");

var add = document.getElementById("form_header");

var reg_btn = document.getElementById("reg_btn");

var table = document.getElementById("c_table");
var total_count = document.getElementById("total-count");
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close1")[0];
var span2 = document.getElementsByClassName("close2")[0];

function refresh() {
  location.reload();
}
topup.onclick = function() {
  modal2.style.display = "block";
}
total_count.onclick = function() {
  modal1.style.display = "block";
}
btn.onclick = function() {
  add.style.display = "block";
  reg_btn.style.display = "block";
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
span1.onclick = function() {
  modal1.style.display = "none";
}
span2.onclick = function() {
  modal2.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

function addCount() {
  var total_count = document.getElementById("tol_count").value;
  var database_ref = database.ref()
  var Total_count = {
    total_count : total_count
  }
  database_ref.child('total_count/').set(Total_count);
  alert('Total Count Updated!');
  modal.style.display = "none";
}

function topUp() {

  firebase.database().ref('users').once('value',
  function (AllRecords) {
      AllRecords.forEach(
        function (CurrentRecord) {
          var id = CurrentRecord.val().user_id;
          var name = CurrentRecord.val().full_name;
          var dept = CurrentRecord.val().dept;
          var email = CurrentRecord.val().email;
          var cate = CurrentRecord.val().category;
          var user_uid = CurrentRecord.val().uid;
          var pass = CurrentRecord.val(). password; 

          if(document.getElementById("cat").value == cate && cate == "HOSTELER")
          {
            update_date (id, name, dept, cate, email, pass, "2600", user_uid);
          }
                      
          else if(document.getElementById("cat").value == cate && cate == "DAYSCHOLAR")
          {
            wall= 2000;
            update_date (id, name, dept, cate, email, pass, "2000", user_uid);
          }
          
        }
      );
    });    
  alert('wallet updated Successfull !');
  modal2.style.display = "none";
 }
function update_date(user_id, full_name, dept, category, email, password, wallet ,uid) {
  var database_ref = database.ref();
  var user_data = {
    user_id : user_id,
    email : email,
    dept : dept,
    category : category,
    full_name : full_name,
    password : password,
    wallet : wallet,
    uid : uid
  }
  database_ref.child('users/'+ user_id).set(user_data)
  
}
var img = document.getElementById('img_kpr');
function report() {
  table.style.display = "none";
  img.style.display = "none";
}
function signOut() {
  firebase.auth().signOut()
  .then(function() {
    alert("Sign Out successful");
    window.location.href = "index.html";
  })
  .catch(function(error) {
    alert(error);
  });
}