let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result");

// Create dropdown from the currencies array
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);

  // Repeat same thing for the other dropdown
  const toOption = document.createElement("option");
  toOption.value = currency;
  toOption.text = currency;
  toDropDown.add(toOption);
});

// Setting default values
fromDropDown.value = "USD";
toDropDown.value = "INR";

let convertCurrency = async () => {
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  if (amount.length !== 0) {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      let fromExchangeRate = data.conversion_rates[fromCurrency];
      let toExchangeRate = data.conversion_rates[toCurrency];
      const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
      result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
        2
      )} ${toCurrency}`;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    alert("Please fill in the amount");
  }
};

// Add event listeners
document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);
document.querySelector("#amount").addEventListener("input", convertCurrency);
window.addEventListener("load", convertCurrency);
