import React, { Component } from "react";
import { Button, Header, Modal, Segment, Form, Label } from 'semantic-ui-react'
import { QRCode } from 'react-qr-svg';

class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {invoiceData: {}, usingExchange: false};
        this.handleChange = this.handleChange.bind(this);
        //this.getInvoiceData = this.getInvoiceData.bind(this);
    }

    handleChange = (event, data) => {
        console.log(data.value);
        this.state.invoiceData[data.name] = data.value;
        this.setState(this.state.invoiceData);
    }

    getInvoiceData = () => {
        return {
            rate: this.props.feed.exchange
        };
    }
/**
 {
  "credit": {
      "amount": 5000,
      "currency": "KRW",
      "exchange": "Upbit",
      "rate": 2500
    },
  "memo": "my memo",
  "receiver": {
    "account": "asbear",
    "type": "user"
  },
  "paymentId": "aabbcc"
}
 * */

    render() {
        const receivers = [];
        this.props.users.map((user) => {
            var key = JSON.stringify({account: user.account});
            receivers.push({text: user.account, key: user.account, value: key})
        });

        this.props.exchanges.map((exchange) => {
            var key = JSON.stringify({exchange: exchange.name, account: exchange.account, wallet: exchange.wallet});
            receivers.push(
                {text: exchange.nickname + ' (' + exchange.account + ')',
                value: key,
                key: key })
        });
        return (
            <div>
                <Segment>
                    Create a QR code with the values, and show it to your customer!
                </Segment>
                <Form>
                    <Form.Select fluid name='receiver' label='Receiver' options={receivers} placeholder='Choose Receiver'  onChange={this.handleChange}/>
                    <Form.Input fluid name='amount' label='Amount (KRW)' placeholder='Amount'  onChange={this.handleChange}/>
                    <div style={{marginBottom: 10, textAlign: 'right', marginTop: -10}}>
                        <span style={{fontSize: 11}}>
                        1 SBD = {this.props.feed.price} KRW ({this.props.feed.exchange}, {this.props.feed.lastUpdate})
                        </span>
                        {this.state.invoiceData.amount && (
                            <Label size='big' color='green' tag>{(this.state.invoiceData.amount / this.props.feed.price).toFixed(3)} SBD</Label>
                        )}<br/>
                    </div>
                    <Form.Input fluid name='memo' label='Memo' placeholder='Transaction message'  onChange={this.handleChange}/>
                    <div style={{marginBottom: 10, textAlign: 'right', marginTop: -10}}>
                        <span style={{fontSize: 11}}>Ignored for exchange accounts</span>
                    </div>
                    <ShowQRCodeModal data={this.getInvoiceData}/>
                </Form>

            </div>
        );
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

const ShowQRCodeModal = ({data, ready}) => (
    <Modal size='tiny' trigger={<Button fluid>Generate QR Code</Button>} closeIcon style={inlineStyle.modal}>
      <Header icon='paste' content='QR Code' />
      <Modal.Content style={{textAlign: 'center'}}>
        <QRCode style={{width: '100%', maxWidth: 300}} value={data} />
      </Modal.Content>
      <Modal.Actions>

      </Modal.Actions>
    </Modal>
  );


export default InvoiceForm;