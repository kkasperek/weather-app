// when the page loads
window.addEventListener("load", () => {
  let long;
  let lat;
  let timezone = document.querySelector('.location-timezone');
  let tempDescription = document.querySelector('.temp-description');
  let tempDegree = document.querySelector('.temp-degree');

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
});
