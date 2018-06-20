import React, { Component } from "react";
import { QRCode } from 'react-qr-svg';
import { Dimmer, Loader, Button } from 'semantic-ui-react'
import InvoiceDetailView from 'components/InvoiceDetailView'
import Api from 'shared/API'
import Utils from 'shared/Utils'

class InvoiceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: null,
            errorMessage: null
        }
    }

    componentDidMount() {
        Api.fetchInvoice(
            this.props.invoiceId,
            (data) => { this.setState({invoice: data}); },
            (error) => { this.setState({errorMessage: "Failed to open invoice"}); }
        );
    }

    getData = () => {
        return Utils.getBaseUrl() + "/pay/" + this.props.invoiceId;
    }

    copyLink = () => {
        Utils.copyToClipboard(this.getData());
    }

    render() {
        let i = this.state.invoice;
        return i ? (
            <div style={{textAlign:'center'}}>
                <div style={{display:'inline-block', textAlign: 'center', width: '100%', maxWidth: '400px'}}>
                    <h2>
                        SCAN TO PAY
                    </h2>
                    <QRCode style={{width: '100%', maxWidth: 260}} value={this.getData()} />
                    <InvoiceDetailView invoice = {this.state.invoice} feed={this.props.feed} />
                    <p><Button size="huge" circular onClick={this.copyLink}>Get Link</Button></p>
                </div>
            </div>
        ) : this.state.errorMessage ? (<div>{this.state.errorMessage}</div>) : (
            <Dimmer active>
                <Loader>Loading</Loader>
            </Dimmer>
        );
    }
}

export default InvoiceView;