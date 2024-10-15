const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select  of dropdowns){
for(code in countryList){
    let newoption =document.createElement("option");
     newoption.innerText=code;
     newoption.value=code;
 if(select.name==="from"&&code==="USD"){
    newoption.selected="selected";
 }
 if(select.name==="to"&&code==="INR"){
    newoption.selected="selected";
 }
select.append(newoption);

}
select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
});
}

let updateflag=(element) =>{
let code=element.value;
let countryc= countryList[code];
let newsrc=`https://flagsapi.com/${countryc}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newsrc;
};
  
const updaterate= async ()=>{

    let amt=document.querySelector(".amount input");
let amtval=amt.value;
if(amtval === "" || amtval <1){
    amtval=1;
    amt.value="1";
}
 const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;


 let response= await fetch(URL);

 let data= await response.json();
 
 let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
 
 let famt=amtval*rate;

msg.innerText=`${amtval} ${fromCurr.value} = ${famt} ${toCurr.value}`
}


btn.addEventListener("click",(evt)=>{
evt.preventDefault();
updaterate();

});

window.addEventListener(("load"),()=>{
    updaterate();
});