<?php session_start(); ?> 
     
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="chat.css">
</head>
<body>
	<div class="jumbotron">
	    <h2>Insert your name</h2>
	    <form action="doLogin.php" method="post">
	        <table class="form">
	            <tr> <td>Username:</td> <td><input type="text" name="username"></td> </tr>
	            <tr> <td><input type="submit"></td> </tr>
	        </table>
	    </form> 
	</div>
</body>
</html>