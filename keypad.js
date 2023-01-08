
const keypad_display = ["-", "-", "-", "-"]

function onPress(btn_num) {
  window.alert("onpress");
  keypad_display.pop(btn_num);
  keypad_display.shift();
  document.getElementById("display").innerHTML = keypad_display.join("");
}

function clearDisplay() {
  window.alert("clearDisplay")
  keypad_display = ["-", "-", "-", "-"]
  document.getElementById("display").innerHTML = keypad_display.join("");
}
