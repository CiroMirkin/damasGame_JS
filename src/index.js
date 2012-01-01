"use strinct"

const tableGame = document.getElementById('tableGame')
const letters = [...'abcdefghij']

const getTableIds = (long) => {
    long = long || 10

    return letters.map(letter => {
        const cellsIds = []
        const rowId = `${letter}-row`

        for (let i = 0; i < long; i++) {
            cellsIds.push(`${letter}${i}-cell`)
        }

        return {
            rowId,
            cellsIds
        }
    })
}

const getInitialTableGame = () => {
    const tableFragment = document.createDocumentFragment()
    let isRedCell = false
    const tableGameIds = getTableIds()

    for (let y = 0; y < 10; y++) {
        const row = document.createElement('UL')
        row.classList.add('row')
        row.setAttribute('id', tableGameIds.at(y).rowId)

        for (let x = 0; x < 10; x++) {
            const cell = document.createElement('LI')
            const cellId = tableGameIds.at(y).cellsIds.at(x)

            cell.setAttribute('id', cellId)
            cell.classList.add('cell')
            cell.classList.add(isRedCell ? 'cell--red' : 'cell--black')

            isRedCell = !isRedCell
            row.appendChild(cell)
        }
        isRedCell = !isRedCell
        tableFragment.appendChild(row)
    }
    return tableFragment
}

const getIndexCardsInHisInitialsPositions = (tableGame) => {
    let isRedCell = false

    for (let y = 0; y < 10; y++) {
        const row = tableGame.children.item(y)

        for (let x = 0; x < 10; x++) {
            const cell = row.children.item(x)
            const indexCardId = Date.now().toString(14) + Math.random().toString(34)

            if (isRedCell && (y < 4 || y > 5)) {
                cell.innerHTML = `
                    <div 
                        class="index-card index-card${y < 4 ? '--black' : '--red'}"
                        id="${indexCardId}-indexCard"
                    ></div>
                `
            }
            isRedCell = !isRedCell
        }
        isRedCell = !isRedCell
    }

    return tableGame.innerHTML
}

const indexCardEatingAIndexCard = ({ actualCell, oldCell }) => {
    const actualCellNumberId = [...actualCell.id].at(1) 
    const oldCellNumberId = [...oldCell.id].at(1)
    
}

const canCardIndexToMove = ({ newCellId, actualCellId}) => {

}

tableGame.appendChild(getInitialTableGame())
tableGame.innerHTML = getIndexCardsInHisInitialsPositions(tableGame)

let cellForSelect = false
let cardIndexToMove = {}

tableGame.addEventListener('click', (e) => {
    const elementId = e.target.id

    if (elementId.split('-').at(1) == 'indexCard' && !cellForSelect) {
        cardIndexToMove = {
            color: e.target.classList[1],
            id: elementId,
            oldCellId: e.target.parentElement.id
        }
        cellForSelect = true
    }

    if (elementId.split('-').at(1) == 'cell' && cellForSelect) {
        const newCell = document.getElementById(elementId)
        const actualCell = document.getElementById(cardIndexToMove.oldCellId)
       
        const newCellId = Number([...newCell.id].at(1))
        const actualCellId = Number([...actualCell.id].at(1))

        const cardIndexCanToMove = canCardIndexToMove({
            newCellId,
            actualCellId
        })

        if(!newCell.children.length && ) {
            
            newCell.innerHTML = `
                <div 
                    class="index-card ${cardIndexToMove.color}"
                    id="${cardIndexToMove.id}"
                ></div>
            `
            actualCell.innerHTML = ''
    
            indexCardEatingAIndexCard({
                actualCell: newCell,
                oldCell: actualCell
            })
    
            cellForSelect = false
            cardIndexToMove = {}
        }

    }
})
