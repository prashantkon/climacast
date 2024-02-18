import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

function BlogPage({ google, posts }) {
  function addItemToMap() {
    const lngmin = -116;
    const lngmax = -81;
    const latmin = 33;
    const latmax = 48;

    const randomLat = Math.random() * (latmax - latmin) + latmin;

    const randomLng = Math.random() * (lngmax - lngmin) + latmin;
    console.log({ lng: randomLng, lat: randomLat });

    return <Marker position={{ lat: randomLat, lng: randomLng }} />;
  }
  return (
    <div>
      <Map
        google={google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 34.1003229, lng: -118.341 }}
      >
        {Array(10).fill().forEach(addItemToMap)}
        {posts.map((i, k) => {
          console.log(i.geolocation);
          return (
            <Marker
              position={{ lat: i.geolocation.lat, lng: i.geolocation.long }}
            />
          );
        })}
      </Map>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDX5b2eROUXhaHcVDNiX4yAnipp3d7898Q"
})(BlogPage);

const mapStyles = {
  width: "100%",
  height: "50%"
};