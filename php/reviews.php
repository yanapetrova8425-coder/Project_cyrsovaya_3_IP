<?php
/**
 * reviews.php — серверная обработка отзывов в салон Neonka.
 * Подключаюсь к БД через PDO, принимаю данные через $_POST,
 * валидирую и сохраняю через bindParam.
 */

header('Content-Type: application/json; charset=utf-8');

// Настройки подключения к базе данных
$host = '127.0.0.1';
$db = 'neonka_db';
$user = 'root';
$pass_db = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass_db, $opt);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Ошибка подключения к БД']);
    exit;
}

// ============================================
// ОБРАБОТКА POST-ЗАПРОСОВ
// ============================================

// Добавление отзыва
if (isset($_POST['name']) && isset($_POST['rating']) && isset($_POST['text'])) {
    try {
        // Получаю данные и экранирую
        $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
        $rating = (int)$_POST['rating'];
        $text = htmlspecialchars($_POST['text'], ENT_QUOTES, 'UTF-8');

        // Валидация
        if (!$name || !$text) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Заполните имя и текст отзыва']);
            exit;
        }

        // Рейтинг от 1 до 5
        if ($rating < 1 || $rating > 5) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Оценка должна быть от 1 до 5']);
            exit;
        }

        // Минимальная длина отзыва
        if (strlen($text) < 10) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Отзыв слишком короткий (минимум 10 символов)']);
            exit;
        }

        // Подготовленный запрос с bindParam
        $stmt = $pdo->prepare(
            "INSERT INTO reviews (client_name, rating, review_text) VALUES (?, ?, ?)"
        );
        $stmt->bindParam(1, $name);
        $stmt->bindParam(2, $rating);
        $stmt->bindParam(3, $text);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Спасибо за ваш отзыв!']);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
    }
    exit;
}

// Неизвестный POST-запрос
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Неверный запрос']);
    exit;
}
