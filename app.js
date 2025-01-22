// 
//https://v6.exchangerate-api.com/v6/8d3b83f672a702c4ca2419d1/latest/USD
let API_KEY = "8d3b83f672a702c4ca2419d1"; 

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");



// for (const code in countryList ) {
//   console.log(code, countryList[code]);
  
// }

for (const select of dropdowns) {
  for (const currcode in countryList) {
    let newopt = document.createElement("option");
    newopt.innerText = currcode;
    newopt.value = currcode;
    if(select.name === "from" && currcode === "USD"){
      newopt.selected = "selected";
    }else if(select.name === "to" && currcode === "INR"){
      newopt.selected = "selected";
    }
    select.append(newopt);
    
  }
  select.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
  })
}

const updateFlag=(Element)=>{
  let currcode = Element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = Element.parentElement.querySelector("img");
  img.src = newsrc;

  //console.log(currcode);
};


const exchangeIcon = document.querySelector(".dropdown .icon");
exchangeIcon.addEventListener("click", ()=>{
  let tempcode = fromcurr.value;
  fromcurr.value = tocurr.value;
  tocurr.value = tempcode;
  updateFlag(fromcurr);
  updateFlag(tocurr);
})


//button exchange rate
btn.addEventListener("click", (evt)=>{
  evt.preventDefault();
  updateExchange();

});



  const updateExchange =  async()=>{
  
  const amount = document.querySelector(".amount input");
  const exchangeTXT = document.querySelector(".exchange-rate");
  let amt = amount.value;
  if(amt === "" || amt < 1){
    amt = 1;
    amount.value = "1";
  }

  exchangeTXT.innerText = "Getting exchange rate..."
  //console.log(amt);
  //console.log(fromcurr.value, tocurr.value);

  //const URL = `${API_KEY}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
  //console.log(fromcurr.value, tocurr.value);

 //const URL = `https://v6.exchangerate-api.com/v6/8d3b83f672a702c4ca2419d1/pair/${fromcurr.value}/${tocurr.value}/${amt}`;

 const URL = ` https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromcurr.value}`;
 fetch(URL).then(resp => resp.json()).then(result =>{
  let exchangerate = result.conversion_rates[tocurr.value];
  let totalexchangeRate = (amt * exchangerate).toFixed(2);
  const exchangeTXT = document.querySelector(".exchange-rate");
  exchangeTXT.innerText = `${amt} ${fromcurr.value} = ${totalexchangeRate} ${tocurr.value}`
  //console.log(totalexchangeRate);
  //console.log(exchangerate);
 }).catch(()=>{
  exchangeTXT.innerText = "something went wrong";
 })
 //console.log(URL);

};

window.addEventListener("load", ()=>{
  updateExchange();

});
