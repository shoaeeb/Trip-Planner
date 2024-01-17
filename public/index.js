// let map = L.map("map").setView([51.505, -0.09], 13);
// let marker = L.marker([51.5, -0.09]).addTo(map);
// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);

class MapClass {
  constructor() {
    this.setMapView();
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
  onMapClick(e) {
    const { lat, lng } = e.latlng;
  }
  //start from here
  reverseGeoCode(lat, lng) {}
}

const map = new MapClass();
// map.setMapView();
