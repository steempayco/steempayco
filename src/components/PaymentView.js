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

    payViaSteemConnect = (rate) => {
        let info = this.state.invoice;
        let amount = info.amount + " " + info.currency;
        let amountSBD = (info.amount / rate.price).toFixed(3) + " SBD";
        let message = "";
        if (info.type == 'exchange') {
            message = info.receiver.wallet;
        } else {
            message = "[SteemPay] " + info.memo + " | " + amount + " | " + amountSBD;
        }
        console.log(message);
        let scUrl = "https://steemconnect.com/sign/transfer?to=" + info.receiver
                + "&amount=" + encodeURIComponent(amountSBD)
                + "&memo=" + encodeURIComponent(message);
        document.location.href = scUrl;
    }

    renderPaymentBlock = () => {
        const rate = this.props.feed && this.props.feed.find((item) => item.currency === this.state.invoice.currency);
        return <div>
                <InvoiceDetailView invoice={this.state.invoice} rate={rate}/>
                <Button fluid onClick={this.payViaSteemConnect(rate)}>Pay via SteemConnect</Button>
                </div>;
    }

    renderLoadingBlock= () => {
        return this.state.errorMessage ?
                (<div>{this.state.errorMessage}</div>)
            :
                (<Dimmer active>
                    <Loader>Loading</Loader>
                </Dimmer>);
    }

    render() {
        return this.state.invoice ? this.renderPaymentBlock() : this.renderLoadingBlock();
    }
}

export default PaymentView;