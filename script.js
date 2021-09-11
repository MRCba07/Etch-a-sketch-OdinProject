const grid = document.querySelector("#container");
let size = 16; //Initial size

let gridSize = document.querySelector("#gridSize");
let inputCells = document.querySelector("#choose");



//Prepare and generate a new grid
function newGrid(e){
    size = inputCells.value;
    
    gridGenerator(size);
    
    e.preventDefault();
}
gridSize.addEventListener("click", newGrid);


//Reset the grid
function resetGrid(){
    let childNodes = document.querySelectorAll(".cell");
    childNodes = Array.from(childNodes);
    
    //Remove all divs
    childNodes.forEach(function(child){
        grid.removeChild(child);
    });
    
    grid.style.gridTemplateColumns = "";
}

//Generate a new grid
function gridGenerator(size){
    //Reset the grid
    resetGrid();
    
    if(size > 100 || size < 0){
        alert("Value out of range");
        return;
    }
    
    //Size of each column
    let newSize = grid.clientHeight/size;
    //Total number of cells
    let totalSize = size * size;
    
    let newDiv;
    let newDivAfter;
    grid.style.gridTemplateColumns= "repeat(" + size + "," + newSize +"px)";
    
    for (let i = 0; i < totalSize; i++){
        newDiv = document.createElement("div");
        newDiv.className= "cell";
        
        grid.appendChild(newDiv);
    }
}

//Change the color of each cell
function colorChange(e){
    if(e.target.className == "cell"){
        //Change to a random color on the first pass
        let degree = Math.floor(Math.random() * 360 + 1);
        let saturation = Math.floor(Math.random() * 100 + 1) + "%";

        if(e.target.style.backgroundColor == ""){
            e.target.style.backgroundColor = "hsl(" + degree + "," + saturation +", 50%)";
            
            //Create an attribute to store each color
            e.target.setAttribute("data-degree",  degree);
            e.target.setAttribute("data-saturation", saturation);
            e.target.setAttribute("data-lightness", 50);
        } else if(e.target.getAttribute("data-lightness") != 0) {
            //Make it darker
            e.target.setAttribute("data-lightness", Number(e.target.getAttribute("data-lightness")) - 5); 
                
            e.target.style.backgroundColor = "hsl(" + e.target.getAttribute("data-degree") + "," + e.target.getAttribute("data-saturation") + "," + e.target.getAttribute("data-lightness") + "%)";
        }
        
        
        
    }//end IF
}

grid.addEventListener("mouseover", colorChange);

//gridGenerator(size);
gridGenerator(16);