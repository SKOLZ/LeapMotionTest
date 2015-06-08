RPS = {
	_:{
		results:{
			rock:'rock',
			paper:'paper',
			scissors:'scissors'
		}
	},
	active: false,
	last_result: null,
  sneaky_mode: false,
	display: function(leapmotion_frame) {
		 if(!RPS.active && leapmotion_frame.gestures != null && leapmotion_frame.gestures.length > 0){
	    leapmotion_frame.gestures.forEach(function(gesture){
	        switch (gesture.type){
	          case "circle":
	              console.log("Circle Gesture");
	               	$('#player, #bot').removeClass();
					  	var counter=3;
						$('#counter').html(counter);
					  	var interval = setInterval(function() {
					    	counter--;
					    	$('#counter').html(counter);
					    	if (counter === 0) {
					    		clearInterval(interval);
					    		console.log('show!!');
					    		RPS.active = true;
					    	}
						}, 1000);
	              break;
	          case "keyTap":
	              console.log("Key Tap Gesture");
	              break;
	          case "screenTap":
	              console.log("Screen Tap Gesture");
	              RPS.active = true;
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
				    		clearInterval(interval);
				        $(".in-game").addClass('hidden');
				        $(".after-game").removeClass('hidden');
				    		RPS.active = true;
				    	}
					}, 500);
	              break;
	          case "swipe":
	              console.log("Swipe Gesture");
	              break;
	        }
	    });
	    return;
	  }
	  if(RPS.active){
		var result = null;
		if (leapmotion_frame.hands !== undefined){
			if (leapmotion_frame.hands.length == 1 
				&& (leapmotion_frame.pointables.length == 0 ||leapmotion_frame.pointables.length == 1)) {
				result = RPS._.results.rock;
			} else { 
				switch (leapmotion_frame.pointables.length) {
					case 5:
					case 4:
						result =  RPS._.results.paper;
						break;
					case 3:
					case 2:
						result =  RPS._.results.scissors;
						break;
					default:
						result = null;

				}
			}
			if (RPS.last_result == null && result != null){
				RPS.last_result = result;
				setTimeout(function (){
					if (RPS.last_result !== null){
						console.log('result', RPS.last_result);
						RPS.active = false;
            if(!RPS.sneaky_mode){
						  bot_result = RPS.bot_result();
            } else {
              bot_result = RPS.make_bot_beat_player(RPS.last_result);
              RPS.sneaky_mode = false;
            };
            winner = RPS.winner(RPS.last_result, bot_result);
            $('#winner').html(winner);  
            $('#bot').addClass(bot_result);
            $('#player').addClass(RPS.last_result);
            RPS.last_result = null;
					}
				}, 500);
			}
			if (result !== null){
				RPS.last_result = result;
			}
			$('#hands').html(leapmotion_frame.hands.length);
			$('#fingers').html(leapmotion_frame.pointables.length); 

		}
		RPS.active = false;
	}
	},
	bot_result: function (){
		switch (Math.floor(Math.random() * 3 + 1)){
			case 1:
				return RPS._.results.rock;
			case 2:
				return RPS._.results.paper;
			case 3:
				return RPS._.results.scissors;
		}
	},
	winner: function (player_result, bot_result){
		
		if (player_result == bot_result) return 'nobody';
		
		if ((player_result == RPS._.results.rock && bot_result == RPS._.results.scissors) ||
			(player_result == RPS._.results.scissors && bot_result == RPS._.results.paper) ||
			(player_result == RPS._.results.paper && bot_result == RPS._.results.rock))
			 return 'player';
		
		return 'bot';
	},
  make_bot_beat_player: function(player_result) {
    if(player_result == RPS._.results.rock) return RPS._.results.paper;
    if(player_result == RPS._.results.scissors) return RPS._.results.rock;
    if(player_result == RPS._.results.paper) return RPS._.results.scissors;
  }
}













