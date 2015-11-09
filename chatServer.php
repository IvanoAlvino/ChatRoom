<?php session_start();
// send headers to prevent caching
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT" ); 
header("Last-Modified: " . gmdate( "D, d M Y H:i:s" ) . "GMT" ); 
header("Cache-Control: no-cache, must-revalidate" ); 
header("Pragma: no-cache" );

// open database
$file_db = new PDO('sqlite:./chatdb') or die("cannot open database");

if ($file_db) {
	
	// check if a message was sent to the server
	if (isset($_POST['message']) ) {
		
		$message = $_POST["message"];
		$sender_name = $_POST["sender_name"];
		
		// insert new message in db
		$query = 'INSERT INTO messages (sender_name, message) 
					VALUES ("' . $sender_name . '","' . $message . '");';
		$file_db->query($query);
	}
	
	// retrieve all new messages from server
	else if (isset($_POST["lastReceivedMessage"])) {
		
		// retrieve all unread messages from server
		$lastMessage = $_POST["lastReceivedMessage"];
		$query = 'SELECT * FROM messages WHERE message_id > ' . $lastMessage . ';';
		$result = $file_db->query($query);
					
		// for every line, create a json element
		while($row = $result->fetch()) {
			$json[] = array("message_id" => $row['message_id'], 
					  "sender" => $row['sender_name'],
					  "message" => $row['message'],
					  "time" => $row['time']);
  	    }
  	    
  	    // print json	 
	    echo json_encode($json);
	    	    
	}
}
?>


