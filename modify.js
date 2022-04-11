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

    firebase.database().ref('users').once('value',
    function (AllRecords) {
        AllRecords.forEach(
          function (CurrentRecord) {
            var id = CurrentRecord.val().user_id;
            var name = CurrentRecord.val().full_name;
            var dept = CurrentRecord.val().dept;
            var email = CurrentRecord.val().email;
            var pass = CurrentRecord.val(). password; 
            var wall = CurrentRecord.val(). wallet;
            var cate = CurrentRecord.val(). category;
            var uid_1 = CurrentRecord.val(). uid; 
            AddItemsToTable (id, name, dept, email, pass, wall, cate, uid_1);
          }
        );
      });
  function AddItemsToTable(id, name, dept, email, pass, wall, category, uid) {
    var data = document.getElementById("grid-value");
    var Id = document.createElement("div");
    var name_1 = document.createElement("div");
    var dept_1 = document.createElement("div");
    var email_1 = document.createElement("div");
    var cat_1 = document.createElement("div");
    var wall_1 = document.createElement("div");
    var deleteLink = document.createElement("div");
    var editLink = document.createElement("div");
    deleteLink.classList.add("delete");
    editLink.classList.add("delete");
    Id.innerHTML = id;
    name_1.innerHTML = name;
    email_1.innerHTML = email;
    dept_1.innerHTML = dept;
    cat_1.innerHTML = category;
    wall_1.innerHTML = wall;
    editLink.innerHTML = "Edit";
    deleteLink.innerHTML = "Delete";
    deleteLink.onclick = () => doDeleteEmp(id, name);
    editLink.onclick = () => doEditEmp(id, name, email, dept, pass, wall, category, uid);
    data.appendChild(Id);
    data.appendChild(name_1);
    data.appendChild(dept_1);
    data.appendChild(email_1);
    data.appendChild(cat_1);
    data.appendChild(wall_1);
    data.appendChild(editLink);
    data.appendChild(deleteLink);
  }
  const doDeleteEmp = (id, name) => {
    firebase.database().ref('users').child(id).remove();
    alert(name + ' : deleted Successfully')
    location.reload(); 
  }
  var modal = document.getElementById("myModal");
  var modal1 = document.getElementById("myModal1");
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
  var uid;
  const doEditEmp = (id, name, email, dept, pass, wall, category, uid_2) => {
    modal.style.display = "block";
    document.getElementById('user_id').value = id;
    document.getElementById('full_name').value = name;
    document.getElementById('dept').value = dept;
    document.getElementById('email').value = email;
    document.getElementById('password').value = pass;
    document.getElementById('cat').value = category;
    document.getElementById('wallet').value = wall;
    uid = uid_2;
  }
  function editBtn() {
    user_id = document.getElementById('user_id').value;
    full_name = document.getElementById('full_name').value;
    dept = document.getElementById('dept').value;
    email = document.getElementById('email').value;
    category = document.getElementById('cat').value;
    password = document.getElementById('password').value;
    wallet = document.getElementById('wallet').value;
    database_ref = database.ref()
    var update = {
      user_id : user_id,
      full_name : full_name,
      dept : dept,
      category : category,
      email : email,
      password : password,
      wallet : wallet,
      uid : uid
    }
    database_ref.child('users/').child(user_id).set(update);
    alert(full_name + ' : Updated Successfully!');
    modal.style.display = "none";
    location.reload(); 
  }
  