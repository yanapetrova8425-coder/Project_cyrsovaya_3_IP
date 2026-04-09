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
// GET-запрос — возвращаю данные из всех трёх таблиц
// ============================================
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Получаю все активные услуги, отсортированные по порядку
        $services = $pdo->query("SELECT id, name, description, price, image, category, sort_order FROM services WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();

        // Получаю всех пользователей
        $users = $pdo->query("SELECT id, name, phone, email FROM users")->fetchAll();

        // Получаю все записи
        $bookings = $pdo->query("SELECT id, client_name, client_phone, client_email, service, master, booking_date, booking_time, confirm_method, comment FROM bookings")->fetchAll();

        // Получаю все отзывы
        $reviews = $pdo->query("SELECT id, client_name, rating, review_text FROM reviews")->fetchAll();

        echo json_encode([
            'status' => 'success',
            'services' => $services,
            'users' => $users,
            'bookings' => $bookings,
            'reviews' => $reviews
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Ошибка при получении данных: ' . $e->getMessage()]);
    }
    exit;
}

// ============================================
// ОБРАБОТКА POST-ЗАПРОСОВ
// ============================================

// РЕГИСТРАЦИЯ — обрабатываю регистрацию нового пользователя
if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['password'])) {
    try {
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        $stmt = $pdo->prepare("INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $phone, $email, $password]);

        echo json_encode(['status' => 'success', 'message' => 'Регистрация успешна!']);

    } catch (PDOException $e) {
        error_log("Ошибка регистрации: " . $e->getMessage());

        if (strpos($e->getMessage(), 'Duplicate') !== false || $e->getCode() == 23000) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Пользователь с таким email уже существует']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
        }
    }
    exit;
}

// ВХОД — обрабатываю авторизацию пользователя
if (isset($_POST['email']) && isset($_POST['password']) && !isset($_POST['name'])) {
    try {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && $password === $user['password']) {
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];

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

// ЗАПИСЬ (booking) — обрабатываю запись клиента на приём
if (isset($_POST['client_name']) && isset($_POST['client_phone']) && isset($_POST['service']) && isset($_POST['booking_date']) && isset($_POST['booking_time'])) {
    try {
        $clientName = $_POST['client_name'];
        $clientPhone = $_POST['client_phone'];
        $clientEmail = isset($_POST['client_email']) ? $_POST['client_email'] : '';
        $service = $_POST['service'];
        $master = isset($_POST['master']) ? $_POST['master'] : '';
        $bookingDate = $_POST['booking_date'];
        $bookingTime = $_POST['booking_time'];
        $confirm = isset($_POST['confirm']) ? $_POST['confirm'] : 'phone';
        $comment = isset($_POST['comment']) ? $_POST['comment'] : '';

        $stmt = $pdo->prepare("INSERT INTO bookings (client_name, client_phone, client_email, service, master, booking_date, booking_time, confirm_method, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$clientName, $clientPhone, $clientEmail, $service, $master, $bookingDate, $bookingTime, $confirm, $comment]);

        echo json_encode(['status' => 'success', 'message' => 'Вы успешно записаны! Ожидайте подтверждения.']);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Ошибка при записи: ' . $e->getMessage()]);
    }
    exit;
}

// ОТЗЫВ (review) — обрабатываю оставление отзыва
if (isset($_POST['client_name']) && isset($_POST['review_text'])) {
    try {
        $clientName = $_POST['client_name'];
        $reviewText = $_POST['review_text'];
        $rating = isset($_POST['rating']) ? intval($_POST['rating']) : 5;

        $stmt = $pdo->prepare("INSERT INTO reviews (client_name, rating, review_text) VALUES (?, ?, ?)");
        $stmt->execute([$clientName, $rating, $reviewText]);

        echo json_encode(['status' => 'success', 'message' => 'Спасибо за ваш отзыв!']);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Ошибка при отправке отзыва: ' . $e->getMessage()]);
    }
    exit;
}

// Если POST, но ни один обработчик не подошёл
http_response_code(400);
echo json_encode(['status' => 'error', 'message' => 'Некорректный запрос']);
exit;
