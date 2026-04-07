<?php
/**
 * Route.php — маршрутизатор запросов.
 */
class Route {
    static function getRoute($route) {
        if ($route === '/neonka/api/auth') {
            require 'auth.php';
        } elseif ($route === '/neonka/api/booking') {
            require 'booking.php';
        } elseif ($route === '/neonka/api/reviews') {
            require 'reviews.php';
        } elseif ($route === '/neonka/api/test') {
            require 'test.php';
        } else {
            require '404.php';
        }
    }
}
