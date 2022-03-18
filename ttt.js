

/* this is my first attemps to write a IIFE but messed the syntax */
/* const Gameboard = ({
    gameboard: [],

    createDiv: function(){
        const div = document.createElement("div");
        this.gameboard.push(div);
        console.log(this.gameboard)
    },
    createGameBoard: function(){
        createDiv(9);
    },
    render: function(){
        for(let i=0; i<this.gameboard.length;i++){
            document.querySelector(".game").appendChild(this.gameboard[i])
        }
        
    }


})() */

const Gameboard = (()=>{
    const gameboard = [];

    const createDiv =  function(n){
        for(let i = 0; i<n; i++){
            const div = document.createElement("div");
            div.setAttribute("data-index",i)
            gameboard.push(div);
            
        }
        
    };
    const createGameBoard = function(){
        createDiv(9);
    };
    const render = function(){
        createGameBoard();
        for(let i=0; i<gameboard.length;i++){
            document.querySelector(".game").appendChild(gameboard[i])
        }
        
    };
    return {render,gameboard}
})();

Gameboard.render();
console.log(Gameboard.gameboard);


const Player = (name,rank) => {
    let name = name;
    let rank = rank;
    let position;
    const getPosition = ()=> {
         position = +this.dataset.index;
    }
   const play = function(){
       getPosition();/* I stuck here  */
        if(Gameboard.gameboard[position].textContent == ""){
            Gameboard.gameboard[position].textContent = `${rank}`;
        } else console.log("you can't play");
       
    };
    

 return{play} }

 const player1 = Player("ionut","O")