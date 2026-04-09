<?php
/**
 * Маршрутизатор — определяет какой файл обработать
 */
class Route
{
    static function getRoute($route)
    {
        // GET-запрос — данные из БД
        if ($_SERVER['REQUEST_METHOD'] === 'GET' && (strpos($route, '/get') === 0 || $route === '/')) {
            require 'get.php';
        }
        // POST-запрос — обработка форм
        elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            require 'post.php';
        }
        // Неизвестный маршрут
        else {
            require '404.php';
        }
    }
}
