-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 09 2026 г., 11:05
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `salon`
--

-- --------------------------------------------------------

--
-- Структура таблицы `services`
-- Таблица для хранения списка услуг салона
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT 'general',
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `price`, `image`, `category`, `sort_order`, `is_active`) VALUES
(1, 'Стрижка', 'Классика, каскад, боб, стрижка под машинку', 1500.00, 'img/strishka.jpg', 'hair', 1, 1),
(2, 'Окрашивание', 'Однотонное, мелирование, омбре, балаяж', 3000.00, 'img/okras.jpg', 'hair', 2, 1),
(3, 'Укладка', 'Повседневная, вечерняя, праздничная укладка', 1000.00, 'img/ykladka.jpg', 'hair', 3, 1),
(4, 'Маникюр', 'Классика, аппаратный, дизайн, покрытие гель', 1200.00, 'img/manukur.jpg', 'nails', 4, 1),
(5, 'Педикюр', 'Полный уход за стопами, аппаратный педикюр', 1500.00, 'img/pedukur.jpg', 'nails', 5, 1),
(6, 'Визаж', 'Дневной, вечерний, свадебный макияж', 2000.00, 'img/vizash.jpg', 'makeup', 6, 1),
(7, 'Кератиновое выпрямление', 'Гладкость и блеск волос до 4 месяцев', 4000.00, 'img/keratin.jpg', 'hair', 7, 1),
(8, 'Ламинирование волос', 'Защита, объём и здоровый блеск', 3000.00, 'img/laminirovanie.jpg', 'hair', 8, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `client_phone` varchar(20) NOT NULL,
  `client_email` varchar(150) DEFAULT '',
  `service` varchar(100) NOT NULL,
  `master` varchar(100) DEFAULT '',
  `booking_date` date NOT NULL,
  `booking_time` time NOT NULL,
  `confirm_method` varchar(20) DEFAULT 'phone',
  `comment` text DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `bookings`
--

INSERT INTO `bookings` (`id`, `client_name`, `client_phone`, `client_email`, `service`, `master`, `booking_date`, `booking_time`, `confirm_method`, `comment`, `created_at`) VALUES
(1, 'Иванова Милана', '+79520295118', 'yanapetrova8425@gmail.com', 'makeup_evening', 'natasha', '2026-04-17', '17:13:00', 'phone', 'привет', '2026-04-07 11:11:12'),
(2, 'Настя', '+79520295118', 'yanapetrova8425@gmail.com', 'wedding', 'olga', '2026-04-17', '17:32:00', 'Telegram', 'привеееееттттт', '2026-04-07 12:32:10'),
(3, 'Яна', '+79520295118', 'yanapetrova8425@gmail.com', 'wedding', 'olga', '2026-04-22', '10:09:00', 'Telegram', 'РАБОТАЕТ?', '2026-04-08 07:06:05'),
(4, 'Яна', '+79520295118', 'yanapetrova8425@gmail.com', 'manicure_gel', 'natasha', '2026-04-11', '10:33:00', 'email', '', '2026-04-08 07:31:17'),
(5, 'Никита', '+7906 996 88 67', 'heket@gmail.com', 'keratin', 'elena', '2026-04-09', '15:15:00', 'phone', 'Никита записался на кератиновое выпрямление)', '2026-04-08 12:33:48'),
(6, 'Громова Дарья', '+79520295118', 'yanapetrova8425@gmail.com', 'haircut_woman', 'elena', '2026-04-23', '15:40:00', 'Telegram', 'ЖДУ ЗАПИСЬ!', '2026-04-08 12:38:20'),
(7, 'Софронов Дмиртий', '+78975673453', 'dvxdf@gmail.com', 'manicure', 'marina', '2026-04-10', '13:00:00', 'phone', 'Привет', '2026-04-09 08:58:50');

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `review_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `client_name`, `rating`, `review_text`, `created_at`) VALUES
(1, 'милана', 5, 'привет', '2026-04-07 11:09:44'),
(2, 'Майа', 4, 'Все прекрасно!', '2026-04-07 11:55:02'),
(3, 'Настя', 5, 'все работает ?', '2026-04-07 12:32:24'),
(4, 'Ника', 5, '??', '2026-04-08 06:54:49'),
(5, 'Никка', 5, 'отлично?', '2026-04-08 06:55:55'),
(6, 'катя', 3, 'не работает?', '2026-04-08 07:04:35'),
(7, 'Яна', 3, 'review-text-error', '2026-04-08 07:31:30'),
(8, 'Кира', 5, 'Все прекрасно!!!', '2026-04-08 08:25:42'),
(9, 'Никита', 5, 'Спасибо!!! Мне всё нравиться!!!!', '2026-04-08 12:35:33'),
(10, 'Дима', 5, 'Отлично', '2026-04-09 08:58:01');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `email`, `password`, `created_at`) VALUES
(5, 'Аня', '89520894212', 'dkdfvjnd@gmail.com', '12356790', '2026-04-07 11:42:39'),
(6, 'Яна', '+79520295118', 'yanapetrova8425@gmail.com', '1234567', '2026-04-07 11:47:44'),
(7, 'Настя', '+79520295118', 'yanapetrova8425@gmail.com', '1234567', '2026-04-07 12:31:33'),
(8, 'Вероника', '+79654548765', 'fbgjkdnf@gmail.com', '1234567', '2026-04-08 07:07:35'),
(9, 'Яна', '+79520295118', 'yanapetrova8425@gmail.com', '123456', '2026-04-08 07:30:40'),
(10, 'Кира', '+79567864523', 'fghdtrgt@email.com', '1234566', '2026-04-08 08:25:06'),
(11, 'Настя', '+79853462345', 'nastya@gmail.com', '1234567890', '2026-04-08 08:55:11'),
(12, 'Дмитрий', '+78974567654', 'dfbdf@gmail.com', '1234567', '2026-04-09 08:59:25');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`),
  ADD KEY `sort_order` (`sort_order`);

--
-- Индексы таблицы `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
