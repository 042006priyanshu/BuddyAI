<?php
$conn = new mysqli('localhost', 'root', '', 'chatdb');

$data = json_decode(file_get_contents("php://input"), true);
$session_id = $data['session_id'];
$sender = $data['sender'];
$message = $data['message'];

$sql = "INSERT INTO chat_history (session_id, sender, message) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $session_id, $sender, $message);
$stmt->execute();

echo json_encode(["status" => "success"]);
?>
