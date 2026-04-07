<?php
/**
 * index.php — точка входа API.
 * Все запросы проходят через этот файл.
 */
include_once "Route.php";
$uri = explode('?', $_SERVER['REQUEST_URI']);
$route = $uri[0];
Route::getRoute($route);
