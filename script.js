window.addEventListener('load',()=>{
    let botao = document.querySelector('#botao-adicionar')
    botao.addEventListener('click', adicionarTarefa)
    
    function adicionarTarefa(){
        let inputTarefa = document.querySelector('#input').value
        let tarefasOl = document.querySelector('.tarefas')
        let tarefaLista = document.createElement('li')
        let checkbox = document.createElement('input')
        let botaoDeletar = document.createElement('button')
        let divDaLi = document.createElement('div')

        botaoDeletar.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        botaoDeletar.classList.add('botao-remover')

        tarefaLista.classList.add('tarefa-li')
        tarefaLista.textContent = inputTarefa 
        tarefaLista.innerHTML

        checkbox.type = "checkbox"
        checkbox.classList.add('checkbox')

        tarefasOl.appendChild(tarefaLista)

        tarefaLista.appendChild(divDaLi)

        divDaLi.appendChild(checkbox)
        divDaLi.appendChild(botaoDeletar)

        document.querySelector('#input').value = ''

        botaoDeletar.addEventListener('click', ()=>{
            document.querySelector('.tarefas li').style.display = "none"
        })
    }

})