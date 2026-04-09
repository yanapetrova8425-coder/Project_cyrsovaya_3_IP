<?php
/**
 * Точка входа для POST-запросов
 * Использует ООП контроллеры для обработки запросов
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Подключаю классы
include_once 'pdo.php';
include_once 'controllers/AuthController.php';
include_once 'controllers/BookingController.php';
include_once 'controllers/ReviewController.php';

// Создаю подключение БД через ООП класс
$database = new Database();
$pdo = $database->connect();

// Создаю контроллеры
$auth = new AuthController($pdo);
$booking = new BookingController($pdo);
$review = new ReviewController($pdo);

// ============================================
// ОБРАБОТКА POST-ЗАПРОСОВ через контроллеры
// ============================================

// РЕГИСТРАЦИЯ — все 4 поля обязательны
if (isset($_POST['name'], $_POST['phone'], $_POST['email'], $_POST['password'])) {
    $result = $auth->register($_POST);
    echo json_encode($result);
    exit;
}

// ВХОД — только email + password (без name, чтобы отличить от регистрации)
if (isset($_POST['email'], $_POST['password']) && !isset($_POST['name'])) {
    $result = $auth->login($_POST);
    echo json_encode($result);
    exit;
}

// ЗАПИСЬ (booking) — обязательные поля
if (isset($_POST['client_name'], $_POST['client_phone'], $_POST['service'], $_POST['booking_date'], $_POST['booking_time'])) {
    $result = $booking->create($_POST);
    echo json_encode($result);
    exit;
}

// ОТЗЫВ (review) — обязательные поля
if (isset($_POST['client_name'], $_POST['review_text'])) {
    $result = $review->create($_POST);
    echo json_encode($result);
    exit;
}

// Если POST, но ни один обработчик не подошёл
http_response_code(400);
echo json_encode(['status' => 'error', 'message' => 'Некорректный запрос']);
exit;
