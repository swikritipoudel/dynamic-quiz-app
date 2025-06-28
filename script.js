const quizForm = document.querySelector(".quizForm")
const card = document.getElementById("card")
let enter = document.getElementById("enter")
let currentIndex = 0
let score = 0
let quizData = [ ]
let quizInProgress = false


function decodeHtml(html) {
    const txt = document.createElement("textarea")
    txt.innerHTML = html
    return txt.value
}

function fetchQuestion(){
    quizForm.addEventListener("submit", async function (event){
        
        event.preventDefault()

         if(quizInProgress) {
            return
        }
        
        const category = document.querySelector(".category").value
        const difficulty = document.querySelector(".difficulty").value

        if(category && difficulty){

        try{   
        quizInProgress = true    
        const apiUrl = `https://opentdb.com/api.php?amount=30&category=${category}&difficulty=${difficulty}&type=multiple`
        let response = await fetch(apiUrl)

        if(!response.ok){
            throw new Error("Could not fetch resource")
        }

        let data = await response.json()
        quizData = data.results
        displayQuestion()
        }

        catch(error){
            displayError(error)
            console.error(error)
        }

        }

        else{
            displayError("Please fill in details.")
        }


    })

}




function displayQuestion(){

    card.innerHTML = ""

if (currentIndex >= quizData.length){
     card.innerHTML = "<p>Quiz completed! Thanks for playing.</p>"
     let displayScore = document.createElement("p")
     displayScore.textContent = `Your final score is ${score}`
     card.appendChild(displayScore)
    return
}

let showQuestion = document.createElement("p")
showQuestion.textContent = decodeHtml(quizData[currentIndex].question)
card.appendChild(showQuestion)

let correct = quizData[currentIndex].correct_answer
let options = [...quizData[currentIndex].incorrect_answers, correct]
options.sort(()=>Math.random() - 0.5)

let radio;
options.forEach((option)=>{
    radio = document.createElement("input")
    radio.type = "radio"
    radio.name = "options"
    radio.value = option 

    let showOption = document.createElement("label")
    showOption.textContent = decodeHtml(option)

    card.appendChild(radio)
    card.appendChild(showOption)
})

    let nextButton = document.createElement("button")
    nextButton.textContent = "Next Question"
    nextButton.type = "button"
    nextButton.onclick =() =>{
        nextQuestion(correct)
    }
    card.appendChild(nextButton)
    
}







function nextQuestion(correct){
    const selectedOption = document.querySelector('input[name="options"]:checked')    
    if(!selectedOption) {
        displayError("Please select an answer before proceeding")
        return
    }

    if(correct === selectedOption.value){
        score++
    }
    currentIndex++
    displayQuestion()
}



function displayError(message){
    const existingError = document.querySelector('.error-message')
    if(existingError) {
        existingError.remove()
    }

    let error = document.createElement("p")
    error.className = "error-message"
    error.textContent = message

    card.appendChild(error)
}



fetchQuestion()
