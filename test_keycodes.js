$(document).ready(function(){
  newGuess();

});

document.addEventListener("keydown", move, false);
function move(event){
  event = event || window.event; // This fixes problems in Firefox. Don't touch.
  var e = event;
        var keyCode = e.keyCode;
        // console.log(keyCode);
        if (keyCode == 13){
          // console.log("enter!");
          guess();
        } else if (keyCode == 8 || keyCode == 110){
          subtract();
        }
        if (keyCode < 48 || keyCode > 105 || (keyCode > 57 && keyCode < 96) ){return 0;}
        // $('#thediv').text("You pressed: " + keyCode);
         if (keyCode == 48 || keyCode == 96){add(0)} //0
    else if (keyCode == 49 || keyCode == 97){add(1)} //1
    else if (keyCode == 50 || keyCode == 98){add(2)} //2
    else if (keyCode == 51 || keyCode == 99){add(3)} //3
    else if (keyCode == 52 || keyCode == 100){add(4)} //4
    else if (keyCode == 53 || keyCode == 101){add(5)} //5
    else if (keyCode == 54 || keyCode == 102){add(6)} //6
    else if (keyCode == 55 || keyCode == 103){add(7)} //7
    else if (keyCode == 56 || keyCode == 104){add(8)} //8
    else if (keyCode == 57 || keyCode == 105){add(9)} //9
}

function add(digit){
  var text = $('#entry').text();
  $('#entry').text(text + digit);
}
function subtract(){
  var text = $('#entry').text();
  text = text.replace(/.$/, "");
  $('#entry').text(text);
}

function guess(){
  var guess = $('#entry').text();
  if (guess){
    $('#thediv').text("Correct!");
    setTimeout(function(){newGuess()}, 500);
  }
}

function newGuess(){
  $('#entry, #thediv').text("");
  var one = Math.floor(Math.random() * 5 + 1);
  $('#factor1').text(one);
  var two = Math.floor(Math.random() * 5 + 1);
  $('#factor2').text(two);
}