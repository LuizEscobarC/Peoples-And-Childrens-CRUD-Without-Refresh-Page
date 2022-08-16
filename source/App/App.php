<?php

namespace Source\App;

use Source\Core\Controller;
use Source\Core\View;
use Source\Models\Auth;
use Source\Models\CashFlow;
use Source\Models\Center;
use Source\Models\Hour;
use Source\Models\Lists;
use Source\Models\Moviment;
use Source\Models\SelfList;
use Source\Models\Store;
use Source\Models\User;
use Source\Support\HourManager;
use Source\Support\Message;
use Source\Support\Pager;

/**
 * Class App
 * @package Source\App
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

