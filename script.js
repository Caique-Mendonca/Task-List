let mensagemErro = document.querySelector('#error-message')
let tarefasConcluidas = []
let todasTarefas = []
let contador = 0

window.onload = function(){
    try{
        let tarefasArmazenadas = localStorage.getItem('tarefas')
        if(tarefasArmazenadas){
            todasTarefas = JSON.parse(tarefasArmazenadas)
            contador = todasTarefas.length
            exibirTarefasSalvas()
        }
    }catch(error){
        let mensagemErro = document.querySelector('#error-message');
        mensagemErro.innerText = error;
        console.error(error)
    }
}
function exibirTarefasSalvas() {
    let tarefasOl = document.querySelector('.tarefas')
    tarefasOl.innerHTML = '' // Limpar a lista antes de exibir as tarefas armazenadas
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

function deletarTarefa(id) {
    let tarefaHtml = document.querySelector(`#${id}`)
    tarefaHtml.remove()
    
    // Remover a tarefa do array todasTarefas
    todasTarefas = todasTarefas.filter(tarefa => tarefa.id !== id);
    
    // Atualizar o localStorage com as tarefas atualizadas
    localStorage.setItem('tarefas', JSON.stringify(todasTarefas));
    
}
function conferirTarefa(id) {
    let tarefaConcluida = document.querySelector(`#${id}`)
    tarefaConcluida.classList.toggle("tarefa-estilizada")
    let tarefa = todasTarefas.find(t => t.id === id)
    if (tarefa){
        // Atualizar o estado de conclusão da tarefa
        tarefa.concluida = !tarefa.concluida
        // Atualizar o localStorage com tarefas atualizadas
        localStorage.setItem('tarefas', JSON.stringify(todasTarefas))
    }
}

let removerTodosSelecionados = document.querySelector('#botao-excluir-selecionados')
removerTodosSelecionados.addEventListener('click', ()=>{
    try {
        tarefasConcluidas.forEach((item)=>{
            item.remove()
        })
        if(tarefasConcluidas.length == 0){
            throw "Não há nenhuma tarefa selecionada"
        }   
    } catch (error) {
        let mensagemErro = document.querySelector('#error-message')
        mensagemErro.innerText = error
    }
})

let removerTodasTarefas = document.querySelector('#botao-excluir-todos')
removerTodasTarefas.addEventListener('click', ()=>{
    try {
        todasTarefas.forEach((item)=>{
            item.remove()
        })
        contador = 0
        if(todasTarefas.length == 0){
            throw "Não existe nenhuma tarefa para excluir"
        }
    } catch (error) {
        let mensagemErro = document.querySelector('#error-message')
        mensagemErro.innerText = error  
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
        
        if (inputTarefa == "") {
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
        
        let novaTarefa = {
            numero: contador,
            id: `tarefa-${contador}`,
            texto: inputTarefa,
            concluida: false
        }

        todasTarefas.push(novaTarefa)

        // Adicionar a tarefa ao localStorage
        localStorage.setItem('tarefas', JSON.stringify(todasTarefas))

        document.querySelector('#input').value = ''
        // Limpar o campo de entrada após adicionar a tarefa
        botaoDeletar.addEventListener('click', ()=>{
            document.querySelector('.tarefas li').style.display = "none"
        })
    }catch(error){
        let mensagemErro = document.querySelector('#error-message')
        mensagemErro.innerText = error
    }
}
