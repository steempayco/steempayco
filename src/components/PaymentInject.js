import React, { Component } from "react";
import { Dimmer, Loader, Image, Segment, Button, Table } from 'semantic-ui-react'
import Scan from 'components/Scan'
import { Redirect, withRouter } from 'react-router-dom';

class PaymentInject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceId: null,
        };
    }

    onScanFinished = (invoiceId) => {
        console.log("onScanFinished: " + invoiceId);
        this.setState({invoiceId: invoiceId});
    }

    showScanner = () => {
        return <Scan onScanFinished={this.onScanFinished}/>;
    }

    render() {
        return this.state.invoiceId ?
            <Redirect push to={this.props.location.pathname + "/" + this.state.invoiceId} />
            : this.showScanner();
    }
}

export default withRouter(PaymentInject);