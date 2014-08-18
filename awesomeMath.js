var currentLevel = 0;
var currentPlayer = "";
var playerLives = 0;
var playerStars = 0;
var lastPlayer = "";
var lastHead = "";
var highScores = "";
var showingScores = 0;

$(document).ready(function(){
  $("#mute, #scores, #levels, #question, #awesomebar, #star, #stars").hide();

  lastPlayer = readCookie("lastPlayer") || "";
  highScores = readCookie("highScores") || "";

  $(document).keydown(function(event){move(event);});
  $('#footer').mouseover(function(){showFooter()});
  $('#footer').click(function(){resetAll()});
  $('#head').click(function(){changeHead()});
  $('#name').click(function(){signIn()});
  $('#start').click(function(){$(this).remove();signIn();});
  // $('#progress').width("10%");
  initSound();
  gameLoop();
});

$(window).load(function(){
  lastHead = readCookie("lastHead") || "";
  if (lastHead == "lucy"){changeHead();}
  console.log("last head: " + lastHead);
});

function gameLoop(){
  if(showingScores){return;}
  if (!currentPlayer){
    console.log("No player");
    return;
    // return signIn();
  } else if (!currentLevel){
    console.log("No level");
    return selectLevel();
  } else if (!playerLives){
    console.log("No life");
    return endLevel();
  } else {
    console.log("Time for a question!");
    return newGuess();
  }
}

function signIn(){
  $('#start').remove();
  var name = prompt("What is your name?", lastPlayer);
  currentPlayer = name || "Nameless";
  $('#name').text(currentPlayer);
  createCookie("lastPlayer", currentPlayer, 7);
  gameLoop();
}

function selectLevel(){
  $('#levels').show();
  $('#levels div').click(function(){
    currentLevel = $(this).data("level");
    selectLevel()
  });

  if (currentLevel){
    $('#levels').hide();
    playerLives = 0;
    addLife(3);
    gameLoop();
  }
}

function endLevel(){
  $('#question').hide();
  if (playerStars){
    showingScores = 1;
    if (playerStars > 2){
      $.ionSound.play("awesome_song");
      $('#mute').show();
      setTimeout(function(){
        $('#scores').text($('#scores').text() + "\nTHAT'S AWESOME!");
      }, 1000);
    }
    $('#scores').show();
    $('#scores').text("Congratulations, you got " + playerStars + ((playerStars > 1)? " stars!": " star!"));
    setTimeout(function(){
      $('#scores').hide();
      currentLevel = 0;
      playerStars = 0;
      $('#stars').text("");
      $('#star, #stars').hide();
      showingScores = 0;
      gameLoop();
    }, 5000);
  } else {
    currentLevel = 0;
    setTimeout(function(){gameLoop();}, 500);
  }
}

function addLife(number){
  playerLives += number;
  if (playerLives <= 2){
    // setTimeout(function(){gameLoop();}, 1000);
  }
  $('#lives').text("x " + playerLives);
}

function addStar(number){
  playerStars += number;
  $('#star, #stars').show();
  $('#stars').text("x " + playerStars);
  if (playerStars > 4 && currentLevel < 7){
    endLevel();
  }
}

//////////////////////////////
// Functions for math questions
  function move(event){
    if(currentLevel <= 0 || playerLives <= 0){return;}
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
        addPoints(10);
      } else {
        $('#entry').text(factor1 * factor2).css({color:"red"});
        subtractPoints(20);
      }
      setTimeout(function(){gameLoop()}, 500);
    }
  }

  function newGuess(){
    if (!currentLevel){return;}
    var onemax = onemin = twomax = twomin = 0;
    switch (currentLevel){
      case 1:
        onemax = twomax = 5;
        onemin = twomin = 1;
        break;
      case 2:
        onemax = 5;
        onemin = 6;
        twomax = 5;
        twomin = 1;
        break;
      case 3:
        onemax = twomax = 5;
        onemin = twomin = 6;
        break;
      case 4:
        onemax = 5;
        onemin = 11;
        twomax = 5;
        twomin = 1;
        break;
      case 5:
        onemax = 5;
        onemin = 11;
        twomax = 5;
        twomin = 6;
        break;
      case 6:
        onemax = twomax = 5;
        onemin = twomin = 11;
        break;
      case 7:
        onemax = twomax = 15;
        onemin = twomin = 1;
        break;
      default: //level 1
        onemax = twomax = 5;
        onemin = twomin = 1;
    }
    $('#entry').text("").css({color:"white"});
    $('#thediv').text("");
    $('#question').show();
    var one = Math.floor(Math.random() * onemax + onemin);
    $('#factor1').text(one);
    var two = Math.floor(Math.random() * twomax + twomin);
    $('#factor2').text(two);
  }

  function addPoints(points){
    $('#awesomebar').show();
    var currentpoints = $('#progress').width() / $('#awesomebar').width() * 100;

    if (currentpoints + points < 100){
      $('#thediv').text("Correct!");
      $.ionSound.play("glass");
      $('#progress').width(currentpoints + points + "%");
    } else {
      $('#thediv').text("Awesome!");
      $.ionSound.play("bell_ring");
      $('#progress').width(currentpoints + points - 100 + "%");
      addStar(1);
    }
    console.log(currentpoints + points);
  }

  function subtractPoints(points){
    $('#awesomebar').show();
    var currentpoints = $('#progress').width() / $('#awesomebar').width() * 100;

    if (currentpoints - points < 0){
      $('#thediv').text("Oh no!");
      $.ionSound.play("metal_plate");
      $('#progress').width(0);
      addLife(-1);
    } else {
      $('#thediv').text("Oops!");
      $.ionSound.play("metal_plate_2");
      $('#progress').width(currentpoints - points + "%");
    }
    console.log(currentpoints + points);
  }
//////////////////////////////


//////////////////////////////
// Cookie helper functions
  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name,"",-1);
  }
//////////////////////////////

//////////////////////////////
// Extra helper functions

function resetAll(){
  console.log("Resetting everything.");
  console.log("Full disclosure: doesn't actually do anything.")
}

function showFooter(){
  console.log("mousing over!");
  $('#footer').animate({opacity:100}, 4000);
}

function initSound(){
  $.ionSound({
    sounds: [
    {name: "awesome_song"},
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
  $('#mute').click(function(){$.ionSound.stop()});
}

function changeHead(){
  // var head = $('#head').css({"background-image":"url(images/emmethead.png)"});
  var head = $('#head').css("background-image");
  console.log("head: " + head);
  if (head.match(/emmet/)){
    createCookie("lastHead", "lucy", 7);
    $('#head').css({"background-image":"url(images/lucyhead.png)"});
  } else {
    createCookie("lastHead", "emmet", 7);
    $('#head').css({"background-image":"url(images/emmethead.png)"});
  }
}
//////////////////////////////

