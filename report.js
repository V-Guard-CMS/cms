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

var countALL = 1;
var total_amt_All_dept = 0;
function departmentAll(dateL, M) {  

    monthsubamt = 0;

    $("#monthreport").find($("tr")).slice(1).remove()
    
    firebase.database().ref('admin/'+ M).once('value',
    function (AllRecord) {
      console.log(AllRecord);
      AllRecord.forEach(
        function (CurrentRecord) {
          var s_no  = countALL;
          var id_no = CurrentRecord.val().id;
          var name_r = CurrentRecord.val().name;
          var dept_r = CurrentRecord.val().dept;
          var categ_r = CurrentRecord.val().category;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var amount_r = CurrentRecord.val().amount;
          var date_r = CurrentRecord.val().time;
          // var locationK = CurrentRecord.val().locationK;
          var status_r = CurrentRecord.val().status;
          if(dateL == date_r && status_r == "Completed") {
            countALL++;
            total_amt_All_dept += parseInt(amount_r, 10);
            document.getElementById('total_amt').innerHTML = total_amt_All_dept;
            AddItemToTable (s_no, date_r, id_no, 
              name_r, dept_r, categ_r, tea_r, coffee_r, snack_r,
               amount_r);
          }  
        }
      );
    });
}
var monthsubamt = 0;
dcount = 0;
function AddItemToTable(s_no, date_r, 
  id_no, name_r, dept_r, categ_r, coffee_r, 
  tea_r, snack_r, amount_r) {

    var addTable_1 = document.getElementsByClassName("monthreport")[0];

    var newrow = addTable_1.insertRow(addTable_1.rows.length);

    var sNo = newrow.insertCell(0);
    var dDate = newrow.insertCell(1);
    var dId = newrow.insertCell(2);
    var dName = newrow.insertCell(3);
    var dDept = newrow.insertCell(4);
    var dCateg = newrow.insertCell(5);
    var dTea = newrow.insertCell(6);
    var dCoffee = newrow.insertCell(7);
    var dSnack = newrow.insertCell(8);
    var dAmount = newrow.insertCell(9);
    var dSubsidy = newrow.insertCell(10);
    sNo.innerHTML = s_no;
    dDate.innerHTML = date_r;
    dId.innerHTML = id_no;
    dName.innerHTML = name_r;
    dDept.innerHTML = dept_r;
    dCateg.innerHTML = categ_r;
    dTea.innerHTML = tea_r;
    dCoffee.innerHTML = coffee_r;
    dSnack.innerHTML = snack_r;
    dAmount.innerHTML = amount_r;

    if(dept_r == "STAFF"){
      dSubsidy.innerHTML = Number.parseFloat(parseInt(amount_r) * 0.45).toFixed(2);
      monthsubamt += parseInt(amount_r) * 0.45;
    }
    else if(dept_r == "WORKMEN"){
      dSubsidy.innerHTML = Number.parseFloat(parseInt(amount_r) * 0.55).toFixed(2);
      monthsubamt += parseInt(amount_r) * 0.55;
    }else{
      dSubsidy.innerHTML = "-";
    }

    document.getElementById("monthsubamt").innerHTML = monthsubamt;
}

var total_amt_dept = 0;
var count_dept = 1;
function departmentReport(dept, dateLi, sM) {

  monthsubamt = 0;

  $('#monthreport').find($("tr")).slice(1).remove();

    firebase.database().ref('admin/'+ sM).once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var s_no  = count_dept;
          var od_no = CurrentRecord.val().order_no;
          var id_no = CurrentRecord.val().id;
          var name_r = CurrentRecord.val().name;
          var dept_r = CurrentRecord.val().dept;
          var categ_r = CurrentRecord.val().category;
          var tea_r = CurrentRecord.val().coffee;
          var coffee_r = CurrentRecord.val().tea;
          var snack_r = CurrentRecord.val().snacks;
          var amount_r = CurrentRecord.val().amount;
          var date_r = CurrentRecord.val().time;
          var status_r = CurrentRecord.val().status;
          
          if(dateLi == date_r && dept == dept_r && status_r == "Completed") {
            count_dept++;
            total_amt_dept += parseInt(amount_r, 10);
            document.getElementById('total_amt').innerHTML = total_amt_dept;
          
          
            AddItemToTable (s_no, date_r, id_no, 
              name_r, dept_r, categ_r, coffee_r, tea_r, snack_r,
               amount_r);
          }  
        }
      );
    });
}

