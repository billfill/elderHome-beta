import $ from 'jquery'
import {drawElder, curFrame} from './canvas_anime.js'

($(function(){
	let h = $(window).height();
	let w = $(window).width();
	let scrollIndex = 0;
	let quizSection = 0;
	let Hscroll = 0;

	let SIDdrawElder;
	$('.scrolling').css("height", h)

	drawElder()

	function nextQuiz () {
		if(SIDdrawElder !== undefined){
			clearInterval(SIDdrawElder)
		}
		scrollIndex++
		$('#scrollWrapper').css({
			"transform": "translate(" + (-w * scrollIndex) + "px, 0)"
		})
		SIDdrawElder = setInterval(drawElder, 125);
	}
	$('#scrollWrapper').on('transitionend', function(index){
		index = quizSection
		clearInterval(SIDdrawElder)
		if(index == 1){
			console.log("1")
		}
		if(index == 2){
			console.log('2')
		}
		if(index == 3){
			console.log('3')
		}
	})
	$('#start, .next').on("click", function(){
		nextQuiz();
	})	
	$('.quiz p').on("click", function(){
		nextQuiz();
		if($(this).index() == 1 ){
			$('.ansA').eq(quizSection).css("display", "block")
		} else {
			$('.ansB').eq(quizSection).css("display", "block")
		}
		console.log(quizSection)
		quizSection++
	})
	$('.scaneWrapper').on('scroll', function (e) {
		const draw = $(this).scrollLeft()
		Hscroll = draw
		if( draw % 5 == 0){
			drawElder()	
		}
	});
	if( w >= 1024) {
		$(window).on('mousewheel', function(){
			const x = event.deltaX;
			const y = event.deltaY;
			if(y > 0 && (x > -2 && x < 2)) {
				console.log("go")
				Hscroll += w/200;
				$(".scaneWrapper").scrollLeft(Hscroll);
			} else if (y < 0 && (x > -2 && x < 2)) {
				console.log("back")
				Hscroll -= w/200;
				$(".scaneWrapper").scrollLeft(Hscroll);
			}
		})
	}
}));
