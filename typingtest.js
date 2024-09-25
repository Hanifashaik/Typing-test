let timerEl = document.getElementById("timer");
let resultEl = document.getElementById("result");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");
let counter = 0;
spinnerEl.classList.toggle("d-none");

function startCounter() {
    counter += 1;
    timerEl.textContent = counter;
}
let counterValue = setInterval(startCounter, 1000);

function getQuote() {
    let options = {
        method: "GET",
    };
    fetch("https://apis.ccbp.in/random-quote")
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            let quote = jsonData.content;
            quoteDisplayEl.textContent = quote;
        });
}
getQuote();

resetBtnEl.onclick = function() {
    spinnerEl.classList.remove("d-none");
    getQuote();
    clearInterval(counterValue); // Clear previous interval
    counter = 0;
    resultEl.textContent = "";
    quoteInputEl.value = "";
    startCounter(); // Start a new interval
};

submitBtnEl.onclick = function() {
    if (quoteInputEl.value === quoteDisplayEl.textContent) {
        clearInterval(counterValue);
        resultEl.textContent = "You typed in " + counter + " seconds";
    } else {
        resultEl.textContent = "You typed the incorrect sentence";
    }
};
