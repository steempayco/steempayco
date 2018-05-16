import React, { Component } from "react";
import { Button, Segment, Form, Label, Dimmer, Loader, Input, Dropdown, Select } from 'semantic-ui-react'
import { Redirect, withRouter } from 'react-router-dom';

const currency = [
    { key: 'KRW', text: 'KRW', value: 'KRW' },
    { key: 'USD', text: 'USD', value: 'USD' },
    { key: 'JPY', text: 'JPY', value: 'JPY' },
  ];


class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceData: {currency: 'KRW'},
            invoiceId: null,
            fetching: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event, data) => {
        let invoiceData = this.state.invoiceData;
        invoiceData[data.name] = data.value;
        this.setState(invoiceData);
    }

    onPaymentCreated = (result) => {
        this.setState({invoiceId: result.invoiceId});
    }

    createPayment = (onSuccess) => {
        this.setState({fetching: true});
        var receiver = JSON.parse(this.state.invoiceData.receiver);
        var payload = {
            receiver: receiver.account,
            type: receiver.exchange ? 'exchange' : 'user',
            receiverDetail: receiver,
            amount: this.state.invoiceData.amount,
            currency: this.state.invoiceData.currency,
            memo: this.state.invoiceData.memo
        };
        console.log(payload);

        var data = new FormData();
        data.append( "json", JSON.stringify( payload ) );
        fetch("https://05ngwbbeu3.execute-api.us-west-2.amazonaws.com/Beta/invoice",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then((res) => { return res.json(); })
        .then((data) => {
            onSuccess(data);
        })
        .finally(() => {
            this.setState({fetching: false});
        });
    }

    isReady = () => {
        return this.props.feed
            && this.state.invoiceData.receiver
            && this.state.invoiceData.amount;
    }

    showInvoiceForm = () => {
        const receivers = this.props.users.map((user) => {
            var key = JSON.stringify({account: user.account});
            return {text: user.account, key: user.account, value: key}
        });
        const exchanges = this.props.exchanges.map((exchange) => {
            var key = JSON.stringify({exchange: exchange.name, account: exchange.account, wallet: exchange.wallet, nickname: exchange.nickname});
            return {text: exchange.nickname + ' (' + exchange.account + ')', value: key, key: key };
        });
        return (
            <div>
                <h2>Create Invoice</h2>
                {this.state.fetching && (
                    <Dimmer active>
                        <Loader>Creating...</Loader>
                    </Dimmer>
                )}
                <Segment>
                    Create a QR code with the values, and show it to your customer!
                </Segment>
                <h5>Amount (KRW)</h5>
                <Input fluid name='amount' size='huge' type="number" selection
                    label={<Dropdown name='currency' defaultValue={this.state.invoiceData.currency} options={currency} onChange={this.handleChange} />}
                    labelPosition='right' placeholder='Price' onChange={this.handleChange}
                />
                <h5>Receiver</h5>
                <Dropdown placeholder='Choose Receiver' name='receiver' fluid selection options={[...receivers, ...exchanges]}  onChange={this.handleChange} />
                <h5>Memo (optional)</h5>

                <Input fluid name='memo' placeholder='Transaction message'  onChange={this.handleChange}/>
                <br/>
                <Button circular disabled={!this.isReady()} fluid onClick={() => this.createPayment(this.onPaymentCreated)}>
                    Create Invoice
                </Button>
            </div>
        );
    }

    render() {

        return this.state.invoiceId ? 
            <Redirect push to={this.props.location.pathname + "/" + this.state.invoiceId} />
            :
            this.showInvoiceForm();
    }
}

InvoiceForm.defaultProps = {
    users: [],
    exchanges: [],
    feed: {}
}



export default withRouter(InvoiceForm);