function departmentReportCate(dept, dateLi, sM) {
    firebase.database().ref('admin/'+ sM).once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var s_no  = count_dept;
          var od_no = CurrentRecord.val().order_no;
          var id_no = CurrentRecord.val().id;
          var name_r = CurrentRecord.val().name;
          var dept_r = CurrentRecord.val().category;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var amount_r = CurrentRecord.val().amount;
          var date_r = CurrentRecord.val().time;
          var locationK = CurrentRecord.val().locationK;
          var status_r = CurrentRecord.val().status;
          if(dateLi == date_r && dept == dept_r && status_r == "Completed") {
            count_dept++;
            total_amt_dept += parseInt(amount_r, 10);
            document.getElementById('total_amt').innerHTML = total_amt_dept;
            AddItemToTableCa (s_no, date_r, id_no, 
              name_r, dept_r, tea_r, coffee_r, snack_r,
               amount_r, locationK);
          }  
        }
      );
    });
}
function AddItemToTableCa(s_no, date_r, 
      id_no, name_r, dept_r, tea_r, 
      coffee_r, snack_r, amount_r) {

    var addTable_1 = document.getElementsByClassName("monthreport")[0]
    var newrow = addTable_1.insertRow(addTable_1.rows.length);

    var sNo = newrow.insertCell(0);
    var dDate = newrow.insertCell(1);
    var dId = newrow.insertCell(2);
    var dName = newrow.insertCell(3);
    var dDept = newrow.insertCell(4);
    var dTea = newrow.insertCell(5);
    var dCoffee = newrow.insertCell(6);
    var dSnack = newrow.insertCell(7);
    var dAmount = newrow.insertCell(8);
    sNo.innerHTML = s_no;
    dDate.innerHTML = date_r;
    dId.innerHTML = id_no;
    dName.innerHTML = name_r;
    dDept.innerHTML = dept_r;
    dTea.innerHTML = tea_r;
    dCoffee.innerHTML = coffee_r;
    dSnack.innerHTML = snack_r;
    dAmount.innerHTML = amount_r;

}
function getReport() {

    var dept1 = document.getElementById('dept_na').value;
    var fromDate = document.getElementById('from_date').value;
    var toDate = document.getElementById('to_date').value;
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
    if (dept1 == "ALL") {
        countALL = 1;
        total_amt_All_dept = 0;
        $("#grid_full_rpt").load(window.location.href+" #grid_full_rpt >");
        for(var i=0; i<dateList.length; i++) {
            const beginDate = dateList[i];
            const date = moment(beginDate, 'DD/MM/YYYY');
            const month = date.format('M');
            departmentAll(dateList[i], month);
        }
    }else {
        count_dept = 1;
        total_amt_dept = 0;
        $("#grid_full_rpt").load(window.location.href+" #grid_full_rpt >");
        for(var i=0; i<dateList.length; i++) {
            const beginDate = dateList[i];
            const date = moment(beginDate, 'DD/MM/YYYY');
            const month = date.format('M');
            departmentReport(dept1, dateList[i], month);
        }
    }
}
var fulReport = document.getElementById('full_rpt');
var daysReport = document.getElementById('day_wise_report');
var monthsReport = document.getElementById('month_wise_report');
var idReports = document.getElementById('Id_report');
function IdSearch() {
    daysReport.style.display = "none";
    idReports.style.display = "block";
    fulReport.style.display = "none";
    monthsReport.style.display = "none";
}
function dayWise() {
    daysReport.style.display = "block";
    idReports.style.display = "none";
    fulReport.style.display = "none";
    monthsReport.style.display = "none";
}
function monthWise() {
    daysReport.style.display = "none";
    idReports.style.display = "none";
    fulReport.style.display = "none";
    monthsReport.style.display = "block";
}
function fullReport() {
    daysReport.style.display = "none";
    idReports.style.display = "none";
    fulReport.style.display = "block";
    monthsReport.style.display = "none";
}
var total_teas = 0;
var total_coffees = 0;
var total_snackss = 0;
var total_amt_teas = 0;
var total_amt_coffees = 0;
var total_amt_snackss = 0;
var total_amounts = 0;
var breakfast_count = 0;
function dayWiseReportsAll(dateL, M) {

  $("#overallreport").find($("tr")).slice(1).remove()

  var dum  = 0;
    firebase.database().ref('admin/'+ M).once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var date_r = CurrentRecord.val().time;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var status_r = CurrentRecord.val().status;
          
          var lunch_count = 0;
          var dinner_count = 0;
          if(dateL == date_r && status_r == "Completed") {
            // total_teas += parseInt(tea_r, 10);
            // total_coffees += parseInt(coffee_r, 10);
            // total_snackss += parseInt(snack_r, 10);
            

          
            //alert(coffee_r); 
            if(coffee_r == '-'){
              coffee_r = 0;
            }
            else{
              const myArray_tea = tea_r.split("-");
              const myArray_coffee = coffee_r.split("-");
              const myArray_snack = snack_r.split("-");
              //alert(coffee_r);
              if(myArray_tea[0] == "IDLI" || myArray_coffee[0] == "IDLI" || myArray_snack[0] == "IDLI"){
                breakfast_count+=1;
                alert(myArray_coffee[1]);
                total_amt_coffees+=parseInt(myArray_coffee[1]);
                alert(total_amt_coffees);
              }
            }
            total_amt_teas += parseInt(tea_r * 5, 10);
            //total_amt_coffees += parseInt(coffee_r * 5, 10);
            alert(total_amt_coffees);
            total_amt_snackss += parseInt(snack_r * 5, 10);
            total_amounts = total_amt_teas + total_amt_coffees + total_amt_snackss;

            if(dum == 0){
            var addTable_1 = document.getElementsByClassName("overallreport")[0];

            var newrow1 = addTable_1.insertRow(1);

            var cnt = newrow1.insertCell(0);
            var b_count = newrow1.insertCell(1);
            var l_count = newrow1.insertCell(2);
            var d_count = newrow1.insertCell(3);

            var newrow2 = addTable_1.insertRow(2);

            var amt = newrow2.insertCell(0);
            var b_amount = newrow2.insertCell(1);
            var l_amount = newrow2.insertCell(2);
            var d_amount = newrow2.insertCell(3);

            cnt.innerHTML="COUNT";
            b_count.innerHTML = breakfast_count;
            l_count.innerHTML = total_coffees;
            d_count.innerHTML = total_snackss;

            amt.innerHTML = "AMOUNT";
            b_amount.innerHTML = total_amt_teas;
            l_amount.innerHTML = total_amt_coffees;
            d_amount.innerHTML = total_amt_snackss;
            dum = 1;}
          
          }  
        }
      );
    });
    
}
function dayWiseReports(dept, dateL, M) {
    firebase.database().ref('admin/'+ M).once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var date_r = CurrentRecord.val().time;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var status_r = CurrentRecord.val().status;
          var dept_r = CurrentRecord.val().dept;
          if(dateL == date_r && dept == dept_r && status_r == "Completed") {
            total_teas += parseInt(tea_r, 10);
            total_coffees += parseInt(coffee_r, 10);
            total_snackss += parseInt(snack_r, 10);
            total_amt_teas += parseInt(tea_r * 5, 10);
            total_amt_coffees += parseInt(coffee_r * 5, 10);
            total_amt_snackss += parseInt(snack_r * 5, 10);
            total_amounts = total_amt_teas + total_amt_coffees + total_amt_snackss;
            document.getElementById('total_amt_day').innerHTML = total_amounts;
            document.getElementById('tea_cnt_rp').innerHTML = total_teas;
            document.getElementById('coffee_cnt_rp').innerHTML = total_coffees;
            document.getElementById('snack_cnt_rp').innerHTML = total_snackss;
            document.getElementById('tea_amt_rp').innerHTML = total_amt_teas;
            document.getElementById('coffee_amt_rp').innerHTML = total_amt_coffees;
            document.getElementById('snack_amt_rp').innerHTML = total_amt_snackss;
          }  
        }
      );
    });
}
function dayWiseReportsCat(dept, dateL, M) {
    firebase.database().ref('admin/'+ M).once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var date_r = CurrentRecord.val().time;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var status_r = CurrentRecord.val().status;
          var dept_r = CurrentRecord.val().category;
          if(dateL == date_r && dept == dept_r && status_r == "Completed") {
            total_teas += parseInt(tea_r, 10);
            total_coffees += parseInt(coffee_r, 10);
            total_snackss += parseInt(snack_r, 10);
            total_amt_teas += parseInt(tea_r * 5, 10);
            total_amt_coffees += parseInt(coffee_r * 5, 10);
            total_amt_snackss += parseInt(snack_r * 5, 10);
            total_amounts = total_amt_teas + total_amt_coffees + total_amt_snackss;
            document.getElementById('total_amt_day').innerHTML = total_amounts;
            document.getElementById('tea_cnt_rp').innerHTML = total_teas;
            document.getElementById('coffee_cnt_rp').innerHTML = total_coffees;
            document.getElementById('snack_cnt_rp').innerHTML = total_snackss;
            document.getElementById('tea_amt_rp').innerHTML = total_amt_teas;
            document.getElementById('coffee_amt_rp').innerHTML = total_amt_coffees;
            document.getElementById('snack_amt_rp').innerHTML = total_amt_snackss;
          }  
        }
      );
    });
}

