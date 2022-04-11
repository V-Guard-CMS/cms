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
      //window.location.href = "index.html";
    }
  }catch(err) {
    window.location.href = "index.html";
  }
});
  function totalCount() {
    var ref = firebase.database().ref("total_count");
    ref.once("value")
    .then(function(snapshot) {
      var childKey = snapshot.child("total_count").val(); 
      addCount(childKey);
    });
  }
  document.addEventListener('dblclick', function(event) {
    $("#AllTableRemote").load(window.location.href+" #AllTableRemote >");
    $("#AllTable").load(window.location.href+" #AllTable >");
    alert("Double-click disabled!");
    event.preventDefault();
    event.stopPropagation();
    },true
);
  function addCount(counts) {
    document.getElementById("total_cnt").innerHTML = counts;
  }
  function doRefresh(){
    $("#AllTableRemote").load(window.location.href+" #AllTableRemote >");
    remote_od();
  }
  function doRefreshOd(){
    $("#AllTable").load(window.location.href+" #AllTable >");
    department_all();
  }
  window.onload = totalCount();
  window.onload = department_all();

function department_all() {
    var count = 1;
    totalCount();
    firebase.database().ref('order list').once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var s_no  = count;
          var od_no = CurrentRecord.val().order_no;
          var id_no = CurrentRecord.val().user_id;
          var name_r = CurrentRecord.val().name;
          var dept_r = CurrentRecord.val().dept;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var amount_r = CurrentRecord.val().amount;
          var date_r = CurrentRecord.val().time;
          var desc_r = CurrentRecord.val().description;
          var locationK = CurrentRecord.val().locationK;
          var status_r = CurrentRecord.val().status;
          var car_r = CurrentRecord.val().category;
          if(status_r == "Pending") {
            count++;
            AddItemToTable (s_no, od_no, date_r, id_no, 
              name_r, dept_r, tea_r, coffee_r, snack_r,
              amount_r, desc_r, locationK, car_r);
          }  
        }
      );
    });
}
window.onload = department_all;
function AddItemToTable(s_no, od_no, date_r, 
      id_no, name_r, dept_r, coffee_r, 
      tea_r, snack_r, amount_r, desc_r, locationK, car_r) {
    var addTable_1 = document.getElementById("grid-valueAll_fc");
    var sNo = document.createElement("div");
    var odNO = document.createElement("div");
    var dDate = document.createElement("div");
    var dId = document.createElement("div");
    var dName = document.createElement("div");
    var dDept = document.createElement("div");
    var dCate = document.createElement("div");
    var dTea = document.createElement("div");
    var dCoffee = document.createElement("div");
    var dSnack = document.createElement("div");
    var dDescr = document.createElement("div");
    var dAmount = document.createElement("div");
    var confirm = document.createElement("button");
    sNo.innerHTML = s_no;
    odNO.innerHTML = od_no;
    dDate.innerHTML = date_r;
    dId.innerHTML = id_no;
    dName.innerHTML = name_r;
    dDept.innerHTML = dept_r;
    dCate.innerHTML = car_r;
    dTea.innerHTML = tea_r;
    dCoffee.innerHTML = coffee_r;
    dSnack.innerHTML = snack_r;
    dDescr.innerHTML = desc_r;
    dAmount.innerHTML = amount_r;
    confirm.classList.add("confirm");
    confirm.innerHTML = "CONFIRM"
    confirm.onclick = () => doConfirm(od_no, date_r, id_no, name_r,
       dept_r, coffee_r, tea_r, snack_r,  desc_r, amount_r, locationK, car_r);
    addTable_1.appendChild(sNo);
    addTable_1.appendChild(odNO);
    addTable_1.appendChild(dDate);
    addTable_1.appendChild(dId);
    addTable_1.appendChild(dName);
    addTable_1.appendChild(dDept);
    addTable_1.appendChild(dCate);
    addTable_1.appendChild(dTea);
    addTable_1.appendChild(dCoffee);
    addTable_1.appendChild(dSnack);
    addTable_1.appendChild(dDescr);
    addTable_1.appendChild(dAmount); 
    addTable_1.appendChild(confirm)
}
  const doConfirm = (order_no, time,
    id, name, dept, tea, coffee, snacks, description, amount, locationK, category) => {
      var status = "Completed"
      database_ref = database.ref()
      var update = {
        order_no : order_no,
        time : time,
        id : id,
        name : name,
        dept : dept,
        tea : tea,
        coffee : coffee,
        snacks : snacks,
        description : description,
        amount : amount,
        locationK : locationK,
        status : status,
        category : category
      }
      var d = time;
      const date = moment(d, 'DD/MM/YYYY');
      const month = date.format('M');
      database_ref.child('admin/'+ month).child(locationK).set(update);
     // alert(name + ' : Order Completed!');
      firebase.database().ref('order list').child(locationK).remove();
      location.reload();
  }
  var table = document.getElementById('AllTable');
  var dept_bar = document.getElementById('scr_bar');
  var total_ct = document.getElementById("ct");
  var refe = document.getElementById("refresh");
  function report() {
    table.style.display = "none";
    refe.style.display = "none";
    total_ct.style.display = "none";
    dept_bar.style.display = "block";
  }
