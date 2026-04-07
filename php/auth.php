<?php
/**
 * auth.php — регистрация и вход пользователей (ООП-стиль).
 * Использует классы Database и Auth.
 */
require_once __DIR__ . '/Auth.php';

header('Content-Type: application/json; charset=utf-8');

$database = new Database();
$auth     = new Auth($database->getConnection());

// ============================================
// ОБРАБОТКА POST-запросов
// ============================================

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Регистрация
    if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['password'])) {
        $name     = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
        $phone    = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
        $email    = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
        $password = $_POST['password'];

        $result = $auth->register($name, $phone, $email, $password);

        if ($result['status'] === 'error') {
            http_response_code(400);
        }
        echo json_encode($result);
        exit;
    }

    // Вход
    if (isset($_POST['action']) && $_POST['action'] === 'login') {
        $email    = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
        $password = $_POST['password'];

        $result = $auth->login($email, $password);

        if ($result['status'] === 'error') {
            http_response_code(401);
        }
        echo json_encode($result);
        exit;
    }

    // Неизвестный POST-запрос
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Неверный запрос']);
    exit;
}
