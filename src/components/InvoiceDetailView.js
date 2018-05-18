import React from "react";
import { Table } from 'semantic-ui-react';
import Utils from 'shared/Utils.js'

const leftStyle = {
  fontSize: '12pt',
  fontWeight: 700
}

const memoStyle = {
  fontSize: '12pt',
}

const InvoiceDetailView = ({invoice, rate}) => {
    let receiverDetail = invoice.receiverDetail;
    let issueDate = new Date(invoice.timestamp);
  console.log(rate);
    return (
    <Table celled unstackable>
      <Table.Body>
        <Table.Row verticalAlign='top'>
          <Table.Cell active style={leftStyle}>Amount</Table.Cell>
          <Table.Cell textAlign='right'>
            <span style={{fontSize: '22pt'}}>{Utils.currencyFormat(invoice.amount, invoice.currency)}</span>
            {rate &&
            <p style={{fontSize: '16pt'}}>{Utils.numberWithCommas((invoice.amount/rate.price).toFixed(3))} SBD</p>}
          </Table.Cell>
        </Table.Row>

        {invoice.type === 'exchange' ? (
        <Table.Row verticalAlign='top'>
          <Table.Cell active style={leftStyle}>Receiver</Table.Cell>
          <Table.Cell textAlign='right'>
            <span style={{fontSize: '18pt'}}>{invoice.receiver}</span><br/>
            <span style={{fontSize: 11, fontFamily: "monospace"}}>{receiverDetail.wallet}</span>
          </Table.Cell>
        </Table.Row>
        ) : (
            <Table.Row verticalAlign='top'>
            <Table.Cell active style={leftStyle}>Receiver</Table.Cell>
            <Table.Cell textAlign='right'>
              <span style={{fontSize: '18pt'}}>{invoice.receiver}</span>
            </Table.Cell>
          </Table.Row>
        )}
        <Table.Row verticalAlign='top'>
          <Table.Cell active style={leftStyle}>Memo</Table.Cell>
          <Table.Cell textAlign='right' style={memoStyle}>
          {invoice.type === 'exchange' ? "Not applicable" : invoice.memo}
          </Table.Cell>
        </Table.Row>
        {rate && 
        <Table.Row verticalAlign='top'>
          <Table.Cell active style={leftStyle}>Exchange Rate</Table.Cell>
          <Table.Cell textAlign='right'>
            <span style={{fontSize: '14pt'}}>1 SBD = {rate.price.toFixed(3)} {invoice.currency}</span><br/>
            {rate.source}<br/>
            {rate.detail}<br/>
          </Table.Cell>
        </Table.Row>
        }
        <Table.Row verticalAlign='top'>
          <Table.Cell active style={leftStyle}>Issue Date</Table.Cell>
          <Table.Cell textAlign='right'>{issueDate.toLocaleString()}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    )
};

export default InvoiceDetailView;