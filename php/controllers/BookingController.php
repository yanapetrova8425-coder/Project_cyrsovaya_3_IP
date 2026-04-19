<?php
/**
 * Контроллер записей — создание записей на приём
 * Реализует ООП стиль (требование 5.1)
 */
class BookingController
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Создание новой записи
     */
    public function create($data)
    {
        try {
            $clientName = trim($data['client_name']);
            $clientPhone = trim($data['client_phone']);
            $clientEmail = isset($data['client_email']) ? trim($data['client_email']) : '';
            $service = trim($data['service']);
            $master = isset($data['master']) ? trim($data['master']) : '';
            $bookingDate = trim($data['booking_date']);
            $bookingTime = trim($data['booking_time']);
            $confirm = isset($data['confirm']) ? trim($data['confirm']) : 'phone';
            $comment = isset($data['comment']) ? trim($data['comment']) : '';

            $this->pdo->beginTransaction();

            $stmt = $this->pdo->prepare(
                "INSERT INTO bookings (client_name, client_phone, client_email, service, 
                master, booking_date, booking_time, confirm_method, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
            );
            $stmt->execute([
                $clientName, $clientPhone, $clientEmail,
                $service, $master, $bookingDate, $bookingTime,
                $confirm, $comment
            ]);

            $this->pdo->commit();

            return [
                'status' => 'success',
                'message' => 'Вы успешно записаны!'
            ];

        } catch (PDOException $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            http_response_code(500);
            return [
                'status' => 'error',
                'message' => 'Ошибка при записи: ' . $e->getMessage()
            ];
        }
    }
}
