<?php
/**
 * post.php — обработка POST-запросов.
 */
include_once "pdo.php";
$db  = new DB();
$pdo = $db->connect();

if ($_POST !== null) {
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    // =====================
    // Регистрация
    // =====================
    if ($action === 'register') {
        $name     = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
        $phone    = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
        $email    = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

        // Проверка: существует ли email
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email=?");
        $stmt->bindParam(1, $email);
        $stmt->execute();
        if ($stmt->fetch()) {
            echo json_encode(['status' => 'error', 'message' => 'Пользователь с таким email уже существует']);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)");
        $stmt->bindParam(1, $name);
        $stmt->bindParam(2, $phone);
        $stmt->bindParam(3, $email);
        $stmt->bindParam(4, $password);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Регистрация прошла успешно']);
    }
    // =====================
    // Вход
    // =====================
    elseif ($action === 'login') {
        $email    = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
        $password = $_POST['password'];

        $stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email=?");
        $stmt->bindParam(1, $email);
        $stmt->execute();
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Вход выполнен',
                'user'   => [
                    'id'    => $user['id'],
                    'name'  => $user['name'],
                    'email' => $user['email'],
                ]
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Неверный email или пароль']);
        }
    }
    // =====================
    // Создание записи (booking)
    // =====================
    elseif ($action === 'create_booking') {
        $client_name  = htmlspecialchars($_POST['client_name'], ENT_QUOTES, 'UTF-8');
        $client_phone = htmlspecialchars($_POST['client_phone'], ENT_QUOTES, 'UTF-8');
        $client_email = isset($_POST['client_email']) ? htmlspecialchars($_POST['client_email'], ENT_QUOTES, 'UTF-8') : null;
        $service      = htmlspecialchars($_POST['service'], ENT_QUOTES, 'UTF-8');
        $master       = isset($_POST['master']) ? htmlspecialchars($_POST['master'], ENT_QUOTES, 'UTF-8') : null;
        $booking_date = $_POST['booking_date'];
        $booking_time = $_POST['booking_time'];
        $comment      = isset($_POST['comment']) ? htmlspecialchars($_POST['comment'], ENT_QUOTES, 'UTF-8') : null;

        $stmt = $pdo->prepare(
            "INSERT INTO bookings (client_name, client_phone, client_email, service, master, booking_date, booking_time, comment)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->bindParam(1, $client_name);
        $stmt->bindParam(2, $client_phone);
        $stmt->bindParam(3, $client_email);
        $stmt->bindParam(4, $service);
        $stmt->bindParam(5, $master);
        $stmt->bindParam(6, $booking_date);
        $stmt->bindParam(7, $booking_time);
        $stmt->bindParam(8, $comment);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Запись успешно создана']);
    }
    // =====================
    // Создание отзыва
    // =====================
    elseif ($action === 'create_review') {
        $client_name = htmlspecialchars($_POST['client_name'], ENT_QUOTES, 'UTF-8');
        $rating      = intval($_POST['rating']);
        $review_text = htmlspecialchars($_POST['review_text'], ENT_QUOTES, 'UTF-8');

        if ($rating < 1 || $rating > 5) {
            echo json_encode(['status' => 'error', 'message' => 'Оценка должна быть от 1 до 5']);
            exit;
        }
        if (strlen($review_text) < 10) {
            echo json_encode(['status' => 'error', 'message' => 'Отзыв слишком короткий (минимум 10 символов)']);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO reviews (client_name, rating, review_text) VALUES (?, ?, ?)");
        $stmt->bindParam(1, $client_name);
        $stmt->bindParam(2, $rating);
        $stmt->bindParam(3, $review_text);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Спасибо за ваш отзыв!']);
    }
    // =====================
    // Неизвестное действие
    // =====================
    else {
        echo json_encode(['status' => 'error', 'message' => 'Неизвестное действие']);
    }
} else {
    return false;
}
