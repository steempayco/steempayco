import React from "react";
import { Table } from 'semantic-ui-react';
import Utils from 'shared/Utils.js'


const InvoiceDetailView = ({invoice, rate}) => {
    let receiverDetail = invoice.receiverDetail;
    let issueDate = new Date(invoice.timestamp);

    return (
    <Table celled unstackable>
      <Table.Body>
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Amount</Table.Cell>
          <Table.Cell textAlign='right'>
            <span style={{fontSize: '16pt'}}>{Utils.numberWithCommas(invoice.amount)} {invoice.currency}</span>
            {rate &&
            <p style={{fontSize: '16pt'}}>{Utils.numberWithCommas((invoice.amount/rate.price).toFixed(3))} SBD</p>}
          </Table.Cell>
        </Table.Row>

        {invoice.type === 'exchange' ? (
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Receiver</Table.Cell>
          <Table.Cell textAlign='right'>{invoice.account}<br/>{receiverDetail.wallet}</Table.Cell>
        </Table.Row>
        ) : (
            <Table.Row verticalAlign='top'>
            <Table.Cell active>Receiver</Table.Cell>
            <Table.Cell textAlign='right'>{invoice.account}</Table.Cell>
          </Table.Row>
        )}
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Memo</Table.Cell>
          <Table.Cell textAlign='right'>
          {invoice.type === 'exchange' ? "Not applied" : invoice.memo}
          </Table.Cell>
        </Table.Row>
        {rate && 
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Exchange Rate</Table.Cell>
          <Table.Cell textAlign='right'>
            {rate.exchange}<br/>
            1 SBD = {rate.price} {rate.currency}<br/>
            {rate.lastUpdate}
          </Table.Cell>
        </Table.Row>
        }
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Issue Date</Table.Cell>
          <Table.Cell textAlign='right'>{issueDate.toLocaleString()}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    )
};

export default InvoiceDetailView;