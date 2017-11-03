import $ from 'jquery'
import elderPic from '../media/walk-anime.png'

var canvasWidth = 108; 
var canvasHeight = 140;
//Getting the canvas 
var canvas = document.getElementById('elder');
var ctx = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight; 

var spriteWidth = 864; 
var spriteHeight = 280; 

var rows = 2; 
var cols = 8; 
var width = spriteWidth/cols; 
// 108
var height = spriteHeight/rows; 
// 140
var curFrame = 0; 
var frameCount = 8; 
var x=0;
var y=0; 
var srcX=0; 
var srcY=0; 
var elder = new Image(); 
elder.src = elderPic

function drawElder () {
	curFrame = ++curFrame % frameCount;
	srcX = curFrame * width; 
	ctx.clearRect(x,y,width,height);
	ctx.drawImage(elder,srcX,srcY,width,height,x,y,width,height);
}
$(function(){
	$('.scaneWrapper').on('scroll', function () {
		let stopForQuiz = $(this).children('.quizIntro').offset().left
		if( stopForQuiz == 0){
			curFrame = 1;
		}
	});	
})

module.exports = {
	drawElder : drawElder,
	curFrame : curFrame,
}
