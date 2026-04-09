<?php
/**
 * Главная точка входа — роутер
 * Перенаправляет запросы на соответствующие обработчики
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Подключаю маршрутизатор
include_once 'Route.php';

// Определяю текущий маршрут
$request = $_SERVER['REQUEST_URI'];
$basePath = '/myserver/';

// Убираю базовый путь из запроса
if (strpos($request, $basePath) === 0) {
    $route = substr($request, strlen($basePath) - 1); // сохраняю ведущий /
} else {
    $route = '/';
}

// Добавляю query string для GET
if (!empty($_SERVER['QUERY_STRING'])) {
    $route .= '?' . $_SERVER['QUERY_STRING'];
}

Route::getRoute($route);
