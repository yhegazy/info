/*global console, alert, prompt*/
/*
Author: Yahia Hegazy
Created: 2016-05-12
Updated: 2016-05-19
Final: 2016-05-19

Project: PlayPen Information

The purpose of this project started out as a simple need to test my javascript skills. 
*/

//Gloabal Variables
var setStatus = document.getElementById('status'),
    getStatus = localStorage.getItem('status');

function sysinfo() {
    'use strict';

    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
        
    //Declaring variables, grouped by similiarites
    var sysDate = new Date(),
        language = "Current language: " + navigator.language,
        online = "Browser connectivity: " + navigator.onLine,
        cookies = "Cookies enabled: " + navigator.cookieEnabled,
        js = "JavaScript enabled: true",
        monitorResolution = "Monitor resolution: " + window.screen.width + ' x ' + window.screen.height,
        browserDimension = "Browser dimension: " + window.innerWidth + ' x ' + window.innerHeight,
        localLocation = "Location: ",
        localCoordinates = "Coordinates: ",
        message = document.getElementById("sysinfo"),
        pc = new window.RTCPeerConnection({iceServers: []}),
        noop = function () {};
    
    //Looks up IP address
    pc.createDataChannel("");    //create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);   // create offer and set local description
        
    pc.onicecandidate = function (ice) {  //listen for candidate events
        var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
                
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
            return;
        }
            
        myIP = 'Your IP: ' + myIP;
        pc.onicecandidate = noop;
           
        //Output message
        message.innerHTML = sysDate + '<br>' + myIP + '<br>' + online + '<br>' + cookies + '<br>' + js + '<br>' + language + '<br>' + monitorResolution + '<br>' + browserDimension;
        
    };
}

setStatus.onclick = function () {
    'use strict';
    
    if (document.getElementById('status').checked === true) {
        localStorage.setItem('status', "true");
    
    } else {
        localStorage.setItem('status', "false");
    }
};

if (getStatus === "true") {
    sysinfo();
}

function load() {
    'use strict';
    var checked = JSON.parse(localStorage.getItem('status'));
    document.getElementById('status').checked = checked;
}

function reset() {
    'use strict';
    location.reload();
    localStorage.clear();
}