function dayReport() {
    var dept1 = document.getElementById('dept_day').value;
    var fromDate = document.getElementById('day_from_date').value;
    var toDate = document.getElementById('day_to_date').value;
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
    if (dept1 == "ALL") {
        $("#grid_day_wise_rp").load(window.location.href+" #grid_day_wise_rp >");
        total_teas = 0;
        total_coffees = 0;
        total_snackss = 0;
        total_amt_teas = 0;
        total_amt_coffees = 0;
        total_amt_snackss = 0;
        total_amounts = 0;
        for(var i=0; i<dateList.length; i++) {
            const beginDate = dateList[i];
            const date = moment(beginDate, 'DD/MM/YYYY');
            const month = date.format('M');
            dayWiseReportsAll(dateList[i], month);
        }
    }else {
        $("#grid_day_wise_rp").load(window.location.href+" #grid_day_wise_rp >");
        total_teas = 0;
        total_coffees = 0;
        total_snackss = 0;
        total_amt_teas = 0;
        total_amt_coffees = 0;
        total_amt_snackss = 0;
        total_amounts = 0;
        for(var i=0; i<dateList.length; i++) {
            const beginDate = dateList[i];
            const date = moment(beginDate, 'DD/MM/YYYY');
            const month = date.format('M');
            dayWiseReports(dept1, dateList[i], month);
        }
    }
}

