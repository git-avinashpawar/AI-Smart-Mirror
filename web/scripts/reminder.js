eel.expose(updateReminders);

function updateReminders(reminder, clear){
    let list = document.getElementById("list");
    if(clear == 1){
        list.innerHTML = " ";
        return;
    }
    const item = `<li> <p> ${reminder} </p> </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}