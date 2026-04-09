<?php
class Database
{
    private $opt = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    private $host;
    private $db;
    private $user;
    private $pass;
    private $charset;

    public function __construct($host = '127.0.0.1', $db = 'salon', $user = 'root', $pass = '', $charset = 'utf8mb4')
    {
        $this->host = $host;
        $this->db = $db;
        $this->user = $user;
        $this->pass = $pass;
        $this->charset = $charset;
    }

    public function connect()
    {
        $dsn = "mysql:host=$this->host;dbname=$this->db;charset=$this->charset";
        $pdo = new PDO($dsn, $this->user, $this->pass, $this->opt);
        return $pdo;
    }
}
