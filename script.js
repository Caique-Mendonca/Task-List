let mensagemErro = document.querySelector('#error-message')
let tarefasConcluidas = []
let todasTarefas = []
let contador = 0

// quando a pagina carregar irá o json armazenada em 'tarefas'
window.onload = function(){
    try{
        let tarefasArmazenadas = localStorage.getItem('tarefas')
        if(tarefasArmazenadas){
            todasTarefas = JSON.parse(tarefasArmazenadas)
            contador = todasTarefas.length
            exibirTarefasSalvas()
        }
    }catch(error){
        menssagemDeErro(error)
    }
}
function exibirTarefasSalvas() {
    let tarefasOl = document.querySelector('.tarefas')
    tarefasOl.innerHTML = '' // Limpar a lista antes de exibir as tarefas armazenadas
    // Para cada tarefa armazenada na local storage ele vai exibir para o usuário 
    todasTarefas.forEach((tarefa)=>{
        let tarefaLista = document.createElement('li')
        tarefaLista.id = tarefa.id
        tarefaLista.classList.add('tarefa-li')
        if (tarefa.concluida){
            tarefaLista.classList.add('tarefa-estilizada')
        }
        tarefaLista.innerHTML = `${tarefa.texto} 
        <div>
            <input type="checkbox" class="checkbox" onclick="conferirTarefa('${tarefa.id}')" ${tarefa.concluida ? 'checked' : ''}>
            <button class="botao-remover" onclick="deletarTarefa('${tarefa.id}')">
                <i class='fa-solid fa-trash-can'></i>
            </button>
        </div>`
        tarefasOl.appendChild(tarefaLista)
    })
}

// Função para deletar apenas uma única tarefa selecionada pelo usuário na lixeirinha
function deletarTarefa(id) {
    try{
        let tarefaHtml = document.querySelector(`#${id}`)
        // removendo o HTML dela
        tarefaHtml.remove()
        
        // Remover a tarefa do array todasTarefas
        todasTarefas = todasTarefas.filter(tarefa => tarefa.id !== id);
        
        // Atualizar o localStorage com as tarefas atualizadas e sem a tarefa removida
        localStorage.setItem('tarefas', JSON.stringify(todasTarefas));
    }catch (error) {
        menssagemDeErro(error)
    }
    
}
function conferirTarefa(id) {
    try{
        let tarefaConcluida = document.querySelector(`#${id}`)
        tarefaConcluida.classList.toggle("tarefa-estilizada")
        let tarefa = todasTarefas.find(t => t.id === id)
        if (tarefa){
            // Atualizar o estado de conclusão da tarefa
            tarefa.concluida = !tarefa.concluida
            // Atualizar o localStorage com tarefas atualizadas
            localStorage.setItem('tarefas', JSON.stringify(todasTarefas))
        }
    }catch (error) {
        menssagemDeErro(error)
    }
}

// Remover todos os itens selecionados
let removerTodosSelecionados = document.querySelector('#botao-excluir-selecionados')
removerTodosSelecionados.addEventListener('click', ()=>{
    try {
        todasTarefas = todasTarefas.filter(tarefa => tarefa.concluida == false)
        // Atualizar o localStorage com as tarefas atualizadas
        localStorage.setItem('tarefas', JSON.stringify(todasTarefas));
        // essa parte por algum motivo as tarefas checadas so estavam sendo removidas se fizesse um reload da pagina
        location.reload()
    } catch (error) {
        menssagemDeErro(error)
    }
})

// Remover todas as tarefas
let removerTodasTarefas = document.querySelector('#botao-excluir-todos')
removerTodasTarefas.addEventListener('click', ()=>{
    try {
        if(!todasTarefas.length){
            throw "Não existe nenhuma tarefa para excluir"
        }
        // remover todas as tarefas do json da local storage usando um while e dando um .pop() em cada tarefa
        while(todasTarefas.length){
            todasTarefas.pop()
        }
        // Atualizar o json do localStorage, com as tarefas vazias, tornando-a vazia
        localStorage.setItem('tarefas', JSON.stringify(todasTarefas))
        // Removendo o HTML da lista de tarefas 
        document.querySelector('.tarefas').innerHTML = ""
        contador = 0
    } catch (error) {
        menssagemDeErro(error)
    }
})

let botao = document.querySelector('#botao-adicionar')
botao.addEventListener('click', adicionarTarefa)
function adicionarTarefa(){
    try{
        let inputTarefa = document.querySelector('#input').value
        let tarefasOl = document.querySelector('.tarefas')
        let tarefaLista = document.createElement('li')
        let botaoDeletar = document.createElement('button')
        
        mensagemErro.innerText = ""
        
        if (!inputTarefa) {
            throw "O campo não pode estar vazio"
        }
        
        tarefaLista.classList.add('tarefa-li')
        
        contador++ 
        
        tarefaLista.innerHTML += `${inputTarefa} 
        <div>
            <input type="checkbox" class="checkbox" onclick="conferirTarefa('${'tarefa-'+contador}')">
            <button class="botao-remover" onclick="deletarTarefa('${'tarefa-'+contador}')">
                <i class='fa-solid fa-trash-can'></i>
            </button>
        </div>` 
        tarefaLista.id = `tarefa-${contador}`
        
        tarefasOl.appendChild(tarefaLista)
        
        // Criando um objeto com as propriedades da tarefa criada para transferir para o json do localStorage
        let novaTarefa = {
            numero: contador,
            id: `tarefa-${contador}`,
            texto: inputTarefa,
            concluida: false
        }
        // Adicionando a tarefa no json do localStorage
        todasTarefas.push(novaTarefa)

        // Adicionar a tarefa ao localStorage
        localStorage.setItem('tarefas', JSON.stringify(todasTarefas))

        document.querySelector('#input').value = ''
        // Limpar o campo de entrada após adicionar a tarefa
        botaoDeletar.addEventListener('click', ()=>{
            document.querySelector('.tarefas li').style.display = "none"
        })
    }catch(error){
        menssagemDeErro(error)
    }
}
// Exibir uma msg de error caso algo dê errado
function menssagemDeErro(error) {
    let mensagemErro = document.querySelector('#error-message')
    mensagemErro.innerText = error
    console.error(error)
}
