import React from "react";
import { Table } from 'semantic-ui-react';
import Utils from 'shared/Utils.js'

const leftStyle = {
  fontSize: '14pt',
}

const memoStyle = {
  fontSize: '12pt',
}

const InvoiceDetailView = ({invoice, rate}) => {
    let receiverDetail = invoice.receiverDetail;
    let issueDate = new Date(invoice.timestamp);

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
            {invoice.receiver}<br/>
            {receiverDetail.wallet}
          </Table.Cell>
        </Table.Row>
        ) : (
            <Table.Row verticalAlign='top'>
            <Table.Cell active style={leftStyle}>Receiver</Table.Cell>
            <Table.Cell textAlign='right'>
              <span style={{fontSize: '20pt'}}>{invoice.receiver}</span>
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
            {rate.exchange}<br/>
            1 SBD = {rate.price} {rate.currency}<br/>
            {rate.lastUpdate}
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