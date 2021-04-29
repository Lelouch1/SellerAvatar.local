-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 29 2021 г., 21:42
-- Версия сервера: 8.0.19
-- Версия PHP: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `seller_avatar`
--

-- --------------------------------------------------------

--
-- Структура таблицы `table_data`
--

CREATE TABLE `table_data` (
  `id` int NOT NULL,
  `data` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `table_data`
--

INSERT INTO `table_data` (`id`, `data`) VALUES
(1, 'Слово 1'),
(2, 'Слово 2'),
(3, 'Слово 3'),
(4, 'Слово 4');

-- --------------------------------------------------------

--
-- Структура таблицы `table_sub_data`
--

CREATE TABLE `table_sub_data` (
  `id` int NOT NULL,
  `dataId` int NOT NULL,
  `subdata` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `table_sub_data`
--

INSERT INTO `table_sub_data` (`id`, `dataId`, `subdata`) VALUES
(1, 1, 'test ne test, 3'),
(2, 2, 'cat dog, 5'),
(3, 2, 'apple, 115'),
(4, 4, 'javascript php, 165'),
(5, 4, 'orange, 44');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `table_data`
--
ALTER TABLE `table_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Индексы таблицы `table_sub_data`
--
ALTER TABLE `table_sub_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dataId` (`dataId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `table_data`
--
ALTER TABLE `table_data`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `table_sub_data`
--
ALTER TABLE `table_sub_data`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `table_sub_data`
--
ALTER TABLE `table_sub_data`
  ADD CONSTRAINT `table_sub_data_ibfk_1` FOREIGN KEY (`dataId`) REFERENCES `table_data` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
