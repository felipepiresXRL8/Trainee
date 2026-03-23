class Tarefa {
    public data: Date;
    public concluida: boolean;

    constructor(public titulo: string, public descricao: string) {
        this.data = new Date();
        this.concluida = false;
    }

    renderizar(): HTMLElement {
        const card = document.createElement('div');
        card.classList.add('task-card');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        checkbox.addEventListener('change', () => {
            this.concluida = checkbox.checked;
            card.classList.toggle('concluida');
        });

        const dataFormatada = this.data.toLocaleString('pt-BR');

        card.innerHTML = `
            <div class="card-info">
                <h3>${this.titulo}</h3>
                <p>${this.descricao}</p>
                <small>Criado em: ${dataFormatada}</small>
            </div>
        `;

        card.prepend(checkbox);

        return card;
    }
}

const btnAdicionar = document.getElementById('botao') as HTMLButtonElement;
const inputTit = document.getElementById('input-titulo') as HTMLInputElement;
const inputDesc = document.getElementById('input-descricao') as HTMLTextAreaElement;
const listaContainer = document.getElementById('listadetarefas') as HTMLDivElement;

btnAdicionar.addEventListener('click', () => {
    const titulo = inputTit.value;
    const descricao = inputDesc.value;

    if (titulo.trim() === "") {
        alert("Por favor, insira um título");
        return;
    }

    const novaTarefa = new Tarefa(titulo, descricao);
    listaContainer.appendChild(novaTarefa.renderizar());

    inputTit.value = "";
    inputDesc.value = "";
});