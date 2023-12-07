const button=document.getElementById("submit");
const input=document.getElementById("name");

input.addEventListener('change', (e)=> {
    const value=e.currentTarget.value;

    if(value===""){
        button.disabled=true;
    } else{
        button.disabled=false;
    }
});