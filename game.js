const cFront = "card_front";
const cBack = "card_back";
const card= "card";
const cIcon="icon";
let cards = null;
let cardTypes =['bootstrap','css','electron','react','firebase','html','javascript','jquery','mongo','node'];

// MODELO DE CARTA{
//     icon:
//     id:
//     flip:
// }

startGame()
function startGame() {
    turnOffEndScreen();
    cards = createCards(cardTypes);
    shuffleCards(cards);
    showCards(cards);
}
function createCards(cardTypes) {

    let createdCards=[];

    for (let index = 0; index < cardTypes.length; index++) {
        createdCards.push(createCardPairs(cardTypes[index]));  
    }

    return createdCards.flatMap(pair => pair);
}

function createCardPairs(cardType) {
    return [{
        icon:cardType,
        id: generateCardId(cardType),
        flip:false,
    },{
        icon:cardType,
        id: generateCardId(cardType),
        flip:false,
    }];
}

function generateCardId(cardType) {
    return (cardType+(Math.floor((Math.random()*1000))));
}


function shuffleCards(cards) {
    //ALGORITMO PARA EMBARALHAR UM ARRAY ALEATORIAMENTE
    var m = cards.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = cards[m];
      cards[m] = cards[i];
      cards[i] = t;
    }
  
    return cards;
  }
 function restartPairCont() {
     pairCont=10;
 }
  function setCard(id) {
     let card= cards.filter(card=>card.id==id)[0];
    if (card.flip==true||lockMode==true) {
        return false;
    }
    if (!firstCard) {
        if (card.flip==false) {
            firstCard=card; 
            card.flip=true;
        return true; 
        }
           
    }else{
        if (card.flip==false) {
            secondCard=card;
            card.flip=true;
            lockMode=true;
        return true; 
        }
    }
  }
  function matchCheck() {
      if (firstCard!=null&&secondCard!=null) {
          if (firstCard.icon==secondCard.icon) {
              pairCont--;
              if (pairCont==0) {
                  endGameStatus=true;
              }
              return true;
          }
      }else{
          return false;
      }
            
  }
  let pairCont = 10;
  function clearCards() {
        firstCard=null;
        secondCard=null;
        lockMode=false;
  }
  function resetFlip() {
      firstCard.flip=false;
      secondCard.flip=false;
  }
  let lockMode = false;
  let firstCard=null;
  let secondCard=null;