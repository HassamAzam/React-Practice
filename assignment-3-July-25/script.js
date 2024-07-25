const stopButtton = () =>{

}

const startButton= () =>
{

}

 const timeObj={
    decrementFlag:false,
    minutes : 0,
    seconds : 10,
    myInterval : null

}

const decrementTime=()=>
{
    

}

const createDocumentElements=()=>
    {      //creating a new div,with two child buttons
        const newDiv = document.createElement('div'); 
        const startButton = document.createElement('button');
        startButton.innerHTML = 'Start';
        const stopButton = document.createElement('button');
        stopButton.innerHTML = 'Stop';
        //adding events to those buttons
        startButton.addEventListener('click',startButton);
        stopButton.addEventListener('click',stopButton);
        //making the buttons childs of the parent div
        newDiv.appendChild(startButton);
        newDiv.appendChild(stopButton);
        document.body.appendChild(newDiv);
    }



const timeCreate=document.getElementById('TimeCreate');
timeCreate.addEventListener('click',createDocumentElements);