var total_tea = 0;
var total_coffee = 0;
var total_snacks = 0;
var total_amt_tea = 0;
var total_amt_coffee = 0;
var total_amt_snacks = 0;
var total_amount = 0;
var total_amt_mon_All = 0;
var totalAmtMonth = 0;
function monthWiseReportsAll(dateL, M) {

var countMon = 1;

firebase.database().ref('admin/'+ M).once('value',
function (AllRecord) {
    AllRecord.forEach(
    function (CurrentRecord) {
      var sNo = countMon;
      var tea_r = CurrentRecord.val().tea;
      var coffee_r = CurrentRecord.val().coffee;
      var snack_r = CurrentRecord.val().snacks;
      var amount_r = CurrentRecord.val().amount;
      var date_r = CurrentRecord.val().time;
      var status_r = CurrentRecord.val().status;
      if(dateL == date_r && status_r == "Completed") {
        countMon++;
        total_tea += parseInt(tea_r, 10);
        total_coffee += parseInt(coffee_r, 10);
        total_snacks += parseInt(snack_r, 10);
        total_amt_tea += parseInt(tea_r * 5, 10);
        total_amt_coffee += parseInt(coffee_r * 5, 10);
        total_amt_snacks += parseInt(snack_r * 5, 10);
        total_amount = total_amt_tea + total_amt_coffee + total_amt_snacks;
        total_amt_mon_All += parseInt(amount_r, 10);
      }
    });
    totalAmtMonth += total_amt_mon_All;
    document.getElementById('total_amt_mo').innerHTML = totalAmtMonth,
    AddItemToTableMonth (dateL, total_tea, total_coffee, total_snacks, total_amt_mon_All),
    total_tea = 0,
    total_coffee = 0,
    total_snacks = 0,          
    total_amt_tea = 0,
    total_amt_coffee = 0,
    total_amt_snacks = 0,
    total_amount = 0,
    total_amt_mon_All = 0;
    } 
  );
}
function AddItemToTableMonth(date_r, tea_r, coffee_r, snack_r, amount_r) {
  var addTable_1 = document.getElementById("grid_mo_rpt");
  var Sno = document.createElement("div");
  var dDate = document.createElement("div");
  var dTea = document.createElement("div");
  var dCoffee = document.createElement("div");
  var dSnack = document.createElement("div");
  var dAmount = document.createElement("div");
  dDate.innerHTML = date_r;
  dTea.innerHTML = tea_r;
  dCoffee.innerHTML = coffee_r;
  dSnack.innerHTML = snack_r;
  dAmount.innerHTML = amount_r;
  addTable_1.appendChild(dDate);
  addTable_1.appendChild(dTea);
  addTable_1.appendChild(dCoffee);
  addTable_1.appendChild(dSnack);
  addTable_1.appendChild(dAmount);
}
var total_amt_mon_Dept = 0;
var countMonDept = 0;
var totalAmtMonthDept = 0;
function monthWiseReportsDept(dept, dateL, M) {
    firebase.database().ref('admin/'+ M).once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var sNo = countMonDept;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var amount_r = CurrentRecord.val().amount;
          var date_r = CurrentRecord.val().time;
          var status_r = CurrentRecord.val().status;
          var dept_r = CurrentRecord.val().dept;
          if(dateL == date_r && dept_r == dept && status_r == "Completed") {
            countMonDept++;
            total_tea += parseInt(tea_r, 10);
            total_coffee += parseInt(coffee_r, 10);
            total_snacks += parseInt(snack_r, 10);
            total_amt_tea += parseInt(tea_r * 5, 10);
            total_amt_coffee += parseInt(coffee_r * 5, 10);
            total_amt_snacks += parseInt(snack_r * 5, 10);
            total_amount = total_amt_tea + total_amt_coffee + total_amt_snacks;
            total_amt_mon_All += parseInt(amount_r, 10);
      }
    });
    totalAmtMonthDept += total_amt_mon_All;
    document.getElementById('total_amt_mo').innerHTML = totalAmtMonthDept,
    AddItemToTableMonth (dateL, total_tea, total_coffee, total_snacks, total_amt_mon_All),
    total_tea = 0,
    total_coffee = 0,
    total_snacks = 0,          
    total_amt_tea = 0,
    total_amt_coffee = 0,
    total_amt_snacks = 0,
    total_amount = 0,
    total_amt_mon_All = 0;
    } 
  );
}
function AddItemToTableMonthDept( date_r, tea_r, coffee_r, snack_r, amount_r) {
  var addTable_1 = document.getElementById("grid_mo_rpt");
  var dDate = document.createElement("div");
  var dTea = document.createElement("div");
  var dCoffee = document.createElement("div");
  var dSnack = document.createElement("div");
  var dAmount = document.createElement("div");
  dDate.innerHTML = date_r;
  dTea.innerHTML = tea_r;
  dCoffee.innerHTML = coffee_r;
  dSnack.innerHTML = snack_r;
  dAmount.innerHTML = amount_r;
  addTable_1.appendChild(dDate);
  addTable_1.appendChild(dTea);
  addTable_1.appendChild(dCoffee);
  addTable_1.appendChild(dSnack);
  addTable_1.appendChild(dAmount);
}
function monthWiseReportsDeptCat(dept, dateL, M) {
    firebase.database().ref('admin/'+ M).once('value',
    function (AllRecord) {
      AllRecord.forEach(
        function (CurrentRecord) {
          var sNo = countMonDept;
          var tea_r = CurrentRecord.val().tea;
          var coffee_r = CurrentRecord.val().coffee;
          var snack_r = CurrentRecord.val().snacks;
          var amount_r = CurrentRecord.val().amount;
          var date_r = CurrentRecord.val().time;
          var status_r = CurrentRecord.val().status;
          var dept_r = CurrentRecord.val().category;
          if(dateL == date_r && dept_r == dept && status_r == "Completed") {
            countMonDept++;
            total_amt_mon_Dept += parseInt(amount_r, 10);
            document.getElementById('total_amt_mo').innerHTML = total_amt_mon_Dept;
            AddItemToTableMonthDeptCat(sNo, date_r, tea_r, coffee_r, snack_r, amount_r);
          }  
        }
      );
    });
}
function AddItemToTableMonthDeptCat(sNo, date_r, coffee_r, tea_r, snack_r, amount_r) {
  var addTable_1 = document.getElementById("grid_mo_rpt");
  var Sno = document.createElement("div");
  var dDate = document.createElement("div");
  var dTea = document.createElement("div");
  var dCoffee = document.createElement("div");
  var dSnack = document.createElement("div");
  var dAmount = document.createElement("div");
  Sno.innerHTML = sNo;
  dDate.innerHTML = date_r;
  dTea.innerHTML = tea_r;
  dCoffee.innerHTML = coffee_r;
  dSnack.innerHTML = snack_r;
  dAmount.innerHTML = amount_r;
  addTable_1.appendChild(Sno);
  addTable_1.appendChild(dDate);
  addTable_1.appendChild(dTea);
  addTable_1.appendChild(dCoffee);
  addTable_1.appendChild(dSnack);
  addTable_1.appendChild(dAmount);
}
function monthReport() {  
    var dept1 = document.getElementById('mo_dept_na').value;
    var fromDate = document.getElementById('mo_from_date').value;
    var toDate = document.getElementById('mo_to_date').value;
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
    if (dept1 == "ALL") {
        $("#grid_mo_rpt").load(window.location.href+" #grid_mo_rpt >");
        totalAmtMonth = 0;
        for(var i=0; i<dateList.length; i++) {
            const beginDate = dateList[i];
            const date = moment(beginDate, 'DD/MM/YYYY');
            const month = date.format('M');
            monthWiseReportsAll(dateList[i], month);
        }
    }else {
        total_amt_mon_Dept = 0;
        countMonDept = 1;
        totalAmtMonthDept = 0;
        $("#grid_mo_rpt").load(window.location.href+" #grid_mo_rpt >");
        for(var i=0; i<dateList.length; i++) {
            const beginDate = dateList[i];
            const date = moment(beginDate, 'DD/MM/YYYY');
            const month = date.format('M');
            monthWiseReportsDept(dept1, dateList[i], month);
        }
    }    
}
var total_amt_ID = 0;
var id_count = 0;
function departmentIdReport(Id, dateL, M) {

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
          if(dateL == date_r && Id == id_no  && status_r == "Completed") {
            id_count++;
            total_amt_ID += parseInt(amount_r, 10);
            document.getElementById('name_tv').innerHTML = name_r;
            document.getElementById('dept_tv').innerHTML = dept_r;
            document.getElementById('categ_tv').innerHTML = categ_r;
            document.getElementById('total_amt_id').innerHTML = total_amt_ID;
            AddItemToTableMonthIdDept (sNo, date_r, id_no, name_r, coffee_r, tea_r, snack_r, amount_r, dept_r, categ_r);
          }  
        }
      );
    });
}

