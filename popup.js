document.getElementById("save").addEventListener("click", function () {
  var selections = {
    Flat: document.getElementById("Flat").checked,
    Studio: document.getElementById("Studio").checked,
    Apartment: document.getElementById("Apartment").checked,
    Terraced: document.getElementById("Terraced").checked,
    SemiDetached: document.getElementById("SemiDetached").checked,
    Cottage: document.getElementById("Cottage").checked,
    Bungalow: document.getElementById("Bungalow").checked,
    House: document.getElementById("House").checked,
  };

  chrome.storage.sync.set({ selections: selections }, function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "applyFilter" });
    });
  });
});

document.getElementById("reset").addEventListener("click", function () {
  chrome.storage.sync.set({ selections: {} }, function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "resetFilter" });
    });
  });
});
