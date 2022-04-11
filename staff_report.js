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
$(function() {
    $( "#from_date" ).datepicker({ dateFormat: 'dd/mm/yy' });
    $( "#from_date" ).datepicker("setDate", "today");
    $( "#to_date" ).datepicker({ dateFormat: 'dd/mm/yy' });
    $( "#to_date" ).datepicker("setDate", "today");

    $( "#day_from_date" ).datepicker({ dateFormat: 'dd/mm/yy' });
    $( "#day_from_date" ).datepicker("setDate", "today");
    $( "#day_to_date" ).datepicker({ dateFormat: 'dd/mm/yy' });
    $( "#day_to_date" ).datepicker("setDate", "today");

    $( "#mo_from_date" ).datepicker({ dateFormat: 'dd/mm/yy' });
    $( "#mo_from_date" ).datepicker("setDate", "today");
    $( "#mo_to_date" ).datepicker({ dateFormat: 'dd/mm/yy' });
    $( "#mo_to_date" ).datepicker("setDate", "today");

    $( "#id_from_date" ).datepicker({ dateFormat: 'dd/mm/yy' });
    $( "#id_from_date" ).datepicker("setDate", "today");
    $( "#id_to_date" ).datepicker({ dateFormat: 'dd/mm/yy' });
    $( "#id_to_date" ).datepicker("setDate", "today");
    
});
document.addEventListener('dblclick', function(event) {
    $("#grid_day_wise_rp").load(window.location.href+" #grid_day_wise_rp >");
    $("#grid_full_rpt").load(window.location.href+" #grid_full_rpt >");
    $("#grid_mo_rpt").load(window.location.href+" #grid_mo_rpt >");
    $("#grid_id_rpt").load(window.location.href+" #grid_id_rpt >");
    alert("Double-click disabled!");
    event.preventDefault();
    event.stopPropagation();
    },true
);

var suid = localStorage.getItem("stfid");

var total_amt_ID = 0;
var id_count = 0;
function departmentIdReport(dateL, M) {

  $("#idreport").find($("tr")).slice(1).remove()

    firebase.database().ref('admin/'+ M).once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var sNo = id_count;
          var id_no = CurrentRecord.val().id;
          var name_r = CurrentRecord.val().name;
          var dept_r = CurrentRecord.val().dept;
          var categ_r = CurrentRecord.val().category;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var amount_r = CurrentRecord.val().amount;
          var date_r = CurrentRecord.val().time;
          var status_r = CurrentRecord.val().status;
          if(dateL == date_r && status_r == "Completed" && id_no == suid) {
          id_count++;
          total_amt_ID += parseInt(amount_r, 10);
          document.getElementById('name_tv').innerHTML = name_r;
          document.getElementById('dept_tv').innerHTML = dept_r;
          document.getElementById('total_amt_id').innerHTML = total_amt_ID;
          AddItemToTableMonthIdDept (sNo, id_no, name_r, categ_r, dept_r, date_r, coffee_r, tea_r, snack_r, amount_r);
          }  
        }
      );
    });
}

var subamt = 0;
function AddItemToTableMonthIdDept(sNo, id_no, name_r, categ_r, dept_r, date_r, coffee_r, tea_r, snack_r, amount_r) {

    var addTable_1 = document.getElementsByClassName("idreport")[0];

    var newrow = addTable_1.insertRow(addTable_1.rows.length);

    var s_No = newrow.insertCell(0);
    var dDate = newrow.insertCell(1);
    var aID = newrow.insertCell(2);
    var dName = newrow.insertCell(3);
    var dDept = newrow.insertCell(4);
    var dCateg = newrow.insertCell(5);
    var dTea = newrow.insertCell(6);
    var dCoffee = newrow.insertCell(7);
    var dSnack = newrow.insertCell(8);
    var dAmount = newrow.insertCell(9);
    var dSubsidy = newrow.insertCell(10)


    s_No.innerHTML = sNo;
    dName.innerHTML = name_r;
    dDept.innerHTML = dept_r;
    dCateg.innerHTML = categ_r;
    aID.innerHTML = id_no;
    dDate.innerHTML = date_r;
    dTea.innerHTML = tea_r;
    dCoffee.innerHTML = coffee_r;
    dSnack.innerHTML = snack_r;
    dAmount.innerHTML = amount_r;

    if(dept_r == "STAFF"){
      dSubsidy.innerHTML = Number.parseFloat(parseInt(amount_r) * 0.45).toFixed(2);
      subamt += parseInt(amount_r) * 0.45;
    }
    else if(dept_r == "WORKMEN"){
      dSubsidy.innerHTML = Number.parseFloat(parseInt(amount_r) * 0.55).toFixed(2);
      subamt += parseInt(amount_r) * 0.55;
    }

    document.getElementById("subamt").innerHTML = subamt;

}
function IdReport() {

    subamt = 0;

    var fromDate = document.getElementById('id_from_date').value;
    var toDate = document.getElementById('id_to_date').value;
    var getDaysBetweenDates = function(startDate, endDate) {
        var now = startDate.clone(), dates = [];
        while (now.isSameOrBefore(endDate)) {
            dates.push(now.format('DD/MM/YYYY'));
            now.add(1, 'days');
        }
        return dates;
    };
    var startDate = moment(fromDate, 'DD/MM/YYYY');
    var endDate = moment(toDate, 'DD/MM/YYYY');
    var dateList = getDaysBetweenDates(startDate, endDate);

    total_amt_ID = 0;
        id_count = 1;
        $("#grid_id_rpt").load(window.location.href+" #grid_id_rpt >");
        for(var i=0; i<dateList.length; i++) {
            const beginDate = dateList[i];
            const date = moment(beginDate, 'DD/MM/YYYY');
            const month = date.format('M');
            departmentIdReport(dateList[i], month);
        }
}

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var day = weekday[d.getDay()];
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

document.getElementById("date").innerHTML = "Date : " + date;
document.getElementById("day").innerHTML = "Day : " + day;
document.getElementById("time").innerHTML = "Time : " + time;
