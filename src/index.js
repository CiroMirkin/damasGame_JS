"use strinct"

const table = document.getElementById('table')

const tableFragment = document.createDocumentFragment()
let isRedCell = false
for (let y = 0; y < 10; y++) {
    const row = document.createElement('UL')
    row.classList.add('row')
    
    for (let x = 0; x < 10; x++) {
        const cell = document.createElement('LI')
        cell.classList.add('cell')
        cell.classList.add(isRedCell ? 'cell--red' : 'cell--black')
        row.appendChild(cell)
        isRedCell = !isRedCell
    }
    isRedCell = !isRedCell
    tableFragment.appendChild(row)
}
table.appendChild(tableFragment)