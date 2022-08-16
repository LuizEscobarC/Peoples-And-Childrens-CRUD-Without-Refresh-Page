<?php

namespace Source\App;

use Source\Core\Controller;
use Source\Core\View;
/**
 * CLASSE FILHA DO CONTROLLADOR
 */
class App extends Controller
{

    /**
     * App constructor.
     */
    public function __construct()
    {
        parent::__construct(__DIR__ . "/../../themes/" . CONF_VIEW_APP . "/");
    }

    /**
     * APP HOME
     */
    public function home(): void
    {
        echo $this->view->render("home", []);
    }
}

