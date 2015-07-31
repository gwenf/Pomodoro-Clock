$(function(){

var sessionTime = 25,
		breakTime = 5;

document.getElementById('session').innerHTML = sessionTime;
document.getElementById('break').innerHTML = breakTime;
	
$( ".sminus" ).click(function() {
	if (sessionTime>0){
		sessionTime = sessionTime - 1;
		minutes = sessionTime;
		$('#session').text(''+sessionTime+'');
		$('#timer').text(''+sessionTime+':0'+secs);
	}
	stopTimer();
	$('#startPause').text('Start');
	seconds = 0;
});
	
$( ".splus" ).click(function() {
  sessionTime++;
	minutes = sessionTime;
	$('#session').text(''+sessionTime+'');
	$('#timer').text(''+sessionTime+':0'+secs);
	stopTimer();
	$('#startPause').text('Start');
	seconds = 0;
});
	
$( ".bminus" ).click(function() {
	if (breakTime>0){
		breakTime--;
		$('#break').text(''+breakTime+'');
	}
	stopTimer();
	$('#startPause').text('Start');
	seconds = 0;
});
$( ".bplus" ).click(function() {
  breakTime++;
	$('#break').text(''+breakTime+'');
	stopTimer();
	$('#startPause').text('Start');
	seconds = 0;
});
	
	
var secs = 0,
		running = false,
		handle;
	
$('#timer').text(''+sessionTime+':0'+secs);

$('#startPause').click(function() {
	if ($('#startPause').text() === 'Start'){
		$('#startPause').text('Pause');
		running = true;
		handle = setInterval(function() {decrementTime()}, 1000);
		
	} else {
		$('#startPause').text('Start');
		running = false;
		decrementTime();
		stopTimer();
	}
});
	
var seconds = secs;
var minutes = sessionTime;
var timerType = 'session';
	
function decrementTime() {
	
	if(running === true) {
		
//			var minutes = Math.floor(secs / 60);
			if (seconds < 0 && minutes > 0) {
				minutes--;
				seconds = 59;
			}
			
			if (minutes < 10 && minutes.length <= 2) {
						minutes = '0' + minutes;
					}
			
			if (seconds < 10) {
						seconds = '0' + seconds;
					}
		
			$('#timer').text(''+minutes+':'+seconds);
//			decrementTime();
		
		seconds--;
		
		
		if (seconds<0&&minutes===0&&timerType==='session'){
			minutes = breakTime;
			seconds = 0;
			timerType = 'break';
			redBackground();
			ringBell();
		} else if (seconds<0&&minutes===0&&timerType==='break') {
			minutes = sessionTime;
			seconds = 0;
			timerType = 'session';
			blackBackground();
			ringBell();
		}
	
//		return time--;
}
}
	

function stopTimer() {
	clearInterval(handle);
	running = false;
	decrementTime();
}
	
function ringBell () {
	var audio = document.getElementsByTagName("audio")[0];
	audio.play();
}
	
function redBackground () {
	$('body').css('background-image', 'url(redsky.jpg)');
}
function blackBackground () {
	$('body').css('background-image', 'url(bsg-stars.png)');
}
	
});//ends document ready