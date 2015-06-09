var lastTime = 0;
RPS = {
	results: {
		rock: 'rock',
		paper: 'paper',
		scissors: 'scissors'
	},
	active: false,
	result: null,
	circle_enabled: false,
	game_in_progress: false,
	display: function(leapmotion_frame) {
		if (!this.game_in_progress && leapmotion_frame.gestures != null && leapmotion_frame.gestures.length > 0) {
	    var gesture = leapmotion_frame.gestures[0];
			switch (gesture.type) {
	      case "circle":
					if (this.circle_enabled) {
						this.game_in_progress = true;
						this.hide_hands();
						if (lastTime + 1000 < +new Date) {
							this.play_da_game();
						  lastTime = +new Date;
				    }
					}
					break;
        case "screenTap":
					if (!this.circle_enabled) {
						this.game_in_progress = true;
						this.hide_hands();
						if (lastTime + 1000 < +new Date) {
							this.play_da_game();
						  lastTime = +new Date;
				    }
					}
	        break;
        case "keyTap":
        case "swipe":
          break;
      }
	  }
	  if (RPS.active) {
			if (leapmotion_frame.hands != undefined) {
				if (leapmotion_frame.hands.length == 1 && (leapmotion_frame.pointables.length == 0 ||leapmotion_frame.pointables.length == 1)) {
					this.result = RPS.results.rock;
				} else {
					switch (leapmotion_frame.pointables.length) {
						case 5:
						case 4:
							this.result =  RPS.results.paper;
							break;
						case 3:
						case 2:
							this.result =  RPS.results.scissors;
							break;
						default:
							this.result = null;

					}
				}
				if (this.result != null) {
						this.active = false;
						bot_result = this.bot_result();
						winner = this.winner(this.result, bot_result);
						if (winner == 'player') {
							$('#winner').html('You win!');
						} else if (winner == 'bot') {
							$('#winner').html('You lose...');
						} else {
							$('#winner').html("It's a tie!");
						}
						this.game_in_progress = false;
						this.circle_enabled = true;
					  $('#bot-' + bot_result).removeClass('hidden');
	          $('#player-' + this.result).removeClass('hidden');
						$('#bot-' + bot_result).addClass('visible');
	          $('#player-' + this.result).addClass('visible');
	          this.result = null;
				} else {
					this.active = false;
					bot_result = this.bot_result();
					$('#winner').html("You... didn't chose anything?");
					this.game_in_progress = false;
					this.circle_enabled = true;
					$('#bot-' + bot_result).removeClass('hidden');
					$('#player-nope').removeClass('hidden');
					$('#bot-' + bot_result).addClass('visible');
					$('#player-nope').addClass('visible');
					this.result = null;
				}
			}
		}
	},
	bot_result: function () {
		switch (Math.floor(Math.random() * 3 + 1)){
			case 1:
				return this.results.rock;
			case 2:
				return this.results.paper;
			case 3:
				return this.results.scissors;
		}
	},
	winner: function (player_result, bot_result){

		if (player_result == bot_result) return 'nobody';

		if ((player_result == this.results.rock && bot_result == this.results.scissors) ||
			(player_result == this.results.scissors && bot_result == this.results.paper) ||
			(player_result == this.results.paper && bot_result == this.results.rock))
			 return 'player';

		return 'bot';
	},
	play_da_game: function() {
		$('.after-game').addClass('hidden');
		$('.before-game').addClass('hidden');
		$('.in-game').removeClass('hidden');
		$('#player, #bot').removeClass();
		var counter=6;
		$('#counter').html("READY");
		var interval = setInterval(function() {
			counter--;
			if (counter == 5) {
				$('#counter').addClass('ready');
			}
			if (counter == 4) {
				$('#counter').removeClass('ready');
				$('#counter').html("STEADY");
			}
			if (counter == 3) {
				$('#counter').addClass('steady');
			}
			if (counter == 2) {
				$('#counter').removeClass('steady');
				$('#counter').html("GO!");
			}
			if (counter == 1) {
				$('#counter').addClass('go');
			}
			if (counter === 0) {
				RPS.active = true;
				clearInterval(interval);
				$(".in-game").addClass('hidden');
				$('#counter').removeClass('go');
				$(".after-game").removeClass('hidden');
			}
		}, 500);
	},
	hide_hands: function() {
		$('#player-scissors').addClass("hidden");
		$('#player-rock').addClass("hidden");
		$('#player-paper').addClass("hidden");
		$('#player-nope').addClass("hidden");
		$('#bot-scissors').addClass("hidden");
		$('#bot-rock').addClass("hidden");
		$('#bot-paper').addClass("hidden");
		$('#player-scissors').removeClass("visible");
		$('#player-rock').removeClass("visible");
		$('#player-paper').removeClass("visible");
		$('#player-nope').removeClass("visible");
		$('#bot-scissors').removeClass("visible");
		$('#bot-rock').removeClass("visible");
		$('#bot-paper').removeClass("visible");
	}
}
