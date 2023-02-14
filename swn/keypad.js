var digits = ["-","-","-","-"]

function updateDigits() {
  document.getElementById("dig1").innerHTML = digits[0];
  document.getElementById("dig2").innerHTML = digits[1];
  document.getElementById("dig3").innerHTML = digits[2];
  document.getElementById("dig4").innerHTML = digits[3];
}

updateDigits();

function checkCode(arr) {
  if (arr[0] == "-") {
    return;
  }
  if (arr == [5,5,5,5].toString()) {
    success();
  } else {
    failure();
  }
}

function success() {
  var elements = document.getElementsByClassName("codeDisplay");
  for (i = 0; i < elements.length; i++) {
    elements[i].style.color = "black";
    elements[i].style.backgroundColor = "lime";
  }
}
function failure() {
  var elements = document.getElementsByClassName("codeDisplay");
  for (i = 0; i < elements.length; i++) {
    elements[i].style.color = "black";
    elements[i].style.backgroundColor = "red";
  }
  setTimeout(function(){
    clearDisplay();
    for (i = 0; i < elements.length; i++) {
      elements[i].style.color = "red";
      elements[i].style.backgroundColor = "black";
    }
  }, 2000);
}

function clearDisplay() {
  digits = ["-","-","-","-"];
  updateDigits();
}

function deleteItem() {
  digits.unshift("-");
  digits.pop();
  updateDigits();
}

function onPress(num) {
  digits.push(num);
  digits.shift();
  updateDigits();
  checkCode(digits);
}