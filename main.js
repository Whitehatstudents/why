status1="";
video="";
objects=[];
function preload()
{
    video=createVideo("video.mp4");
    video.hide();
}
function setup()
{
    canvas=createCanvas(487,369);
    canvas.center();
}
function draw()
{
    image(video,0,0,487,369);
    if(status1!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("symcard").innerHTML="status:objects detected";
            document.getElementById("statwabaaaa").innerHTML="number of objects detected are:"+objects.length;  
            fill("black");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("tan");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }    
    }
}
function start()
{
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("symcard").innerHTML="status detecting objects";
}
function modelLoaded()
{
    console.log("model loaded");
    video.loop();
    video.speed(1);
    video.volume(1);
    status1=true;
}
function gotResult(error,results)
{
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}