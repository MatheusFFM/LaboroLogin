var dbfake = {
    "data": [
        {
            "id": 0,
            "Requisitos": "Conhecimento básico de C#",
            "email": "Internetwide@gmail.com",
            "Dia": "12/09/2018",
            "cargo": "Programador de C#",
            "endereco": "Belo Horizonte",
            "empresa": "PUCMinas",
            "Descricao": "Disponível",
        },
        {
            "id": 1,
            "Requisitos": "Conhecimento da metodologia Scrum",
            "email": "wetop@hotmail.com",
            "Dia": "26/05/2001",
            "cargo": "Auxiliar de gerenciamento de processos",
            "endereco": "Betim",
            "empresa": "FIAT",
            "Descricao": "Disponível",
        },
        {
            "id": 2,
            "Requisitos": "Conhecimento básico sobre C",
            "email": "ceveryday@gmail.com",
            "Dia": "2/2/2019",
            "cargo": "Analista de programas em C",
            "endereco": "Contagem",
            "empresa": "CEveryDay",
            "Descricao": "Disponível",
        },
    ]
}

var db = JSON.parse(localStorage.getItem('db'));
if (!db) {
    db = dbfake
};

function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; 
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

function insertContato(contato) {
    // Calcula novo Id a partir do último código existente no array
    let novoId = db.data[db.data.length - 1].id + 1;
    let novoContato = {
        "id": novoId,
        "Requisitos": contato.Requisitos,
        "email": contato.email,
        "Dia": contato.Dia,
        "cargo": contato.cargo,
        "endereco": contato.endereco,
        "empresa": contato.empresa,
        "Descricao": contato.Descricao,
    };

    db.data.push(novoContato);
    displayMessage("Contato inserido com sucesso");
    
    localStorage.setItem('db', JSON.stringify(db));
}

function updateContato(id, contato) {

    let index = db.data.map(obj => obj.id).indexOf(id);

    db.data[index].Requisitos = contato.Requisitos,
        db.data[index].email = contato.email,
        db.data[index].Dia = contato.Dia,
        db.data[index].cargo = contato.cargo,
        db.data[index].endereco = contato.endereco,
        db.data[index].empresa = contato.empresa,
        db.data[index].Descricao = contato.Descricao,

    displayMessage("Contato alterado com sucesso");


    localStorage.setItem('db', JSON.stringify(db));
}

function deleteContato(id) {    

    db.data = db.data.filter(function (element) { return element.id != id });

    displayMessage("Contato removido com sucesso");


    localStorage.setItem('db', JSON.stringify(db));
}
