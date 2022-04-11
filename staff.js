// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzAFnus9jw3Df3dVnUvG5NmimbJ86SMUg",
  authDomain: "cms-vg.firebaseapp.com",
  databaseURL: "https://cms-vg-default-rtdb.firebaseio.com",
              //https://cms-vg-default-rtdb.firebaseio.com/
  projectId: "cms-vg",
  storageBucket: "cms-vg.appspot.com",
  messagingSenderId: "1040006850602",
  appId: "1:1040006850602:web:8e4e389432cf6ff761fb53",
  measurementId: "G-G7RLW64V9S"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()
var user_uid;
var category;
var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged((user) => {
   if (user) {
    user_uid = user.uid;
  } else {
    window.location.href = "index.html";
  }
});

var total_amt;
var updated_wallet;
var s_name, s_id, s_dept, categ;
firebase.database().ref('users/').once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var id = CurrentRecord.val().user_id;
          var uid = CurrentRecord.val().uid;
          var sname = CurrentRecord.val().full_name;
          var email_id = CurrentRecord.val().email;
          var dept = CurrentRecord.val().dept;
          var wallet = CurrentRecord.val().wallet;
          var cate = CurrentRecord.val().category;
          if(uid == user_uid) {

          total_amt = wallet;
          document.getElementById("wallet_amt").innerHTML = wallet;
          document.getElementById("staff_name").innerHTML = sname;

          localStorage.setItem("stfid", id);
          
          s_id = id;
          categ = cate;
          s_dept = dept;
          s_name = sname;
          }  
        }
      );
    });
var order_modal = document.getElementById('myModal');
var span2 = document.getElementsByClassName("close")[0];
function orderNow() {
    order_modal.style.display = "block";
}
span2.onclick = function() {
    order_modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == order_modal) {
    order_modal.style.display = "none";
  }
}
function placeOrder() {
  var tea_quan = document.getElementById('tea_qnt').value;
  var coffee_quan = document.getElementById('coffee_qnt').value;
  var snack_quan = document.getElementById('snack_qnt').value;

  var t = tea_quan.split("-")[1];
  var l = coffee_quan.split("-")[1];
  var d = snack_quan.split("-")[1];

  var tea_a =  parseInt(t, 10);
  var coffee_p = parseInt(l, 10) ;
  var snack_p = parseInt(d, 10);
  
  tea_a=tea_a ? tea_a : 0;
  coffee_p=coffee_p ? coffee_p : 0;
  snack_p=snack_p ? snack_p : 0;

  var count = tea_a + coffee_p + snack_p;
  var price = count;
  updated_wallet = parseInt(total_amt, 10) - price; 
  if(count == 0) {
    alert('Please select quantity correctly');
  }else if(updated_wallet >= 0) {
    orderList(s_id, s_name, s_dept, String(price), user_uid, categ); 
  }else if(updated_wallet < 0) {
    alert('Please topup wallet available balance is : ' + total_amt);
  }
}
function orderList(id, name, dept, amount, uid, category) {
  var tea = document.getElementById('tea_qnt').value;
  var coffee = document.getElementById('coffee_qnt').value;
  var snacks = document.getElementById('snack_qnt').value;
  var description = document.getElementById('desc_order').value;
  var d = new Date();
  var order_no = d.getHours()+""+d.getMinutes()+""+d.getSeconds();
  var date = new Date();
  var twoDigitMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  var twoDate = date.getDate().toString().padStart(2, "0");
  var time = twoDate+"/"+twoDigitMonth+"/"+date.getFullYear();
  var status = "Pending"
    database_ref = database.ref()
    var locationK = database_ref.push().getKey();
    var update = {
      order_no : order_no,
      time : time,
      //id : id,
      user_id : id,
      name : name,
      dept : dept,
      tea : tea,
      coffee : coffee,
      snacks : snacks,
      description : description,
      amount : amount,
      uid : uid,
      category : category,
      locationK : locationK,
      status : status
    }
    // alert(user_id);
    database_ref.child('remote/').child(locationK).set(update);
    database_ref.child('users/').child(id).child("wallet").set(String(updated_wallet));
    alert(name + ' : Order Placed!');
    location.reload();
}

