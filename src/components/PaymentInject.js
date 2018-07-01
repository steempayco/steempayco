import React, { Component } from "react";
import Scan from 'components/Scan'
import { Redirect, withRouter } from 'react-router-dom';
import { Message } from 'semantic-ui-react'

class PaymentInject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceId: null,
        };
    }

    onScanFinished = (invoiceId) => {
        console.log("onScanFinished: " + invoiceId);
        this.setState({ invoiceId: invoiceId });
    }

    showScanner = () => {
        return <div>
            <h2>SCAN TO PAY</h2>
            <Scan onScanFinished={this.onScanFinished} />
            <Message>
                QR scanner does not support iPhone for now. Please use your default camera app for QR scan. It is faster, safer and also nicer.
            </Message>

        </div>;
    }

    render() {
        return this.state.invoiceId ?
            <Redirect push to={this.props.location.pathname + "/" + this.state.invoiceId} />
            : this.showScanner();
    }
}

export default withRouter(PaymentInject);