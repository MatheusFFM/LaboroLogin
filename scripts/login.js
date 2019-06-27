class Store{
    static getEmpresas(){
        let empresas;
        if(localStorage.getItem('empresas') === null){
            empresas = [];
        }
        else{
            empresas = JSON.parse(localStorage.getItem('empresas'));
        }
        return empresas;
    }
}

class UI {

    static alertMessage(classN, Message){
    const div = document.createElement('div');
        div.className = `${classN} col-md-12 mt-4`;
        div.innerText = Message;

        document.querySelector('.card-login').appendChild(div);
    }

    static clearAlert(){
        setTimeout(() => 
            document.querySelector('.alert').remove(),
        3000);
    }
 

    static clearForm(){
        document.querySelector('#usuario').value ='';
        document.querySelector('#senha').value ='';
       
    }
}


//Event: valida login
document.querySelector('#login-form').addEventListener('submit', (e) =>{
    // Prevent actual submit
    e.preventDefault();
    // Recupera valores do form
    const nome =  document.querySelector('#nome').value;
    const senha =  document.querySelector('#senha').value;
    
    let empresas = JSON.parse(localStorage.getItem('empresas'));
    
    let lista = empresas.filter(e => e.nome === nome && e.senha === senha);
    //Validação
    if(nome === '' || senha === ''){
        UI.alertMessage('alert alert-danger','É necessário preencher o nome e senha.');
        UI.clearAlert();
    }
    if(lista.length != 1){
        UI.alertMessage('alert alert-danger','Senha ou Nome incorretos.');
        UI.clearAlert();
    }
    else{
        setTimeout(() => 
            window.location = "/cadastrarvaga.html",
            1000);
    }

    
    
            
    
});