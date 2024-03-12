window.addEventListener('load',()=>{
    let botao = document.querySelector('#botao-adicionar')
    botao.addEventListener('click', ()=>{
        var inputTarefa = document.querySelector('#input').value
        var tarefasOl = document.querySelector('.tarefas')
        var tarefaLista = document.createElement('li')
        var checkbox = document.createElement('input')
        tarefaLista.textContent = inputTarefa 
        checkbox.type = "checkbox"
        checkbox.classList.add('checkbox')
        tarefasOl.appendChild(tarefaLista)
        tarefaLista.appendChild(checkbox)
    
        document.querySelector('#input').value = ''

    })
    
    
    document.querySelector('.checkbox').addEventListener('click', ()=>{
        alert('ola mundo')
        tarefaLista.classList.add('check')
    })
})