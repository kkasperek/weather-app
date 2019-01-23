// when the page loads
window.addEventListener("load", () => {
  let long;
  let lat;
  const timezone = document.querySelector('.location-timezone');
  const tempDescription = document.querySelector('.temp-description');
  const tempDegree = document.querySelector('.temp-degree');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
    
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/${apikey}/${lat},${long}`;
     
      // API call and return data as json
      fetch(api)
        .then(res => {
          return res.json();
        })
        .then(data => {
            console.log(data);
            const { temperature, summary, icon } = data.currently;
            // Set DOM elements from the API
            tempDegree.textContent = temperature;
            tempDescription.textContent = summary;
            timezone.textContent = data.timezone;
            // Set icon
            setIcons(icon, document.querySelector(".icon"));
        })
        .catch(error => console.error(error));
    });
  }

  // function to set the icon
  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]); 
  }

  // convert to celcius
  function convertToC(F) {
    const degC = (F - 32) * 5/9;
    tempDegree.textContent = degC.toFixed(2); 
  }
   //convert to farenheit
  function convertToF(C) {
    const degF = (C * 9/5) + 32;
    tempDegree.textContent = degF.toFixed(2); 
  }

  // change temperature to celcius/ farenheit
  const tempSection = document.querySelector('.degree-section'); 
  const tempUnit = document.querySelector('.degree-section span');  
  tempSection.addEventListener('click', () => {
    
    let val = parseFloat(tempDegree.textContent).toFixed(2);
    const unit = '\xB0'+'F';
    
    if(tempUnit.textContent === unit){
      tempUnit.textContent = '\xB0'+'C';  //convert to celcius
      convertToC(val);
    } else {
      tempUnit.textContent = '\xB0'+'F';  //convert to farenheit
      convertToF(val);
    }
  })
});
