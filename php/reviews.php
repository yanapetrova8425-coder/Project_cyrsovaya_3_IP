<?php
/**
 * reviews.php — серверная обработка отзывов (ООП-стиль).
 * Использует классы Database и Review.
 */
require_once __DIR__ . '/Review.php';

header('Content-Type: application/json; charset=utf-8');

// Получаю PDO-подключение через класс Database
$database = new Database();
$review   = new Review($database->getConnection());

// ============================================
// ОБРАБОТКА POST-запросов
// ============================================

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Добавление отзыва
    if (isset($_POST['name']) && isset($_POST['rating']) && isset($_POST['text'])) {
        $name   = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
        $rating = (int)$_POST['rating'];
        $text   = htmlspecialchars($_POST['text'], ENT_QUOTES, 'UTF-8');

        $result = $review->add($name, $rating, $text);

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
// ОБРАБОТКА GET-запросов — получение отзывов
// ============================================

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $reviews = $review->getAll();
    echo json_encode(['status' => 'success', 'data' => $reviews]);
    exit;
}
