import React, { Component } from "react";
import { Dimmer, Loader, Image, Segment, Button, Table } from 'semantic-ui-react'
import Scan from 'components/Scan'

class PaymentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentId: props.paymentId,
            paymentDetail: null
        };
    }
    componentDidMount() {
        if (this.state.paymentId) {
            this.fetchPaymentDetail();
        }
    }

    onScanFinished = (paymentId) => {
        console.log("onScanFinished: " + paymentId);
        this.setState({paymentId: paymentId}, this.fetchPaymentDetail);
    }

    fetchPaymentDetail = () => {
        let self = this;
        fetch("https://05ngwbbeu3.execute-api.us-west-2.amazonaws.com/Beta/payment/" + this.state.paymentId)
        .then(function(res){ return res.json(); })
        .then(function(data){ self.setState({paymentDetail: data})});
    }

    payViaSteemConnect = () => {
        let info = this.state.paymentDetail;
        let amount = info.credit.amount + " " + info.credit.currency;
        let amountSBD = (info.credit.amount / info.rate.price).toFixed(3) + " SBD";
        let message = "";
        if (info.receiver.exchange) {
            message = info.credit.wallet;
        } else {
            message = "[SteemPay] " + info.memo + " | " + amount + " | " + amountSBD;
        }
        console.log(message);
        let scUrl = "https://steemconnect.com/sign/transfer?to=" + info.receiver.account
                + "&amount=" + encodeURIComponent(amountSBD)
                + "&memo=" + encodeURIComponent(message);
        document.location.href = scUrl;
    }

    showPaymentDetail = () => {
        return (
            <div>
                {this.state.paymentDetail ? (
                    <div>
                    <DisplayPaymentDetail paymentDetail={this.state.paymentDetail} />
                    <Button fluid onClick={this.payViaSteemConnect}>Pay via SteemConnect</Button>
                    </div>
                ) : (
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer>
                )}
            </div>
        );
    }

    showScanner = () => {
        return <Scan onScanFinished={this.onScanFinished}/>;
    }

    render() {
        return this.state.paymentId ?
            this.showPaymentDetail() : this.showScanner();
    }
}

const DisplayPaymentDetail = ({paymentDetail}) => {
    let receiver = paymentDetail.receiver;
    let credit = paymentDetail.credit;
    let rate = paymentDetail.rate;
    let issueDate = new Date(paymentDetail.timestamp);


    return (
    <Table celled unstackable>
      <Table.Body>
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Amount</Table.Cell>
          <Table.Cell textAlign='right'>{credit.amount} {credit.currency} / {credit.sbdAmount.toFixed(3)} SBD</Table.Cell>
        </Table.Row>
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Receiver</Table.Cell>
          <Table.Cell textAlign='right'>{receiver.account}</Table.Cell>
        </Table.Row>
        {receiver.type === 'exchange' && (
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Exchange</Table.Cell>
          <Table.Cell textAlign='right'>{receiver.exchange}: {receiver.wallet}</Table.Cell>
        </Table.Row>
        )}
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Memo</Table.Cell>
          <Table.Cell textAlign='right'>{paymentDetail.memo}</Table.Cell>
        </Table.Row>
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Exchange Rate</Table.Cell>
          <Table.Cell textAlign='right'>
            {rate.exchange}<br/>
            {rate.price} {rate.currency} = 1 SBD<br/>
            {rate.lastUpdate}
          </Table.Cell>
        </Table.Row>
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Issue Date</Table.Cell>
          <Table.Cell textAlign='right'>{issueDate.toLocaleString()}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    )
};

export default PaymentComponent;