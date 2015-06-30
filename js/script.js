/*jslint browser: true*/
/*global $, jQuery, console*/
/*jslint indent: 4, maxerr: 50, vars: true, regexp: true, sloppy: true */
jQuery(document).ready(function ($) {

    'use strict';


    /***************************************/
    /***          INIT VARIABLES         ***/
    /***************************************/

    // GET MEDIA PLAYER ELEMENTS
    var mediaPlayer = document.getElementById('videoPlayer'),
        playBtn = document.getElementById('play_btn'),
        stopBtn = document.getElementById('stop_btn'),
        volumeInc_btn = document.getElementById('volumeInc_btn'),
        volumeDec_btn = document.getElementById('volumeDec_btn'),
        mute_btn = document.getElementById('mute_btn'),
        replay_btn = document.getElementById('replay_btn');

    mediaPlayer.controls = false;




    /***************************************/
    /***            FUNCTIONS            ***/
    /***************************************/

    // CHANGE BUTTON LABEL
    function changeButtonType(btn, remove, add) {

        $(btn).removeClass(remove);
        $(btn).addClass(add);

    }


    // PLAY/PAUSE ON BUTTON CLICK
    function togglePlay() {

        // CHECK IF VIDEO IS RUNNING
        if (mediaPlayer.paused === true) {

            mediaPlayer.play();
            changeButtonType(this, 'glyphicon-play', 'glyphicon-pause');

        } else {

            mediaPlayer.pause();
            changeButtonType(this, 'glyphicon-pause', 'glyphicon-play');

        }

    }


    // STOP MEDIA ON BUTTON CLICK
    function stopMedia() {

        mediaPlayer.pause();
        mediaPlayer.currentTime = 0;

        // reset play button
        changeButtonType(playBtn, 'glyphicon-pause', 'glyphicon-play');

    }


    // UPDATE PROGRESS BAR
    function updateProgressBar() {

        var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
        $('#progress-bar').css('width', percentage + '%').attr('aria-valuenow', percentage);

    }


    // UPDATE CURRENT VIDEO TIME
    function updateTime() {

        var currentTime = document.getElementById('currentTime'),
            time;

        if (mediaPlayer.duration < 3600) {
            time = new Date(mediaPlayer.currentTime * 1000).toUTCString().replace(/.*(\d{2}:\d{2}).*/, "$1");
        } else {
            time = new Date(mediaPlayer.currentTime * 1000).toUTCString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        }

        currentTime.innerHTML = time;

    }


    // SHOW OR HIDE SLIDER ON CLICK
    function showSlider() {

        // CHECK IF SLIDER IS VISIBLE OR NOT
        if ($('#slider').css('display') == 'none') {

            $('#slider').fadeIn('slow');

        } else {

            $('#slider').fadeOut('slow');

        }

    }


    // CHANGE VOLUME
    function changeVolume(volumeLevel) {

        if (volumeLevel<0) {
            mediaPlayer.volume = 0;
        } else {
            mediaPlayer.volume = volumeLevel;
        }





/*
        if (this.id === 'volumeInc_btn') {
            mediaPlayer.volume += mediaPlayer.volume === 1 ? 0 : 0.1;
        } else {
            mediaPlayer.volume -= (mediaPlayer.volume === 0 ? 0 : 0.1);
        }

        mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
*/
    }


    // MUTE VOLUME
    /*
    function muteVolume() {

        if (mediaPlayer.muted) {
            //changeButtonType(this, 'Mute');
            mediaPlayer.muted = false;
        } else {
            //changeButtonType(this, 'Unmute');
            mediaPlayer.muted = true;
        }

    }*/


    // REPLAY MEDIA
    function replayMedia() {

        mediaPlayer.currentTime = 0;
        mediaPlayer.play();
        changeButtonType(playBtn, 'glyphicon-play', 'glyphicon-pause');

    }


    function setProgressWidth() {

        // GET THE WIDTH OF EACH ELEMENT IN THE MEDIA CONTROL SECTION (INCLUDING THE 45PX OF SPACE INBETWEEN)
        // AND SUBSTRACT THEM FROM TOTAL WIDTH TO CALCULATE THE SPACE LEFT AVAILABLE FOR THE PROGRESS BAR
        var widthAvailable = $('.media-controls').width() - $('#playControls').width() -
                             $('#timeContainer').width() - $('#volumeControls').width() - 45 + "px";

        $('#progressContainer').css("width", widthAvailable);

    }



    /***************************************/
    /***          SET LISTENERS         ***/
    /***************************************/

    // SET PROGRESS BAR WIDTH DYNAMICALL ON LOAD AND RESIZE!
    $(window).resize(setProgressWidth);
    setProgressWidth();

    playBtn.onclick = togglePlay;
    stopBtn.onclick = stopMedia;
    mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
    mediaPlayer.addEventListener('timeupdate', updateTime, false);
    volumeInc_btn.onclick = showSlider;
    //volumeDec_btn.onclick = changeVolume;
    //mute_btn.onclick = muteVolume;
    replay_btn.onclick = replayMedia;





    //$(function () {

        var slider = $('#slider');
        slider.slider({
            range: "min",
            min: 0,
            max: 100,
            orientation: "vertical",

            slide: function (event, ui) {

                var value = slider.slider('value'),
                    volume = $('.volume');


                console.log((value/100).toFixed(1));
                //mediaPlayer.volume = (value/100).toFixed(1);

                changeVolume((value/100).toFixed(1));

                if(value <= 5) {
                    volume.css('background-position', '0 0');
                }
                else if (value <= 25) {
                    volume.css('background-position', '0 -25px');
                }
                else if (value <= 75) {
                    volume.css('background-position', '0 -50px');
                }
                else {
                    volume.css('background-position', '0 -75px');
                }

            },

        });

    //});
});