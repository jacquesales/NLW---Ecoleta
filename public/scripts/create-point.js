function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(resp => resp.json() )
    .then(states => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`
        }        
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex     
    stateInput.value = event.target.options[indexOfSelectedState].text

    const urlCities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value>Selecione a cidade</option>'
    citySelect.disabled = true 

    fetch(urlCities)
    .then(resp => resp.json() )
    .then(cities => {

        for(const city of cities) {
            citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`
        }    
        citySelect.disabled = false 
    })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)


const itemsToCollect = document.querySelectorAll('.items-grid li') // pegar todos os li's
for(const item of itemsToCollect) { // para cada um 
    item.addEventListener('click', handleSelectedItem) // add uma callback function para ser executada somente quando for clicado
}

const collectedItems = document.querySelectorAll('input[name=items]') // pegar os itens que coleta

let selectedItems = [] // e armazanar no array

function handleSelectedItem(event) { // assim que clicava, a função é ativada
    const itemLi = event.target // onde o target do item clicado
    itemLi.classList.toggle('selected') // add ou tira a classe selected
    const itemId = itemLi.dataset.id // pega o id dele
    

    const alreadySelected = selectedItems.findIndex( item => { // verifica se há itens selecionados
        const itemFound = item == itemId // se sim armazena
        return itemFound
    }) 

    if (alreadySelected >= 0) { // filtra os itens selecionados: adicionando ou retirando da seleção
        const filteredItems = selectedItems.filter (item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems // do itens filtrados
    } else {
        selectedItems.push(itemId) // armazena-os
    }

    console.log('selectedItems: ', selectedItems)
    collectedItems.value = selectedItems
}


