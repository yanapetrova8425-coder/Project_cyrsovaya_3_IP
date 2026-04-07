<?php
/**
 * auth.php — серверная логика регистрации и входа в салон Neonka.
 * Подключаюсь к БД neonka_db через PDO, обрабатываю POST-запросы
 * от клиентских форм (AJAX через fetch).
 * Пароль хеширую через password_hash() — стандарт безопасности.
 * Валидацию дублирую на сервере, даже если клиент уже проверил.
 */

// Заголовки для JSON-ответа
header('Content-Type: application/json; charset=utf-8');

// Настройки подключения к моей базе данных
$host = '127.0.0.1';
$db = 'neonka_db';
$user = 'root';
$pass_db = '';
$charset = 'utf8mb4';

// Формирую DSN-строку для PDO
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

// Пытаюсь подключиться к БД через PDO
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

// --- Регистрация нового пользователя ---
if (isset($_POST['action']) && $_POST['action'] === 'register') {
    try {
        // Получаю данные из формы и экранирую через htmlspecialchars
        $name = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
        $phone = htmlspecialchars(trim($_POST['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
        $email = htmlspecialchars(trim($_POST['email'] ?? ''), ENT_QUOTES, 'UTF-8');
        $password = $_POST['password'] ?? '';

        // Серверная валидация: все поля обязательны
        if (!$name || !$phone || !$email || !$password) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Заполните все обязательные поля']);
            exit;
        }

        // Проверяю email через регулярное выражение
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Некорректный email']);
            exit;
        }

        // Проверяю длину пароля (минимум 6 символов)
        if (strlen($password) < 6) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Пароль должен содержать минимум 6 символов']);
            exit;
        }

        // Хеширую пароль — нельзя хранить пароли в открытом виде
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Подготовленный запрос с ?-плейсхолдерами — защита от SQL-инъекций
        $stmt = $pdo->prepare("INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)");
        $stmt->bindParam(1, $name);
        $stmt->bindParam(2, $phone);
        $stmt->bindParam(3, $email);
        $stmt->bindParam(4, $hashedPassword);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Регистрация прошла успешно!']);

    } catch (PDOException $e) {
        // Код 23000 = нарушение уникальности (email уже есть в БД)
        if ($e->getCode() == 23000) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Этот email уже зарегистрирован']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
        }
    }
    exit;
}

// --- Вход пользователя (login) ---
if (isset($_POST['action']) && $_POST['action'] === 'login') {
    try {
        $email = htmlspecialchars(trim($_POST['email'] ?? ''), ENT_QUOTES, 'UTF-8');
        $password = $_POST['password'] ?? '';

        if (!$email || !$password) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Введите email и пароль']);
            exit;
        }

        // Ищу пользователя по email
        $stmt = $pdo->prepare("SELECT id, name, password FROM users WHERE email = ?");
        $stmt->bindParam(1, $email);
        $stmt->execute();
        $user = $stmt->fetch();

        // Сравниваю пароль с хешем через password_verify
        if ($user && password_verify($password, $user['password'])) {
            echo json_encode(['status' => 'success', 'message' => 'Вход выполнен!', 'user_id' => $user['id']]);
        } else {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Неверный email или пароль']);
        }

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
    }
    exit;
}

// Если POST-запрос пришёл, но без известного action
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Неизвестное действие']);
    exit;
}
