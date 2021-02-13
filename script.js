const question=document.getElementById('question');
const choices=Array.from(document.getElementsByClassName('choice-text'));
const questionNumber=document.getElementById('progress-text');
const innerbar=document.getElementById('progress-bar-fill');
const finalscore=document.getElementById('count')

let currentQuestion={};
let acceptAnswers=false;
let score=0;
let questionCounter=0;
let availableQuestions=[];
let questions=[];



fetch('https://opentdb.com/api.php?amount=10')
.then(res=>{
    return res.json()
})
.then(data=>{
    questions=data.results.map(loadedQuestions=>{
        const formattedQuestions={
            question: loadedQuestions.question
        };
        const answerChoices=[...loadedQuestions.incorrect_answers]
        
    formattedQuestions.answer=Math.floor(Math.random()*3)+1;
    answerChoices.splice(
        formattedQuestions.answer-1,
        0,
        loadedQuestions.correct_answer
        );
        answerChoices.forEach((choice,index)=>{
        formattedQuestions["choice"+(index+1)]=choice;
    })
        return formattedQuestions;
    })
    // questions=data;   
     startgame();
}).catch(err=>{console.log(err)})


const CORRECT_ANSWER=10
const MAX_QUESTIONS=5


startgame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
}
getNewQuestion=()=>{
    if (questionCounter>=MAX_QUESTIONS){
        return window.location.assign('result.html');
    }
    questionCounter++;
    questionNumber.innerText=`Question ${questionCounter}/${MAX_QUESTIONS}`;
    innerbar.style.width=(questionCounter/MAX_QUESTIONS*100)+"%";
    

    const questionIndex=Math.floor(Math.random()*availableQuestions.length)
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;   

    choices.forEach(choice=>{
        const number=choice.dataset['number'];
        choice.innerText=currentQuestion['choice'+number]
    })

    availableQuestions.splice(questionIndex,1);
    acceptAnswers=true;
    choices.forEach(choice=>{
        choice.addEventListener('click',e=>{
            if(!acceptAnswers) return;
            acceptAnswers=false;
            const selectedChoice = e.target;
            console.log(selectedChoice)
            const selectedAnswer=selectedChoice.dataset['number'];
            const classToApply=selectedAnswer==currentQuestion.answer?"correct":"incorrect"
            if( classToApply === "correct") {
                incrementScore(CORRECT_ANSWER);
               
            }
            selectedChoice.classList.add(classToApply);
            setTimeout(()=>{
                selectedChoice.classList.remove(classToApply);
                getNewQuestion();
            },1000)
        })
    })
}
incrementScore=(number)=>{
    score=score+number;
    finalscore.innerText=score;
   window.localStorage.setItem('finalScore',score)
}
function resetLocalStorage(){
    window.localStorage.clear();
}
startgame();
