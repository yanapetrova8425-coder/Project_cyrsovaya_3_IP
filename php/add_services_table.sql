-- =============================================
-- ПРОСТОЙ СКРИПТ ДЛЯ ДОБАВЛЕНИЯ ТАБЛИЦЫ SERVICES
-- Запустите в phpMyAdmin: вкладка SQL → выполнить
-- =============================================

-- 1. Создаю таблицу (если ещё не существует)
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT 'general',
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Вставляю 8 услуг (IGNORE — не будет ошибки при дублях)
INSERT IGNORE INTO `services` (`id`, `name`, `description`, `price`, `image`, `category`, `sort_order`, `is_active`) VALUES
(1, 'Стрижка', 'Классика, каскад, боб, стрижка под машинку', 1500.00, 'img/strishka.jpg', 'hair', 1, 1),
(2, 'Окрашивание', 'Однотонное, мелирование, омбре, балаяж', 3000.00, 'img/okras.jpg', 'hair', 2, 1),
(3, 'Укладка', 'Повседневная, вечерняя, праздничная укладка', 1000.00, 'img/ykladka.jpg', 'hair', 3, 1),
(4, 'Маникюр', 'Классика, аппаратный, дизайн, покрытие гель', 1200.00, 'img/manukur.jpg', 'nails', 4, 1),
(5, 'Педикюр', 'Полный уход за стопами, аппаратный педикюр', 1500.00, 'img/pedukur.jpg', 'nails', 5, 1),
(6, 'Визаж', 'Дневной, вечерний, свадебный макияж', 2000.00, 'img/vizash.jpg', 'makeup', 6, 1),
(7, 'Кератиновое выпрямление', 'Гладкость и блеск волос до 4 месяцев', 4000.00, 'img/keratin.jpg', 'hair', 7, 1),
(8, 'Ламинирование волос', 'Защита, объём и здоровый блеск', 3000.00, 'img/laminirovanie.jpg', 'hair', 8, 1);
