const frame1 = (()=>{

    const frame1_containers = [];

    const title_container = document.createElement("div");
    title_container.setAttribute("class","title");
    const title = document.createElement("h1");
    title_container.appendChild(title);
    title.textContent= "TIC TAC TOE";

    const message_container = document.createElement("div");
    frame1_containers.push(message_container);
    const message = document.createElement("p");
    message_container.appendChild(message);
    message.textContent= "Plz slect your names";
    message_container.setAttribute("class","first-message");

    const form = document.createElement("form");
    frame1_containers.push(form);
    const input_container = document.createElement("div");
    input_container.setAttribute("class","inputs");
    const input_player_1 = document.createElement("input");
    input_player_1.setAttribute("placeholder","Player 1");
    const input_player_2 = document.createElement("input");
    input_player_2.setAttribute("placeholder","Player 2");
    const button_container = document.createElement("div");
    const button = document.createElement("button");
    button.textContent = "Start";

    button_container.appendChild(button);
    input_container.appendChild(input_player_1);
    input_container.appendChild(input_player_2);
    form.appendChild(input_container);
    form.appendChild(button_container);

    document.querySelector("body").appendChild(title_container);
    document.querySelector("body").appendChild(message_container);
    document.querySelector("body").appendChild(form);

    //Start button and his events 

    //function toggle pr faire disparaitre
    function toggleHidden(){
        frame1_containers.forEach(e=>e.classList.toggle("hidden")); 
    };
    
    button.addEventListener("click",toggleHidden);
    button.addEventListener("click",e=>e.preventDefault());
    
    return{frame1_containers,button,input_player_1,input_player_2,toggleHidden}
})();

const frame2 = (() => {
    const div = [];
    // create players //
    const player = (name,symbol)=>{
        function mark(position){
            div[position].textContent = symbol;
        }
        return{mark,name,symbol}
    }

    let player1,player2;

    function createPlayer(){
         player1 = player(frame1.input_player_1.value,"X");
         player2 = player(frame1.input_player_2.value,"O");

    };
    frame1.button.addEventListener("click",createPlayer);
    //display the winner
    function displayWinner(player){
        deleteGrid();
        deleteNamesDisplay();
        deleteRestartButton();
        const div_ctn = document.createElement("div");
        div_ctn.setAttribute("class","play-again");
        const message = document.createElement("p");
        if(player!="draw"){
            message.textContent = `${player.name} won!`;
        } else{
            message.textContent = "Draw";
        }
        
        const button = document.createElement("button");
        button.textContent = "Play Again";
        div_ctn.appendChild(message);
        div_ctn.appendChild(button);
        document.querySelector("body").appendChild(div_ctn);
        button.addEventListener("click",frame1.toggleHidden);
        button.addEventListener("click",()=>{
        document.querySelector("body").removeChild(document.querySelector(".play-again"));
        })
    }
    //game logic

    let round = 1;

    function resetRound(){
        round = 1;
    }

   frame1.button.addEventListener("click",resetRound);

    function checkWinner(player){
        if(player.symbol == div[0].textContent && div[1].textContent == div[2].textContent && div[0].textContent==div[1].textContent){
             displayWinner(player);
             return
         }
        if(player.symbol == div[3].textContent && div[3].textContent == div[4].textContent && div[3].textContent==div[5].textContent){
            displayWinner(player); 
            return
        }
        if(player.symbol == div[6].textContent && div[7].textContent == div[6].textContent && div[6].textContent==div[8].textContent){
            displayWinner(player);
            return
        }      
        if(player.symbol == div[0].textContent && div[0].textContent == div[3].textContent && div[0].textContent==div[6].textContent){
            displayWinner(player); 
            return
        } 
        if(player.symbol == div[1].textContent && div[1].textContent == div[4].textContent && div[1].textContent==div[7].textContent){
            displayWinner(player);
            return
        }      
        if(player.symbol == div[2].textContent && div[2].textContent == div[5].textContent && div[2].textContent==div[8].textContent){
            displayWinner(player);
            return
        }      
        if(player.symbol == div[0].textContent && div[0].textContent == div[4].textContent && div[0].textContent==div[8].textContent){
            displayWinner(player);
            return
        }      
        if(player.symbol == div[2].textContent && div[2].textContent == div[4].textContent && div[2].textContent==div[6].textContent){
            displayWinner(player);
            return
        }     
        if(round==9){
            displayWinner("draw");
        }                 
    }

    function playRound(position,obj){
        if(obj.textContent == ""){
            if(round%2!=0){
                player1.mark(position);
                checkWinner(player1)
                console.log(round);
                round++;
                return
            }
            if(round%2==0){
                player2.mark(position);
                checkWinner(player2)
                console.log(round);
                round++;
                return
            }
            
        }
        
    }

    function displayNames(){
        const names_container = document.createElement("div");
        names_container.setAttribute("class","names");
        const name_player_1 = document.createElement("p");
        name_player_1.textContent = frame1.input_player_1.value;
        frame1.input_player_1.value = "";
        const name_player_2 = document.createElement("p");
        name_player_2.textContent = frame1.input_player_2.value;
        frame1.input_player_2.value = "";
        names_container.appendChild(name_player_1);
        names_container.appendChild(name_player_2);
        document.querySelector("body").appendChild(names_container);

    };
    frame1.button.addEventListener("click",displayNames);

    function deleteGrid(){
        if(div.length != 0){
            div.splice(0);
            document.querySelector("body").removeChild(document.querySelector(".game"));
        }
        
    };

    frame1.button.addEventListener("click",deleteGrid)
    
    
    //Create gameboard // 
    function createGrid(){
        const board_container = document.createElement("div");
        board_container.setAttribute("class","game");
        for(let i = 0 ; i<9;i++){
            const box = document.createElement("div");
            div.push(box);
            box.setAttribute("data-index",i);
        }
        div.forEach(e=>board_container.appendChild(e));
        document.querySelector("body").appendChild(board_container);
        div.forEach(e=>e.addEventListener("click",playRound.bind(null,e.dataset.index,e)));
    };
    frame1.button.addEventListener("click",createGrid);

    // create restart button 
    function deleteNamesDisplay(){
        document.querySelector("body").removeChild(document.querySelector(".names"));
    }
    function deleteRestartButton(){
        document.querySelector("body").removeChild(document.querySelector(".restart"));
    }

    function createRestartButton(){
        const button = document.createElement("button");
        button.textContent = "Restart";
        const div = document.createElement("div");
        div.setAttribute("class","restart");
        div.appendChild(button);
        document.querySelector("body").appendChild(div);
        button.addEventListener("click",deleteGrid);
        button.addEventListener("click",deleteNamesDisplay);
        button.addEventListener("click",deleteRestartButton);
        button.addEventListener("click",frame1.toggleHidden);
    };
    frame1.button.addEventListener("click",createRestartButton);
    
    
    return {createGrid,deleteGrid,div,round}
})();