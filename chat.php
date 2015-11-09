<?php session_start(); 

?>
<html>
	<head>
		<title>Web chat</title>
        <style type="text/css" media="screen"></style>
		<script src="manageChat.js"></script>
		<link rel="stylesheet" type="text/css" href="chat.css">
	</head>
	<body onload="javascript:startChat();">
		
		
		<div class="jumbotron">
			<h2>Bunq Chat</h2>
			
			<div id="status">
			</div>
			
			<!-- web chat -->
			<div id="div_chat" class="chat">
				
			</div>
			<br>
			
			<!-- text message and send button -->
			<form id="input" class="input" name="input"  onsubmit="return manageEnter();">
				<input type="text" id="message" name="message" style="width: 460px; height: 30px" />
				<input type="button" id="send_chat" name="send_chat" value="Send" onclick="javascript:sendMessage()"/>
			</form>
			
		</div>
		<!-- hidden values, they are passed to javascript js file -->
		<input type="hidden" name="user_name" id ="user_name" value="<?php echo $_SESSION['username']; ?>"/>
		
	</body>
	
</html>