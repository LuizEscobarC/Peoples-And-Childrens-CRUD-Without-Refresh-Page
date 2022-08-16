<?php

namespace Source\Core;


/**
 * CLASSE CONTROLADORA
 *
 * @author Luiz Paulo Escobal
 */
class Controller
{
    /** @var View */
    protected $view;

    protected $response;

    /**
     * Controller constructor.
     * @param string|null $pathToViews
     */
    public function __construct(string $pathToViews = null)
    {
        $this->view = new View($pathToViews);
    }

    /**
     * @param int $code
     * @param string|null $type
     * @param string|null $message
     * @param string $rule
     * @return Controller
     */
    protected function call(int $code, string $type = null, string $message = null, string $rule = "error"): Controller
    {
        http_response_code($code);

        if (!empty($type)) {
            $this->response = [
                $rule => [
                    "type" => $type,
                    "message" => (!empty($message) ? $message : null)
                ]
            ];
        }
        return $this;
    }

    /**
     * @param array|null $response
     * @return Controller
     */
    protected function back(array $response = null): Controller
    {
        if (!empty($response)) {
            $this->response = (!empty($this->response) ? array_merge($this->response, $response) : $response);
        }


        echo json_encode($this->response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        return $this;
    }
}

?>
