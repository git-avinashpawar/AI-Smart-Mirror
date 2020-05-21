eel.expose(updateAssistant);


function updateAssistant(flag, command, answer) {   
    let ans = document.getElementById('ans');
    let cmd = document.getElementById('cmd');
    if(flag == 0){
        cmd.innerHTML = " ";
        ans.innerHTML = " ";
        return;
    } 
    cmd.innerHTML = command;
    ans.innerHTML = ">>> " + answer;
}


function callAssistant(){
    eel.assistant_routine();
}
