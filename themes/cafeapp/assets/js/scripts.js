// VARIÁVEIS GLOBAIS
const containerPeople = document.querySelector('.container_people');
const textAreaContainer = document.querySelector('.textContainer');

// BEGIN HTML HANDLES
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
// END HTML HANDLES

// BEGIN EVENTS FRONTEND
document.addEventListener('click', (e) => {
    // PEGA O JSON ARMAZENADO NO DOM
    const objectPeoples = JSON.parse(textAreaContainer.textContent)

    e.preventDefault();
    let clicked = e.target;

    // BEGIN ADD PEOPLE
    if (clicked.classList.contains('includePeople')) {
        let name = document.querySelector('#name').value;

        // VERIFICA SE JÁ EXISTE ESSE CADASTRO DE PESSOA
        let verifyPeople = false;
        objectPeoples.pessoas.forEach((pessoas) => {
            verifyPeople = pessoas.nome.includes(name);
        })

        // ADICIONA PESSOA SE EXISTIR
        if (verifyPeople) {
            alert('Você já cadastrou essa pessoa, por favor digite outro nome.')
        } else {
            objectPeoples.pessoas.push({
                'nome': name,
                'filhos': []
            });
        }
        buildFrontByJson(objectPeoples)
    }
    // END ADD PEOPLE

    // BEGIN ADD CHILDREN
    if (clicked.classList.contains('includeChildren')) {
        let nameChildren = window.prompt('Digite o nome do filho.');
        let nameParent = e.target.parentNode.firstElementChild.firstElementChild.textContent;
        objectPeoples.pessoas.forEach((element, index, array) => {
            if (element.nome === nameParent) {
                element.filhos.push(nameChildren)
            }
        });
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

    textAreaContainer.textContent = JSON.stringify(objectPeoples, undefined, 8);
});
// END EVENTS FRONTEND

// BEGIN FUNCTIONS
/**
 * FUNÇÃO CONTRUIR OS CONTAINERS DE PESSOAS E FILHOS APARTIR DO JSON ARMAZENADO NO DOM
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
 * FUNÇÃO PARA LIMPAR O ANTIGO ESTADO DOS NÓS DE PESSOAS ADICIONADAS
 */
const clearPeopleScreen = () => {
    // LIMPANDO O FRONTEND
    const peopleNodes = document.querySelectorAll('.people');
    peopleNodes.forEach(people => people.remove());
}
//END FUNCTIONS
