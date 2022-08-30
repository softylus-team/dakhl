import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>
    <img src="/appIcons/Google_Maps_pin.svg" />
</div>;

class SimpleMap extends Component {
    static defaultProps = {
        zoom: 11,
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '342px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyA2KMXKtSlboS_N-JAHpPbjqo0J9L89Q9w" }}
                    defaultCenter={{
                        lat: this.props.lat,
                        lng: this.props.lng
                    }}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={this.props.lat}
                        lng={this.props.lng}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;