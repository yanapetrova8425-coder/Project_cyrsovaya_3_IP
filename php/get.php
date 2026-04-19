<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once 'pdo.php';
$database = new Database();
$pdo = $database->connect();

// ============================================
// ВОЗВРАЩАЮ ДАННЫЕ ИЗ ВСЕХ ТРЁХ ТАБЛИЦ
// ============================================
try {
    // Получаю все активные услуги, отсортированные по порядку
    $services = $pdo->query("SELECT id, name, description, price, 
    image, category, sort_order FROM services WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();

    // Получаю всех активных мастеров, отсортированных по порядку
    $masters = $pdo->query("SELECT id, name, role, specialization, image,
     experience FROM masters WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();

    // Получаю всех пользователей
    $users = $pdo->query("SELECT id, name, phone, email FROM users")->fetchAll();

    // Получаю все записи
    $bookings = $pdo->query("SELECT id, client_name, client_phone, client_email,
     service, master, booking_date, booking_time, confirm_method, comment FROM bookings")->fetchAll();

    // Получаю все отзывы
    $reviews = $pdo->query("SELECT id, client_name, rating, review_text FROM reviews")->fetchAll();

    echo json_encode([
        'status' => 'success',
        'services' => $services,
        'masters' => $masters,
        'users' => $users,
        'bookings' => $bookings,
        'reviews' => $reviews
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Ошибка при получении данных: ' . $e->getMessage()]);
}
exit;


