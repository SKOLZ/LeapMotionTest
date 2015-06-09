var ws;

  // Support both the WebSocket and MozWebSocket objects
  if ((typeof(WebSocket) == 'undefined') &&
      (typeof(MozWebSocket) != 'undefined')) {
    WebSocket = MozWebSocket;
  }

function initWS() {

	//Create and open the socket
	ws = new WebSocket("ws://localhost:6437/");

	// On successful connection
	ws.onopen = function(event) {
    $('#connection').addClass('hidden');
	};

	// On message received
	ws.onmessage = function(event) {
	  var obj = JSON.parse(event.data);
    RPS.display(obj);
	  var str = JSON.stringify(obj, undefined, 2);
	  //document.getElementById("output").innerHTML = '<pre>' + str + '</pre>';
	};

	// On socket close
	ws.onclose = function(event) {
	  ws = null;
	  document.getElementById("board").style.visibility = "hidden";
    $('#connection').removeClass('hidden');
	}

	//On socket error
	ws.onerror = function(event) {
	  alert("Received error");
	};

}

$(document).ready(function () {
  initWS();
});

$(document).keyup(function(e){
  if(e.keyCode == 83){
    RPS.sneaky_mode = true;
    console.log('Sneaky mode ;)');
  }
});
