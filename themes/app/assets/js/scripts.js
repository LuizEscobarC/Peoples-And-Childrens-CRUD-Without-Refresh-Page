// VARIÁVEIS GLOBAIS
const containerPeople = document.querySelector('.container_people');
const textAreaContainer = document.querySelector('.textContainer');

// BEGIN HTML VAR HANDLES
let nodePeople = `
    <section data-section="{{name}}" class="people">
        <header>
            <p>{{name}}</p>
        </header>
        <div class="btn">
            <button data-name="{{name}}" class="removePeople">Remover</button>
        </div>
        {{childrens}}
        <button class="includeChildren button_add_people">Adicionar Filho</button>
    </section>
`;

let childrenNode = `
   <div data-section="{{name}}" class="children">
       <header>
           &nbsp;&nbsp;-<p>{{name}}</p>
       </header>
       <div class="btn">
           <button data-children="{{name}}" data-father="{{father}}" class="removeChildren">Remover Filho</button>
       </div>
   </div>
`;
// END HTML VAR HANDLES

// BEGIN EVENTS FRONTEND
/**
 * EVENTO RESPONSÁVEL POR CAPTURAR TODOS OS CLIQUES DA PAGINA E CENTRALIZAR
 */
document.addEventListener('click', (e) => {
    // PEGA O JSON ARMAZENADO NO DOM
    let objectPeoples = JSON.parse(textAreaContainer.textContent)

    e.preventDefault();
    let clicked = e.target;

    // BEGIN ADD PEOPLE
    if (clicked.classList.contains('includePeople')) {
        let name = document.querySelector('#name').value;

        saveAndVerifyPeopleName(objectPeoples, name);

        buildFrontByJson(objectPeoples)
    }
    // END ADD PEOPLE

    // BEGIN ADD CHILDREN
    if (clicked.classList.contains('includeChildren')) {
        let childrenName = window.prompt('Digite o nome do filho.');
        let parentName = e.target.parentNode.firstElementChild.firstElementChild.textContent;

        // VALIDA NOME DE PESSOA
        saveAndVerifyChildrenName(objectPeoples, childrenName, parentName)


        buildFrontByJson(objectPeoples)
    }
    // END ADD CHILDREN

    // BEGIN DELETE PEOPLE
    if (clicked.classList.contains('removePeople')) {
        const namePeople = clicked.dataset.name;
        objectPeoples.pessoas.forEach((element, index, array) => {
            // DELETA A PESSOA CLICADA
            if (element.nome === namePeople) {
                array.splice(index, 1);
            }
        })
        buildFrontByJson(objectPeoples)
    }
    // END DELETE PEOPLE

    // BEGIN DELETE CHILDREN
    if (clicked.classList.contains('removeChildren')) {
        const nameFather = clicked.dataset.father;
        const nameChildren = clicked.dataset.children;
        objectPeoples.pessoas.forEach((element, index, array) => {
            // PEGA CHAVE E O BOOLEANDO SE EXISTIR ESSE FILHO NO PAI
            let keyChildren = element.filhos.indexOf(nameChildren);
            let bool = element.filhos.includes(nameChildren);

            // VERIFICA E DELETA O FILHO DE UMA PESSOA ESPECIFICA
            if (element.nome === nameFather && bool) {
                element.filhos.splice(keyChildren, 1);
            }
        })
        buildFrontByJson(objectPeoples)
    }
    // END DELETE CHILDREN

    // BEGIN BACKEND AJAX
    if (clicked.classList.contains('submit')) {
        const url = clicked.dataset.url;
        const method = clicked.dataset.method;
        let data = null;
        let contentType = 'application/json';

        // CASO SEJA GRAVAR (POST)
        if (method === 'POST') {
            data = new URLSearchParams(new FormData(document.querySelector('form')));
            contentType = 'application/x-www-form-urlencoded'
        }

        ajax(url, data, method, contentType)
            .then((response) => {
                if (response.message) {
                    alert(response.message);
                }

                // SE HOUVER DADOS PARA SEREM CARREGADOR
                if (response.pessoas) {
                    objectPeoples = response;
                }
                buildFrontByJson(objectPeoples);
                // ATUALIZA O JSON DO TEXTAREA
                textAreaContainer.textContent = JSON.stringify(objectPeoples, undefined, 8);

            });
    }
    // END BACKEND AJAX

    textAreaContainer.textContent = JSON.stringify(objectPeoples, undefined, 8);
});
// END EVENTS FRONTEND

