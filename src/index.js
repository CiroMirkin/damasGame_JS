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
    let isRedCell = true
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
                        class="index-card index-card${y < 4 ? '--red' : '--black'}"
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

const formatCellId = (actualCellLetterIndex, numberId) => `${letters[actualCellLetterIndex]}${numberId}-cell`

const indexCardEats = ({ newIdsFromActualCell, actualCellId, newCellPosition }) => {
    let canIMove = true

    Object.entries(newIdsFromActualCell).forEach(newCellInfo => {
        const { id, position, isThereACellInTheMiddle } = newCellInfo.at(1)
        
        if(newCellPosition == position && !isThereACellInTheMiddle) {
            const cellInTheMiddle = document.getElementById(id)
            const colorIndexCardFromCellInTheMiddle = cellInTheMiddle.children.item(0).classList[1].split('--').at(1)
            const colorCardIndexFromNewCell = document.getElementById(actualCellId).children.item(0).classList[1].split('--').at(1)
            
            if(colorIndexCardFromCellInTheMiddle != colorCardIndexFromNewCell) {
                cellInTheMiddle.innerHTML = ''
            } else {
                canIMove = false
            }
        }
    })

    return canIMove
}

const canIMoveTheCardIndex = ({ newCellId, actualCellId }) => {
    const actualCellIds = {
        number: Number([...actualCellId].at(1)),
        letter: [...actualCellId].at(0)
    }
    
    let actualCellLetterIndex = letters.findIndex(letter => letter == actualCellIds.letter)
    
    const newIdsFromActualCell = [
        {
            id: formatCellId(actualCellLetterIndex-= 2, actualCellIds.number-2),
            isThereACellInTheMiddle: true,
            position: 'top left'
        },{
            id: formatCellId(actualCellLetterIndex, actualCellIds.number+2),
            isThereACellInTheMiddle: true,
            position: 'top right'
        },{
            id: formatCellId(actualCellLetterIndex+= 1, actualCellIds.number+1),
            position: 'top right'
        },{
            id: formatCellId(actualCellLetterIndex, actualCellIds.number-1),
            position: 'top left'
        },{
            id: formatCellId(actualCellLetterIndex+=3, actualCellIds.number-2),
            isThereACellInTheMiddle: true,
            position: 'bottom left'
        },{
            id: formatCellId(actualCellLetterIndex, actualCellIds.number+2),
            isThereACellInTheMiddle: true,
            position: 'bottom right'
        },{
            id: formatCellId(actualCellLetterIndex-=1, actualCellIds.number-1),
            position: 'bottom left'
        },{
            id: formatCellId(actualCellLetterIndex, actualCellIds.number+1),
            position: 'bottom right'
        }
    ]

    let canIMove = false
    let newCellPosition = ''
    
    Object.entries(newIdsFromActualCell).forEach(newCellInfo => {
        const { id, position, isThereACellInTheMiddle } = newCellInfo.at(1)
        
        if(newCellId === id && !canIMove) {
            canIMove = true
            if(!!isThereACellInTheMiddle) newCellPosition = position
        }
    })

    if(canIMove && !!newCellPosition){
        canIMove = indexCardEats({ newIdsFromActualCell, actualCellId, newCellPosition })
    }

    return canIMove
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
       
        const cardIndexCanToMove = canIMoveTheCardIndex({
            newCellId: newCell.id,
            actualCellId: actualCell.id
        })

        if(!newCell.children.length && cardIndexCanToMove) {
            
            newCell.innerHTML = `
                <div 
                    class="index-card ${cardIndexToMove.color}"
                    id="${cardIndexToMove.id}"
                ></div>
            `
            actualCell.innerHTML = ''
        }

        cellForSelect = false
        cardIndexToMove = {}
    }
})
