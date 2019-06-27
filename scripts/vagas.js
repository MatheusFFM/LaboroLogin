//STORE
class Store{
    static getVagas(){
        let vagas;
        if(localStorage.getItem('vagas') === null){
            vagas = [];
        }
        else{
            vagas = JSON.parse(localStorage.getItem('vagas'));
        }
        return vagas;
    }
}

//UI 
class UI {
    static displayVagas() {
        

        const vagas = Store.getVagas();
        vagas.forEach((vaga) => UI.addVagaToList(vaga));
    }

    static addVagaToList(vaga){
        const list = document.querySelector('#card-list');

        const card = document.createElement('article');
        card.classList.add('card');

        card.innerHTML = 
        `<h3 id="cargo">${vaga.cargo}</h3>
        <h3>${vaga.empresa}</h3>
        <h4>${vaga.email}</h4>
        <input type="hidden" id="idvaga" value="${vaga.id}">
        <button id="detalhes" class="detalhes">detalhes</button>
        `;

        list.appendChild(card); 
    }
    static detalhes(){
        
        document.querySelector('#card-list').addEventListener('click', (e)=>{
            if(e.target.classList.contains('detalhes')){
                
                document.getElementById('textosemvaga').innerHTML = "";
                let id = e.target.previousElementSibling.getAttribute('value');
                
                let vagas = Store.getVagas();

                let vagafiltrada = vagas.find(e => e.id == id);

                UI.exibeDetalhes(vagafiltrada);
            }
        })
    }
    static exibeDetalhes(vaga){

        document.getElementById('cargo-detalhe').innerHTML = `Cargo: ${vaga.cargo}`;
        document.getElementById('empresa-detalhe').innerHTML = `Empresa: ${vaga.empresa}`;
        document.getElementById('descricao-detalhe').innerHTML = `Descrição: <p style="font-weight:normal;">${vaga.descricao}</p>`;
        document.getElementById('requisitos-detalhe').innerHTML = `Requisitos: <p style="font-weight:normal;">${vaga.requisitos}</p>`;
        document.getElementById('email-detalhe').innerHTML = `Email para contato: <p style="color:#5C63AB;display: inline;"> ${vaga.email}</p>`;
        

    }
}


//Evento: chama display vagas.
document.addEventListener('DOMContentLoaded', UI.displayVagas);

//Evento: chama ação do botao detalhes
document.querySelector('#card-list').addEventListener('click', UI.detalhes());

// Filter
// Get input element
let filtroInput = document.getElementById('filtroInput');

//Evento keyup
filtroInput.addEventListener('keyup', filtrarVaga);

function filtrarVaga(){
    // Get value of input
    let valorInput = document.getElementById('filtroInput').value.toUpperCase();

    // Get names ul
    let main = document.getElementById('card-list');
    // Get lis from ul
    let listaDeCargo = main.querySelectorAll('h3#cargo');

    // Loop through collection-item lis
    for(let i = 0;i < listaDeCargo.length;i++){
    let h3 = listaDeCargo[i].innerHTML;
    // If matched
    if(h3.toUpperCase().indexOf(valorInput) > -1){
        listaDeCargo[i].style.display = '';
    } else {
        listaDeCargo[i].style.display = 'none';
    }
    }

}

