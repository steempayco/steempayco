import React from 'react';
import './PageCommon.css';
import './StoreLocator.css';

import fetch from "isomorphic-fetch";
import { compose, withProps, withHandlers, withStateHandlers } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import Api from 'shared/API';

const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAL9c8j-aqKaGnzawfzfZ8tK7dv5L4QC6s";
const storeDataAPI = "https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json";

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: googleMapURL,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: window.innerHeight-90 }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers)
        }
        
    }),
    withHandlers(() => {
        const refs = {
          map: undefined,
        }
    
        return {
          onMapMounted: () => ref => {
            refs.map = ref
          },
          onZoomChanged: ({ onZoomChange }) => (zoomChange) => {
            zoomChange(refs.map.getZoom());
          }
        }
    }),
    withStateHandlers(() => ({
        isOpen: false,
        showInfoIndex: '0'
    }), {
        showInfo: ({ isOpen }) => (key) => ({
            isOpen: true,
            showInfoIndex: key
        }),
        closeInfo: ({ isOpen }) => (key) => ({
            isOpen: false,
            showInfoIndex: key
        })
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        zoom={props.zoom}
        center={{ lat: props.lat, lng: props.lng }}
        ref={props.onMapMounted}
        onZoomChanged={ () => {props.onZoomChanged(props.zoomChange)}}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map(marker => (
                <Marker
                    key={marker.store_id}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    onClick = { ()=> { console.log(marker);props.handleMarkerClick(marker); props.showInfo(marker.store_id); }}
                >
                    {props.isOpen && props.showInfoIndex === marker.store_id && <InfoWindow onCloseClick={ ()=>{ props.closeInfo(marker.store_id);}}>
                        <div className="inforwindow_wrapper">
                            <div className="infowindow_title">{marker.name}</div>
                            <div>
                                <div className="infowindow_row">
                                    <img src={marker.photo_urls[0]} className="infowindow_img" alt=""/>
                                </div>
                                <div className="infowindow_row">
                                    <div className="infowindow_item">
                                        업종 : {marker.category[0]}
                                    </div>
                                    <div className="infowindow_item">
                                        <a target="_blank" href={'https://steemit.com/@'+'seonyu-base'}>@seonyu-base</a>
                                    </div>
                                    <div className="infowindow_item">
                                        <a target="_blank" href={marker.website}>Homepage</a>
                                    </div>
                                    <div className="infowindow_item">
                                        {marker.address}
                                    </div>
                                    <div className="infowindow_item">
                                        {marker.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </InfoWindow>}
                </Marker>
            ))}
        </MarkerClusterer>
    </GoogleMap>
)

class DemoApp extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
            lat: 36.126012,
            lng: 127.552712,
            zoom: 7   
        }
      }
    
    componentWillMount() {
        this.setState({ markers: []});
        this.getGeoLocation();
    }

    componentDidMount() {
        fetch(Api.getStores(
            data => {
                console.log(data);
                this.setState({ 
                    markers: data.stores
                });   
            },
            error => {

            }
        ));
    }

    handleMarkerClick = (marker) => {
        this.setState({ 
            lat: marker.latitude,
            lng: marker.longitude,
            zoom: 14
          })
    }

    getGeoLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                zoom: 14
              });
            }
          )
        } else {
          error => console.log(error)
        }
    }

    zoomChange = (zoom) => {
        this.setState({
            zoom :zoom
        })
    }
    render() {
        return (
            <MapWithAMarkerClusterer markers={this.state.markers}
            lat={this.state.lat}
            lng={this.state.lng}
            zoom={this.state.zoom}
            handleMarkerClick={this.handleMarkerClick}
            zoomChange={this.zoomChange}/>
        )
    }
}


const StoreLocator = () => {
    return (
        <div className="pageArea">
            <DemoApp />
        </div>
    );
};

export default StoreLocator;