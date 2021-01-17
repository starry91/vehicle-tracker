import React from 'react';
import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import '../App.css';
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import localforage from 'localforage';
import 'leaflet-offline';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

//Static data for list of markers
const markerList = [
  {
    lat: 34.5,
    lng: -115.5,
    name: "ABC Hospitals",
    info: 10
  },
  {
    lat: 34.56,
    lng: -115.56,
    name: "FEK Hospitals",
    info: 10
  },
  {
    lat: 33,
    lng: -114.5,
    name: "NRI Hospitals",
    info: 10
  },
  // {
  //   lat: 17.441597,
  //   lng: 78.356214,
  //   name: "sandya Hospitals"
  // },
  // {
  //   lat: 17.441264,
  //   lng: 78.360184,
  //   name: "childrens Hospitals"
  // }
];

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
  iconUrl: require('../assets/hostpital-building.svg'),
  iconSize: new L.Point(35, 46),
  // iconAnchor:   [22, 94],
});

//The Map definition
class LeafletMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 33.5,
      lng: -115,
      zoom: 10,
      maxZoom: 12
    }
  }

  // componentDidMount() {
  //   //Defining the offline layer for the map
  //   const map = L.map('map-id');
  //   const offlineLayer = L.tileLayer.offline('tiles/{z}/{x}/{y}.png', localforage, {
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //     subdomains: 'abc',
  //     minZoom: 8,
  //     maxZoom: 12,
  //     crossOrigin: true
  //   });
  //   offlineLayer.addTo(map);//add the offline layer
  //   map.zoomControl.remove();
  //   map.addControl(searchControl);
  // }

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
        longitude={markerList[index].lng}
        latitude={markerList[index].lat}
      >
        <p>
          <strong>{markerList[index].name}</strong>
          <br />
          Available beds:{markerList[index].info}
        </p>
      </Popup>
    );
  }

  //render the map
  render() {
    const position = [this.state.lat, this.state.lng];
    console.log(position);

    return (
      <div id="map-id">
        <Map center={position} zoom={10} maxZoom={12} id="map" >
          <ZoomControl position="topright" />
          <TileLayer
            // url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            //   attribution= 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            attribution="&copy; <a href=&quot;https://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="../assets/tiles/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            showCoverageOnHover={true}
            spiderfyDistanceMultiplier={2}
            iconCreateFunction={this.customIconCreateFunction}
          >
            {markerList.map((marker, index) => {
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
