import React from "react";
import { Table } from 'semantic-ui-react';


const InvoiceDetailView = ({invoice}) => {
    let receiver = invoice.receiver;
    let credit = invoice.credit;
    let rate = invoice.rate;
    let issueDate = new Date(invoice.timestamp);


    return (
    <Table celled unstackable>
      <Table.Body>
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Amount</Table.Cell>
          <Table.Cell textAlign='right'>
            <p style={{fontSize: '14pt'}}>
            {credit.amount} {credit.currency}<br/>{credit.sbdAmount.toFixed(3)} SBD </p>
          </Table.Cell>
        </Table.Row>

        {receiver.type === 'exchange' ? (
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Receiver</Table.Cell>
          <Table.Cell textAlign='right'>{receiver.account}<br/>{receiver.wallet}</Table.Cell>
        </Table.Row>
        ) : (
            <Table.Row verticalAlign='top'>
            <Table.Cell active>Receiver</Table.Cell>
            <Table.Cell textAlign='right'>{receiver.account}</Table.Cell>
          </Table.Row>
        )}
        <Table.Row verticalAlign='top'>
          <Table.Cell active>Memo</Table.Cell>
          <Table.Cell textAlign='right'>
          {receiver.type === 'exchange' ? "Not applied" : invoice.memo}
          </Table.Cell>
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

export default InvoiceDetailView;