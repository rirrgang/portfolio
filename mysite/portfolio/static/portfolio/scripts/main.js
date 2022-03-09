//-------------------------------------------------------VIDEO PLAYER------------------------------------------------
$(document).ready(function () {

    //--------------------GLOBAL VARIABLES--------------------------------------
    let video = $("#main-video").get(0);
    let videoContainer = $("#main-video").get(0);
    let videoPlayBtn = $(".video-play-btn-border")[0];
    //--------------------------------------------------------------------------


    //Event Listener for clicking custom Play Button
    $(videoPlayBtn).click(function () {
        toggleVideo();
    });

    //Event Listener if Video ended
    $(video).on("ended", function () {
        switchPlayBtnIcon("play");
        $(video).fadeTo(500, 0.1);
    });

    //Start Video automatically
    toggleVideo();




    function playVideo() {
        if (video != null && videoContainer != null) {
            video.play();
            switchPlayBtnIcon("stop");
            $(videoContainer).fadeTo(500, 1);
        }

    }

    function stopVideo() {
        if (video != null && videoContainer != null) {
            video.pause();
            switchPlayBtnIcon("play");
            $(videoContainer).fadeTo(500, 0.1);
        }
    }

    function toggleVideo(playState = null) {
        if (video != null) {
            showVideoPercentage();
            if (playState == null) {
                if (video.paused) {
                    playVideo();
                } else {
                    stopVideo();
                }
            } else if (playState === "play") {
                playVideo();
            } else if (playState === "stop") {
                stopVideo();
            }
        }
    }

    function switchPlayBtnIcon(playState) {
        //let playButton = $(".video-play-btn-container").get(0);
        let playIcon = $("#video-play-btn-icon");
        if (playState === "stop") {
            $(playIcon).fadeOut(250, function () {
                playIcon.removeClass("fa-play");
                playIcon.addClass("fa-pause");
                $(playIcon).fadeIn(250);
            });
            //$(playButton).css("opacity",0.1);
        }
        if (playState === "play") {
            $(playIcon).fadeOut(250, function () {
                playIcon.removeClass("fa-pause");
                playIcon.addClass("fa-play");
                $(playIcon).fadeIn(250)
            });
            //$(playButton).css("opacity",1);

        }
    }

    function showVideoPercentage() {
        if (video != null) {
            $(video).on('loadedmetadata', function () {
                var duration = video.duration;
                var currentTime = 0;
                var videoPlayPercentage = 0;
                setInterval(function () { // this code is executed every 5 seconds:
                    if (currentTime < duration && !video.paused) {
                        currentTime = video.currentTime;
                        videoPlayPercentage = (currentTime / duration) * 100;
                        //console.log(videoPlayPercentage);
                    }
                }, 500);
            });
        }

    }

    //Switch Videos Function on each video-entry-container-element
    $(function () {
        $(".video-list-entry-container").on("click", function () {
            var video = $("#main-video").get(0);
            var videoSource = $("#main-video-source").get(0);
            var videoTitle = $(".video-title").get(0);

            var elementSource = $(this).find("source").attr("src");
            var elementVideoTitle = $(this).find("source").attr("data-src-name");
            console.log(elementSource);

            //stop Video and clear click handlerfrom play button
            $(videoPlayBtn).off();
            stopVideo();


            if (elementSource != null) {
                videoSource.setAttribute('src', elementSource);
                video.load();
                playVideo();
                videoTitle.innerHTML = elementVideoTitle;
                $(videoTitle).removeClass("video-title-error");
                $(videoPlayBtn).click(function () {
                    toggleVideo();
                });
            } else {
                videoTitle.innerHTML = "ERROR - Loading Video";
                $(videoTitle).addClass("video-title-error");
            }
        });

    });



    //-------------------------------------------------------MENU ICON------------------------------------------------
    var menuBtn = $(".navigation-hamburger-menu").get(0);
    menuBtn.addEventListener("click", function () {
        var menuBtnIcon = $(".menu-btn-icon").get(0);
        menuBtnIcon.classList.toggle("open");

    });



});








