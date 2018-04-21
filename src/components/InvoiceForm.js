import React, { Component } from "react";
import { Button, Header, Modal, Segment, Form, Label, Dimmer, Loader, Table } from 'semantic-ui-react'
import { QRCode } from 'react-qr-svg';
import Utils from 'shared/Utils';

class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceData: {},
            paymentId: null,
            showModal: false,
            fetching: false,
            completedInvoice: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event, data) => {
        this.state.invoiceData[data.name] = data.value;
        this.setState(this.state.invoiceData);
    }

    onModalClose = () => {
        this.setState({showModal: false});
    }

    onPaymentCreated = (result) => {
        this.setState({showModal: true, paymentId: result.paymentId});
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
        fetch("https://05ngwbbeu3.execute-api.us-west-2.amazonaws.com/Beta/payment",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then((res) => { return res.json(); })
        .then((data) => {
            this.setState({completedInvoice: payload});
            onSuccess(data);
        })
        .finally(() => {
            this.setState({fetching: false});
        });
    }

    showInvoiceForm = () => {
        var ready = this.state.invoiceData.receiver && this.state.invoiceData.amount;
        const receivers = [];
        this.props.users.map((user) => {
            var key = JSON.stringify({account: user.account});
            receivers.push({text: user.account, key: user.account, value: key})
        });

        this.props.exchanges.map((exchange) => {
            var key = JSON.stringify({exchange: exchange.name, account: exchange.account, wallet: exchange.wallet, nickname: exchange.nickname});
            receivers.push(
                {text: exchange.nickname + ' (' + exchange.account + ')',
                value: key,
                key: key })
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
                    <Form.Select fluid name='receiver' label='Receiver' options={receivers} placeholder='Choose Receiver'  onChange={this.handleChange}/>
                    <Form.Input fluid name='amount' label='Amount (KRW)' placeholder='Amount'  onChange={this.handleChange}/>
                    <div style={{marginBottom: 10, textAlign: 'right', marginTop: -10}}>
                        <p style={{fontSize: 11}}>
                        1 SBD = {this.props.feed.price} KRW ({this.props.feed.exchange}, {this.props.feed.lastUpdate})
                        </p>
                        {this.state.invoiceData.amount && (
                            <Label size='big' color='green' tag>{(this.state.invoiceData.amount / this.props.feed.price).toFixed(3)} SBD</Label>
                        )}<br/>
                    </div>
                    <Form.Input fluid name='memo' label='Memo (optional)' placeholder='Transaction message'  onChange={this.handleChange}/>
                    <div style={{marginBottom: 10, textAlign: 'right', marginTop: -10}}>
                        <span style={{fontSize: 11}}>Ignored for exchange accounts</span>
                    </div>
                    <ShowQRCodeModal showModal={this.state.showModal}
                                    onClose={this.onModalClose}
                                    paymentId={this.state.paymentId}/>
                    <Button disabled={!ready} fluid onClick={() => this.createPayment(this.onPaymentCreated)}>
                        Create Invoice
                    </Button>
                </Form>
            </div>
        );
    }

    render() {

        return this.state.completedInvoice ? 
            <Invoice invoice={this.state.completedInvoice} paymentId={this.state.paymentId}/>
            :
            this.showInvoiceForm();
    }
}

InvoiceForm.defaultProps = {
    users: [],
    exchanges: [],
    feed: {}
}

const inlineStyle = {
    modal : {
      marginTop: '40px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
};

class Invoice extends Component {
    constructor(props) {
        super(props);
    }

    getData = () => {
        var loc = window.location;
        var baseUrl = loc.protocol + "//" + loc.hostname + (loc.port? ":"+loc.port : "") + "";
        var url = baseUrl + "/pay?q=" + this.props.paymentId;
        console.log(this.props.data);
        console.log(url);
        return url;
    }

    showUser = () => {
        let i = this.props.invoice;

        return (
            <div>
                    { i.receiver.exchange ? (
                        <div>
                        <p>{i.receiver.nickname} ({i.receiver.exchange})</p>
                        <p>{i.receiver.account} - {i.receiver.wallet}</p>
                        </div>
                    ) : (
                        <div>
                            { i.receiver.account }
                        </div>
                    )}
            </div>
        );
    }

    render() {
        let i = this.props.invoice;
        return (
            <div>
                <h2>
                    Scan to Pay
                </h2>
                <div style={{width: '100%', textAlign: 'center' }} >
                    <QRCode style={{width: '100%', maxWidth: 300}} value={this.getData()} />
                    <Table celled striped>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>Invoice Detail</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell collapsing>Amount</Table.Cell>
                                <Table.Cell textAlign='right'>
                                    { i.credit.amount } KRW<br/>
                                    { (i.credit.amount / i.rate.price).toFixed(3) } SBD
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell collapsing>Receiver</Table.Cell>
                                <Table.Cell textAlign='right'>
                                    {this.showUser()}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        );
    }
}


class ShowQRCodeModal extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.paymentId != nextProps.paymentId) {
            this.setState({open: true});
        }
    }

    getData() {
        var loc = window.location;
        var baseUrl = loc.protocol + "//" + loc.hostname + (loc.port? ":"+loc.port : "") + "";
        var url = baseUrl + "/pay?q=" + this.props.paymentId;
        return url;
    }
    
    render() {
        var data = this.props.showModal ? this.getData() : '';
       return (
            <div>
                {this.props.showModal && (
                <Modal size='tiny' open={this.state.open} closeIcon style={inlineStyle.modal} onClose={this.props.onClose}>
                <Header icon='paste' content='Scan to Pay' />
                    <Modal.Content style={{textAlign: 'center'}}>
                        <QRCode style={{width: '100%', maxWidth: 350}} value={data} />
                    </Modal.Content>
                    <Modal.Actions>
                    </Modal.Actions>
                </Modal>
                )}
            </div>
        );
    }
}


export default InvoiceForm;