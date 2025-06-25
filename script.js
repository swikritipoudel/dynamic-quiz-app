let category = document.getElementById("category").value
let difficulty= document.getElementById("difficultyLevel").value
let quizForm = document.querySelector(".quizForm")
let card = document.querySelector("card")

quizForm.addEventListener("submit",async function (event){
    event.preventDefault()

    let nextQuestion = document.createElement("button")
    nextQuestion.textContent = "Next Question"
    card.appendChild(nextQuestion)
    
    
    const apiUrl = `https://opentdb.com/api.php?amount=30&category=${category}&difficulty=${difficulty}&type=multiple`

    let response = await fetch(apiUrl)
    

    try{
    let data = await response.json()
    console.log(data)
        }

    catch(error){
            console.error(error)
    }

    
})
