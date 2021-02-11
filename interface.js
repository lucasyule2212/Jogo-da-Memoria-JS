
let tabuleiro = document.getElementById("tabuleiro");

function showCards(cards) {

    for (let index = 0; index < cards.length; index++) {
        let cardModel = document.createElement('div');
        cardModel.id=cards[index].id;
        cardModel.classList.add(card);
        cardModel.dataset.icon=cards[index].icon;
        cardModel.addEventListener('click',flipCard);

        setCardContent(cards[index],cardModel);
        tabuleiro.appendChild(cardModel); 
    }

}
let endScreen = document.getElementById("gameOver");

function turnOffEndScreen() {  
    endScreen.style.display="none";
    endScreen.style.visibility="hidden";
}
function setCardContent(cardItem,cardModel) {
    setCardFace(cFront,cardItem,cardModel);
    setCardFace(cBack,cardItem,cardModel);
}

function setCardFace(cFace,cardItem,cardModel) {
    let cardFace = document.createElement('div');
    cardFace.classList.add(cFace);
    if (cFace==cFront) {
        let iconElement =document.createElement('img');
        iconElement.classList.add(cIcon);
        iconElement.src="./Assets/"+cardItem.icon+".png";
        cardFace.appendChild(iconElement);
    }else{
        cardFace.appendChild(document.createElement('h2'));
        cardFace.firstChild.innerHTML="&lt/&gt"      
        // document.getElementsByTagName("h2").innerHTML="&lt/&gt";
    }
    cardModel.appendChild(cardFace);
}
let endGameStatus=false;

function flipCard() {
    if (setCard(this.id)) {
        this.classList.add("flip");
       if (matchCheck()) {
           clearCards()
           if (endGameStatus) {
               endGame();
           }
       } else if(secondCard!=null){
           setTimeout(() => {
            let firstCardView = document.getElementById(firstCard.id);
            let secondCardView = document.getElementById(secondCard.id);
            firstCardView.classList.remove('flip');
            secondCardView.classList.remove('flip');
            resetFlip();
            clearCards();
           }, 1000);
       }
    }
}
function endGame() {
    setTimeout(() => {
        endScreen.style.display="flex";
        endScreen.style.visibility="visible";
    }, 500);
}
function restartGame() {
    turnOffEndScreen();
    restartPairCont();
    restartTabuleiro();
    startGame();
}
function restartTabuleiro() {
    tabuleiro=null;
}