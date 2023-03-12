const question = document.getElementById('question');
const answerField = document.getElementById('answer');
const scoreTracker = document.getElementById('score');
const game = document.getElementById('game');

let values = [0, 0, "+-/x"];
let qType = "";
let score = 0;
let numQuestions = 15;
let questionData = [];
let questionTimes = [];
let questionTime = null;



function getRandom(){

  values[0] = Math.floor(Math.random() * 51);
  values[1] = Math.floor(Math.random() * 51);
  qType = values[2][Math.floor(Math.random() * 4)];

 

  if(qType != "/"){

    
    question.innerHTML = `${values[0]} ${qType} ${values[1]} = `;

  } else{

    values[0] = Math.floor(Math.random() * 26);
    values[1] = Math.floor(Math.random() * 30 + 1);

    question.innerHTML = `${values[0] * values[1]} ${qType} ${values[1]} = `;
  }
  
  questionTime = Date.now();


}

function correct(){

  score += 1;
  scoreTracker.innerHTML = `Score: ${score}`
  answerField.value = null;

  var solveTime = (Date.now() - questionTime) / 1000;
  questionData.push([`${values[0]} + ${values[1]}`, solveTime]);
  questionTimes.push(solveTime);


}

function nextAction(){

  if(score < numQuestions){

    getRandom();

  } else{

    endGame();

  }

}

function check(){

  const currentAns = answerField.value;

  if(qType == "+"){

    if(values[0] + values[1] == (currentAns)){

      correct();
      
      nextAction();

    }


  } else if(qType == "-"){

    if(values[0] - values[1] == (currentAns)){

      correct();

      nextAction();
      
    }

  } else if(qType == "/"){

    

    if(values[0] == (currentAns)){

      correct();

      nextAction();
      
    }

  } else if(qType == "x"){

    if(values[0] * values[1] == (currentAns)){

      correct();

      nextAction();
      
    }

  }


  

}

function initialize(){
  getRandom();
  scoreTracker.innerHTML = `Score: ${score}`
}

function makeTable(){
  const tbl = document.createElement("table");
  tbl.setAttribute("id", "results-table");

  const tblBody = document.createElement("tbody");
  tblBody.setAttribute("id", "table-body");

  for (let i = 0; i < questionData.length; i++) {

    const row = document.createElement("tr");

    const questionDisplay = document.createElement("td");
    const questionText = document.createTextNode(questionData[i][0]);
    questionDisplay.appendChild(questionText);

    const timeDisplay = document.createElement("td");
    const timeText = document.createTextNode(`${questionData[i][1]}`);
    timeDisplay.appendChild(timeText);

    row.appendChild(questionDisplay);
    row.appendChild(timeDisplay);

    tblBody.appendChild(row);

  }

  tbl.setAttribute("border", "1");
  tbl.appendChild(tblBody);
  // tbl.classList.add("main");

  const endCard = document.createElement("div");
  endCard.setAttribute("id", "end-card");
  endCard.classList.add("main");
  endCard.classList.add("banner");

  endCard.append(tbl);

  document.body.appendChild(endCard);

}



function drawGraph(){

  const endCard = document.createElement("div");
  endCard.setAttribute("id", "end-card");
  endCard.classList.add("main");
  document.body.appendChild(endCard);

  var line = {
  
    y: questionTimes,
    type: 'scatter'
  
    };

    var height = Math.max(...questionTimes);
    var layout = {

      xaxis: {'title': 'Question Number','fixedrange': true},
      yaxis: {'title': 'Time (seconds)', range: [-0.2, height + 0.5], 'fixedrange': true},
      displayModeBar: false,
    };

    
  
    Plotly.newPlot('end-card', [line], layout);


    var replay = document.createElement("button");
    replay.innerHTML = `Click me to play again`;

    replay.classList.add("hcenter");

    replay.addEventListener ("click", function() {
      window.location.href="app.html";
    });
    
    endCard.appendChild(replay);

    // var avg = questionTimes => questionTimes.reduce((a, b) => a + b) / questionTimes.length;

    // for (let i = 0; i < questionTimes.length; i++) {


    //   var color = questionTimes[i] <= avg ? 'green': `red`;

    //   Plotly.addTraces(endCard, {
    //     x: i,
    //     y: questionTimes[i],
    //     type: 'scatter',
    //     mode: 'markers',
    //     marker: {'color': color},
    //     name: 'marker_trace'
    //   });

    // }

}

function endGame(){

  game.remove();

  // makeTable();


  drawGraph();
  document.body.style.background = "#dddddd";

}

window.onload = initialize();



answerField.addEventListener('input', check);

//const generate = document.getElementById(`get-question`);
//generate.addEventListener('click', check);
// generate.addEventListener("click", getRandom)
