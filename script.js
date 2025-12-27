let currentScore=0;
let highScore=0;
let allQuestions=[];
let currentIndex=0;

// event listeners for start
document.body.querySelector("#start").addEventListener("click",startQuiz); 
// event listeners for high score
document.body.querySelector("#hs").addEventListener("click",showHighsScore);
// event listeners for restart quiz
document.querySelector("#restart").addEventListener("click",restartfunc); 


// main function that starts the quiz
async function startQuiz() {
    let response= await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
    let data= await response.json();
    allQuestions= shuffleArray(data.results);
    currentIndex=0;
    currentScore=0;
    showQuestion();
}


// function which shows uestions, options, working 

function showQuestion(){
    if (currentScore > highScore){                              // for setting highscore & updating in local storage
        highScore=currentScore;
        localStorage.setItem("highScore",highScore);
    }

    if (currentIndex >= allQuestions.length){                                      // what to show when user attempts all questions (5)
        document.querySelector(".questions").style.display="none";
        document.querySelector("#nextQues").style.display="none";
        document.querySelector(".finalMsg").style.display="flex";
        document.querySelector("#showScore").style.color="rgb(162, 255, 153)";
        document.querySelector("#showScore").innerText="Congrats! quiz completetd with score " + currentScore; 
    }

    //working for displaying questions

    else{
        let question=allQuestions[currentIndex].question;               //picking one ques at a time
        let correctAnswer=allQuestions[currentIndex].correct_answer;
        let incorrectAnswers = allQuestions[currentIndex].incorrect_answers;
        let options= shuffleArray([correctAnswer,...incorrectAnswers]);
        document.body.querySelector(".homepage").style.display="none"; //hiding homepage
        document.body.querySelector(".questions").style.display = "flex";
        document.body.querySelector(".questions").style.visibility="visible";
        document.body.querySelector("#question").style.color="pink";
        document.body.querySelector("#question").innerHTML="<b>"+ question +"</b>";

        //selecting all button elements with class = options in  an array
        let optionButtons=document.body.querySelectorAll(".options");
        //using for Each
        optionButtons.forEach((btn,idx)=>{
            document.querySelector("#nextQues").style.display="none"; //hiding next question button
            btn.disabled = false;
            btn.innerText=options[idx]
            btn.style.backgroundColor="";


            btn.addEventListener("click",()=>{                      //when user selects an option
                optionButtons.forEach(b=> b.disabled=true);
                if (btn.innerText===correctAnswer){
                     currentScore++;
                    btn.style.backgroundColor="green";

                // document.querySelector("#nextQues").style.visibility="visible";
                document.querySelector("#nextQues").style.display="block";
                 }
                else {
                btn.style.backgroundColor="red";
                // document.querySelector("#nextQues").style.visibility="visible";
                document.querySelector("#nextQues").style.display="block";
            }
            })
            
        })

    }
}



// function to shuffle the options and questions
function shuffleArray(arr){
    for (let i=0;i<arr.length; i++){
        const j=Math.floor(Math.random()* (i+1));
       [arr[i],arr[j]]=[arr[j],arr[i]];

    }
    return arr;
}


// function that is invoked when user clicks "best score" button
function showHighsScore(){
    document.body.querySelector(".homepage").style.display="none";
    let highscorelocal = localStorage.getItem("highScore") || 0;
    document.body.querySelector("h2").style.display="flex";
    document.body.querySelector("h2").innerText="Highest Score is " + highscorelocal;
    
}


// event when user clicks next question ( doubt: why is it written outside?)
 document.querySelector("#nextQues").addEventListener("click",()=>{
            setTimeout(()=>{
                currentIndex++;
                showQuestion();
            })
        })
  

//function which works when user clicks restart quiz
function restartfunc(){
    document.body.querySelector(".finalMsg").style.display="none";
    currentIndex=0;
    startQuiz();
}

