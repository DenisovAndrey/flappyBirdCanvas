$(function(){
	function game(){

		var cvs = document.getElementById('canvas');
		var ctx = cvs.getContext('2d');

		var bird = new Image();
		var bg = new Image();
		var fg = new Image();
		var pipeUp = new Image();
		var pipeDown = new Image();

		bird.src = "images/flappy_bird_bird.png"
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

		function moveUp(){
			yPos -= 40;
			fly.play();
		}

		function draw() {
			ctx.drawImage(bg, 0, 0);

			for (var i = 0; i < pipe.length; i++){
				ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
				ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);

				pipe[i].x--;

				if(pipe[i].x == 85){
					pipe.push({
						x: cvs.width,
						y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
					});
				};
				if(xPos + bird.width >= pipe[i].x
					&& xPos <= pipe[i].x + pipeUp.width
					&& (yPos <= pipe[i].y + pipeUp.height
					|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
					location.reload(); // Перезагрузка страницы
				};
				if(pipe[i].x == 5) {
					score++;
					score_audio.play();
				}

			};
			
			ctx.drawImage(fg, 0, cvs.height - fg.height);
			ctx.drawImage(bird, xPos, yPos);

			yPos += grav;
			requestAnimationFrame(draw);
			ctx.fillStyle = "#000";
			ctx.font = "24px Verdana";
			ctx.fillText("Счет: " + score, 10, cvs.height - 20);
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
				$('canvas').removeClass('d-none')
				game();
				break;
		}
	});
});