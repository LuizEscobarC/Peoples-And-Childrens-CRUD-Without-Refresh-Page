<?php

namespace Source\Models;

use MongoDB\BSON\ObjectId;
use Source\Core\Model;

/**
 * MODEL PESSOA
 */
class People extends Model
{
    public function __construct()
    {
        parent::__construct('people', ['id'], ['name']);
    }

    /**
     * MÉTODO RESPONSÁVEL POR RETORNAR TODOS AS PESSOAS E O VINCULOS FILHOS
     * @return array
     */
    public function findAll()
    {
        $peoplesArray = [];
        $peoples = $this->find()->fetch(true);
        $i = 0;
        foreach ($peoples as $people) {
            if (!empty($people)) {
                $peoplesArray[$i] = new \stdClass;
                $peoplesArray[$i]->nome = $people->name;
                $peoplesArray[$i]->filhos = $people->childrens();
            }
            $i++;
        }

        return $peoplesArray;
    }

    /**
     * MÉTODO RESPONSÁVEL POR BUILDAR E RETORNAR OS FILHOS
     * @return array|null
     */
    public function childrens()
    {
        if (!empty($this->id)) {
            $childrenArray = [];
            $childrens = (new Children())->find('people_id = :id', "id={$this->id}", '*')
                ->fetch(true);

            if (!empty($childrens)) {
                foreach ($childrens as $children) {
                    $childrenArray[] = $children->name;
                }
            }

            return $childrenArray;
        }
        return null;
    }

    /**
     * MÉTODO RESPONSÁVEL POR FAZER TODA A REGRA DE NÉGÓCIO DE CADASTRO
     * @param $people
     * @return bool|Children|People
     */
    public function storePeople($people)
    {
        // FILTRA CONTRA SCRIPTS
        $people = $this->filter($people);

        $peopleModel = new People();
        $peopleModel->name = ($people->nome ?? '');

        if (!$peopleModel->save()) {
            return $peopleModel;
        }

        if (!empty($childrens = $people->filhos)) {
            foreach ($childrens as $childrenName) {
                $childrenModel = new Children();
                $childrenModel->name = $childrenName;
                $childrenModel->people_id = $peopleModel->id;

                if (!$childrenModel->save()) {
                    return $childrenModel;
                }
            }
        }
        return true;
    }

    /**
     * MÉTODO RESPONSÁVEL POR FILTRAS OS DADOS DA PESSOA
     * @param object $people
     * @return object
     */
    public function filter(object $people)
    {
        $people->nome = filter_var($people->nome, FILTER_SANITIZE_STRIPPED);
        $people->filhos = filter_var_array($people->filhos, FILTER_SANITIZE_STRIPPED);
        return $people;
    }
}