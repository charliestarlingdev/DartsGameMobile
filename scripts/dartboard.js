document.addEventListener('DOMContentLoaded', function() {

    const gameButton = document.getElementById('submit_players');
    const nextBtn = document.getElementById('next_player_btn');
    nextBtn.classList.add('hide');

    


        gameButton.addEventListener('click', function() {
            const numPlayers = document.getElementById('num_of_players').value;
            var current_player = 1;
            
            if (numPlayers < 1 || numPlayers > 6) {
                alert("Please select a valid number of players between 1 and 6.");
                return;
            }

            console.log("Player "+current_player+"'s turn...");


            nextBtn.addEventListener('click', (event) => {
              if (current_player == (numPlayers)){
                current_player = 1;
              } else if(current_player > numPlayers){
                current_player=1;
              } else {
                current_player +=1;
              }
              console.log("Player "+current_player+"'s turn...");
            });

            

            var graphValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

            var c = document.getElementById("myCanvas");
            c.classList.remove('hide');
            var ctx = c.getContext("2d");


        
            var result_to_dart = {
              17:18,
              5:3,
              3:2,
              13:12,
              10:11,
              12:9,
              14:5,
              15:20,
              8:16,
              18:4,
              7:7,
              20:6,
              19:13,
              16:1,
              9:8,
              2:15,
              1:10,
              4:17,
              6:19, 
              11:14
            }

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
        
              ctx.beginPath();
        
              ctx.arc(center_x, center_y, smaller_radius, (Math.PI*2/360)*nextAngle, (Math.PI*2/360)*angle, true);
              ctx.arc(center_x, center_y, outer_radius, (Math.PI*2/360)*angle, (Math.PI*2/360)*nextAngle, false);
            
              ctx.closePath();
        
              var colour = "";
              if (count %2 == 0 ) {
                colour = colour_one; // 5A5A5A
              } else{
                colour = colour_two; // F0EAD6
              }
        
              ctx.fillStyle = '#' + colour;
              ctx.fill();
              ctx.strokeStyle = 'black'; // Set outline color to black
              ctx.lineWidth = 1; // Set the width of the outline
              ctx.stroke();
              count +=1;
            }
        
            function highlightSection(low_angle, high_angle, section_colour, outer_radius, smaller_radius){
          
                ctx.beginPath();

          
                ctx.arc(center_x, center_y, smaller_radius, (Math.PI*2/360)*high_angle, (Math.PI*2/360)*low_angle, true);
                ctx.arc(center_x, center_y, outer_radius, (Math.PI*2/360)*low_angle, (Math.PI*2/360)*high_angle, false);
              
                ctx.closePath();
          
                ctx.fillStyle = '#' + section_colour;
                ctx.fill();
                ctx.strokeStyle = 'black'; // Set outline color to black
                ctx.lineWidth = 1; // Set the width of the outline
                ctx.stroke();
            }

            function drawPlayerArc(pen, r, section_colour, section){
          
              pen.beginPath();
              var center_x = r.width/2;
              var center_y = r.height;

        
              pen.arc(center_x, center_y, 0,(Math.PI*2/360)*284, (Math.PI*2/360)*257, true);
              pen.arc(center_x, center_y, r.height-3, (Math.PI*2/360)*257, (Math.PI*2/360)*284, false);
              
              pen.closePath();
              
              pen.fillStyle = '#' + section_colour;
              pen.fill();
              pen.strokeStyle = 'black'; // Set outline color to black
              pen.lineWidth = 2; // Set the width of the outline
              pen.stroke();

              pen.fillStyle = "black";
              pen.font = "20px Verdana";
              var textString = section,
                textWidth = ctx.measureText(textString ).width;
              pen.fillText(section, center_x-textWidth, 30);
          }
            

        
            // Inner black / white
            graphValues.forEach(function(val){
              drawCurvedSection(step360, "848884", "F0EAD6", radius, inner_radius);
              step360 += horiStep360;
            });
        
            // Inner colours
            graphValues.forEach(function(val){
              drawCurvedSection(step360, "AC2F31", "50C878", radius, 85);
              step360 += horiStep360;
            });
        
            // Outer black / white
            graphValues.forEach(function(val){
              drawCurvedSection(step360, "848884", "F0EAD6", radius, 95);
              step360 += horiStep360;
            });
        
            // Outer colours
            graphValues.forEach(function(val){
              drawCurvedSection(step360, "AC2F31", "50C878", radius, 170);
              step360 += horiStep360;
            });
        
        
            function myRandomInts(quantity, max){
                const set = new Set()
                while(set.size < quantity) {
                  set.add(Math.floor(Math.random() * max) + 1)
                }
                return set
              }
        
            drawDoubleCircle();
            drawTripleCircle();
        
        
            const sectionP = document.getElementById('sections');
            const playerSegment = document.getElementById('player_segment');
            var sectionColours = ['9D00FF','0606F7','ff0000','00ff00','FFA500','FFFF00'];
            
            // Need to ask how many players,
            // then ask for player names like player[0]='' player[1]=''...,
            // give each player a random section,
            // display an arc for each section and keep track of current player. 
            // Keep track if player is killer (bool), then act accordingly.

            var sections = myRandomInts(numPlayers, 20);
            var dart_sections=[];
            let canvasHtml = '';
            var count = 0;

            const scores_dict = []

            sections.forEach(function(value){
                low_section_angle = (360/20 * value) -9;
                high_section_angle = (360/20 * value) +9;
                var section = result_to_dart[value];
                dart_sections.push(section);
                var current_colour = sectionColours[0] + "75";
                sectionColours.shift();                
                highlightSection(low_section_angle, high_section_angle, current_colour, radius, inner_radius);
                canvasHtml += `
                <canvas id="myCanvas${count}" width="100" height="200" style="background-color:#DED7BE;">
                Your browser does not support the HTML5 canvas tag.</canvas>
                `;
                scores_dict[count]=0;
                count = count + 1 ;
                // 261, 279, colour, 180, 0 for 20
            })
            sectionP.innerHTML = "Sections: " + Array.from(dart_sections).join(' | ');
            playerSegment.innerHTML = canvasHtml;
            var second_count = 0;
            sectionColours = ['c074dc','7b77d8','ed7467','78e967','edc067','ede967'];
            sections.forEach(function(value){
              var r = document.getElementById(`myCanvas${second_count}`);
              var rtx = r.getContext("2d");
              var current_color = sectionColours[second_count] ;
              drawPlayerArc(rtx, r, current_color, dart_sections[second_count]);

              second_count = second_count +1;
            })

            nextBtn.classList.remove('hide');
            
            var parentDiv = [];
            $("#player_segment > canvas").each((index, elem) => {
            parentDiv.push(elem.id);
            });
            

            let textIndex = 0;  // Initialize the index to 0
            let rectX = 5, rectY = 5, rectWidth = 5, rectHeight = 5; 

            let scores = {"myCanvas0":0,
              "myCanvas1":0,
              "myCanvas2":0,
              "myCanvas3":0,
              "myCanvas4":0,
              "myCanvas5":0,};
            const textArray = ["","I","II","Kill"];

            parentDiv.forEach(function(value){
              
              const newCanvas = document.getElementById(value);
              newCanvas.addEventListener('click', (event) => {

                console.log("scores value:" + scores[value]);
                if(scores[value]=== 3){
                  scores[value]=0;
                } else{
                  scores[value] += 1;
                }
                
                console.log(scores[value]);

                var temp = event.target;  // Using event.target directly
                var pen = temp.getContext('2d');
                
                pen.fillStyle = "black"; // Text color
                pen.font = "20px Verdana"; // Font style and size

                // List of texts to cycle through
                
                
                // Get the text to display based on the current index
                var textString = textArray[scores[value]];
                
                // Measure the width and height of the text
                var textWidth = pen.measureText(textString).width;
               
                var textHeight = 20;  // Fixed text height (matches font size)

                // Calculate the position and size of the rectangle based on text size
                rectWidth = 40;  // Adding some padding around the text
                rectHeight = textHeight + 10;  // Adding padding around the text
                rectX = (temp.width / 2) - (rectWidth / 2);  // Center the rectangle horizontally
                rectY = 30 - rectHeight / 2;  // Adjust vertical position for rectangle and text

                // Draw the rectangle (with a background color)
                pen.fillStyle = "#"+sectionColours[value[8]];  // Light background color for the rectangle
                pen.fillRect(rectX, rectY+50, rectWidth, rectHeight);  // Draw the rectangle

                // Draw the text inside the rectangle (centered)
                pen.fillStyle = "black";  // Text color
                pen.fillText(textString, ((rectWidth/2)-(textWidth/2)+30), 90);  // Draw text centered within the rectangle

                // Update the index for the next click (cycle through the array)
                textIndex = (textIndex + 1) % textArray.length;  // This makes it loop back to 0 when reaching the end
              });
            });

        });
    });
