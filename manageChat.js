
// global variables
var sendReq = getXmlHttpRequestObject();
var receiveReq = getXmlHttpRequestObject();
var lastReceivedMessage = 0;
var timer;
// frequency is the refresh poll value expressed in ms
var frequency = 2000;


// get the browser dependent XMLHttpRequest object
function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} 
	else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} 
	else { 
		document.getElementById('status').innerHTML = 
		'Status: Error while creating XmlHttpRequest Object.';
	}
}


// start operations for receiving unread messages from server
function getUnreadMessages() {
	if (receiveReq) {
		// set the listener now for the response
		receiveReq.onreadystatechange = receiveMessages;
		
		// fill param to send using POST
		var param = "lastReceivedMessage=" + lastReceivedMessage;
		
		// open and send request
		receiveReq.open("POST", 'chatServer.php', true);
		receiveReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		receiveReq.send(param);
	}
}


// receive messages sent from server and print them in chat
function receiveMessages() {
	// refresh chat in timer seconds
	timer = setInterval("getUnreadMessages();", frequency);
	if ( receiveReq.readyState == 4 && receiveReq.status == 200) {
		// get the chat div reference
		var chat_div = document.getElementById("div_chat");
		
		// eval the AJAX response
		var response = eval(receiveReq.responseText);
		
		// for every message
		for(i=0; i < response.length; i++) {
			// print sender name, time and message
			chat_div.innerHTML += '<font class="username_font">' + response[i].sender + ' </font>';
			chat_div.innerHTML += '<font class="time_font">' + response[i].time + ' </font><br>';
			chat_div.innerHTML += '<font class="message_font">' + response[i].message + '</font><br>';
			
			// autoscroll to the new message
			chat_div.scrollTop = chat_div.scrollHeight;
			
			// update lastReceivedMessage
			lastReceivedMessage = response[i].message_id;
		}
		
	}
}

// send a new message to the server
function sendMessage() {
    if( sendReq ){
    	if(document.getElementById('message').value == '') {
			return;
		}
		else {
	        // set the listener now for the response
	        sendReq.onreadystatechange = afterSend;
	        
	        // Fill param: pass sender_id, sender_name, message
			var param = "sender_name=" + document.getElementById("user_name").value;
			param += "&message=" + document.getElementById("message").value;
		
	        // Open and send request
	        sendReq.open( "POST", 'chatServer.php', true );
	        sendReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	        sendReq.send(param);
	        
	        // clear message input 
	        document.getElementById("message").value = "";
        }
    }
}



function afterSend() {
    if( sendReq.readyState==4 && sendReq.status == 200) {
    	clearInterval(timer);
        getUnreadMessages();
    }
}


function manageEnter() {
	sendMessage();
	return false;
}

function startChat() {
	// set focus on input to start writing out of the box
	document.getElementById('message').focus();
	getUnreadMessages();
}




