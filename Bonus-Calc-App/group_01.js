// GIVEN INDIVIDUAL ARRAY DATA
var atticus = ["Atticus", "2405", "47000", 3];
var jem = ["Jem", "62347", "63500", 4];
var boo = ["Boo", "11435", "54000", 3];
var scout = ["Scout", "6243", "74750", 5];
var robert = ["Robert", "26835", "66000", 1];
var mayella = ["Mayella", "89068", "35000", 2];
// GIVEN CONSOLIDATED ARRAY DATA
var employees = [atticus, jem, boo, scout, robert, mayella];

// run master() function with employees[] array
// when the document is ready
$(document).ready(master(employees));

// master() function
// inputs: multi-dimensional array of employee data
// console.logs converted arrays of individual employee data
// displays employee data on the DOM
function master(employees) {
  var totalEmployees = employees.length;
  // create table if we have at least one employee
  if (totalEmployees) {
    $('body').append('<table>' +
                       '<tr>' +
                         '<th>Employee Name</th>' +
                         '<th>Bonus Percentage</th>' +
                         '<th>Adjusted Annual Compensation</th>' +
                         '<th>Total Bonus</th>' +
                       '</tr>');
    for (var i = 0; i < employees.length; i++){
      // convert employee array
      var employeeArray = employeeOutput(employees[i]);
      // log converted array
      console.log(employeeArray);
      // pull-out/calc numbers for display
      var name = employeeArray[0];
      var bonusPercent = employeeArray[1] * 100;
      var annualComp = employeeArray[2].toFixed(2);
      var bonus = employeeArray[3];
      // display employee data on the DOM as a new table row
      $('table').append('<tr>' +
                         '<td>' + name + '</td>' +
                         '<td>' + bonusPercent + '%</td>' +
                         '<td>$ ' + annualComp + '</td>' +
                         '<td>$ ' + bonus + '</td>' +
                       '</tr>');
    } // end of array-loop
    $('table').append('</table>'); // close table
    $('table').attr('border', '1'); // add table border
  } // end of if(totalEmployees)
} // end of master() function

// function to convert an array of employee data
// inputs: employee data array [employee name (string),
//                              employee number (string),
//                              annual salary (string),
//                              review rating (integer)]
// output: new array [employee name (string),
//                    bonus percent (decimal number),
//                    adjusted annual compensation (decimal number),
//                    bonus (integer)]
function employeeOutput(employee) {
  var result = []; // array to be filled/returned
  var basePay = parseInt(employee[2]); // convert annual salary from string to integer
  var bonusPercent = bonusCalc(employee[1], employee[2], employee[3]); // calc employee bonus percentage
  var bonus = basePay * bonusPercent; // calc employee bonus dollar amount
  // store data to our result array
  result [0] = employee[0]; // employee name (string)
  result [1] = bonusPercent; // bonus percentage (decimal number)
  result [2] = basePay + bonus; // adjusted annual compensation (decimal number)
  result [3] = Math.round(bonus); // bonus dollar amount (integer)
  // return result array
  return result;
} // end of employeeOutput() function

// function to calcualte an employee bonus
// inputs: employee number (string), annual salary (string), rating (number)
// output: bonus percentage (decimal number)
function bonusCalc (employeeNum, salary, rating){
  // start with bonusPercent = 0
  var bonusPercent = 0;
  var maxBonus = 0.13; // maximum bonus = 13%
  var minBonus = 0; // minimum bonus = 0%

  // increase bonus based on employee rating -- no default case needed
  switch (rating) {
    case 3: // rating = 3
      bonusPercent += 0.04; // bonus of 4%
      break;
    case 4: // rating = 4
      bonusPercent += 0.06; // bonus of 6%
      break;
    case 5: // rating = 5
      bonusPercent += 0.10; // bonus of 10%
      break;
    }
  // additional bonus for employees with 15+ years of service
  // 4 digit employeeNum denotes these employees
  if (employeeNum.length === 4) {
    bonusPercent += 0.05; // additional bonus of 5%
  }
  // reduction in bonus for employees with salary > 65000
  if (parseInt(salary) > 65000) {
    bonusPercent = 0.01; // reduce bonus by 1%
  }
  // confirm bonusPercent is within minBonus-maxBonus range
  // if not, set bonusPercent = min/max
  if (bonusPercent > maxBonus) {
    bonusPercent = maxBonus;
  } else if (bonusPercent < 0) {
    bonusPercent = 0;
  }
  // return bonus percentage
  return bonusPercent;
} // end of bonusCalc() function

/* TEST CASES for bonusCalc()
console.log(bonusCalc('1234', '30000', 2));
console.log(bonusCalc('3454', '7000', 3));
console.log(bonusCalc('56789', '70000', 5));
console.log(bonusCalc('78956', '65000', 3));



console.log(employeeOutput(['Cooper', '1234', '30000', 2]));
console.log(employeeOutput(['Heraldo', '56789', '70000', 5]));
console.log(employeeOutput(['Blue', '3454', '7000', 3 ]));
console.log(employeeOutput(['Montel', '87654', '65000', 3]));
*/
