"use strinct"

const tableGame = document.getElementById('tableGame')

const tableFragment = document.createDocumentFragment()
let isRedCell = false
for (let y = 0; y < 10; y++) {
    const row = document.createElement('UL')
    row.classList.add('row')
    
    for (let x = 0; x < 10; x++) {
        const cell = document.createElement('LI')
        cell.classList.add('cell')
        cell.classList.add(isRedCell ? 'cell--red' : 'cell--black')
        if(isRedCell && (y < 4 || y > 5)) {
            cell.innerHTML = `<div class="index-card index-card${y < 4 ? '--black' : '--red'}"></div>`
        }
        isRedCell = !isRedCell
        row.appendChild(cell)
    }
    isRedCell = !isRedCell
    tableFragment.appendChild(row)
}
tableGame.appendChild(tableFragment)