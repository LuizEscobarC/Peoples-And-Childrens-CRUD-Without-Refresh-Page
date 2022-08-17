<?php

/**
 * DATABASE
 */
define("CONF_DB_HOST", "arrecadacao");
define("CONF_DB_USER", "root");
define("CONF_DB_PASS", "toor");
define("CONF_DB_NAME", "turim");


/**
 * PROJECT URLs
 */
define("CONF_URL_BASE", "http://www.localhost");
define("CONF_URL_TEST", "http://www.localhost");

/**
 * SITE
 */
define("CONF_SITE_NAME", "IH SISTEMAS");
define("CONF_SITE_TITLE", "Sistema");
define("CONF_SITE_DESC",
    "O CafeControl é um gerenciador de contas simples, poderoso e gratuito. O prazer de tomar um café e ter o controle total de suas contas.");
define("CONF_SITE_LANG", "pt_BR");
define("CONF_SITE_DOMAIN", "ihsistemas.com");

/**
 * DATES
 */
define("CONF_DATE_BR", "d/m/Y H:i:s");
define("CONF_DATE_APP", "Y-m-d");

/**
 * PASSWORD
 */
define("CONF_PASSWD_MIN_LEN", 8);
define("CONF_PASSWD_MAX_LEN", 40);
define("CONF_PASSWD_ALGO", PASSWORD_DEFAULT);
define("CONF_PASSWD_OPTION", ["cost" => 10]);

/**
 * MESSAGE
 */
define("CONF_MESSAGE_CLASS", "message");
define("CONF_MESSAGE_INFO", "info icon-info");
define("CONF_MESSAGE_SUCCESS", "success icon-check-square-o");
define("CONF_MESSAGE_WARNING", "warning icon-warning");
define("CONF_MESSAGE_ERROR", "error icon-warning");

/**
 * VIEW
 */
define("CONF_VIEW_EXT", "php");
define("CONF_VIEW_THEME", "cafeweb");
define("CONF_VIEW_APP", "app");
