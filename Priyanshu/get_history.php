<?php
$conn = new mysqli('localhost', 'root', '', 'chatdb');

$session_id = $_GET['session_id'];
$sql = "SELECT sender, message FROM chat_history WHERE session_id = ? ORDER BY timestamp ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $session_id);
$stmt->execute();
$result = $stmt->get_result();

$history = [];
while ($row = $result->fetch_assoc()) {
    $history[] = $row;
}

echo json_encode($history);
?>
