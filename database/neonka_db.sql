-- ============================================
-- База данных для курсового проекта
-- Салон красоты "Neonka" — Шумерля
-- Для XAMPP (MySQL/MariaDB)
-- ============================================
-- Импорт: phpMyAdmin → Вкладка "Импорт" → Выбрать этот файл → "Вперёд"
-- ============================================

CREATE DATABASE IF NOT EXISTS neonka_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE neonka_db;

-- ============================================
-- Таблица 1: users (зарегистрированные пользователи)
-- Поля: id, name, phone, email, password, created_at
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Таблица 2: bookings (онлайн-записи)
-- Поля: id, client_name, client_phone, client_email,
--       service, master, booking_date, booking_time,
--       comment, created_at
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    client_email VARCHAR(150) DEFAULT NULL,
    service VARCHAR(100) NOT NULL,
    master VARCHAR(100) DEFAULT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    comment TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Таблица 3: reviews (отзывы клиентов)
-- Поля: id, client_name, rating, review_text, created_at
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Готово! 3 таблицы созданы.
-- Проверить в phpMyAdmin → БД neonka_db → вкладка "Структура"
-- ============================================
