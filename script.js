document.cookie = "name=blob";

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
            $(video).find('source').remove();
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
    $('.start').remove();
    video1=update(1);
    video2=update(2);
    video3=update(3);

    numberOfPlayingVideos=0;

    watchVideo(video1);
    watchVideo(video2);
    watchVideo(video3);

    if (numberOfPlayingVideos==0){
        setTimeout(function(){ 
            init();
        },1000);
    }    
}

$('.start').on("click", init);


// $('video').on("click",function(){
//     $('.override').show();
//     $('.override').find("source").attr("src", $(this).find("source").attr("src") );
//     $('.override').find("video").load();
// });
// $('.override').on("click",function(){
//     $('.override').hide();
// });