function ConfirmAllOrder() {
    var count = 1;
    totalCount();
    firebase.database().ref('order list').once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var s_no  = count;
          var od_no = CurrentRecord.val().order_no;
          var id_no = CurrentRecord.val().user_id;
          var name_r = CurrentRecord.val().name;
          var dept_r = CurrentRecord.val().dept;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var amount_r = CurrentRecord.val().amount;
          var date_r = CurrentRecord.val().time;
          var desc_r = CurrentRecord.val().description;
          var locationK = CurrentRecord.val().locationK;
          var status_r = CurrentRecord.val().status;
          var cate_r = CurrentRecord.val().category;
          if(status_r == "Pending") {
            count++;
             completeOrder(od_no, date_r, id_no, 
              name_r, dept_r, tea_r, coffee_r, snack_r, desc_r,
              amount_r, locationK, cate_r);
          }  
        }
      );
    });
}
const completeOrder = (order_no, time,
  id, name, dept, tea, coffee, snacks, description, amount, locationK, category) => {
    var status = "Completed"
    database_ref = database.ref()
    var update = {
      order_no : order_no,
      time : time,
      id : id,
      name : name,
      dept : dept,
      tea : tea,
      coffee : coffee,
      snacks : snacks,
      description : description,
      amount : amount,
      locationK : locationK,
      status : status,
      category : category
    }
    var d = time;
    const date = moment(d, 'DD/MM/YYYY');
    const month = date.format('M');
    database_ref.child('admin/'+ month).child(locationK).set(update);
    alert(name + ' : Order Completed!');
    firebase.database().ref('order list').child(locationK).remove();
    location.reload();
}
function remoteOrder() {
  document.getElementById("AllTableRemote").style.display = "block"
  document.getElementById("refresh_remo_div").style.display = "block"
  document.getElementById("refresh_od_div").style.display = "none"
  document.getElementById("AllTable").style.display = "none"
  document.getElementById("refresh").style.display = "none"
  document.getElementById("confirm_remo").style.display = "block"
  document.getElementById("confirm_remote").style.display = "block"
}
function remote_od() {
  var count = 1;
  firebase.database().ref('remote').once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var s_no  = count;
          var od_no = CurrentRecord.val().order_no;
          var id_no = CurrentRecord.val().user_id;
          var name_r = CurrentRecord.val().name;
          var dept_r = CurrentRecord.val().dept;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var amount_r = CurrentRecord.val().amount;
          var date_r = CurrentRecord.val().time;
          var desc_r = CurrentRecord.val().description;
          var locationK = CurrentRecord.val().locationK;
          var status_r = CurrentRecord.val().status;
          var cat_e = CurrentRecord.val().category;
          if(status_r == "Pending") {
            count++;
            AddItemToTableR (s_no, od_no, date_r, id_no, 
              name_r, dept_r, tea_r, coffee_r, snack_r,
              amount_r, desc_r, locationK, cat_e);
          }  
        }
      );
    });
}
window.onload = remote_od;
function AddItemToTableR(s_no, od_no, date_r, 
      id_no, name_r, dept_r, tea_r, 
      coffee_r, snack_r, amount_r, desc_r, locationK, cate_e) {
    var addTable_1 = document.getElementById("grid-valueAll_fc_remote");
    var sNo = document.createElement("div");
    var odNO = document.createElement("div");
    var dDate = document.createElement("div");
    var dId = document.createElement("div");
    var dName = document.createElement("div");
    var dDept = document.createElement("div");
    var dCate = document.createElement("div");
    var dTea = document.createElement("div");
    var dCoffee = document.createElement("div");
    var dSnack = document.createElement("div");
    var dDescr = document.createElement("div");
    var dAmount = document.createElement("div");
    var confirm = document.createElement("div");
    sNo.innerHTML = s_no;
    odNO.innerHTML = od_no;
    dDate.innerHTML = date_r;
    dId.innerHTML = id_no;
    dName.innerHTML = name_r;
    dDept.innerHTML = dept_r;
    dCate.innerHTML = cate_e;
    dTea.innerHTML = tea_r;
    dCoffee.innerHTML = coffee_r;
    dSnack.innerHTML = snack_r;
    dDescr.innerHTML = desc_r;
    dAmount.innerHTML = amount_r;
    confirm.innerHTML = "Pending"
    // confirm.onclick = () => doConfirmRemote(od_no, date_r, id_no, name_r,
    //   dept_r, tea_r, coffee_r, snack_r,  desc_r, amount_r, locationK, cate_e);
    addTable_1.appendChild(sNo);
    addTable_1.appendChild(odNO);
    addTable_1.appendChild(dDate);
    addTable_1.appendChild(dId);
    addTable_1.appendChild(dName);
    addTable_1.appendChild(dDept);
    addTable_1.appendChild(dCate);
    addTable_1.appendChild(dTea);
    addTable_1.appendChild(dCoffee);
    addTable_1.appendChild(dSnack);
    addTable_1.appendChild(dDescr);
    addTable_1.appendChild(dAmount); 
    addTable_1.appendChild(confirm)
}
const doConfirmRemote = (order_no, time,
  id, name, dept, tea, coffee, snacks, description, amount, locationK, category) => {
    var status = "Completed"
    database_ref = database.ref()
    var update = {
      order_no : order_no,
      time : time,
      id : id,
      name : name,
      dept : dept,
      tea : tea,
      coffee : coffee,
      snacks : snacks,
      description : description,
      amount : amount,
      locationK : locationK,
      status : status,
      category : category
    }
    var d = time;
    const date = moment(d, 'DD/MM/YYYY');
    const month = date.format('M');
    database_ref.child('admin/'+ month).child(locationK).set(update);
    alert(name + ' : Order Completed!');
    firebase.database().ref('remote').child(locationK).remove();
    location.reload();
}
function refresh() {
  location.reload();
}
function remoteOrderAll() {
    firebase.database().ref('remote').once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var od_no = CurrentRecord.val().order_no;
          var id_no = CurrentRecord.val().user_id;
          var name_r = CurrentRecord.val().name;
          var dept_r = CurrentRecord.val().dept;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var amount_r = CurrentRecord.val().amount;
          var date_r = CurrentRecord.val().time;
          var desc_r = CurrentRecord.val().description;
          var locationK = CurrentRecord.val().locationK;
          var status_r = CurrentRecord.val().status;
          var categ_r = CurrentRecord.val().category;
          if(status_r == "Pending") {
             completeOrderRemote(od_no, date_r, id_no, 
              name_r, dept_r, tea_r, coffee_r, snack_r, desc_r,
              amount_r, locationK, categ_r);
          }  
        }
      );
    });
}
const completeOrderRemote = (order_no, time,
  id, name, dept, tea, coffee, snacks, description, amount, locationK, category) => {
    var status = "Completed"
    database_ref = database.ref()
    var update = {
      order_no : order_no,
      time : time,
      id : id,
      name : name,
      dept : dept,
      tea : tea,
      coffee : coffee,
      snacks : snacks,
      description : description,
      amount : amount,
      locationK : locationK,
      status : status,
      category : category
    }
    var d = time;
    const date = moment(d, 'DD/MM/YYYY');
    const month = date.format('M');
    database_ref.child('admin/'+ month).child(locationK).set(update);
    alert(name + ' : Order Completed!');
    firebase.database().ref('remote').child(locationK).remove();
    location.reload();
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