<?php
/**
 * booking.php — обработка онлайн-записи (ООП-стиль).
 * Использует классы Database и Booking.
 */
require_once __DIR__ . '/Booking.php';

header('Content-Type: application/json; charset=utf-8');

$database = new Database();
$booking  = new Booking($database->getConnection());

// ============================================
// ОБРАБОТКА POST-запросов
// ============================================

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Запись на приём
    if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['service']) && isset($_POST['date']) && isset($_POST['time'])) {
        $name    = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
        $phone   = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
        $email   = isset($_POST['email']) ? htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8') : null;
        $service = htmlspecialchars($_POST['service'], ENT_QUOTES, 'UTF-8');
        $master  = isset($_POST['master']) ? htmlspecialchars($_POST['master'], ENT_QUOTES, 'UTF-8') : null;
        $date    = $_POST['date'];
        $time    = $_POST['time'];
        $comment = isset($_POST['comment']) ? htmlspecialchars($_POST['comment'], ENT_QUOTES, 'UTF-8') : null;

        $result = $booking->create($name, $phone, $email, $service, $master, $date, $time, $comment);

        if ($result['status'] === 'error') {
            http_response_code(400);
        }
        echo json_encode($result);
        exit;
    }

    // Неизвестный POST-запрос
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Неверный запрос']);
    exit;
}

// ============================================
// ОБРАБОТКА GET-запросов — получение записей
// ============================================

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $bookings = $booking->getAll();
    echo json_encode(['status' => 'success', 'data' => $bookings]);
    exit;
}
