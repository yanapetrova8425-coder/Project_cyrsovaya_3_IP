<?php
/**
 * Контроллер аутентификации — регистрация и вход пользователей
 * Реализует ООП стиль (требование 5.1)
 */
class AuthController
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Регистрация нового пользователя
     */
    public function register($data)
    {
        try {
            // Валидация данных
            $name = trim($data['name']);
            $phone = trim($data['phone']);
            $email = trim($data['email']);
            $password = $data['password'];

            // Проверка обязательных полей
            if (empty($name) || empty($phone) || empty($email) || empty($password)) {
                http_response_code(400);
                return [
                    'status' => 'error',
                    'message' => 'Все поля обязательны для заполнения'
                ];
            }

            // Проверка email формата
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                return [
                    'status' => 'error',
                    'message' => 'Некорректный формат email'
                ];
            }

            // Проверка длины пароля
            if (strlen($password) < 6) {
                http_response_code(400);
                return [
                    'status' => 'error',
                    'message' => 'Пароль должен быть не менее 6 символов'
                ];
            }

            // Проверка формата телефона (простая валидация)
            if (!preg_match('/^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/', $phone)) {
                http_response_code(400);
                return [
                    'status' => 'error',
                    'message' => 'Некорректный формат телефона'
                ];
            }

            // Проверка длины имени
            if (strlen($name) < 2 || strlen($name) > 50) {
                http_response_code(400);
                return [
                    'status' => 'error',
                    'message' => 'Имя должно быть от 2 до 50 символов'
                ];
            }

            // Подготавливаю и выполняю INSERT
            $stmt = $this->pdo->prepare(
                "INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)"
            );
            $stmt->execute([$name, $phone, $email, $password]);

            return [
                'status' => 'success',
                'message' => 'Регистрация успешна!'
            ];

        } catch (PDOException $e) {
            error_log("Ошибка регистрации: " . $e->getMessage());

            // Проверка на дубликат (уникальный email)
            if (strpos($e->getMessage(), 'Duplicate') !== false || $e->getCode() == 23000) {
                http_response_code(400);
                return [
                    'status' => 'error',
                    'message' => 'Пользователь с таким email уже существует'
                ];
            }

            http_response_code(500);
            return [
                'status' => 'error',
                'message' => 'Ошибка: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Вход пользователя
     */
    public function login($data)
    {
        try {
            $email = trim($data['email']);
            $password = $data['password'];

            // Ищу пользователя по email
            $stmt = $this->pdo->prepare(
                "SELECT id, name, email, password FROM users WHERE email = ?"
            );
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            // Сравниваю введённый пароль с тем, что в базе
            if ($user && $password === $user['password']) {
                session_start();
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_email'] = $user['email'];

                return [
                    'status' => 'success',
                    'message' => 'Вход выполнен!'
                ];
            } else {
                http_response_code(401);
                return [
                    'status' => 'error',
                    'message' => 'Неверный email или пароль'
                ];
            }

        } catch (PDOException $e) {
            http_response_code(500);
            return [
                'status' => 'error',
                'message' => 'Ошибка: ' . $e->getMessage()
            ];
        }
    }
}
