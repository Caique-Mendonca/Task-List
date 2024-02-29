let botao = document.querySelector('#botao-adicionar')
botao.addEventListener('click', ()=>{
    let inputTarefa = document.querySelector('#input').value
    let tarefasOl = document.querySelector('.tarefas')
    let tarefaLista = document.createElement('li')
    tarefaLista.textContent = inputTarefa
    tarefasOl.appendChild(tarefaLista)
    document.querySelector('#input').value = ''
})