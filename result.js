let highscore=document.getElementById('score')
const getscore=localStorage.getItem('finalScore');
highscore.innerText=getscore?getscore:0;
function resetLocalStorage(){
    window.localStorage.clear();
}