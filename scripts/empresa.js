// Empresa class
class Empresa {
    constructor(id, senha,nome, localidade){
        this.id = id;
        this.senha = senha;
        this.nome = nome;
        this.localidade = localidade;
        
    }
}

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
    static addEmpresa(empresa){
       const empresas = Store.getEmpresas();
        empresas.push(empresa);
       localStorage.setItem('empresas', JSON.stringify(empresas));
    }
    static removeEmpresa(id){
        const empresas = Store.getEmpresas();
        empresas.Find((empresa)=> { if(empresa.id == id) empresa = null;});
        localStorage.setItem('empresa', JSON.stringify(empresas));
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
        document.querySelector('#nome').value ='';
        document.querySelector('#localidade').value ='';
        document.querySelector('#senha').value ='';
       
    }
}


//Event: Cadastro - adiciona uma empresa ao banco
document.querySelector('#teste-form').addEventListener('submit', (e) =>{
    // Prevent actual submit
    e.preventDefault();
    // Recupera valores do form
    const nome =  document.querySelector('#nome').value;
    const localidade =  document.querySelector('#localidade').value;
    const senha =  document.querySelector('#senha').value;
    


    //Validação
    if(nome === '' || localidade === ''  || senha === ''){
        UI.alertMessage('alert alert-danger','É necessário preencher o nome, localidade e senha.');
        UI.clearAlert();
    }
    else{
            let empresas = Store.getEmpresas();
            var id = (empresas.length - 1) + 1;
            //instancia a empresa
            const empresa = new Empresa(id,senha,nome,localidade);
            
           
            //adiciona a vaga ao banco Store
            Store.addEmpresa(empresa);
            //Mensagem de alerta de sucesso
            UI.alertMessage('alert alert-success','Empresa cadastrada.');
            //clear alert
            UI.clearAlert();
            //clear form
            UI.clearForm();

            setTimeout(() => 
            window.location = "/cadastrarvaga.html",
            2000);
    }
            
    
});
