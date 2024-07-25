const decrementTime = (obj) => {
    obj.myInterval = setInterval(() => {
        if (obj.decrementFlag) {
            obj.seconds -= 1;
            if (!obj.seconds  ) {
                if (!obj.minutes) {
                    stopTimer(obj);
                } else {
                    obj.minutes -= 1;
                    obj.seconds = 59;
                }
            } else if (obj.seconds < 0) {
               
                stopTimer(obj);
            }
            
            showCurrentTimer(obj);
        }
    }, 1000);
};

const showCurrentTimer = (obj) => {
   const {minutes,seconds}=obj;
    const display = obj.div.querySelector('.timerDisplay');
  
    display.innerHTML =`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
};

const startTimer = (obj) => {
    
    if (obj.minutes === 0 && obj.seconds <= 0) return ;
    
    if (obj.timerStarted) clearInterval(obj.myInterval); 
        
    obj.decrementFlag = true;
    decrementTime(obj);
    obj.timerStarted = true; 
};


const stopTimer = obj => {
    obj.decrementFlag = false;
    clearInterval(obj.myInterval);
    obj.timerStarted = false;
};

const createTimer = () => {
    const newObj = {
        decrementFlag: false,
        timerStarted: false,
        minutes: 0,
        seconds: 10,
        myInterval: null
    };

    const newDiv = document.createElement('div');
    const timerDisplay = document.createElement('div');
    const startButton = document.createElement('button');
    const stopButton = document.createElement('button');

    newDiv.className="timerDiv";

    timerDisplay.className = 'timerDisplay';  
    
    startButton.innerHTML = 'Start';
    startButton.className = 'startButton'; 
    startButton.addEventListener('click', () => startTimer(newObj));

    stopButton.innerHTML = 'Stop';
    stopButton.className = 'stopButton'; 
    stopButton.addEventListener('click', () => stopTimer(newObj));

    newDiv.appendChild(startButton);
    newDiv.appendChild(stopButton);
    newDiv.appendChild(timerDisplay);

    document.body.appendChild(newDiv);
    document.body.appendChild(document.createElement('br'));
    
    startTimer(newObj);
    
    newObj.div = newDiv;
    
    showCurrentTimer(newObj);
    
};

document.getElementById('createButton').addEventListener('click', createTimer);

