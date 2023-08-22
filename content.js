function applyFilter() {
  var propertyTypeMapping = {
    Flat: "Flat",
    Studio: "Studio",
    Apartment: "Apartment",
    Terraced: "Terraced",
    SemiDetached: "Semi-Detached",
    Cottage: "Cottage",
    Bungalow: "Bungalow",
    House: "House",
  };

  chrome.storage.sync.get("selections", function (data) {
    var selections = data.selections || {
      Flat: true,
      Studio: true,
      Apartment: true,
      Terraced: true,
      SemiDetached: true,
      Cottage: true,
      Bungalow: true,
      House: true,
    };

    var propertyTypes = document.querySelectorAll(
      ".property-information span.text"
    );
    propertyTypes.forEach(function (propertyType) {
      var propertyText = propertyType.textContent.trim();
      var mappedText = propertyTypeMapping[propertyText];
      if (selections[mappedText]) {
        var propertyCard = propertyType.closest(".l-searchResult.is-list");
        if (propertyCard) {
          propertyCard.style.display = "none";
        }
      }
    });
  });
}

function resetFilter() {
  var propertyCards = document.querySelectorAll(".l-searchResult.is-list");
  propertyCards.forEach(function (propertyCard) {
    propertyCard.style.display = "";
  });
}

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === "applyFilter") {
    applyFilter();
  } else if (request.action === "resetFilter") {
    resetFilter();
  }
});

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === "applyFilter") {
    applyFilter();
  }
});
