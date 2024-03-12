window.addEventListener('load',()=>{
    let botao = document.querySelector('#botao-adicionar')
    botao.addEventListener('click', ()=>{
        let inputTarefa = document.querySelector('#input').value
        let tarefasOl = document.querySelector('.tarefas')
        let tarefaLista = document.createElement('li')
        let checkbox = document.createElement('input')
        tarefaLista.textContent = inputTarefa 
        checkbox.type = "checkbox"
        checkbox.classList.add('checkbox')
        tarefasOl.appendChild(tarefaLista)
        tarefaLista.appendChild(checkbox)
    
        document.querySelector('#input').value = ''

    })
    
    
    document.querySelector('.checkbox').addEventListener('click', ()=>{

        tarefaLista.classList.add('check')
    })
})