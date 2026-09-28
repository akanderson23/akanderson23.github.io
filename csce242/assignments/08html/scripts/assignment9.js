// ============================
// Road settings
// ============================

const NUM_LANES = 4;
const LANE_HEIGHT = 70; // must match the road height in styles.css (4 x 70 = 280)
const NUM_CARS = 10;

const road = document.getElementById("road");

// ============================
// Helpers
// ============================

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomColor = () => `hsl(${randomNumber(0, 359)}, 70%, 55%)`;

const createPart = (className) => {
  const part = document.createElement("div");
  part.classList.add(className);
  return part;
};

// ============================
// Build one car
// lane: 0-3 (top to bottom)
// position: 0-100, how far across the road the car sits
// color: body color of the car
// facingLeft: true for the top two lanes (traffic heading the other way)
// ============================

const createCar = (lane, position, color, facingLeft) => {
  const car = document.createElement("div");
  car.classList.add("car");

  if (facingLeft) {
    car.classList.add("facing-left");
  }

  car.style.setProperty("--car-color", color);
  car.style.top = `${lane * LANE_HEIGHT + 10}px`;
  car.style.left = `calc((100% - 90px) * ${position / 100})`;

  car.append(createPart("roof"));
  car.append(createPart("body"));
  car.append(createPart("headlight"));
  car.append(createPart("taillight"));
  car.append(createPart("wheel-back"));
  car.append(createPart("wheel-front"));

  road.append(car);
};

// ============================
// Load the cars when the page loads
// ============================

const loadCars = () => {
  for (let i = 0; i < NUM_CARS; i++) {
    const lane = randomNumber(0, NUM_LANES - 1);
    const facingLeft = lane < NUM_LANES / 2;
    createCar(lane, randomNumber(0, 100), randomColor(), facingLeft);
  }
};

window.onload = () => {
  loadCars();
};
