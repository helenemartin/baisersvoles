var firstNames = ['Antoine', 'Christine', 'Fabienne'];
var secondNames = ['Doisnel', 'Darbon', 'Tabard']; 

   
function rand_index(len) {
    return Math.floor(Math.random() * len);
}

function update(panel) {
    "use strict"; 
    var dotcomdiv = document.getElementById('dotcom' + panel);
    var firstName = firstNames[rand_index(firstNames.length)];
    var secondName = secondNames[rand_index(secondNames.length)];
    return getImage(firstName + ' ' + secondName, panel);
}

function getImage(query,panel) {
    var dotcomdiv = document.getElementById('dotcom' + panel);
    var text = document.getElementById('txtBox' + panel);
    text.innerHTML = query;
    var video = $('#dotcom'+panel).find('video');
    video.find('source').remove();
    var source = document.createElement('source');
    
    if(query == 'Antoine Doisnel') {
        source.setAttribute('src', 'video/adoisnel.mp4');
        video.append(source);
        return video.get(0);
    } else if (query == 'Christine Darbon') {
        source.setAttribute('src', 'video/cdarbon.mp4');
        video.append(source);
        return video.get(0);
    } else if (query == 'Fabienne Tabard') {
        source.setAttribute('src', 'video/ftabard.mp4');
        video.append(source);
        return video.get(0);
    }
}

function watchVideo(video) {
    if (video) {
        numberOfPlayingVideos++;
        video.onended = function(){
            
            video.pause();
            video.removeAttribute('src'); // empty source
            $(video).find('source', video).remove();
            video.load();

            numberOfPlayingVideos--;
            if (numberOfPlayingVideos == 0) {
                 init();
            }
        };
        video.play();  
    }
}

var video1, video2, video3, numberOfPlayingVideos;

function init() {
    document.cookie = "hasclickedonce=true";
    $('.start').remove();
    video1=update(1);
    video2=update(2);
    video3=update(3);

    numberOfPlayingVideos=0;

    var videoSource1 = $(video1).find('source').attr('src');
    var videoSource2 = $(video2).find('source').attr('src');
    var videoSource3 = $(video3).find('source').attr('src');
    console.log(videoSource1,videoSource2, videoSource3);

    fullScreenClip(videoSource1);
    watchVideo(video2);
    watchVideo(video3);

    if (videoSource1) {
        fullScreenClip(videoSource1);
    }else if (videoSource2){
        fullScreenClip(videoSource2);

    }else if (videoSource3){
        fullScreenClip(videoSource3);

    }

    if (numberOfPlayingVideos==0){
        setTimeout(function(){ 
            init();
        },1000);
    }    
}
;
var cookies = document.cookie.split(';');
var userHasClicked = cookies.filter(function(item) {
    return item.indexOf('hasclickedonce=true') >= 0
}).length;


if (userHasClicked) {
    init();
} else {
    $('.start').on("click", init);
}    

function fullScreenClip(video){
    $('.override').show();
    $('.override').find("source").attr("src", video);
    $('.override').find("video").load();

};
$('.override').on("click",function(){
    $('.override').hide();
});
// returns an array with at most one real
function threeRandomNames(){
    var names = [];
    //keeps track whether we had real name
    var hasRealName = false;
    while ( names.length < 3) {
        var newName = makeRandomNames();
        //look for a real name and if do not already have one 
        if (realName(newName)&&hasRealName==false){
            hasRealName = true;
            names.push(newName);
        }else {
            names.push(newName);
        }
        
    }

    return names;
}

function makeRandomNames(){
    var firstName = firstNames[rand_index(firstNames.length)];
    var secondName = secondNames[rand_index(secondNames.length)];
    return (firstName + ' ' + secondName);
}

function isRealName(name){

    if (name === 'Antoine Doisnel'){
        return true;

    }else if (name == 'Fabienne Tabard'){
        return true;

    }else if (name == 'Christine Darbon'){
        return true;
    }

    return false;
}