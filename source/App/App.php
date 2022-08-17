<?php

namespace Source\App;

use Source\Core\Controller;
use Source\Core\Model;
use Source\Models\Children;
use Source\Models\People;

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

    /**
     * SAVE PEOPLE
     */
    public function create(?array $data): void
    {
        $peoples = json_decode($data['dataJson'])->pessoas;

        // VERIFICA SE ESTÁ VÁZIO
        if (empty($peoples)) {
            $this->call(400)->back(['message' => 'Digite Pelo menos uma pessa!']);
            return;
        }

        // SALVA AS PESSOAS E OS FILHOS
        (new People())->destroyAll();
        foreach ($peoples as $people) {

            // REALIZA AS REGRAS DE NEGÓCIO DE CADASTRO DE PESSOAS E FILHOS
            $response = (new People())->storePeople($people);

            // SE FOR UMA INSTANCIA DEU ULGUM ERRO AO SALVAR
            if ($response instanceof Model) {
                $this->call(500)->back(['message' => "Erro ao cadastrar mensagem: {$response->fail()->getMessage()} | {$response->message()}"]);
                return;
            }
        }
        // SE DEU TUDO CERTO
        $this->call(200)->back(['message' => 'Pessoas cadastradas com sucesso!']);
    }

    /**
     * READ PEOPLE
     */
    public function read()
    {
        $peoples = (new People())->findAll();
        $response = new \stdClass;
        $this->call(200)->back(['pessoas' => $response->pessoas = $peoples]);
    }
}

