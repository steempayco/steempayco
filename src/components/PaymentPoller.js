
import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import steem from "steem";
import "./CheckMark.css"

// Using stream functions
// https://steemit.com/utopian-io/@yabapmatt/added-stream-functions-to-steem-js-documentation
class PaymentPoller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transfers: []
        }
    }
    
    componentDidMount() {
        const receiver = this.props.invoice.receiverDetail;
        console.log(receiver);
        this.streamStopper = steem.api.streamOperations('head', (err, result) => {
            if (err || result[0] !== 'transfer') return;

            const transfer = result[1];
            if (transfer.to !== receiver.account) return;
            if (receiver.type === 'exchange') {
                if (receiver.wallet !== transfer.memo) {
                    return;
                }
            }
            this.onTransfer(transfer);
        });
    }

    onTransfer = (transfer) => {
        console.log(transfer);
        const transfers = this.state.transfers;
        transfers.push(transfer);
        this.setState({transfers})
    }

    componentWillUnmount() {
        this.streamStopper();
    }

    render() {
        console.log(this.state.transfers);
        return (
            <div>
                {this.state.transfers.map((transfer, idx) => {
                    return <Message index={idx} positive>
                        <table>
                            <tr><td style={{width: '50px'}}>
                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                            </td>
                            <td style={{width: '100%', paddingLeft: '20px'}}>
                            <h4>{`${transfer.amount} from ${transfer.from}`}</h4>
                            <p>{`${transfer.memo}`}</p></td>
                            </tr>
                        </table>
                    </Message>
                })}
            </div>
        );
    }
}

export default PaymentPoller;