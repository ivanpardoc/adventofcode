import { cards, input, inputExample, inputExample2 } from './input.js';
// five equal -> 1
// four of kind 4/1 -> 2
// full house 3/2 -> 3
// three of kind 3/1/1 -> 4
// two pair 2/2/1 -> 5
// one pair 2/1/1/1 -> 6
// high card 1/1/1/1/1 -> 7
const cardsValue = [];
const result = [];
let allHandsCalculated = [];

function solveDay7() {    
    mapCardsValue();
    const data = input;
    
    data.forEach((handAndBet) => {
        const handOriginal = handAndBet.split(' ')[0];
        const hand = handOriginal.split('').sort().join('');
        const bet = handAndBet.split(' ')[1];
        const allInfo = { 
            ogVal: handOriginal,
            ogValNumber: [],
            handOrdered: hand,
            equals: [],
            handValue: 0,
            bet
        };

        allInfo.equals = getEquals(hand);

        allInfo.ogVal.split('').forEach((charOG) => {
            allInfo.ogValNumber.push(getCardValue(charOG));
        })

        allInfo.equals = sortByLength(allInfo.equals);

        allInfo.equals = getJoker(allInfo.equals);

        allInfo.handValue = getHandValue(allInfo.equals);

        allHandsCalculated.push(allInfo);
    });

    allHandsCalculated = allHandsCalculated.sort((a,b) => {
        return a.handValue - b.handValue;
    });

    allHandsCalculated = allHandsCalculated.sort((a,b) => {
        if (a.handValue !== b.handValue) {
            return a.handValue - b.handValue;
        }

        for (let i = 0; i < a.ogValNumber.length; i++) {
            if (a.ogValNumber[i] !== b.ogValNumber[i]) {
                return a.ogValNumber[i] - b.ogValNumber[i];
            }
        }
    });

    allHandsCalculated = allHandsCalculated.slice().reverse();

    let totalWins = 0;

    allHandsCalculated.forEach((calc, indCal) => {
        totalWins += parseInt(calc.bet) * (indCal + 1); 
    });
    console.log(totalWins);
}

function getCardValue(cardToFind) {
    return cardsValue.filter((card) => card.val === cardToFind)[0].value
}

function mapCardsValue() {
    cards.forEach((card, index) => {
        cardsValue.push({val: card, value: index+1});
    });
}

function getEquals(hand) {
    let indexSaved = 0;
    let equals = [];
    hand.split('').forEach((char, indexChar) => {
        if (char === hand[indexChar+1] ) {
            equals[indexSaved] = equals[indexSaved] ? equals[indexSaved] + char : char ;
        } else {
            equals[indexSaved] = equals[indexSaved] ? equals[indexSaved] + char : '' + char;
            indexSaved++;
        }
    });
    return equals;
}

function sortByLength(arr){
    return arr.sort((a, b) => {
        return b.length - a.length;
    });
}

function getHandValue(equals) {
      // high card 1/1/1/1/1 -> 7
    if (equals.length === 5) {
        return 7;
    }

    // one pair 2/1/1/1 -> 6
    if (equals.length === 4) {
        return 6;
    }

    // two pair 2/2/1 -> 5
    if (equals.length === 3 && equals[0].length === 2) {
        return 5;
    }

    // three of kind 3/1/1 -> 4
    if (equals.length === 3 && equals[0].length === 3) {
        return 4;
    }

    // full house 3/2 -> 3 
    if (equals.length === 2 && equals[0].length === 3) {
        return 3;
    }
    // four of kind 4/1 -> 2
    if (equals.length === 2 && equals[0].length === 4) {
        return 2;
    }

    // five equal -> 1
    if (equals.length === 1) {
        return 1;
    }
}

function getJoker(equals) {
    const joker = equals.filter((t) => t.includes('J'));

    if (joker.length !== 0) {
        const indexJoker = equals.findIndex((x) => x === joker[0]);
        if (equals.length !== 1) {
            equals.splice(indexJoker, 1);
            equals[0] = equals[0] + joker[0];
        }
    }
    return equals;
}

solveDay7();

// 253884908 - too high
// 253473930 - OK