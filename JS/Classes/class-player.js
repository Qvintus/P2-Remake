
class Player{
    constructor(id, hands = [new Deck([])], cardFront = "Default", cardBack = "default", username = "") { //Hands is an array of card arrays
        this.hands = hands;
        this.cardFront = cardFront;
        this.cardBack = cardBack;
        this.id = id;
        this.username = username;
    }
    printHand(index) {
        this.hands[index].update(this.id, this.cardFront, index.toString());
    }
    printHands(){
        for(let i = 0; i < this.hands.length; i++){
            this.printHand(i);
        }
    }
    splitHand(index) {
        this.hands[this.hands.length] = new Deck([this.hands[index].cards.pop()]);
        this.initializeHand(this.hands.length - 1);
        this.printHands();
    }
    initializeHand(index) {
        let parent = document.getElementById(this.id + "__card-container"); //Html location of all hands
        let newHand = document.createElement("div"); //New hand container
        let newCardContainer  = document.createElement("div"); //New card container
        let newSum = document.createElement("span"); //New sum container
        let newResult = document.createElement("span"); //New result container

        //Adds attributes to the hand container
        newHand.setAttribute("id", this.id + "__hand" + index.toString());
        newHand.setAttribute("class", this.id + "__hand");

        //Adds a card container to the new hand
        newCardContainer.setAttribute("id", this.id + "__card-container" + index.toString());
        newHand.appendChild(newCardContainer);

        //Adds a sum container to the new hand
        newSum.setAttribute("id", this.id + "__card-sum" + index.toString());
        newSum.setAttribute("class", this.id + "__card-sum");       
        newHand.appendChild(newSum);

        //Adds a result container to the new hand
        newResult.setAttribute("id", this.id + "__result" + index.toString());
        newResult.setAttribute("class", this.id + "__result");
        newHand.appendChild(newResult);

        //Adds the new hand to the html
        parent.appendChild(newHand);
    }
    displayWinHand(hand){
        let handContainer = document.getElementById(this.id + "__hand" + hand.toString());
        let resultContainer = document.getElementById(this.id + "__result" + hand.toString());
        handContainer.setAttribute("class", this.id + "__hand win");
        resultContainer.innerHTML = "Win";
    }
    displayLoseHand(hand){
        let handContainer = document.getElementById(this.id + "__hand" + hand.toString());
        let resultContainer = document.getElementById(this.id + "__result" + hand.toString());
        handContainer.setAttribute("class", this.id + "__hand lose");
        resultContainer.innerHTML = "Lose";
    }
    displayDrawHand(hand){
        let handContainer = document.getElementById(this.id + "__hand" + hand.toString());
        let resultContainer = document.getElementById(this.id + "__result" + hand.toString());
        handContainer.setAttribute("class", this.id + "__hand draw");
        resultContainer.innerHTML = "Draw";
    }
    //Loops through each hand removing the classes win/lose/draw and the innerHTML of the results container
    resetResults(){
        this.resetAllHandsClassAttributes();
        for (let i = 0; i < this.hands.length; i++) {
            let hand = document.getElementById(this.id + "__hand" + i.toString());
            let resultContainer = document.getElementById(this.id + "__result" + i.toString());
            resultContainer.innerHTML = "";

            if (i > 0)
                hand.remove();
        }
    }
    //Removes all classes but player__hand from a hand
    resetHandClassAttributes(hand){
        let handContainer = document.getElementById(this.id + "__hand" + hand.toString());
        handContainer.setAttribute("class", this.id + "__hand")
    }
    //Removes all classes but player__hand from each hand
    resetAllHandsClassAttributes(){
        for (let i = 0; i < this.hands.length; i++){
            this.resetHandClassAttributes(i);
        }
    }
    //Sets the active hand
    setActiveHand(hand){
        this.resetAllHandsClassAttributes();
        let handContainer = document.getElementById(this.id + "__hand" + hand.toString());
        handContainer.setAttribute("class", this.id + "__hand active");
    }
}

class RemotePlayer extends Player{
    //Method to create the html of a remote player
    addToHtml() {
        //Creates something like this:
            // <div class="remote-player">
            //         <span class="remote-player__title"></span>
            //         <div class="remote-player__card-container" id="remote-player-p1__card-container">
            //             <div class="remote-player__hand" id="remote-player-p1__hand0">
            //                 <div id="remote-player-p1__card-container0"></div>
            //                 <span class="remote-player__card-sum" id="remote-player-p1__card-sum0"></span>
            //                 <span class="remote-player__result" id="remote-player-p1__result0"></span>
            //             </div>
            //         </div>
            // </div>
    
        let parent = document.getElementById("blackjack-container");
        let newRemote = document.createElement("div");
        let newRemoteTitle = document.createElement("span");
        let newRemoteCardContainer = document.createElement("div");

        newRemote.setAttribute("class", "remote-player");
        newRemote.setAttribute("id", this.id);

        newRemoteTitle.setAttribute("class", "remote-player__title"); //Title container
        newRemoteTitle.textContent = `${this.id.slice(14)}`; //"remote-player-" is sliced off
        if (this.username.length) {
            newRemoteTitle.textContent = this.username;
        }
        newRemote.appendChild(newRemoteTitle);

        newRemoteCardContainer.setAttribute("class", "remote-player__card-container"); //Card container
        newRemoteCardContainer.setAttribute("id", `${this.id}__card-container`);
        newRemote.appendChild(newRemoteCardContainer);

        parent.appendChild(newRemote);
        
        this.initializeHand(0);

        return this;
    }
    initialize(index){
        this.addToHtml();
        this.cardFront = "Simple Black";
        this.printHand(index);
    }
    removeRemoteFromHtml(){
        document.getElementById(this.id).remove();
    }
}