var subamt = 0;

function AddItemToTableMonthIdDept(sNo, date_r, id_no, name_r, tea_r, coffee_r, snack_r, amount_r, dept_r, categ_r) {

    var addTable_1 = document.getElementsByClassName("idreport")[0];

    var newrow = addTable_1.insertRow(addTable_1.rows.length);

    var s_No = newrow.insertCell(0);
    var dDate = newrow.insertCell(1);
    var dID = newrow.insertCell(2)
    var dName = newrow.insertCell(3)
    var dDept = newrow.insertCell(4);
    var dCateg = newrow.insertCell(5);
    var dTea = newrow.insertCell(6);
    var dCoffee = newrow.insertCell(7);
    var dSnack = newrow.insertCell(8);
    var dAmount = newrow.insertCell(9);
    var dSubsidy = newrow.insertCell(10);

    s_No.innerHTML = sNo;
    dDate.innerHTML = date_r;
    dID.innerHTML = id_no;
    dName.innerHTML = name_r;
    dDept.innerHTML = dept_r;
    dCateg.innerHTML = categ_r;
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
    }else{
      dSubsidy.innerHTML = "-";
    }

    document.getElementById("subamt").innerHTML = subamt;
}

var cnt = 0;

function IdReport() {
    subamt = 0;
    var empId = document.getElementById('search_by_id').value;
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
    if(empId != "") {
        total_amt_ID = 0;
        id_count = 1;
        $("#grid_id_rpt").load(window.location.href+" #grid_id_rpt >");

        for(var i=0; i<dateList.length; i++) {
            const beginDate = dateList[i];
            const date = moment(beginDate, 'DD/MM/YYYY');
            const month = date.format('M');
            departmentIdReport(empId, dateList[i], month);
            
        }
    }else {
        alert('Please enter ID')
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
