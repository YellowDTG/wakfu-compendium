
//HTML REFERENCES
const characterPortraits = document.querySelectorAll("#characterPortraits img");
const characterIllust = document.getElementById("characterIllust");
const characterBG = document.getElementById("characterBG");
const maleBtn = document.getElementById("maleBtn");
const femaleBtn = document.getElementById("femaleBtn");

let characters = [];
//Title Section
const classTitleSection = document.getElementById("classTitleSection");
const classIcon = document.getElementById("classIcon");
const justTitle = document.getElementById("justTitle");
const difficultyImg = document.getElementById("difficultyImg");

//Info Section
const classInfoSection = document.getElementById("classInfoSection");
const classDescription = document.getElementById("classDescription");
const classCategoryImages = document.querySelectorAll("#classCategories img");
const classCategoryTexts = document.querySelectorAll("#classCategories p");

//Builds Section
const classBuildsSection = document.getElementById("classBuildsSection");
const buildTitleTxt = document.getElementById("buildTitle");
const typeOfBuildTxt = document.getElementById("typeOfBuild");
const buildsTable = document.getElementById("buildsTable");
const buildDescriptionSection = document.getElementById("buildDescriptionSection");
const buildDescription = document.getElementById("buildDescription");

let currentBuildList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//Runtime variables
const genders = ["male", "female"];

let counter = 0;
let previousGender = 0;
let currentGender = 0;
let canChangeGender = true;
let previousPortraitId = null;
let portraitId = 0;

console.log(characterPortraits);
console.log(characterIllust);
console.log(classCategoryImages);

document.addEventListener("DOMContentLoaded", initializePortraitDisplay);

//CHARACTER PORTRAIT DISPLAY
async function initializePortraitDisplay(){
    await fetch("classes.json")
    .then(response => response.json())
    .then(value => characters = value)
    .then(() => console.log(characters))
    .catch(error => console.error(error));
    
    console.log(`Value of: ${characters[0].title}`);

    updatePortraitDisplay();
}
function updatePortraitDisplay(){
    for (let i = 0; i < characterPortraits.length; i++){
        characterPortraits[i].src = `characterPortraits/${i + 1}${genders[currentGender]}.png`;
    }
}
function changeGender(newGender){
    switch (canChangeGender){
        case true:
            const tempGender = genders.indexOf(newGender);
            if (tempGender >= 0 && tempGender < 2){
                currentGender = tempGender;

                if (previousGender != currentGender){
                    previousGender = currentGender;
                    playPortraitAnimation();
                }
                else{
                    console.log("LMAO????");
                }
            }
            else{
                console.error(`${newGender} is not a gender in the index`);
            }
            break;
        default:
            console.log("can0t change gender now.");
            break;
    }

}

function playPortraitAnimation(){
    let i = 0;
    let changedDisplay = false;
    enableGenderSelection(false);

    myLoop();

    function myLoop(){
        let element = characterPortraits[i];

        if (element.classList.contains("flippyButton")){
            element.classList.remove("flippyButton");
        }

        setTimeout(function() {
            element.classList.add("flippyButton"),30;
            setTimeout(function(element2, i2) {
                element2.src = `characterPortraits/${i2 + 1}${genders[currentGender]}.png`
            },250, element, i);
    
            i++

            if (i > characterPortraits.length / 2 + 1 && !changedDisplay){
                changedDisplay = true;
                displayClass(false);
            }

            if (i < characterPortraits.length){
                myLoop();
                return;
            }
            else{
                setTimeout(() => enableGenderSelection(true), 500);
            }
        }, 110);
    }


    characterPortraits.forEach(function(element){
        console.log(element);
        
    });
}

function enableGenderSelection(isEnabled){
    canChangeGender = isEnabled;

    switch(isEnabled){
        case true:
                maleBtn.removeAttribute("disabled");
                femaleBtn.removeAttribute("disabled");
            break;
            case false:
                maleBtn.setAttribute("disabled", true);
                femaleBtn.setAttribute("disabled", true);
            break;
        default:
            console.error("only booleans allowed here pal.");
            break;
    }
}
  

