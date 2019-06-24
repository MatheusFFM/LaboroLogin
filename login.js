
function initiallogin() {
    // Adiciona funções para tratar os eventos 

        //Verifica se a senha é igual

        let achou;

        achou = 0;

        if($("#inputNome").val() == "" || $("#inputSenha").val() == "")
        {
            alert("Preencha o formulário corretamente.");
            return;
        }
       
        for(i=0; i<dbperfis.data.length; i++) {
        if($("#inputNome").val() == dbperfis.data[i].nome || $("#inputNome").val() == dbperfis.data[i].email ){
         if($("#inputSenha").val() == dbperfis.data[i].websenha){
            achou = 1;
            break;  
            }
          else{
            alert("Usuário ou senha errados");
            return;
          }  
         }
       }

       if(achou == 1){
           window.location.href='Laboro.html';
       }

       if(achou == 0){
        alert("Usuário ou senha errados");
       }

}
