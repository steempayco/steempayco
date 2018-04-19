import React, { Component } from "react";
import { Button, Icon } from 'semantic-ui-react'

import './Scan.css';
let Instascan = window.Instascan;

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {scanValue: null, scanning: false};

        this.toggleScan = this.toggleScan.bind(this);
        this.onVideoClick = this.onVideoClick.bind(this);
    }

    componentDidMount() {
        let _this = this;
        let videoComponent = document.getElementById('preview');
        this.scanner = new Instascan.Scanner({ video: videoComponent, mirror: false });
        this.scanner.addListener('scan', function (content) {
            console.log(content);
            _this.setState({scanValue: content});
            _this.toggleScan();
        });
    }

    toggleScan() {
        let _this = this;
        if (this.state.scanning) {
            this.scanner.stop();
        } else {
            Instascan.Camera.getCameras().then(function (cameras) {
                if (cameras.length > 0) {
                    _this.scanner.start(cameras[0]);
                } else {
                    console.error('No cameras found.');
                }
                }).catch(function (e) {
                    console.error(e);
            });
        }
        this.setState({scanning: !this.state.scanning});
    }

    onVideoClick() {
        console.log('video clicked!');
        this.scanner.stop();
    }
    
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Button fluid secondary onClick={this.toggleScan}>
                    {this.state.scanning ? "Cancel" : (
                        <span>
                        Scan QR Code
                        <Icon name="camera" style={{paddingLeft: 10}} />
                        </span>
                        )}
                </Button>
                <div style={{paddingTop: 10}}>
                    <div class="videoContainer" style={{display: this.state.scanning ? "inline-block":"none"}}>
                        <video id="preview"
                        style={{width: 300, height: 300, objectFit: 'cover', display: 'inline-block'}}></video>
                        {this.state.scanValue && (
                            <div> {this.state.scanValue} </div>
                        )}
                    </div>
                </div>
                <div>
                    Information
                </div>
            </div>
        );
    }
};

export default Scan;