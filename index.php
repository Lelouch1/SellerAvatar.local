<?php

require './vendor/autoload.php';
require 'config/config.php';

use app\controllers\TableData;

$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
    $r->addRoute('GET', '/', [TableData::class, 'index']);
    $r->addRoute('GET', '/data',  [TableData::class, 'index']);
    $r->addRoute('GET', '/data/getSubData/{id:\d+}',  [TableData::class, 'getSubData']);
    $r->addRoute(['POST', 'GET'], '/data/save/{id:\d+}', [TableData::class, 'saveData']);

});


$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];


if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        header("HTTP/1.0 404 Not Found");
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        header("HTTP/1.0 405 Method Not Allowed");
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        [$class, $method] = $handler;
        $controller = new $class;
        call_user_func_array([$controller, $method], $vars);
        break;
}