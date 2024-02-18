import { api } from "~/utils/api";
import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

function BlogPage({ google }) {


    const { data, isLoading, isError} = api.climates.all.useQuery();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

  
  return (
    <div>
      <Map
        google={google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 34.1003229, lng: -118.341 }}
      >
        {data.map((i, k) => {
          console.log([i.lat, i.long]);
          return (
            <Marker
              position={{ lat: i.lat, lng: i.long }}
            />
          );
        })}
      </Map>
      <div className="pt-[75vh]">
      {data.map(x => {
                return (
                    <div className="">
                        <img src={x.img} />
                        <p>{x.created_at.toString()}</p>
                        <p>{x.comment}</p>
                        <p>{x.lat} {x.long}</p>
                    </div>
                )
        })}
        </div>
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

