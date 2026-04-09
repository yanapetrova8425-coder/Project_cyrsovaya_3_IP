<?php
/**
 * Контроллер отзывов — создание отзывов
 * Реализует ООП стиль (требование 5.1)
 */
class ReviewController
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Создание нового отзыва
     */
    public function create($data)
    {
        try {
            $clientName = trim($data['client_name']);
            $reviewText = trim($data['review_text']);
            $rating = isset($data['rating']) ? intval($data['rating']) : 5;

            $stmt = $this->pdo->prepare(
                "INSERT INTO reviews (client_name, rating, review_text) VALUES (?, ?, ?)"
            );
            $stmt->execute([$clientName, $rating, $reviewText]);

            return [
                'status' => 'success',
                'message' => 'Спасибо за ваш отзыв!'
            ];

        } catch (PDOException $e) {
            http_response_code(500);
            return [
                'status' => 'error',
                'message' => 'Ошибка при отправке отзыва: ' . $e->getMessage()
            ];
        }
    }
}
