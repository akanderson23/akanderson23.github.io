// ============================
// Vacation class
// ============================

class Vacation {
  constructor(title, type, description, thingsToDo, image, mapSrc) {
    this.title = title;
    this.type = type;
    this.description = description;
    this.thingsToDo = thingsToDo;
    this.image = image;
    this.mapSrc = mapSrc;
  }

  // Returns the card section that goes in the gallery
  getCard() {
    const section = document.createElement("section");
    section.classList.add("vacation-card");

    const header = document.createElement("div");
    header.classList.add("card-header");
    header.append(this.createElement("h3", this.title));
    header.append(this.createElement("p", `${this.type} Vacation`));
    section.append(header);

    const img = document.createElement("img");
    img.src = `images/${this.image}`;
    img.alt = this.title;
    section.append(img);

    section.onclick = () => this.showModal();
    return section;
  }

  // Fills the modal with this vacation's data and opens it
  showModal() {
    document.getElementById("modal-title").innerHTML = this.title;
    document.getElementById("modal-type").innerHTML = this.type;
    document.getElementById("modal-description").innerHTML = this.description;
    document.getElementById("modal-things").innerHTML = this.thingsToDo;
    document.getElementById("modal-map").src = this.mapSrc;
    document.getElementById("vacation-modal").style.display = "block";
  }

  // Helper: makes an element with the given text
  createElement(tag, text) {
    const element = document.createElement(tag);
    element.innerHTML = text;
    return element;
  }
}

// ============================
// Helpers
// ============================

const getMapSrc = (location) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=k&z=12&output=embed`;

const closeModal = () => {
  document.getElementById("vacation-modal").style.display = "none";
  document.getElementById("modal-map").src = "";
};

const showVacations = (vacations) => {
  const gallery = document.getElementById("vacation-gallery");
  vacations.forEach((vacation) => {
    gallery.append(vacation.getCard());
  });
};

// ============================
// Data: array of Vacations
// ============================

const vacations = [
  new Vacation(
    "Asheville",
    "Mountain",
    "An artsy mountain city known for its craft breweries, live music, and views of the Blue Ridge.",
    "Tour the Biltmore Estate, drive the Blue Ridge Parkway, explore the River Arts District.",
    "asheville.jpg",
    getMapSrc("Asheville, NC")
  ),
  new Vacation(
    "Boone",
    "Mountain",
    "A scenic college town in the Blue Ridge Mountains with beautiful hiking and skiing.",
    "Go skiing, visit Appalachian State University, hike Grandfather Mountain.",
    "boone.jpg",
    getMapSrc("Boone, NC")
  ),
  new Vacation(
    "Hot Springs",
    "Mountain",
    "A tiny river town on the Appalachian Trail famous for its natural mineral hot springs.",
    "Soak in the hot springs, raft the French Broad River, hike part of the Appalachian Trail.",
    "hot-springs.jpg",
    getMapSrc("Hot Springs, NC")
  ),
  new Vacation(
    "Table Rock",
    "Mountain",
    "A state park in the Upstate of South Carolina with a famous granite dome and lake views.",
    "Hike the Table Rock Trail, swim in Pinnacle Lake, picnic at the lodge.",
    "table-rock.jpg",
    getMapSrc("Table Rock State Park, SC")
  ),
  new Vacation(
    "Sunset Beach",
    "Beach",
    "A quiet, family-friendly beach town on North Carolina's southern coast.",
    "Walk to the Kindred Spirit mailbox, fish off the pier, watch the sunset over the marsh.",
    "sunset-beach.jpg",
    getMapSrc("Sunset Beach, NC")
  ),
  new Vacation(
    "Edisto Beach",
    "Beach",
    "A laid-back South Carolina island with undeveloped beaches and salt marshes.",
    "Hunt for fossils and shark teeth, kayak the marshes, visit Edisto Beach State Park.",
    "edisto-beach.jpg",
    getMapSrc("Edisto Beach, SC")
  ),
  new Vacation(
    "Oak Island",
    "Beach",
    "A long barrier island with wide beaches, a lighthouse, and a classic fishing pier.",
    "Climb the Oak Island Lighthouse, fish off the Ocean Crest Pier, rent bikes along the beach.",
    "oak-island.jpg",
    getMapSrc("Oak Island, NC")
  ),
  new Vacation(
    "Pawleys Island",
    "Beach",
    "One of the oldest beach resorts on the East Coast, known for its relaxed, \"arrogantly shabby\" charm.",
    "Lie in a Pawleys Island hammock, visit Brookgreen Gardens, go crabbing on the creek.",
    "pawleys-island.jpg",
    getMapSrc("Pawleys Island, SC")
  ),
];

// ============================
// Page setup
// ============================

showVacations(vacations);

document.getElementById("modal-close").onclick = closeModal;

// Clicking the dark area outside the dialog also closes it
window.onclick = (e) => {
  if (e.target === document.getElementById("vacation-modal")) {
    closeModal();
  }
};
