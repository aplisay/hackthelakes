import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import GoogleMapReact from "google-map-react";
import { getImage, GatsbyImage } from "gatsby-plugin-image";

const { GOOGLE_MAPS_API_KEY } = process.env;

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

const Marker = ({ lat, lng, image }) => (
  <GatsbyImage
    image={getImage(image)}
    alt="Map Marker"
    width={markerSize}
    lat={lat}
    lng={lng}
    style={style}
  />
);

const Map = (props) => {
  let data = useStaticQuery(graphql`
    query MarkerQuery {
      contentfulSiteInformation {
        mapMarker {
          marker: gatsbyImageData(width: 50, placeholder: BLURRED)
        }
      }
    }
  `);

  let {
    contentfulSiteInformation: {
      mapMarker: { marker },
    },
  } = data;

  let [lat, lon] = [parseFloat(props.lat), parseFloat(props.lon)];
  let { zoom = 11 } = props;

  return (
    <>
      {isClient && GOOGLE_MAPS_API_KEY && (
        <div style={{ position: "relative", paddingTop: "75%" }}>
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              top: 0,
              left: 0,
            }}
          >
            <GoogleMapReact
              bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
              defaultCenter={[lat, lon]}
              defaultZoom={zoom}
            >
              <Marker {...{ lat, lng: lon }} image={marker} />
            </GoogleMapReact>
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
