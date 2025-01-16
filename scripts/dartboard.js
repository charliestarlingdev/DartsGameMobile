var graphValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    
var c = document.getElementById("myCanvas2");
var ctx = c.getContext("2d");


// setup circle
// now onto drawing lines & stuff on a circle
var inner_radius = 15;
var bull_radius = 7;
var radius = 180;
var point_size = 4;
var center_x = c.width/2;
var center_y = c.height/2;
var font_size = "20px";
var count = 1;

// draw the circle
function drawCircle(){
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}
//drawCircle();

// draw the inner circle
function drawInnerCircle(){
    ctx.beginPath();
    ctx.arc(center_x, center_y, inner_radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = '#' + "50C878";
    ctx.fill();
}

function drawBullCircle(){
    ctx.beginPath();
    ctx.arc(center_x, center_y, bull_radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = '#' + "AC2F31";
    ctx.fill();
}

function drawDoubleCircle(){
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius-10, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawTripleCircle(){
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius-95, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius-85, 0, 2 * Math.PI);
    ctx.stroke();
}

drawCircle();
drawInnerCircle();
drawBullCircle();



var horiStep360 = 360/graphValues.length; 

var step360 = -9;

function drawCurvedSection(angle, colour_one, colour_two, outer_radius, smaller_radius){
  var nextAngle = angle + horiStep360;
  console.log('current angle: ' + angle + '° & next angle: ' + nextAngle + '°');

  ctx.beginPath();

  ctx.arc(center_x, center_y, smaller_radius, (Math.PI*2/360)*nextAngle, (Math.PI*2/360)*angle, true);
  ctx.arc(center_x, center_y, outer_radius, (Math.PI*2/360)*angle, (Math.PI*2/360)*nextAngle, false);
  
  ctx.closePath();

  var colour = "";
  if (count %2 == 0 ) {
    console.log("even");
    colour = colour_one; // 5A5A5A
  } else{
    console.log('odd');
    colour = colour_two; // F0EAD6
  }

  ctx.fillStyle = '#' + colour;
  console.log(ctx.fillStyle);
  ctx.fill();
  count +=1;
}



// Inner black / white
graphValues.forEach(function(val){
  drawCurvedSection(step360, "36454F", "F0EAD6", radius, inner_radius);
  step360 += horiStep360;
});

// Inner colours
graphValues.forEach(function(val){
  drawCurvedSection(step360, "AC2F31", "50C878", radius, 85);
  step360 += horiStep360;
});

// Outer black / white
graphValues.forEach(function(val){
  drawCurvedSection(step360, "36454F", "F0EAD6", radius, 95);
  step360 += horiStep360;
});

// Outer colours
graphValues.forEach(function(val){
  drawCurvedSection(step360, "AC2F31", "50C878", radius, 170);
  step360 += horiStep360;
});

function debugDrawCurvedSection(){
  drawCurvedSection(step360);
  step360 += horiStep360;
}



drawDoubleCircle();
drawTripleCircle();