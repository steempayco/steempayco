import React from 'react';
import './PageCommon.css'

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

const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places";
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
        },
    }),
    withStateHandlers(() => ({
        isOpen: false,
        showInfoIndex: '0'
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen
        }),
        showInfo: ({ showInfo, isOpen}) => (key) => ({
            isOpen: !isOpen,
            showInfoIndex: key
        })
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map(marker => (
                <Marker
                    key={marker.photo_id}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    onClick = { ()=> {console.log(props); props.showInfo(marker.photo_id)}}
                >
                    {props.showInfoIndex === marker.photo_id && <InfoWindow onCloseClick={props.onToggleOpen}>
                        <div>
                        <div>{marker.photo_title}</div>
                        <img src={marker.photo_file_url} style={{maxWidth:window.innerWidth-100}}/>
                        </div>
                    </InfoWindow>}
                </Marker>
            ))}
        </MarkerClusterer>
    </GoogleMap>
)

class DemoApp extends React.PureComponent {
    componentWillMount() {
        this.setState({ markers: [] })
    }

    componentDidMount() {
        fetch(storeDataAPI)
            .then(res => res.json())
            .then(data => {
                this.setState({ markers: data.photos });
            });
    }

    render() {
        return (
            <MapWithAMarkerClusterer markers={this.state.markers} />
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