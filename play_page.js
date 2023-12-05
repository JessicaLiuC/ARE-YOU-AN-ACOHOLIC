let cocktail;
function displayItem(item) {
    document.getElementById("result").innerHTML = `

    <div class="card">
        <div class="container">
            
            
            <div class="w">What</div>
            <div class="/">&nbsp</div>
            <div class="i">is</div>
            <div class="/">&nbsp</div>
            <div class="t_one">this</div>
            <div class="question">?</div>
            <div class="shadow"></div>
            <div class="shadow-two"></div>
            
        
        </div>
        <div class="card_container">
            <img src=${item.image} class="card_image">
            <table id="customers">
                <tr>
                    <td class="table_title">Strength</td>
                    <td>${item.Strength}</td>
                </tr>
                <tr>
                    <td class="table_title">Ingredients</td>
                    <td>${item.Ingredients[0].Ingredient1} &nbsp;&nbsp;
                    ${item.Ingredients[0].Ingredient2} &nbsp;&nbsp;
                    ${item.Ingredients[0].Ingredient3} &nbsp;&nbsp;
                    ${item.Ingredients[0].Ingredient4} &nbsp;&nbsp;
                    ${item.Ingredients[0].Ingredient5}</td>
                </tr>
                <tr>
                    <td class="table_title">Equipments</td>
                    <td>${item.Equipments[0].Equipment1} &nbsp;&nbsp;
                    ${item.Equipments[0].Equipment2} &nbsp;&nbsp;
                    ${item.Equipments[0].Equipment3}</td>
                </tr>
                <tr>
                    <td class="table_title">Origin</td>
                    <td>${item.Origin}</td>
                </tr>
                <tr>
                    <td class="table_title">Source</td>
                    <td>${item.Source}</td>
                </tr>
            </table>
        </div>
        
    </div>`;
  
}

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
let correctText;
let wrongText;

function assignCorrectRandomly() {

  // 0 = left, 1 = right
  const randomNum = Math.floor(Math.random() * 2); 
  
  if(randomNum === 0) {
    leftButton.textContent += ` ${correctText}`;
    rightButton.textContent += ` ${wrongText}`;
    leftButton.onclick = () => {
        window.location.href = "/correct_page.html"; 
    }
    rightButton.onclick = () => {
        window.location.href = "/wrong_page.html"; 
    }
  } else {
    rightButton.textContent += ` ${correctText}`; 
    leftButton.textContent += `${wrongText}`;
    rightButton.onclick = () => {
        window.location.href = "/correct_page.html"; 
    }
    leftButton.onclick = () => {
        window.location.href = "/wrong_page.html"; 
    }
  }

}


const audio = document.getElementById("music");
const btn = document.getElementById("stopBtn");

let isMuted = false;

btn.addEventListener("click", () => {
  if(!isMuted) {
    isMuted = true;
    btn.textContent = "🔈";
    audio.play(); 
} 
  else {
    isMuted = false; 
    btn.textContent = "🔇";
    audio.pause();
    };
});

async function loadPage() {
    await fetch('./alcohol.json')
    .then(response => response.json())
    .then(data => {

        const index = Math.floor(0 + Math.random() * (5 - 1));

        const item = data.Cocktail[index];
        cocktail = item
        correctText = cocktail.name

        //assign wrong text
        if(index == 0){
            wrongText = data.Cocktail[1].name
        }
        else if(index == 5){
            wrongText = data.Cocktail[5].name
        }
        else {
            wrongText = data.Cocktail[index-1].name
        }
        
        displayItem(item);
        
        assignCorrectRandomly();
    })
}

loadPage()