//CENTER DISPLAY
function displayClass(playAnimation){
    if (playAnimation){
        characterIllust.classList.remove("displayImg");
        characterBG.classList.remove("displayBG");
    }
    characterIllust.src = `characterIllustrations/${portraitId + 1}${genders[currentGender]}.png`;
    characterBG.src = `characterBackgrounds/${portraitId + 1}bg.png`;
    
    displayClassInfo();
    
    if (playAnimation){
        setTimeout(() => characterIllust.classList.add("displayImg"),100);
        setTimeout(() => characterBG.classList.add("displayBG"),10);
    }
    previousPortraitId = portraitId;
}

//INFO DISPLAY
function displayClassInfo(){
    const currentCharacter = characters[portraitId];
    if (previousPortraitId == null){
        classTitleSection.style.display = "flex";
        classTitleSection.classList.add("fadeIn");
        classInfoSection.style.display = "flex";
        classInfoSection.classList.add("fadeIn");
        classBuildsSection.style.display = "flex";
        classBuildsSection.classList.add("fadeIn");
    }
    //TITLE SECTION
    classIcon.src = `classIcons/${portraitId + 1}ci.png`;
    justTitle.textContent = `${currentCharacter.title}`;

    switch(currentCharacter.difficulty){
        case 1:
            difficultyImg.src = `starDifficulty/blue_dif1.png`;
            break;
        case 2:
            difficultyImg.src = `starDifficulty/blue_dif2.png`;
            break;
        case 3:
            difficultyImg.src = `starDifficulty/blue_dif3.png`;
            break;
        default:
            console.error(`difficulty id can't be: ${currentCharacter.difficulty}`);
            break;
    }

    //INFO SECTION
    let myDesc = currentCharacter.description;
    console.log(myDesc);
    classDescription.textContent = myDesc;


    for (let i = 0; i < classCategoryImages.length; i++){
        classCategoryImages[i].src = getCategoryImg(currentCharacter.categories[i]);
        classCategoryTexts[i].textContent = String(currentCharacter.categories[i]);
    }
    
    function getCategoryImg(newCategory){
        switch(newCategory){
            case 'Especialidad':
                return "categories/role_0.png";
            case 'Traba':
                return "categories/role_1.png";
            case 'Tanque':
                return "categories/role_2.png";
            case 'Curas':
                return "categories/role_3.png";
            case 'Daños':
                return "categories/role_4.png";
            case 'Posicionamiento':
                return "categories/role_5.png";
            case 'Invocación':
                return "categories/role_6.png";
            case 'Control':
                return "categories/role_7.png";
            case 'Apoyo':
                return "categories/role_8.png";
            default:
                console.error(`${newCategory} is not a category BRO, WHAT ARE YOU WAFFLING`);
                break;
        }
    }

    // BUILDS SECTION

    // BROKEN, INNER HTML ONLY WORKS ONCE, IF YOU CALL MULTIPLE TIMES IT BREAKS.
    // if (counter > 0){
    //     return;
    // }
    // counter++;

    updateBuilds();
}

