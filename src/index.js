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

    const isItTheSameRowLetterId = actualCell.parentElement.id.split('-').at(0) == oldCell.parentElement.id.split('-').at(0)
    const isItInTheSameRow = actualCellNumberId !== oldCellNumberId

    if (isItInTheSameRow && isItTheSameRowLetterId) {
        let = cellBetweenTheactualAndTheOldCell = 0
        
        if(actualCellNumberId > oldCellNumberId) {
            cellBetweenTheactualAndTheOldCell = actualCell.previousSibling.children
        }

        if(actualCellNumberId < oldCellNumberId) {
            cellBetweenTheactualAndTheOldCell = actualCell.nextSibling.children
        }

        if (
            !!cellBetweenTheactualAndTheOldCell.length &&
            cellBetweenTheactualAndTheOldCell[0].id.split('-').at(1) == 'indexCard'
        ) {
            document.getElementById(cellBetweenTheactualAndTheOldCell[0].id).parentElement.innerHTML = ''
        }
    }
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
       
        const newCellNumberId = Number([...newCell.id].at(1))
        const actualCellNumberId = Number([...actualCell.id].at(1))

        const rowOfNewCell = letters.findIndex(letter => newCell.parentElement.id.split('-').at(0) == letter)
        const rowOfActualCell = letters.findIndex(letter => actualCell.parentElement.id.split('-').at(0)  == letter)
        
        const itsTheSameRow = [...elementId].at(0) == [...actualCell.id].at(0)
        const itsTheSameColumn = newCellNumberId == actualCellNumberId 
        
        const canIndexCardMoveOneCellInY = rowOfNewCell+2 == rowOfActualCell || rowOfNewCell-2 == rowOfActualCell 
        const canIndexCardMoveTwoCellInY = rowOfNewCell+1 == rowOfActualCell || rowOfNewCell-1 == rowOfActualCell
        const canIndexCardMoveOneCellInX = newCellNumberId+1 == actualCellNumberId || newCellNumberId-1 == actualCellNumberId
        const canIndexCardMoveTwoCellInX = newCellNumberId+2 == actualCellNumberId || newCellNumberId-2 == actualCellNumberId
        
        const canIndexCardMoveInX = canIndexCardMoveOneCellInX || canIndexCardMoveTwoCellInX
        const canIndexCardMoveInY = canIndexCardMoveOneCellInY || canIndexCardMoveTwoCellInY
        
        if(!newCell.children.length && (itsTheSameRow || itsTheSameColumn)) {
            if (canIndexCardMoveInY || canIndexCardMoveInX) {
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
            }
    
            cellForSelect = false
            cardIndexToMove = {}
        }

    }
})
