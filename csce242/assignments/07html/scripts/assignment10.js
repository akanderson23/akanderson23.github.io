// ============================
// Data: associative arrays
// key = destination name, value = Google Maps search used for the embed
// ============================

const beaches = [];
beaches["Myrtle Beach"] = "Myrtle Beach, SC";
beaches["Folly Beach"] = "Folly Beach, SC";
beaches["Hilton Head Island"] = "Hilton Head Island, SC";
beaches["Kiawah Island"] = "Kiawah Island, SC";

const parks = [];
parks["Congaree"] = "Congaree National Park, SC";
parks["Great Smoky Mountains"] = "Great Smoky Mountains National Park";
parks["Yellowstone"] = "Yellowstone National Park";
parks["Zion"] = "Zion National Park";

const destinations = [];
destinations["beaches"] = beaches;
destinations["parks"] = parks;

// ============================
// Elements
// ============================

const typeSelect = document.getElementById("destination-type");
const destinationList = document.getElementById("destination-list");
const mapContainer = document.getElementById("map-container");
const mapTitle = document.getElementById("map-title");
const mapFrame = document.getElementById("map-frame");

// ============================
// Helpers
// ============================

const hideMap = () => {
  mapContainer.classList.add("hide");
  mapFrame.src = "";
};

const showMap = (name, location) => {
  mapTitle.innerHTML = name;
  mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=10&output=embed`;
  mapContainer.classList.remove("hide");
};

const createDestinationLink = (name, location) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "#";
  a.innerHTML = name;

  a.onclick = (e) => {
    e.preventDefault();
    document.querySelectorAll("#destination-list a").forEach((link) => {
      link.classList.remove("active");
    });
    a.classList.add("active");
    showMap(name, location);
  };

  li.append(a);
  return li;
};

// ============================
// Selecting a destination type
// ============================

typeSelect.onchange = () => {
  destinationList.innerHTML = "";
  hideMap();

  const selected = destinations[typeSelect.value];

  if (!selected) {
    return;
  }

  for (let name in selected) {
    destinationList.append(createDestinationLink(name, selected[name]));
  }
};
