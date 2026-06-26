const quiz=[

{

type:"single",

question:"Which language is used for styling web pages?",

options:["HTML","CSS","Python","Java"],

answer:"CSS"

},

{

type:"multi",

question:"Which of these are JavaScript frameworks?",

options:["React","Laravel","Vue","Django"],

answer:["React","Vue"]

},

{

type:"fill",

question:"HTML stands for __________.",

answer:"HyperText Markup Language"

},

{

type:"single",

question:"Which tag is used for hyperlinks?",

options:["<a>","<link>","<img>","<h1>"],

answer:"<a>"

},

{

type:"multi",

question:"Select Front-End Technologies.",

options:["HTML","CSS","Node.js","JavaScript"],

answer:["HTML","CSS","JavaScript"]

}

];

let current=0;

let score=0;

const question=document.getElementById("question");

const options=document.getElementById("options");

const fill=document.getElementById("fillAnswer");

const next=document.getElementById("nextBtn");

const progress=document.getElementById("progress");

const qno=document.getElementById("question-number");

function loadQuestion(){

let q=quiz[current];

qno.innerHTML=`Question ${current+1} of ${quiz.length}`;

question.innerHTML=q.question;

options.innerHTML="";

fill.style.display="none";

if(q.type==="single"){

q.options.forEach(option=>{

let div=document.createElement("div");

div.className="option";

div.innerHTML=option;

div.onclick=()=>{

document.querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));

div.classList.add("selected");

}

options.appendChild(div);

});

}

if(q.type==="multi"){

q.options.forEach(option=>{

let div=document.createElement("div");

div.className="option";

div.innerHTML=option;

div.onclick=()=>{

div.classList.toggle("selected");

}

options.appendChild(div);

});

}

if(q.type==="fill"){

fill.style.display="block";

fill.value="";

}

progress.style.width=((current)/quiz.length)*100+"%";

}

loadQuestion();

next.onclick=()=>{

let q=quiz[current];

let correct=false;

if(q.type==="single"){

let selected=document.querySelector(".selected");

if(selected){

correct=selected.innerHTML===q.answer;

}

}

if(q.type==="multi"){

let selected=[...document.querySelectorAll(".selected")].map(x=>x.innerHTML);

correct=JSON.stringify(selected.sort())===JSON.stringify(q.answer.sort());

}

if(q.type==="fill"){

correct=fill.value.trim().toLowerCase()===q.answer.toLowerCase();

}

if(correct) score++;

current++;

if(current<quiz.length){

loadQuestion();

}else{

finishQuiz();

}

}

function finishQuiz(){

progress.style.width="100%";

document.querySelector(".quiz-card").classList.add("hidden");

document.getElementById("result").classList.remove("hidden");

document.getElementById("scoreText").innerHTML=

`You scored ${score} out of ${quiz.length}`;

}

function restartQuiz(){

current=0;

score=0;

document.querySelector(".quiz-card").classList.remove("hidden");

document.getElementById("result").classList.add("hidden");

loadQuestion();

}