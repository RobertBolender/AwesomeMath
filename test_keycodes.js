document.addEventListener("keydown", move, false);
function move(event){
  event = event || window.event; // This fixes problems in Firefox. Don't touch.
  var e = event;
        var keyCode = e.keyCode;
        if (keyCode == 13){
          console.log("enter!");
        }
        if (keyCode < 48 || keyCode > 105 || (keyCode > 57 && keyCode < 96) ){return 0;}
        $('div').text("You pressed: " + keyCode);
        // console.log(keyCode);
        // if (keyCode == 37){left()}
        //   else if (keyCode == 38){up()}
        //     else if (keyCode == 39){right()}
        //       else if (keyCode == 40){down()}
}