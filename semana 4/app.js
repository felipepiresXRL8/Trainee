var Tarefa = /** @class */ (function () {
    function Tarefa(titulo, descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = new Date();
        this.concluida = false;
    }
    Tarefa.prototype.renderizar = function () {
        var _this = this;
        var card = document.createElement('div');
        card.classList.add('task-card');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function () {
            _this.concluida = checkbox.checked;
            card.classList.toggle('concluida');
        });
        var dataFormatada = this.data.toLocaleString('pt-BR');
        card.innerHTML = "\n            <div class=\"card-info\">\n                <h3>".concat(this.titulo, "</h3>\n                <p>").concat(this.descricao, "</p>\n                <small>Criado em: ").concat(dataFormatada, "</small>\n            </div>\n        ");
        card.prepend(checkbox);
        return card;
    };
    return Tarefa;
}());
var btnAdicionar = document.getElementById('botao');
var inputTit = document.getElementById('input-titulo');
var inputDesc = document.getElementById('input-descricao');
var listaContainer = document.getElementById('listadetarefas');
btnAdicionar.addEventListener('click', function () {
    var titulo = inputTit.value;
    var descricao = inputDesc.value;
    if (titulo.trim() === "") {
        alert("Por favor, insira um título");
        return;
    }
    var novaTarefa = new Tarefa(titulo, descricao);
    listaContainer.appendChild(novaTarefa.renderizar());
    inputTit.value = "";
    inputDesc.value = "";
});
