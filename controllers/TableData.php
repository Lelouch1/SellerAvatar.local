<?php


namespace app\controllers;

use voku\db\DB;
use voku\db\exceptions\QueryException;

class TableData
{

    protected $db;

    /**
     * TableData constructor.
     */
    public function __construct()
    {
        $this->db = DB::getInstance(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, 3306, 'utf8', true, false);
    }

    /**
     * @return string
     */
    protected static function getMainTableName(): string
    {
        return 'table_data';
    }

    /**
     * @return string
     */
    protected static function getSubTableName(): string
    {
        return 'table_sub_data';
    }

    public function index(): void
    {
        $maintableData = $this->getData();
        null !== $maintableData ? require './view/tableIndex.php' : print_r('Упс, что то пошло не так!');
    }


    /**
     * @return array|null
     */
    private function getData(): ?array
    {
        try {
            return $this->db->select(self::getMainTableName())->fetchAllArray();
        } catch (QueryException $e) {
            return null;
        }
    }


    /**
     * @param $id
     * @throws QueryException
     */
    public function saveData($id): void {
        $data = file_get_contents( "php://input" );

        $insertArr = [
            'dataid' => $id,
            'subdata' => $data,
        ];
        $newData = $this->db->insert(self::getSubTableName(), $insertArr);
        if ($newData) {
            echo 'Ок!';
        } else {
            echo 'Упс, что то пошло не так';
        }
    }

    public function getSubData($id)
    {
        try {
            $sql = 'SELECT subdata FROM ' . self::getSubTableName() . ' WHERE dataid =:id';
            $result = $this->db->query($sql,['id' => $id])->fetchAllArray();
//            echo json_encode($this->db->select(self::getSubTableName(), ['dataid' => $id])->fetchAllArray());
            echo json_encode($result);
        } catch (QueryException $e) {
            return null;
        }
    }
}