<?php

namespace Source\Models;

use Source\Core\Model;

class Children extends Model
{
    public function __construct()
    {
        parent::__construct('children', ['id'], ['name', 'id_people']);
    }
}