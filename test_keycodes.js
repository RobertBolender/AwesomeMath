$(document).ready(function(){
  newGuess();
  $.ionSound({
    sounds: [
    {name: "cd_tray"},
    {name: "bell_ring"},
    {name: "glass"},
    {name: "metal_plate"},
    {name: "metal_plate_2"}
    ],
    volume: 1,
    path: "sounds/",
    preload: true
  });
  $.ionSound.play("cd_tray");
  // createCookie("score", 0, -1);
  var score = readCookie("score");
  if (score){
    $('#thediv').text("Previous score: " + score);
  }

  $('#footer').mouseover(function(){showFooter()});
  $('#footer').click(function(){resetAll()});

  // $('#progress').width("10%");
});

function resetAll(){
  console.log("Resetting everything.");
  createCookie("visits", 0, -1);
  createCookie("score", 0, -1);
}

function showFooter(){
  // $('#footer').animate("opacity", "100");
  console.log("mousing over!");
  $('#footer').animate({opacity: 100}, 4000);
}

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
  if (0+text > 99){
    return;
  }
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
    var factor1 = $('#factor1').text();
    var factor2 = $('#factor2').text();
    if (guess == factor1 * factor2){
      var score = readCookie("score") || 0;
      createCookie("score", +score + 1, 30);
      addPoints(10);
    } else {
      subtractPoints(20);
    }
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

function addPoints(points){
  $('#awesomebar').css({opacity:100});
  var currentpoints = $('#progress').width() / $('#awesomebar').width() * 100;

  if (currentpoints + points < 100){
    $('#thediv').text("Correct!");
    $.ionSound.play("glass");
    $('#progress').width(currentpoints + points + "%");
  } else {
    $('#thediv').text("Awesome!");
    $.ionSound.play("bell_ring");
    $('#progress').width(currentpoints + points - 100 + "%");
  }
  console.log(currentpoints + points);
}

function subtractPoints(points){
  $('#awesomebar').css({opacity:100});
  var currentpoints = $('#progress').width() / $('#awesomebar').width() * 100;

  if (currentpoints - points < 0){
    $('#thediv').text("Oh no!");
    $.ionSound.play("metal_plate");
    $('#progress').width(0);
  } else {
    $('#thediv').text("Oops!");
    $.ionSound.play("metal_plate_2");
    $('#progress').width(currentpoints - points + "%");
  }
  console.log(currentpoints + points);
}
