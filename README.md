# CRUD SIMPLES DE CADASTRO DE PESSOAS E FILHOS 📝

## Caso você queira analisar o projeto em sua maquina, siga este passo a passo de instalação com DOCKER: 😁


<h3>Dependências</h3>

```
PHP 7.2
Composer
Docker
linux
```

### Clone o repositório😎

```
 cd <pasta que deseja>
 git clone https://github.com/LuizEscobarC/crud-turim.git
```

### Acesse o diretorio🤓
#### certifique-se seas portas 7000 e 80 estão disponíveis
```
cd <pasta que clonou> && docker-compose up
```
![image](https://user-images.githubusercontent.com/54407649/185025745-73262602-83f2-4711-945b-c707dc0bd626.png)


### Instale as dependências�
```
composer install
```
![image](https://user-images.githubusercontent.com/54407649/185025920-6f0a6c85-2a4d-47e9-af1d-fbd0e9726625.png)


### A aplicação, por padrão, fica na porta:🤗
```
apache : 80:80
MariaDB: 7000:3306
```

### Restaure o Banco de dados

Importe todo o banco no seu gerenciador de banco de dados...
```
<pasta que clonou>\crud-turim\dump-turim-DB.sql
```

### Configure o acesso ao BANCO no caminho:
```
nano <pasta que clonou>\crud-turim\source\Boot\Config.php
```
![image](https://user-images.githubusercontent.com/54407649/185025093-d3a67c31-769c-4775-986d-70f9decf94a6.png)


### Configure a url base localhost no arquivo de caminho <small>Logo abaixo das config do banco</small>:
```
nano <pasta que clonou>\crud-turim\source\Boot\Config.php
```
![image](https://user-images.githubusercontent.com/54407649/185025169-e2ba57cc-2d01-4b69-9f40-3285eb599102.png)


## Imagens do projeto 💻

#### Dashboard coma  apresentação de um grafico realtime, onde se há um lançamento, no mesmo segundo se movimenta.
<img style="width: 600px; height: 300px" src="https://user-images.githubusercontent.com/54407649/161637293-7018eba8-b4d2-4c73-8d8f-14bf22d5f7d2.png">
