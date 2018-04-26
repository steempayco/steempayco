import React, { Component } from "react";
import { Button, Segment, Form, Label, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect, withRouter } from 'react-router-dom';

class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceData: {},
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
        receiver.type = receiver.exchange ? 'exchange' : 'user';
        var credit = {
            amount: this.state.invoiceData.amount,
            currency: this.props.feed.currency,
            sbdAmount: (this.state.invoiceData.amount / this.props.feed.price)
        }
        var payload = {
            receiver: receiver,
            credit: credit,
            rate: this.props.feed,
            memo: this.state.invoiceData.memo
        };

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

    showConvertRate = () => {
        console.log(this.props.feed);
        return (<div style={{marginBottom: 10, textAlign: 'right', marginTop: -10}}>
            {this.props.feed ? (
                <div>
                    <p style={{fontSize: 11}}>
                    1 SBD = {this.props.feed.price} KRW ({this.props.feed.exchange}, {this.props.feed.lastUpdate})
                    </p>
                    {this.state.invoiceData.amount && (
                        <Label size='big' color='green' tag>{(this.state.invoiceData.amount / this.props.feed.price).toFixed(3)} SBD</Label>
                    )}<br/>
                </div>) : (
                <p style={{fontSize: 11, color: 'red'}}>No feed</p>
            )}
        </div>);
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
                <Form>
                    <Form.Select fluid name='receiver' label='Receiver' options={[...receivers, ...exchanges]} placeholder='Choose Receiver'  onChange={this.handleChange}/>
                    <Form.Input fluid name='amount' type="number" label='Amount (KRW)' placeholder='Amount'  onChange={this.handleChange}/>
                    {this.showConvertRate()}
                    <Form.Input fluid name='memo' label='Memo (optional)' placeholder='Transaction message'  onChange={this.handleChange}/>
                    <div style={{marginBottom: 10, textAlign: 'right', marginTop: -10}}>
                        <span style={{fontSize: 11}}>Ignored for exchange accounts</span>
                    </div>
                    <Button disabled={!this.isReady()} fluid onClick={() => this.createPayment(this.onPaymentCreated)}>
                        Create Invoice
                    </Button>
                </Form>
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