firebase.database().ref('remote/').once('value',
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
        var descr = CurrentRecord.val().description;
        var status_r = CurrentRecord.val().status;
        var uid = CurrentRecord.val().uid;
        if(status_r == "Pending" && uid == user_uid) {
          AddItemToTable (od_no, date_r, id_no, 
            name_r, dept_r, tea_r, coffee_r, snack_r,
            amount_r, descr, status_r);
        }  
      }
  );
});
function AddItemToTable(od_no, date_r, 
      id_no, name_r, dept_r, tea_r, 
      coffee_r, snack_r, amount_r, descr, status) {
    var addTable_1 = document.getElementById("grid-valueAll");
    var sNo = document.createElement("div");
    var odNO = document.createElement("div");
    var dDate = document.createElement("div");
    var dId = document.createElement("div");
    var dName = document.createElement("div");
    var dDept = document.createElement("div");
    var dTea = document.createElement("div");
    var dCoffee = document.createElement("div");
    var dSnack = document.createElement("div");
    var dDesc = document.createElement("div");
    var dAmount = document.createElement("div");
    var dstatus = document.createElement("div");
    odNO.innerHTML = od_no;
    dDate.innerHTML = date_r;
    dId.innerHTML = id_no;
    dName.innerHTML = name_r;
    dDept.innerHTML = dept_r;
    dTea.innerHTML = tea_r;
    dCoffee.innerHTML = coffee_r;
    dSnack.innerHTML = snack_r;
    dDesc.innerHTML = descr;
    dAmount.innerHTML = amount_r;
    dstatus.innerHTML = status;
    addTable_1.appendChild(odNO);
    addTable_1.appendChild(dDate);
    addTable_1.appendChild(dId);
    addTable_1.appendChild(dName);
    addTable_1.appendChild(dDept);
    addTable_1.appendChild(dTea);
    addTable_1.appendChild(dCoffee);
    addTable_1.appendChild(dSnack);
    addTable_1.appendChild(dDesc);
    addTable_1.appendChild(dAmount);
    addTable_1.appendChild(dstatus);
}

function staff_signOut() {
  firebase.auth().signOut()
  .then(function() {
    alert("Sign Out successful");
    window.location.href = "index.html";
  })
  .catch(function(error) {
    alert(error);
  });
}


const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var day = weekday[d.getDay()];
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
$(document).ready(function(){

  $('#tea_qnt').append("<option value = '0-0'>-SELECT-</option>")
  $('#snack_qnt').append("<option value = '0-0'>-SELECT-</option>")
  $('#coffee_qnt').append("<option value = '0-0'>-SELECT-</option>")

  if(day == "Monday"){
    
    $('#tea_qnt').append("<option value = 'Wheat_Dosa-10'>Wheat Dosai</option>")
    $('#coffee_qnt').append("<option value = 'Meals-45'>Meals</option>")
    $('#coffee_qnt').append("<option value = 'Egg_Gravy-12'>Egg Gravy</option>")
    $('#coffee_qnt').append("<option value = 'Boiled_Egg-7'>Boiled Egg</option>")
    $('#coffee_qnt').append("<option value = 'Omlet-9'>Omlet</option>")
    $('#coffee_qnt').append("<option value = 'Half_Boil-12'>Half Boil</option>")
    $('#snack_qnt').append("<option value = 'Egg_Rice-25'>Egg Rice</option>")

  }else if(day == "Tuesday"){

    $('#tea_qnt').append("<option value = 'Oothapam-10'>Oothapam</option>")
    $('#coffee_qnt').append("<option value = 'Meals-45'>Meals</option>")
    $('#coffee_qnt').append("<option value = 'Fish_Fry-25'>Fish Fry</option>")
    $('#snack_qnt').append("<option value = 'Chapathi-10'>Chapathi</option>")


  }else if(day == "Wednesday"){

    $('#tea_qnt').append("<option value = 'Idly-7'>Idly</option>")
    $('#coffee_qnt').append("<option value = 'Meals-45'>Meals</option>")
    $('#coffee_qnt').append("<option value = 'Chicken_Gravy-35'>Chicken Gravy</option>")
    $('#snack_qnt').append("<option value = 'Parotta-10'>Parotta</option>")


  }else if(day == "Thursday"){

    $('#tea_qnt').append("<option value = 'Dosai-10'>Dosai</option>")
    $('#coffee_qnt').append("<option value = 'Meals-45'>Meals</option>")
    $('#coffee_qnt').append("<option value = 'Fish_Fry-25'>Fish Fry</option>")
    $('#snack_qnt').append("<option value = 'Chapathi-10'>Chapathi</option>")


  }else if(day == "Friday"){

    $('#tea_qnt').append("<option value = 'Poori_Masala-10'>Poori Masala</option>")
    $('#coffee_qnt').append("<option value = 'Meals-45'>Meals</option>")
    $('#coffee_qnt').append("<option value = 'Cauliflower_Chilly-18'>Cauliflower Chilly</option>")
    $('#coffee_qnt').append("<option value = 'Egg_Gravy-12'>Egg Gravy</option>")
    $('#coffee_qnt').append("<option value = 'Boiled_Egg-7'>Boiled Egg</option>")
    $('#coffee_qnt').append("<option value = 'Omlet-9'>Omlet</option>")
    $('#coffee_qnt').append("<option value = 'Half_Boil-10'>Half Boil</option>")
    $('#snack_qnt').append("<option value = 'Variety_Dosai-10'>Variety Dosai</option>")

  }else if(day == "Saturday"){

    $('#tea_qnt').append("<option value = 'Chapathi-10'>Chapathi</option>")
    $('#coffee_qnt').append("<option value = 'Meals-45'>Meals</option>")
    $('#coffee_qnt').append("<option value = 'Boiled_Egg-7'>Boiled Egg</option>")

  }

})
