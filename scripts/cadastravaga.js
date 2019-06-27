// vaga class: Represena uma vaga
class Vaga {
    constructor(id,cargo, empresa, email, descricao, requisitos){
        this.id = id;
        this.cargo = cargo;
        this.empresa = empresa;
        this.email = email;
        this.descricao = descricao;
        this.requisitos = requisitos;
    }
}
// UI, controla elementos na UI.
class UI {
    static displayVagas() {
        

        const vagas = Store.getVagas();
        vagas.forEach((vaga) => UI.addVagaToList(vaga));
    }

    static addVagaToList(vaga){
        const list = document.querySelector('#card-view');

        const card = document.createElement('div');
        card.classList.add('vaga-cadastradas--filho');

        card.innerHTML = 
        `<strong class="text-card col col-md-4">Cargo: ${vaga.cargo}</strong>
        <p class="text-card col col-md-8 "><strong>Empresa</strong>: ${vaga.empresa}</p>
        <p class="text-card col  "><strong>Email</strong>: ${vaga.email}</p>
        <a href="#" class="btn btn-danger btn-sm delete botaodelete">Deletar</a>
        <input type="hidden" id="idvaga" value="${vaga.id}">
        <a href="#" id="editar" class="editar btn btn-sm btn-success botaoeditar">Editar</a>
        </div>
        `;

        list.appendChild(card); 
    }

    static alertMessage(classN, Message){
    const div = document.createElement('div');
        div.className = `${classN} col-md-6 mt-4`;
        div.innerText = Message;

        document.querySelector('#vagas-form').appendChild(div);
    }

    static clearAlert(){
        setTimeout(() => 
            document.querySelector('.alert').remove(),
        3000);
    }
    static delete(el){
        if(el.classList.contains('delete')){
            el.parentElement.remove();
            
        }
    } 

    static clearForm(){
        document.querySelector('#cargo').value ='';
        document.querySelector('#empresa').value ='';
        document.querySelector('#email').value ='';
        document.querySelector('#descricao').value ='';
        document.querySelector('#requisitos').value ='';
    }
}

// Store Class: faz a parte do banco (localstorage)

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
    static addVaga(vaga){
       const vagas = Store.getVagas();
        vagas.push(vaga);
       localStorage.setItem('vagas', JSON.stringify(vagas));
    }
    static removeVaga(data){
        const vagas = Store.getVagas();
        vagas.forEach((vaga, index)=>{
            if(vaga.data === data){
                vagas.splice(index, 1);
            }
        });
        localStorage.setItem('vagas', JSON.stringify(vagas));
    }
}

//Evento: Mostra vagas (coloca as vagas na tela)
document.addEventListener('DOMContentLoaded', UI.displayVagas);

//Evento: Adiciona uma vaga ao banco
document.querySelector('#vagas-form').addEventListener('submit', (e) =>{

        
        // Prevent actual submit
        e.preventDefault();
        
        // Recupera valores do form
        const cargo =  document.querySelector('#cargo').value;
        const empresa =  document.querySelector('#empresa').value;
        const email =  document.querySelector('#email').value;
        const descricao =  document.querySelector('#descricao').value;
        const requisitos =  document.querySelector('#requisitos').value;
    
    
        //Validação
        if(cargo === '' || empresa === '' || requisitos === ''){
            UI.alertMessage('alert alert-danger','É necessário preencher cargo, empresa e requisitos.');
            UI.clearAlert();
        }
        else{
                
                //inicializa o id antes de instanciar
                let vagas = Store.getVagas();
                var id = (vagas.length - 1) + 1;
               
                const vaga = new Vaga(id,cargo,empresa,email,descricao,requisitos);
                
                UI.addVagaToList(vaga);
                
                Store.addVaga(vaga);
                
                UI.alertMessage('alert alert-success','Vaga adicionada.');
                
                UI.clearAlert();
                
                UI.clearForm();
    
                //document.querySelector('#submit-vaga').setAttribute('type','submit');
                //document.querySelector('#editar-vaga').setAttribute('type','hidden');
    }

});

//Evento: Editar uma vaga
document.querySelector('#card-view').addEventListener('click', (e)=>{
    if(e.target.classList.contains('editar')){
        let vagas = Store.getVagas();
        let id = e.target.previousElementSibling.getAttribute('value');
        let vagaEditavel = vagas.find(vaga => vaga.id = id);
        document.querySelector('#cargo').value = vagaEditavel.cargo;
        document.querySelector('#empresa').value = vagaEditavel.empresa;
        document.querySelector('#email').value = vagaEditavel.email;
        document.querySelector('#descricao').value = vagaEditavel.descricao;
        document.querySelector('#requisitos').value = vagaEditavel.requisitos;
       
        document.querySelector('#submit-vaga').setAttribute('type','hidden');
        document.querySelector('#editar-vaga').setAttribute('type','submit');

        let vagaseditadas = vagas.map((v) => {
            if(v.id == id){
                
                v.cargo = "cargo editado";
            }
        });
        console.log(vagaseditadas);
       
        
        
    }
    
})

//Evento: deleta a card
document.querySelector('#card-view').addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
    Store.removeVaga(e.target.previousElement);
    UI.delete(e.target);
    }
});