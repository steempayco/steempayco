import React, { Component } from "react";
import { Button, Icon } from 'semantic-ui-react'

import './Scan.css';

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanValue: null,
            scanner: null,
            scanning: false};

        this.toggleScan = this.toggleScan.bind(this);
    }

    componentDidMount() {
        this.loadScanner();
    }

    loadScanner = () => {
        if (window.Instascan) {
            console.log("Instascan found!");

            let _this = this;
            let videoComponent = document.getElementById('preview');
            let scanner = new window.Instascan.Scanner({ video: videoComponent, mirror: false });
            _this.setState({scanner: scanner});
            scanner.addListener('scan', function (content) {
                console.log(content);
                _this.setState({scanValue: content});
                _this.props.onScanFinished(content.split("/").pop());
                _this.toggleScan();
            });
        } else {
            console.log("window.Instascan does not exit!");
            setTimeout(() => this.loadScanner(), 500);
        }
    }

    toggleScan() {
        let _this = this;
        if (this.state.scanning) {
            this.state.scanner.stop();
        } else {
            window.Instascan.Camera.getCameras().then(function (cameras) {
                if (cameras.length > 0) {
                    _this.state.scanner.start(cameras[cameras.length-1]);
                } else {
                    console.error('No cameras found.');
                }
                }).catch(function (e) {
                    console.error(e);
            });
        }
        this.setState({scanning: !this.state.scanning});
    }
    
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                {this.state.scanner &&
                <Button fluid secondary onClick={this.toggleScan}>
                    {this.state.scanning ? "Cancel" : (
                        <span>
                        Scan QR Code
                        <Icon name="camera" style={{paddingLeft: 10}} />
                        </span>
                        )}
                </Button>}
                <div style={{paddingTop: 10}}>
                    <div className="videoContainer" style={{display: this.state.scanning ? "inline-block":"none"}}>
                        <video id="preview"
                        style={{width: 300, height: 300, objectFit: 'cover', display: 'inline-block'}}></video>
                        {this.state.scanValue && (
                            <div> {this.state.scanValue} </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default Scan;
