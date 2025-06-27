const quizForm = document.querySelector(".quizForm")
const category = document.querySelector(".category").value
const difficulty = document.querySelector(".difficulty").value
const card = document.querySelector(".card")


function fetchQuestion(){
    quizForm.addEventListener("submit", async function (event){
        event.preventDefault()

        const apiUrl = `https://opentdb.com/api.php?amount=30&category=${category}&difficulty=${difficulty}&type=multiple`

        let response = await fetch(apiUrl)

        let data = await response.json()
        console.log(data)

        let quizData = data.results

        displayQuestion(quizData)


    })

}


let currentIndex = 0

function displayQuestion(quiz){


let showQuestion = document.createElement("p")
showQuestion.textContent = quiz[currentIndex].question
card.appendChild(showQuestion)

let correct = quiz[currentIndex].correct_answer
let options = [...quiz[currentIndex].incorrect_answers, correct]
options.sort(()=>{Math.random() - 0.5})

options.forEach((option)=>{
    let radio = document.createElement("input")
    radio.type = "radio"
    radio.name = "options"

    let showOption = document.createElement("label")
    showOption.textContent = option

    card.appendChild(radio)
    card.appendChild(showOption)
})
    let nextButton = document.createElement("button")
    nextButton.textContent = "Next Question"
    nextButton.onclick = () => {
        nextQuestion(currentIndex, quiz);
};    
card.appendChild(nextButton)

}

function nextQuestion(index){
    index++
    displayQuestion()
}

function setTimer(){

}

fetchQuestion()
