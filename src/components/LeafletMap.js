import React from 'react';
import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import '../App.css';
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import localforage from 'localforage';
import 'leaflet-offline';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

//Defining the geo search control 
const searchControl = new GeoSearchControl({ //geosearch object
  provider: new OpenStreetMapProvider(),
  // style: 'button',
  showMarker: true,
  autoComplete: true,
  showPopup: false,
  autoClose: true,
  retainZoomLevel: false,
  animateZoom: true,
  // keepResult: false,
  searchLabel: 'search'
});

//Defining the custom marker with an hospital building icon
const customMarker = new L.icon({
  iconUrl: require('../assets/maps-and-flags.svg'),
  iconSize: new L.Point(25, 30),
  // iconAnchor:   [22, 94],
});

//The Map definition
class LeafletMap extends React.Component {

  //Defining the custom icon for clusters
  customIconCreateFunction(cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "marker-cluster-custom",
      iconSize: L.point(40, 40, true)
    });
  }

  //Render pop up for markers
  renderPopup = (index) => {
    return (
      <Popup
        tipSize={5}
        anchor="bottom-right"
        longitude={this.props.data[index].lng}
        latitude={this.props.data[index].lat}
      >
        <p>
          <strong>{this.props.data[index].name}</strong>
          <br />
          Available beds:{this.props.data[index].info}
        </p>
      </Popup>
    );
  }

  //render the map
  render() {
    const position = [this.props.center.lat, this.props.center.lng];
    console.log("Map center: ", position);

    return (
      <div id="map-id">
        <Map center={position} zoom={10} maxZoom={12} id="map" >
          <ZoomControl position="topright" />
          <TileLayer
            // url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            //   attribution= 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            attribution="&copy; <a href=&quot;https://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="tiles/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            showCoverageOnHover={true}
            spiderfyDistanceMultiplier={2}
            iconCreateFunction={this.customIconCreateFunction}
          >
            {this.props.data.map((marker, index) => {
              let post = [marker.lat, marker.lng];
              return (
                <Marker key={index} position={post} icon={customMarker} >
                  {this.renderPopup(index)}
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        </Map>
      </div>
    );
  }
}

export default LeafletMap;