function updateBuilds(){
    const currentCharacter = characters[portraitId];
    
    try{
        buildTitleTxt.textContent = `Builds ${currentCharacter.name}`;
    }
    catch(error){
        console.log(error);
        buildTitleTxt.textContent = `Clase no definida:`;
    }
    
    
    try{
        buildDescription.textContent = currentCharacter.builds[currentBuildList[portraitId]].description;
    }
    catch(error){
        console.log(error);
        buildDescription.textContent = `Esta clase no tiene builds por el momento.`;
    }
    
    try{
        buildsTable.innerHTML = "";
        let currentBuild = currentCharacter.builds[currentBuildList[portraitId]];

        if (currentBuild.type){
            typeOfBuildTxt.textContent = `Build: ${currentBuild.type}`;
        }

        console.log(currentBuild.type);

        for (let i = 0; i < currentBuild.buildList.length; i++){
            console.log(currentBuild.buildList[i].name);

            const newDiv = document.createElement("div");
            newDiv.classList.add("buildBlock");

            const newA1 = document.createElement("a");
            newA1.setAttribute("href", currentBuild.buildList[i].url);
            newA1.setAttribute("target", "_blank");

            const newP = document.createElement("p");
            //TWO WAYS OF ADDING ID element.id = "" || element.setAttribute("id", "");
            newP.id = "buildName";
            newP.textContent = currentBuild.buildList[i].name;

            const newA2 = document.createElement("a");
            newA2.setAttribute("href", currentBuild.buildList[i].url);
            newA2.setAttribute("target", "_blank");

            const newImg = document.createElement("img");
            newImg.setAttribute("src", currentBuild.buildList[i].img);

            buildsTable.appendChild(newDiv);
                newDiv.appendChild(newA1);
                    newA1.appendChild(newP);

                newDiv.appendChild(newA2);
                    newA2.appendChild(newImg);


        //INNER HTML METHOD. 
        //WORKS ON LIVE SERVER FINE, BUT FOR SOME REASON DOESN'T WORK ON AN ACTUAL WEBSITE.
        //     buildsTable.innerHTML += `<div class="buildBlock">
        //     <p id="buildName">${currentBuild.buildList[i].name}</p>
        //     <a href='${currentBuild.buildList[i].url}' target="_blank">
        //         <img id="buildImg" src="${currentBuild.buildList[i].img}">
        //     </a>
        // </div>`;
        }
    }
    catch(error){
        console.log(error);
        buildsTable.innerHTML += '<p style="text-align: center"><b>NO HAY BUILDS PARA ESTA CLASE TODAVÍA, CONTACTA AL DUEÑO POR DISCORD O ACHANTA Y ESPERA. skill issues</b></p>';
        typeOfBuildTxt.textContent = `Build: No disponible (aún)`;
    }

}

// Builds Section BUTTONS
function viewBuilds(){
    buildDescriptionSection.style.display = "none";
    buildsTable.style.display = "grid";
}
function viewDescription(){
    buildsTable.style.display = "none";
    buildDescriptionSection.style.display = "block";
}
function changeBuild(){

    if (characters[portraitId].builds.length > 1){
        currentBuildList[portraitId]++;

        if (currentBuildList[portraitId] >= characters[portraitId].builds.length){
            currentBuildList[portraitId] = 0;
        }

        updateBuilds();

        console.log(currentBuildList[portraitId]);
    }
    else{

    }
}

//CLASS METHODS
function selectClass(newClass){
    convertClassToId(newClass);
    if (previousPortraitId != portraitId){
        displayClass(true);
    }
}

function convertClassToId(newClass){
    switch(newClass){
        case "Ocra":
            portraitId = 0;
            break;
        case "Zurcarak":
            portraitId = 1;
            break;
        case "Sacro":
            portraitId = 2;
            break;
        case "Zobal":
            portraitId = 3;
            break;
        case "Sram":
            portraitId = 4;
            break;
        case "Uginak":
            portraitId = 5;
            break;
        case "Yopuka":
            portraitId = 6;
            break;
        case "Aniripsa":
            portraitId = 7;
            break;
        case "Feca":
            portraitId = 8;
            break;
        case "Sadida":
            portraitId = 9;
            break;
        case "Anutrof":
            portraitId = 10;
            break;
        case "Selotrop":
            portraitId = 11;
            break;
        case "Steamer":
            portraitId = 12;
            break;
        case "Hipermago":
            portraitId = 13;
            break;
        case "Xelor":
            portraitId = 14;
            break;
        case "Osamodas":
            portraitId = 15;
            break;
        case "Pandawa":
            portraitId = 16;
            break;
        case "Tymador":
            portraitId = 17;
            break;
        default:
            console.error(`The class: ${newClass} does not exist`);
            break;
    }
}

