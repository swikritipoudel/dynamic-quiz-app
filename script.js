const quizForm = document.querySelector(".quizForm")
const category = document.querySelector(".category").value
const difficulty = document.querySelector(".difficulty").value


function fetchQuestion(){
    quizForm.addEventListener("submit", async function (event){
        event.preventDefault()

        const apiUrl = `https://opentdb.com/api.php?amount=30&category=${category}&difficulty=${difficulty}&type=multiple`

        let response = await fetch(apiUrl)

        let data = await response.json()

        displayQuestion()


    })

}



function displayQuestion(){

}

function nextQuestion(){

}

function setTimer(){

}

fetchQuestion()
