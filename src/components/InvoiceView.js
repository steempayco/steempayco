import React, { Component } from "react";
import { QRCode } from 'react-qr-svg';
import { Dimmer, Loader } from 'semantic-ui-react'
import InvoiceDetailView from 'components/InvoiceDetailView'
import Api from 'shared/Api'

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
        var loc = window.location;
        var baseUrl = loc.protocol + "//" + loc.hostname + (loc.port? ":"+loc.port : "") + "";
        var url = baseUrl + "/pay/" + this.props.invoiceId;
        console.log(this.props.data);
        console.log(url);
        return url;
    }

    fetchInvoice = () => {
        let getPayment = "https://05ngwbbeu3.execute-api.us-west-2.amazonaws.com/Beta/invoice/" + this.props.invoiceId;
        console.log(getPayment);
        let self = this;
        fetch(getPayment)
        .then(function(res){ return res.json(); })
        .then(function(data){ self.setState({invoice: data})})
        .catch((err) => {
            self.setState({errorMessage: "Failed to open invoice"});
        });
    }

    render() {
        let i = this.state.invoice;
        return i ? (
            <div>
                <h2>
                    Scan to Pay
                </h2>
                <div style={{width: '100%', textAlign: 'center' }} >
                    <QRCode style={{width: '100%', maxWidth: 260}} value={this.getData()} />
                    <InvoiceDetailView invoice = {this.state.invoice} />
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