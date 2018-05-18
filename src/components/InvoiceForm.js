import React, { Component } from "react";
import { Button, Segment, Form, Label, Dimmer, Loader, Input, Dropdown, Select, Statistic, TextArea } from 'semantic-ui-react'
import { Redirect, withRouter } from 'react-router-dom';
import Api from 'shared/Api';
import Utils from 'shared/Utils';

class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceData: {amount: 0, currency: localStorage.getItem('preferred_currency') || 'KRW'},
            invoiceId: null,
            fetching: false,
            receivers: this.props.users.map((user) => {
                var key = JSON.stringify({account: user.account});
                return {text: user.account, key: user.account, value: key}
            }),
            exchanges: this.props.exchanges.map((exchange) => {
                var key = JSON.stringify({exchange: exchange.name, account: exchange.account, wallet: exchange.wallet, nickname: exchange.nickname});
                return {text: exchange.nickname + ' (' + exchange.account + ')', value: key, key: key };
            }),
            currencies: Utils.getCurrencies().map((currency) => {
                return {key: currency.code, text: currency.symbol, value: currency.code, content: currency.code + ", " + currency.name };
            })
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
        this.setState({fetching: false});
    }

    onPaymentCreationFailed = (err) => {
        this.setState({fetching: false});
    }

    

    createPayment = (onSuccess) => {
        localStorage.setItem('preferred_currency', this.state.invoiceData.currency);
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

        Api.createInvoice(payload,
            (data) => { this.onPaymentCreated(data); },
            (error) => { this.onPaymentCreationFailed(error); }
        );
    }

    isReady = () => {
        return this.props.feed
            && this.state.invoiceData.receiver
            && this.state.invoiceData.amount;
    }

    showInvoiceForm = () => {
        const receivers = this.state.receivers;
        const exchanges = this.state.exchanges;

        return (
            <div>
                <h2>Create Invoice</h2>
                {this.state.fetching && (
                    <Dimmer active>
                        <Loader>Creating...</Loader>
                    </Dimmer>
                )}
                <h3>Amount</h3>
                <Input fluid name='amount' size='huge' type="number" 
                    label={<Dropdown name='currency' defaultValue={this.state.invoiceData.currency}
                    options={this.state.currencies} onChange={this.handleChange} direction='left' />}
                    labelPosition='right' placeholder='Price' onChange={this.handleChange}
                />
                <h3>Receiver</h3>
                <Dropdown placeholder='Choose Receiver' name='receiver' fluid selection options={[...receivers, ...exchanges]}
                        onChange={this.handleChange} style={{fontSize: '16pt'}} />
                <h3>Memo (optional)</h3>
                <Form>
                    <TextArea fluid name='memo' 
                        placeholder='Transaction message'
                        onChange={this.handleChange}
                        style={{fontSize: '16pt'}}/>
                </Form>
                <br/>
                <Button size='big' circular disabled={!this.isReady()} fluid onClick={() => this.createPayment(this.onPaymentCreated)}>
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