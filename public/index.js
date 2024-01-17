class View {
  constructor() {
    this.tripPlannerForm = document.querySelector(".trip-planner-form");
    this.navBtn = document.querySelector(".nav-btn");
    this.loginForm = document.querySelector(".login-form");
    this.registerForm = document.querySelector(".registeration-form");
  }
}

class MapClass {
  API_KEY = "f9e67f227af94ac6904cfd58e9c65532";
  details = {};
  constructor() {
    this.setMapView();
    this.details = {};
  }
  async setMapView() {
    const { latitude, longitude } = await this.getUserPosition();
    console.log(latitude, longitude);
    this.renderMap(latitude, longitude);
  }

  renderMap(latitude, longitude) {
    const map = L.map("map").setView([latitude, longitude], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    this.map = map;
    this.markCurrentLocation(latitude, longitude, "You are here");
    this.onMapClick = this.onMapClick.bind(this);
    this.map.on("click", this.onMapClick);
  }
  getUserPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          reject(error.message);
        }
      );
    });
  }
  markCurrentLocation(lat, lng, msg) {
    L.marker([lat, lng]).addTo(this.map).bindPopup(msg).openPopup();
  }
  async onMapClick(e) {
    const { lat, lng } = e.latlng;
    this.details = await this.reverseGeoCode(lat, lng);
  }
  //start from here
  async reverseGeoCode(lat, lng) {
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${this.API_KEY}`
      );
      const data = await res.json();
      const { features } = data;
      console.log(data);
      const {
        properties: {
          address_line1,
          address_line2,
          city,
          country,
          county,
          state_district: district,
          country_code,
        },
      } = features.at(0);
      const pincode = address_line2.split(" ")[1];
      flag = this._convertToFlag(country_code);
      return {
        address_line1,
        address_line2,
        city,
        country,
        county,
        district,
        pincode,
        flag,
      };
    } catch (err) {
      console.log(err);
    }
  }
  _convertToFlag(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
}

const map = new MapClass();
// map.setMapView();