// BEGIN FUNCTIONS
/**
 * FUNÇÃO RESPONSÁVEL POR CONTRUIR OS CONTAINERS DE PESSOAS E FILHOS APARTIR DO JSON ARMAZENADO NO DOM
 * @param objectJson
 */
const buildFrontByJson = (objectJson) => {
    let peoplesToAddAtContainer = '';

    // LIMPA AS PESSOAS
    clearPeopleScreen();

    objectJson.pessoas.forEach((peopleElement) => {
        // BUILD THE PEOPLE
        let containerChildrens = '';
        let newNodePeople = nodePeople.replaceAll('{{name}}', peopleElement.nome);

        // ADICIONA FILHOS OU NÃO
        if (peopleElement.filhos.length > 0) {
            peopleElement.filhos.forEach((childrenElement) => {
                let nodeChildrens = childrenNode.replaceAll('{{name}}', childrenElement) + '\n';
                nodeChildrens = nodeChildrens.replace('{{father}}', peopleElement.nome) + '\n';
                containerChildrens += nodeChildrens;
            })
            newNodePeople = newNodePeople.replace('{{childrens}}', containerChildrens);
        } else {
            newNodePeople = newNodePeople.replace('{{childrens}}', '');
        }

        peoplesToAddAtContainer += newNodePeople + '\n';
    });
    containerPeople.insertAdjacentHTML('beforeend', peoplesToAddAtContainer);
}

/**
 * FUNÇÃO RESPONSÁVEL POR LIMPAR O ANTIGO ESTADO DOS NÓS DE PESSOAS ADICIONADAS
 */
function clearPeopleScreen() {
    // LIMPANDO O FRONTEND
    const peopleNodes = document.querySelectorAll('.people');
    peopleNodes.forEach(people => people.remove());
}

/**
 * FUNÇÃO RESPONSÁVEL POR SALVAR OS DADOS NO JSON SE FOR VÁLIDO
 * @param objectPeoples
 * @param name
 */
function saveAndVerifyPeopleName(objectPeoples, name) {
    // VERIFICA SE JÁ EXISTE ESSE CADASTRO DE PESSOA
    let isRepeated = isRepeatedPeople(objectPeoples, name);


    // ADICIONA PESSOA SE EXISTIR
    if (isRepeated) {
        alert('Você já cadastrou essa pessoa, por favor digite outro nome.')
        return;
    }

    if (isEmptyName(name)) {
        alert('Digite um nome de pessoa válido.')
        return;
    }

    objectPeoples.pessoas.push({
        'nome': name,
        'filhos': []
    });
}

/**
 * FUNÇÃO RESPONSÁVEL POR VÁLIDAR SE O NOME DO FILHO É VÁLIDO
 * @param objectPeoples
 * @param childrenName
 * @param parentName
 */
function saveAndVerifyChildrenName(objectPeoples, childrenName, parentName) {

    if (isEmptyName(childrenName)) {
        alert('Digite um nome válido para o filho.')
        return;
    }

    objectPeoples.pessoas.forEach((element, index, array) => {
        if (element.nome === parentName) {
            element.filhos.push(childrenName)
        }
    });

}

/**
 * FUNÇÃO RESPONSÁVEL POR VERIFICAR SE A PESSOA JÁ EXISTE NO JSON
 * @param objectPeoples
 * @param name
 * @returns {boolean}
 */
function isRepeatedPeople(objectPeoples, name) {
    let verifyPeople = false;

    objectPeoples.pessoas.forEach((pessoas) => {
        verifyPeople = pessoas.nome.includes(name);
    })

    return verifyPeople;
}

/**
 * FUNÇÃO RESPONSÁVEL POR VERIFICAR SE O NOME É VÁZIO
 * @param name
 * @returns {boolean}
 */
function isEmptyName(name) {
    return (name.length <= 0);
}

//END FUNCTIONS

// BEGIN AJAX FETCH
/**
 * FUNÇÃO RESPONSÁVEL POR FAZER AS REQUISIÇÕES AJAX COM A API FETCH NATIVA
 * @param url
 * @param data
 * @param method
 * @param contentType
 * @returns {Promise<any>}
 */
const ajax = async (url, data, method, contentType) => {
    const callback = await fetch(url, {
        method: method,
        body: data,
        headers: {
            'Content-Type': contentType
        }
    });
    return await callback.json();
}
// END AJAX FETCH



