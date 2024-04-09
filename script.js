let contador = 0
function deletarTarefa(id) {
    let tarefaHtml = document.querySelector(`#${id}`)
    tarefaHtml.remove()
}
window.addEventListener('load',()=>{
    let botao = document.querySelector('#botao-adicionar')
    botao.addEventListener('click', adicionarTarefa)
    

    function adicionarTarefa(){
        let inputTarefa = document.querySelector('#input').value
        let tarefasOl = document.querySelector('.tarefas')
        let tarefaLista = document.createElement('li')
        let botaoDeletar = document.createElement('button')
        tarefaLista.classList.add('tarefa-li')
        tarefaLista.innerHTML += `${inputTarefa} 
        <div>
            <input type="checkbox" class="checkbox">
            <button class="botao-remover" onclick="deletarTarefa('${'tarefa-'+contador}')">
                    <i class='fa-solid fa-trash-can'></i>
                </button>
        </div>` 
        tarefaLista.id = `tarefa-${contador}`
        contador++  
        tarefasOl.appendChild(tarefaLista)

        document.querySelector('#input').value = ''

        botaoDeletar.addEventListener('click', ()=>{
            document.querySelector('.tarefas li').style.display = "none"
        })
    }

    

})