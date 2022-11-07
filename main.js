music1="Audio.m4a";
music2="music.mp3";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
song="";


function preload(){
    song=loadSound("Audio.m4a");
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500)

    fill("#FF0000");
    stroke("FF0000");

    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
    }

    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20);
    }

    if(song_variable.isPlaying()){
        console.log("song1");
    } else{
        console.log("song2")
    }
    
}

function gotPoses(results){
    if (results.length>0){
        console.log(results)
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    } else{
        console.error(error);
        console.log("Results less than 0!")
    }
}