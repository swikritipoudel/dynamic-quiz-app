const quizForm = document.querySelector(".quizForm")
const card = document.getElementById("card")
let enter = document.getElementById("enter")
let time = document.querySelector(".time")
let currentIndex = 0
let score = 0
let quizData = [ ]
let quizInProgress = false
let timer = null
let elapsedTime = 0 
let endTime
let showTime


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
        card.innerHTML = "Loading questions..." 
          
        const apiUrl = `https://opentdb.com/api.php?amount=30&category=${category}&difficulty=${difficulty}&type=multiple`
        let response = await fetch(apiUrl)

        if(!response.ok){
            throw new Error("Could not fetch resource")
        }

        let data = await response.json()

        if (data.response_code === 1) {
            displayError("No questions found for selected category & difficulty. Try different settings.");
            quizInProgress = false;
            return;
        }

        quizData = data.results


        currentIndex = 0
        score = 0 
        elapsedTime = 0;
        clearInterval(timer);
        

        displayQuestion()
        setTimer()
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
    clearInterval(timer); 
     card.innerHTML = "<p>Quiz completed! Thanks for playing.</p>"
     let displayScore = document.createElement("p")
     displayScore.classList.add("displayScore")
     displayScore.textContent = `Your final score is ${score}`
     card.appendChild(displayScore)
    return
}

let showQuestion = document.createElement("p")
showQuestion.classList.add("showQuestion")
showQuestion.textContent = decodeHtml(quizData[currentIndex].question)
card.appendChild(showQuestion)

let correct = quizData[currentIndex].correct_answer
let options = [...quizData[currentIndex].incorrect_answers, correct]
options.sort(()=>Math.random() - 0.5)


options.forEach((option)=>{
    let wrapper = document.createElement("div")
    wrapper.classList.add("wrapper")
    let radio = document.createElement("input")
    radio.type = "radio"
    radio.name = "options"
    radio.value = option 

    let showOption = document.createElement("label")
    showOption.classList.add("showOption")
    showOption.textContent = decodeHtml(option)

    wrapper.appendChild(radio)
    wrapper.appendChild(showOption)
    card.appendChild(wrapper)
})

    let nextButton = document.createElement("button")
    nextButton.classList.add("nextButton")
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

    if (selectedOption.value === correct) {
        score++;
    } else {
        selectedOption.parentElement.classList.add("incorrect");
    }

     document.querySelectorAll('input[name="options"]').forEach(input => {
        if (input.value === correct) {
            input.parentElement.classList.add("correct");
        }
    });
    


setTimeout(() => {
    currentIndex++
    displayQuestion()
    }, 800);
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





function setTimer(){
    showTime = document.createElement("p")
    showTime.classList.add("showTime")
    time.appendChild(showTime)
    endTime = Date.now() + (20 * 60000)
    timer = setInterval(updateTimer,1000)
    updateTimer()
}




function updateTimer(){
    let currentTime = Date.now()
    elapsedTime = endTime - currentTime

        
    if (elapsedTime <= 0) {
      clearInterval(timer);
      card.innerHTML = "<p>Time's up!</p>";
      const displayScore = document.createElement("p");
      displayScore.textContent = `Your final score is ${score}`;
      card.appendChild(displayScore);
      return;
    }
        
        let showMinutes = Math.floor((elapsedTime/1000)/60)
        let showSeconds = Math.floor((elapsedTime/1000)%60)

        showMinutes = String(showMinutes).padStart(2,"0")
        showSeconds = String(showSeconds).padStart(2,"0")

        showTime.textContent = `${showMinutes}:${showSeconds}`
}



fetchQuestion()
