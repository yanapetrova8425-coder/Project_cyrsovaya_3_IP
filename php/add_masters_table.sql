-- SQL скрипт для добавления таблицы мастеров
-- Выполните этот скрипт, если таблица services уже существует

-- --------------------------------------------------------
-- Структура таблицы `masters`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `masters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `specialization` varchar(50) NOT NULL COMMENT 'hair, nails, makeup, all',
  `image` varchar(255) DEFAULT NULL,
  `experience` int(11) DEFAULT 0 COMMENT 'лет опыта',
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `specialization` (`specialization`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Дамп данных таблицы `masters`
-- --------------------------------------------------------

INSERT INTO `masters` (`id`, `name`, `role`, `specialization`, `image`, `experience`, `is_active`, `sort_order`) VALUES
(1, 'Елена', 'Парикмахер-стилист', 'hair', 'img/elena.jpg', 8, 1, 1),
(2, 'Марина', 'Мастер маникюра', 'nails', 'img/marina.jpg', 5, 1, 2),
(3, 'Ольга', 'Визажист', 'makeup', 'img/olga.jpg', 6, 1, 3),
(4, 'Наташа', 'Универсальный мастер', 'all', 'img/natasha.jpg', 10, 1, 4)
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `role` = VALUES(`role`),
  `specialization` = VALUES(`specialization`),
  `image` = VALUES(`image`),
  `experience` = VALUES(`experience`),
  `is_active` = VALUES(`is_active`),
  `sort_order` = VALUES(`sort_order`);