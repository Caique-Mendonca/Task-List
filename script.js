let contador = 0
let tarefasConcluidas = []
let todasTarefas = []
function deletarTarefa(id) {
    let tarefaHtml = document.querySelector(`#${id}`)
    tarefaHtml.remove()
}
function conferirTarefa(id) {
    let tarefaConcluida = document.querySelector(`#${id}`)
    tarefaConcluida.classList.toggle("tarefa-estilizada")
    tarefasConcluidas.push(tarefaConcluida)
}
window.addEventListener('load',()=>{
    let removerTodosSelecionados = document.querySelector('#botao-excluir-selecionados')
    removerTodosSelecionados.addEventListener('click', ()=>{
        tarefasConcluidas.forEach((item)=>{
            item.remove()
        })
    })

    let removerTodasTarefas = document.querySelector('#botao-excluir-todos')
    removerTodasTarefas.addEventListener('click', ()=>{
        todasTarefas.forEach((item)=>{
            item.remove()
        })
        contador = 0
    })
    let botao = document.querySelector('#botao-adicionar')
    botao.addEventListener('click', adicionarTarefa)
    function adicionarTarefa(){
        try {
            let inputTarefa = document.querySelector('#input').value
            let tarefasOl = document.querySelector('.tarefas')
            let tarefaLista = document.createElement('li')
            let botaoDeletar = document.createElement('button')
            let mensagemErro = document.querySelector('#error-message')
            mensagemErro.innerText = ""
            
            if (inputTarefa == "") {
                throw "O campo não pode estar vazio"
            }
            
            tarefaLista.classList.add('tarefa-li')
            
            contador++ 
            
            tarefaLista.innerText += `${contador}. ` 
            tarefaLista.innerHTML += `${inputTarefa} 
            <div>
                <input type="checkbox" class="checkbox" onclick="conferirTarefa('${'tarefa-'+contador}')">
                <button class="botao-remover" onclick="deletarTarefa('${'tarefa-'+contador}')">
                    <i class='fa-solid fa-trash-can'></i>
                </button>
            </div>` 
            tarefaLista.id = `tarefa-${contador}`
            
            tarefasOl.appendChild(tarefaLista)
            
            let tarefaAdicionada = document.querySelector(`#tarefa-${contador}`)
            todasTarefas.push(tarefaAdicionada)
            document.querySelector('#input').value = ''
            botaoDeletar.addEventListener('click', ()=>{
                document.querySelector('.tarefas li').style.display = "none"
            })
            
        } catch (error) {
            let mensagemErro = document.querySelector('#error-message')
            mensagemErro.innerText = error
        }
    }
})