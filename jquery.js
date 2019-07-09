var playing = false;
var score;
var trialsleft, i, step,action;
var fruitsName = ["apple","banana","cherries","grapes","mango","orange","peach","pear","pineapple","watermelon"];
$(function(){
    //click on start reset button
    $("#startreset").click(function(){
        
        //we are playing
        if(playing == true){
            
            //reload page
            location.reload();
        }
        else{
            //we are not playing
            playing = true; //game initiated
            
            //set score to 0
            score = 0;
            $("#scorevalue").html(score);
            
            //show trials left
            $("#trialsleft").show();
            trialsleft = 3;
            addHearts();
            
            //hide gameover box
            $("#gameover").hide();
            
            //change button text to reset game
            $("#startreset").html("Reset Game");
            
            //start sending fruits
            startAction();
        }
    });
    
$("#fruit1").click(function(){ //changed mouseover for mobile device
    
    //change the cursor design
    $("#fruit1").css("cursor","crosshair");
    
    score++;
    $("#scorevalue").html(score);//update score
    
    //play sound
    document.getElementById("slicesound").play();
    
    //stop the fruit
    clearInterval(action);
    
    //hide and explode the fruit
    $(this).hide("explode",480); //***This is an important line. Udemy er video te ekhane r setTimeout e same time diyechilo jar karone kaaj kortona code***
    
    //send new fruit
    setTimeout(startAction,500);
});


//functions
function addHearts(){
    $("#trialsleft").empty();
    for(i = 0; i < trialsleft; i++){
        //give the image a class for styling
        $("#trialsleft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending fruits
function startAction(){
    $("#fruit1").show();
    
    //choose a random fruit
    chooseFruit();
    
    //choose a random position for the fruit
    $("#fruit1").css({'left':Math.round(Math.random()*600),'top': -50});
    
    //generate a random step
    step = 1 + Math.round(5*Math.random());
    
    //Move fruit down by one step every 10 ms
    action = setInterval(function(){
        $("#fruit1").css('top',$("#fruit1").position().top + step);
        
        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitcontainer").height()){
            if(trialsleft > 1){
                
                $("#fruit1").show();
                
                //choose a random fruit
                chooseFruit();
                
                //choose a random position for the fruit
                $("#fruit1").css({'left' : Math.round(Math.random()*600),'top' : -50});
                
                //generate a random step
                step = 1 + Math.round(5*Math.random());
                
                //reduce trials by one
                trialsleft--;
                
                //populate trialsleft box
                addHearts();
            }
            else{//game over
                
                playing = false; // we are not playing anymore
                $("#gameover").show();
                $("#gameover").html('<p>Game Over!</p><p>Your score is '+score+'</p>');
                
                //change button to start game
                $("#startreset").html("Start Game");
                
                //game over. So, hide the trialsleft box
                $("#trialsleft").hide();
                stopAction();
            }
        }
    },10);
}


//generate random fruit
function chooseFruit(){
    $("#fruit1").attr('src','images/'+fruitsName[Math.round(Math.random()*9)]+'.png');
}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});








//click on start reset button
    //are we playing?
        //yes
            //reload page
        //no
            //show trials left
            //change button text to reset game
            //1. Create a random fruit
            //define a random step
            //2. move fruit down one step every 30 ms
                //is fruit too low?
                    //no->repeat nb2
                    //yes->any trials left?
                        //yes: repeat nb1
                        //no: show game over, button text: start game

//slice a fruit
    //play sound
    //explode fruit
