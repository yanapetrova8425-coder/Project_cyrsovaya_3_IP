<?php
/**
 * booking.php — серверная обработка онлайн-записи в салон Neonka.
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

// Запись на приём
if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['service']) && isset($_POST['date']) && isset($_POST['time'])) {
    try {
        // Получаю данные и экранирую
        $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
        $phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
        $email = isset($_POST['email']) ? htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8') : null;
        $service = htmlspecialchars($_POST['service'], ENT_QUOTES, 'UTF-8');
        $master = isset($_POST['master']) ? htmlspecialchars($_POST['master'], ENT_QUOTES, 'UTF-8') : null;
        $date = $_POST['date'];
        $time = $_POST['time'];
        $comment = isset($_POST['comment']) ? htmlspecialchars($_POST['comment'], ENT_QUOTES, 'UTF-8') : null;

        // Валидация обязательных полей
        if (!$name || !$phone || !$service || !$date || !$time) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Заполните все обязательные поля']);
            exit;
        }

        // Проверка email (если указан)
        if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Некорректный email']);
            exit;
        }

        // Нельзя записаться на прошедшую дату
        if ($date < date('Y-m-d')) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Нельзя записаться на прошедшую дату']);
            exit;
        }

        // Проверка формата времени
        if (!preg_match('/^\d{2}:\d{2}$/', $time)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Некорректный формат времени']);
            exit;
        }

        // Подготовленный запрос с bindParam
        $stmt = $pdo->prepare(
            "INSERT INTO bookings (client_name, client_phone, client_email, service, master, booking_date, booking_time, comment)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->bindParam(1, $name);
        $stmt->bindParam(2, $phone);
        $stmt->bindParam(3, $email);
        $stmt->bindParam(4, $service);
        $stmt->bindParam(5, $master);
        $stmt->bindParam(6, $date);
        $stmt->bindParam(7, $time);
        $stmt->bindParam(8, $comment);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Вы успешно записаны! Мы свяжемся с вами для подтверждения.']);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Ошибка записи: ' . $e->getMessage()]);
    }
    exit;
}

// Неизвестный POST-запрос
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Неверный запрос']);
    exit;
}
