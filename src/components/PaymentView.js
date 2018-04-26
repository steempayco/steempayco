import React, { Component } from "react";
import { Dimmer, Loader, Button } from 'semantic-ui-react'
import InvoiceDetailView from 'components/InvoiceDetailView'
import Api from 'shared/Api'

class PaymentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: null
        };
    }

    componentDidMount() {
        Api.fetchInvoice(
            this.props.invoiceId,
            (data) => { this.setState({invoice: data}); },
            (error) => { this.setState({errorMessage: "Failed to open invoice"}); }
        );
    }

    payViaSteemConnect = () => {
        let info = this.state.invoice;
        let amount = info.credit.amount + " " + info.credit.currency;
        let amountSBD = (info.credit.amount / info.rate.price).toFixed(3) + " SBD";
        let message = "";
        if (info.receiver.exchange) {
            message = info.receiver.wallet;
        } else {
            message = "[SteemPay] " + info.memo + " | " + amount + " | " + amountSBD;
        }
        console.log(message);
        let scUrl = "https://steemconnect.com/sign/transfer?to=" + info.receiver.account
                + "&amount=" + encodeURIComponent(amountSBD)
                + "&memo=" + encodeURIComponent(message);
        document.location.href = scUrl;
    }

    fetchInvoice = () => {
        let getInvoice = "https://05ngwbbeu3.execute-api.us-west-2.amazonaws.com/Beta/invoice/" + this.props.invoiceId;
        console.log(getInvoice);
        let self = this;
        fetch(getInvoice)
        .then(function(res){ return res.json(); })
        .then(function(data){ self.setState({invoice: data})})
        .catch((err) => {
            self.setState({errorMessage: "Failed to open invoice"});
        });
    }

    render() {
        return this.state.invoice ? (
                    <div>
                    <InvoiceDetailView invoice={this.state.invoice} />
                    <Button fluid onClick={this.payViaSteemConnect}>Pay via SteemConnect</Button>
                    </div>
                ) : this.state.errorMessage ? (<div>{this.state.errorMessage}</div>) : (
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer>
                );
    }
}

export default PaymentView;