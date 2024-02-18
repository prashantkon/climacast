import { api } from "~/utils/api";
import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Card from "components/svgs/card";

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
      <div className="pt-[55vh]">
      {data.map((x,k) => {
                return (
                    <Card
                        img={x.img}
                        prof={x.profile_image}
                        loc={`${x.lat} ${x.long}`}
                        num={k}
                        fullname={x.author_name}
                        content={x.comment}
                    />
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

