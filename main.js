$(function(){
	var diff = 'easy',
			pers = 'bird';

	function game(diff, pers){
		var lvl;
		switch(diff) {
			case 'easy':
				lvl = 1;
				break;
			case 'normal':
				lvl = 2;
				break;
			case 'hard':
				lvl = 3;
				break;
			case 'imp':
				lvl = 4;
				break;
		}
		var cvs = document.getElementById('canvas');
		var ctx = cvs.getContext('2d');

		var bird = new Image();
		var bg = new Image();
		var fg = new Image();
		var pipeUp = new Image();
		var pipeDown = new Image();

		bird.src = "images/bird_" + pers + ".png"
		bg.src = "images/flappy_bird_bg.png"
		fg.src = "images/flappy_bird_fg.png"
		pipeUp.src = "images/flappy_bird_pipeUp.png"
		pipeDown.src = "images/flappy_bird_pipeBottom.png"

		var pipe = [];
		pipe[0] = {
			x: cvs.width,
			y: 0
		}
		var score = 0;
		var gap = 90;
		var xPos = 10;
		var yPos = 190;
		var grav = 1.7;
		var fly = new Audio();
		var score_audio = new Audio();

		fly.src = "sounds/fly.mp3";
		score_audio.src = "sounds/score.mp3";
		document.addEventListener('keydown', moveUp);
		$(cvs).click(function(event) {
			moveUp();
		});
		function moveUp(){
			yPos -= 40;
			fly.play();
		}

		function draw() {
			ctx.drawImage(bg, 0, 0);

			for (var i = 0; i < pipe.length; i++){
				ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
				ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);

				pipe[i].x = pipe[i].x - lvl;

				if(pipe[i].x == 84){
					pipe.push({
						x: cvs.width,
						y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
					});
				};
				if(xPos + bird.width >= pipe[i].x
					&& xPos <= pipe[i].x + pipeUp.width
					&& (yPos <= pipe[i].y + pipeUp.height
					|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
					$('canvas').addClass('d-none');
					$('.mainMenu').removeClass('d-none');
					$('.mainMenu__menu').removeClass('d-none');
					requestAnimationFrame(null);
				};
				if(pipe[i].x == lvl) {
					score++;
					score_audio.play();
				};

			};
			
			ctx.drawImage(fg, 0, cvs.height - fg.height);
			ctx.drawImage(bird, xPos, yPos);

			yPos += grav;
			requestAnimationFrame(draw);
			ctx.fillStyle = "#000";
			ctx.font = "24px Verdana";
			ctx.fillText("Score: " + score, 10, cvs.height - 20);
		};
		pipeDown.onload = draw;
	};

	$('.mainMenu__menu button').click(function() {
		var option = $(this).attr('data');
		$('.mainMenu__container').addClass('d-none');
		switch(option) {
			case 'pers':
				$('.mainMenu__person').removeClass('d-none');
				break;
			case 'diff':
				$('.mainMenu__diff').removeClass('d-none');
				break;
			case 'start':
				$('.mainMenu').addClass('d-none');
				$('canvas').removeClass('d-none');
				game(diff, pers);
				break;
		}
	});
	$('button[data="mainmenu"]').click(function(){
		$('.mainMenu__container').addClass('d-none');
		$('.mainMenu__menu').removeClass('d-none');
	});
	$('.mainMenu__person button:not("#mainmenu")').click(function(event) {
		pers = $(this).attr('data');
		$('.mainMenu__person button').removeClass('mainMenu__person_active');
		$(this).addClass('mainMenu__person_active');
	});
	$('.mainMenu__diff button:not("#mainmenu")').click(function(event) {
		diff = $(this).attr('data');
		$('.mainMenu__diff button').removeClass('mainMenu__person_active');
		$(this).addClass('mainMenu__person_active');
	});

});