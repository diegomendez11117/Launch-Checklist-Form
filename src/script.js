

// Here are the variables to work with JSON data and a boolean flag variable.

const URL = 'https://handlers.education.launchcode.org/static/planets.json';
let booleanVar;



// This function allows us to get a random number between 0 and 6.
// To select a random value in the array mission JSON data.

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



// This function allows us to receive a JSON data address and show it to the user.

function fetchInfoJSON() {
  const itemNumber = getRndInteger(0, 6);
  const fetchPromise = fetch(URL);
  fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((json) => {
      const mission = json[itemNumber];
      document.getElementById(
        'missionTarget'
      ).innerHTML = `<h2>Mission Destination</h2>
      <ol>
         <li>Name: ${mission.name}</li>
         <li>Diameter: ${mission.diameter}</li>
         <li>Star: ${mission.star}</li>
         <li>Distance from Earth: ${mission.distance}</li>
         <li>Number of Moons: ${mission.moons}</li>
      </ol>
      <img src="${mission.image}">`;
    });
  });
}



// This function allow us to know if the data enter for the user is correct or not

function validateValues(fuelLevel, cargoMass) {
  return !(
    Number(fuelLevel.value) < 10000 ||
    Number(cargoMass.value) > 10000 ||
    booleanVar
  ) 
}



// This a function to validate the info enter for the user to validate that there
// is not any number in the Pilot and Co-Pilot name.

function textHasNumber(myString) {
  return /\d/.test(myString);
}
window.addEventListener('load', () => {
  fetchInfoJSON(); 

  const button = document.getElementById('formSubmit');

  button.addEventListener('click', (event) => {

    booleanVar = false;
    let pilotName = document.querySelector('input[name=pilotName]');
    let copilotName = document.querySelector('input[name=copilotName]');
    let fuelLevel = document.querySelector('input[name=fuelLevel]');
    let cargoMass = document.querySelector('input[name=cargoMass]');
    if (
      pilotName.value === '' ||
      copilotName.value === '' ||
      fuelLevel.value === '' ||
      cargoMass.value === ''
    ) {
        alert('All fields are required!');
        document.getElementById('pilotName').style.borderColor = 'red';
        document.getElementById('copilotName').style.borderColor = 'red';
        document.getElementById('fuelLevel').style.borderColor = 'red';
        document.getElementById('cargoMass').style.borderColor = 'red';
        booleanVar = true;
        event.preventDefault();
    } else if (textHasNumber(pilotName.value)) {
        booleanVar = true;
        document.getElementById('pilotName').style.borderColor = 'red';
        alert('Please only letters on Pilot Name');
        event.preventDefault();
    } else if (textHasNumber(copilotName.value)) {
        booleanVar = true;
        document.getElementById('copilotName').style.borderColor = 'red';
        alert('Please only letters on Co-Pilot Name');
        event.preventDefault();
    } else if (isNaN(Number(fuelLevel.value))) {
        booleanVar = true;
        document.getElementById('fuelLevel').style.borderColor = 'red';
        alert('Please only numbers on Fuel Level');
        event.preventDefault();
    } else if (isNaN(Number(cargoMass.value))) {
        booleanVar = true;
        document.getElementById('cargoMass').style.borderColor = 'red';
        alert('Please only numbers on Cargo Mass');
        event.preventDefault();
    }

    if (!validateValues(fuelLevel, cargoMass)) {
      document.getElementById('launchStatus').innerHTML =
        'Shuttle not ready for launch';
      document.getElementById('launchStatus').style.color = 'red';
      document.getElementById('faultyItems').style.visibility = 'visible';
      document.getElementById('pilotStatus').innerHTML = `Pilot ${
      document.getElementById('pilotName').value
      } is ready.`;
      document.getElementById('copilotStatus').innerHTML = `Co-pilot ${
        document.getElementById('copilotName').value
      } is ready.`;
      fuelLevel.value < 10000
        ? (document.getElementById(
            'fuelStatus'
          ).innerHTML = `Fuel level low enough for launch.`)
        : (document.getElementById(
            'fuelStatus'
          ).innerHTML = `Fuel level high enough for launch.`);

      cargoMass.value > 10000
        ? (document.getElementById(
            'cargoStatus'
          ).innerHTML = `Cargo mass very high for launch.`)
        : (document.getElementById(
            'cargoStatus'
          ).innerHTML = `Cargo mass low enough for launch.`);

      event.preventDefault();
    } else {
      document.getElementById('launchStatus').style.color = 'green';
      document.getElementById('faultyItems').style.visibility = 'visible';
      document.getElementById('pilotStatus').innerHTML = `Pilot ${
      document.getElementById('pilotName').value
      } is ready.`;
      document.getElementById('copilotStatus').innerHTML = `Co-pilot ${
      document.getElementById('copilotName').value
      } is ready.`;
      document.getElementById(
        'fuelStatus'
      ).innerHTML = `Fuel level high enough for launch.`;
      document.getElementById(
        'cargoStatus'
      ).innerHTML = `Cargo mass low enough for launch.`;

      event.preventDefault();
    }   
  });
});


console.log(window.navigator.userLanguage);