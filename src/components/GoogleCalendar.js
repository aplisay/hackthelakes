import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import axios from 'axios';
import FixedSize from "./FixedSize";



const isClient = typeof window !== "undefined";
const markerSize = 50;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: markerSize,
  height: markerSize,
  backgroundColor: "#000",
  border: "2px solid #ff0000",
  borderRadius: "100%",
  transform: "translate(-50%, -50%)",
};

async function getCalendarEvents(calendar, key) {
  let now = (new Date()).toISOString;
  let path = `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events?key=${key}&singleEvents=true&orderBy=startTime&timeMin=${now}`
  let { data } = await axios.get(path);
  console.log({ data });
  return data;
}

const Calendar = ({ calendar, key, eventId }) => {


  return (
    <>
      {isClient && calendar && key && (
       <FixedSize height="75%">
            <GoogleMapReact
              bootstrapURLKeys={{ key: googleMapsAPIKey }}
              defaultCenter={[lat, lon]}
              defaultZoom={zoom}
            >
              <Marker {...{ lat, lng: lon }} image={marker} />
            </GoogleMapReact>
        </FixedSize>
      )}
    </>
  );
};

export default Map;
