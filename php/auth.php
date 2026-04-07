<?php
/**
 * auth.php — регистрация и вход пользователей салона Neonka.
 * Подключаюсь к БД через PDO, принимаю данные через $_POST,
 * экранирую через htmlspecialchars(), вставляю через bindParam.
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

// Регистрация нового пользователя
if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['password'])) {
    try {
        $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
        $phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
        $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
        $password = $_POST['password'];

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)");
        $stmt->bindParam(1, $name);
        $stmt->bindParam(2, $phone);
        $stmt->bindParam(3, $email);
        $stmt->bindParam(4, $hashedPassword);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Регистрация прошла успешно!']);

    } catch (PDOException $e) {
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

// Вход пользователя (login)
if (isset($_POST['action']) && $_POST['action'] === 'login') {
    try {
        $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
        $password = $_POST['password'];

        $stmt = $pdo->prepare("SELECT id, name, password FROM users WHERE email = ?");
        $stmt->bindParam(1, $email);
        $stmt->execute();
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            echo json_encode(['status' => 'success', 'message' => 'Вход выполнен!']);
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Неверный запрос']);
    exit;
}
