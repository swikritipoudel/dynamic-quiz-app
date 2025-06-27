const quizForm = document.querySelector(".quizForm")
const card = document.querySelector(".card")
let currentIndex = 0
let quizData = [ ]

function fetchQuestion(){
    quizForm.addEventListener("submit", async function (event){
        event.preventDefault()
        
        const category = document.querySelector(".category").value
        const difficulty = document.querySelector(".difficulty").value

        const apiUrl = `https://opentdb.com/api.php?amount=30&category=${category}&difficulty=${difficulty}&type=multiple`

        let response = await fetch(apiUrl)

        let data = await response.json()
        console.log(data)

        quizData = data.results

        displayQuestion(quizData)


    })

}




function displayQuestion(){


let showQuestion = document.createElement("p")
showQuestion.textContent = quizData[currentIndex].question
card.appendChild(showQuestion)

let correct = quizData[currentIndex].correct_answer
let options = [...quizData[currentIndex].incorrect_answers, correct]
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
        nextQuestion();
};    
card.appendChild(nextButton)

}

function nextQuestion(){
    currentIndex++
    displayQuestion()
}

function setTimer(){

}

fetchQuestion()
