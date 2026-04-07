<?php
require_once __DIR__ . '/Database.php';

/**
 * Review.php — класс для работы с отзывами.
 */
class Review {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    /**
     * Добавить отзыв в базу.
     */
    public function add(string $name, int $rating, string $text): array {
        if (empty($name) || empty($text)) {
            return ['status' => 'error', 'message' => 'Заполните имя и текст отзыва'];
        }

        if ($rating < 1 || $rating > 5) {
            return ['status' => 'error', 'message' => 'Оценка должна быть от 1 до 5'];
        }

        if (strlen($text) < 10) {
            return ['status' => 'error', 'message' => 'Отзыв слишком короткий (минимум 10 символов)'];
        }

        $stmt = $this->db->prepare(
            "INSERT INTO reviews (client_name, rating, review_text) VALUES (:name, :rating, :text)"
        );
        $stmt->execute([
            ':name'   => $name,
            ':rating' => $rating,
            ':text'   => $text,
        ]);

        return ['status' => 'success', 'message' => 'Спасибо за отзыв!'];
    }

    /**
     * Получить все отзывы из базы.
     */
    public function getAll(): array {
        $stmt = $this->db->query(
            "SELECT client_name, rating, review_text, created_at
             FROM reviews
             ORDER BY created_at DESC"
        );
        return $stmt->fetchAll();
    }
}
