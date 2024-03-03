// Container Creation
let container = document.createElement("div");
container.className = "container-fluid";

//Heading Creation
let heading = document.createElement("h2");
heading.className = "title";
heading.innerHTML = "Crypto Currency";

// row creation
let row = document.createElement("div");
row.className = "row";

// col creation
let new_col = document.createElement("div");
new_col.className = "col-md-12 col-lg-12 col-sm-12 col-center";

// card creation
let card = document.createElement("div");
card.className = "card";

// card-header creation
let card_header = document.createElement("div");
card_header.className = "card-header";
card_header.innerHTML = `<label for="cityInput" class="form-group__label">Enter Currency Name:</label>
<div class="input-group mb-3" id="myForm">
<input id="searchbar" type="text" class="form-control" name="query" placeholder="Eg., Bitcoin" aria-label="Search Crypto Currencies" aria-describedby="basic-addon2">
<button class="input-group-text" id="basic-addon2" onclick="getCurrencyInfo()"><i class="fa fa-search" aria-hidden="true"></i></button>
</div>`;

//card-body creation
let card_body = document.createElement("div");
card_body.id = "currencyInfo";
card_body.className = "card-body";

// append all the elements into document
card.append(card_header,card_body);
new_col.append(card);
row.append(new_col);
container.append(heading,row);
document.body.append(container);

// ================================

// Function to get details from API
let getCurrencyInfo = async () => {
  try {
    // Get input from users
    let searchInput = document.getElementById("searchbar").value.trim().toLowerCase();

    // Check input is empty or not
    if (searchInput) {
      
      // fetch data from Crypto currency API
      let cryptoAPI = await fetch(`https://api.coincap.io/v2/assets/${searchInput}`);
      let result = await cryptoAPI.json();

      // To append into card body
      let currencyInfo = document.getElementById("currencyInfo");
      currencyInfo.innerHTML = `  <div class="card-text">
    <h4>Crypto Currency Details:</h4>
    <p>Name : ${result.data.name}<p>
    <p>Price : ${result.data.priceUsd} USD</p>
    <p>Rank : ${Math.round(result.data.rank).toLocaleString()}</p>
    <p>Symbol : ${result.data.symbol}</p>
    <p>Market Capital : ${Math.round(result.data.marketCapUsd).toLocaleString()} USD</p>
    <p>Supply : ${Math.round(result.data.supply).toLocaleString()} USD</p>
    <p>Max-supply : ${Math.round(result.data.maxSupply).toLocaleString()} USD</p>
    <p>Volume(24H) : ${Math.round(result.data.vwap24Hr).toLocaleString()} USD</p>
    <p>Total volume : ${Math.round(result.data.volumeUsd24Hr).toLocaleString()} USD</p>
    <a href="${result.data.explorer}" target="_blank">More info</a>
    </div>`;

    } else {
      alert("Please Enter currency name");
    }
  } catch (error) {
    console.log(error);
    alert("Please Enter valid currency name")
  }
};
