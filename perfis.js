// declara um conjunto fake de dados para contatos
var dbfakeperfis = {
    "data": [
        {
            "id": 1,
            "nome": "Matheus",
            "email": "matheusfelipeferreiramartins@gmail.com",
            "Confirmasenha": "21",
            "websenha": "21"
        },
        
    ]
}

// Caso exista no Local Storage, recupera os dados salvos
var dbperfis = JSON.parse(localStorage.getItem('dbperfis'));
if (!dbperfis) {
    dbperfis = dbfakeperfis
};


function insertContatoPerfil(contato) {
    // Calcula novo Id a partir do último código existente no array
    let novoId = dbperfis.data[dbperfis.data.length - 1].id + 1;
    let novoContato = {
        "id": novoId,
        "nome": contato.nome,
        "email": contato.email,
        "Confirmasenha": contato.Confirmasenha,
        "websenha": contato.websenha
    };

    // Insere o novo objeto no array
    dbperfis.data.push(novoContato);
    alert("Contato inserido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('dbperfis', JSON.stringify(dbperfis));
}

