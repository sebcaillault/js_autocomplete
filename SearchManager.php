<?php
declare(strict_types=1);


class SearchManager
{
    protected $pdo;

    public function __construct($pdo)
     {
         $this->pdo = $pdo;
     }

     
        /*
    *  Returns array with all the cities matching the string param 
    */
    function getCities(string $str) : array
    {
        $str = $str . '%';      // retourne les villes qui commencent par $str

        $sql = 'SELECT `ville_nom_reel` AS `nom`, `ville_code_postal` AS `code_postale` 
        FROM `ville` WHERE `ville_nom_reel` LIKE :string ORDER BY `ville_nom_reel` ASC';

        $query = $this->pdo->prepare($sql);
        $query->bindValue('string', $str, PDO::PARAM_STR);
        $query->execute();
        $cities = $query->fetchAll();

        return $cities;
    }   
}




