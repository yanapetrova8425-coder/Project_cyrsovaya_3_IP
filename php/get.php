<?php
/**
 * get.php — обработка GET-запросов.
 */
include_once "pdo.php";
$db  = new DB();
$pdo = $db->connect();

if ($_GET !== null) {
    // Действие зависит от параметра action
    $action = isset($_GET['action']) ? $_GET['action'] : '';

    // Получение всех записей из bookings
    if ($action === 'get_bookings') {
        $stmt  = $pdo->query("SELECT * FROM bookings ORDER BY created_at DESC");
        $rows  = $stmt->fetchAll();
        echo json_encode(['status' => 'success', 'data' => $rows]);
    }
    // Получение всех отзывов
    elseif ($action === 'get_reviews') {
        $stmt  = $pdo->query("SELECT client_name, rating, review_text, created_at FROM reviews ORDER BY created_at DESC");
        $rows  = $stmt->fetchAll();
        echo json_encode(['status' => 'success', 'data' => $rows]);
    }
    // Получение пользователя по id
    elseif ($action === 'get_user' && isset($_GET['id'])) {
        $id    = intval($_GET['id']);
        $stmt  = $pdo->prepare("SELECT id, name, phone, email, created_at FROM users WHERE id=?");
        $stmt->bindParam(1, $id);
        $stmt->execute();
        $user  = $stmt->fetch();
        if ($user) {
            echo json_encode(['status' => 'success', 'data' => $user]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Пользователь не найден']);
        }
    }
    else {
        echo json_encode(['status' => 'error', 'message' => 'Неизвестное действие']);
    }
} else {
    return false;
}
