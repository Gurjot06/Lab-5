/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

/* Functions
-------------------------------------------------- */
// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
    console.log(battery);
    // STEP 3b: Update the charging status
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    // STEP 3c: Update the charge level
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = (battery.level * 100);

    // STEP 3d: Integrating with the RoboHash API
    const batteryPercentage = Math.round(battery.level * 100);
    const imageURL = `https://robohash.org/${batteryPercentage}.png`;
    
    // STEP 3e: Display the image on the HTML page
    const imageContainer = document.createElement('img');
    imageContainer.src = imageURL;
    document.body.appendChild(imageContainer);
}

// STEP 2a: Using the getBattery() method of the navigator object, create a promise to retrieve the battery information
navigator.getBattery().then(battery => {
    // STEP 2b: See what the battery object contains
    console.log(battery);
    // STEP 3f: Update the battery information when the promise resolves
    updateBatteryStatus(battery);
    // STEP 4a: Event listener for changes to the charging status
    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    })
    // STEP 4b: Event listener for changes to the charge level
    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    })
})
