//-------------------------------------------------------MAIN------------------------------------------------
$(document).ready(function () {
    //Load First Video
    let videoPlayBtn = $(".video-play-btn-border")[0];
    let video = $("#main-video").get(0);
    let videoContainer = $(".main-video-container").get(0);

    //Event Listener for clicking custom Play Button
    $(videoPlayBtn).click(function () {
        toggleVideo();
    });

    //Event Listener if Video ended
    $(video).on("ended", function () {
        switchPlayBtnIcon("play");
        $(videoContainer).fadeTo(500, 0.1);
    });

    //Start Video automatically
    toggleVideo();
    
});


function toggleVideo() {
    let video = $("#main-video").get(0);
    let videoContainer = $(".main-video-container").get(0);
    showVideoPercentage();
    if (video.paused) {
        video.play();
        switchPlayBtnIcon("stop");
        $(videoContainer).fadeTo(500, 1);
    } else {
        video.pause();
        switchPlayBtnIcon("play");
        $(videoContainer).fadeTo(500, 0.1);
    }
}

function switchPlayBtnIcon(playState) {
    let playIcon = $("#video-play-btn-icon");
    if (playState === "stop") {
        $(playIcon).fadeOut(250, function () {
            playIcon.removeClass("fa-play");
            playIcon.addClass("fa-pause");
            $(playIcon).fadeIn(250);
        });
    }
    if (playState === "play") {
        $(playIcon).fadeOut(250, function () {
            playIcon.removeClass("fa-pause");
            playIcon.addClass("fa-play");
            $(playIcon).fadeIn(250)
        });

    }
}

function showVideoPercentage() {
    let video = $("#main-video").get(0);
    $(video).on('loadedmetadata', function () {
        var duration = video.duration;
        var currentTime = 0;
        var videoPlayPercentage = 0;
        setInterval(function() { // this code is executed every 5 seconds:
            if(currentTime < duration && !video.paused) {
                currentTime = video.currentTime;
                videoPlayPercentage = (currentTime / duration) * 100;
                console.log(videoPlayPercentage);
            }
        }, 500);
    });
}


