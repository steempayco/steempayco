import React, { Component } from "react";
import {
    Button,
    Form,
    Dimmer,
    Loader,
    Input,
    Dropdown,
    TextArea,
    Message
} from "semantic-ui-react";
import { Redirect, withRouter, Link } from "react-router-dom";
import Api from "shared/API";
import Utils from "shared/Utils";

class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceData: {
                amount: 0,
                currency: localStorage.getItem("preferred_currency") || "KRW"
            },
            invoiceId: null,
            fetching: false,
            receivers: this.props.users.map(user => {
                var key = JSON.stringify({ account: user.account });
                return { text: user.account, key: user.account, value: key };
            }),
            exchanges: this.props.exchanges.map(exchange => {
                var key = JSON.stringify({
                    exchange: exchange.name,
                    account: exchange.account,
                    wallet: exchange.wallet,
                    nickname: exchange.nickname
                });
                return {
                    text: exchange.nickname + " (" + exchange.account + ")",
                    value: key,
                    key: key
                };
            }),
            currencies: Utils.getCurrencies().map(currency => {
                return {
                    key: currency.code,
                    text: currency.symbol,
                    value: currency.code,
                    content: currency.code + ", " + currency.name
                };
            })
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event, data) => {
        let invoiceData = this.state.invoiceData;
        invoiceData[data.name] = data.value;
        this.setState(invoiceData);
    };

    onPaymentCreated = result => {
        this.setState({ invoiceId: result.invoiceId });
        this.setState({ fetching: false });
    };

    onPaymentCreationFailed = err => {
        this.setState({ fetching: false });
        alert(`Failed to create invoice: ${err}`);
    };

    createPayment = onSuccess => {
        localStorage.setItem(
            "preferred_currency",
            this.state.invoiceData.currency
        );

        var receiver = JSON.parse(this.state.invoiceData.receiver);

        // Check upbit account and reject.
        if (receiver.account === "myupbit") {
            alert(
                "업비트 거래소가 지갑 계정과 코드를 변경하였습니다. 등록했던 업비트 계정을 지우시고 업비트 앱에서 정보를 재확인 후 다시 등록 하시기 바랍니다."
            );
            return;
        }
        this.setState({ fetching: true });
        var payload = {
            receiver: receiver.account,
            type: receiver.exchange ? "exchange" : "user",
            receiverDetail: receiver,
            amount: this.state.invoiceData.amount,
            currency: this.state.invoiceData.currency,
            memo: this.state.invoiceData.memo
        };

        Api.createInvoice(
            payload,
            data => {
                this.onPaymentCreated(data);
            },
            error => {
                this.onPaymentCreationFailed(error);
            }
        );
    };

    isReady = () => {
        return (
            this.props.feed &&
            this.state.invoiceData.receiver &&
            this.state.invoiceData.amount
        );
    };

    getParameters = () => {
        let config = this.props.config;

        return (
            config && {
                receivers: config.users.map(user => {
                    var key = JSON.stringify({ account: user.account });
                    return {
                        text: user.account,
                        key: user.account,
                        value: key
                    };
                }),
                exchanges: config.exchanges.map(exchange => {
                    var key = JSON.stringify({
                        exchange: exchange.name,
                        account: exchange.account,
                        wallet: exchange.wallet,
                        nickname: exchange.nickname
                    });
                    return {
                        text: exchange.nickname + " (" + exchange.account + ")",
                        value: key,
                        key: key
                    };
                }),
                currencies: Utils.getCurrencies().map(currency => {
                    return {
                        key: currency.code,
                        text: currency.symbol,
                        value: currency.code,
                        content: currency.code + ", " + currency.name
                    };
                })
            }
        );
    };

    showInvoiceForm = () => {
        let param = this.getParameters();
        return (
            param && (
                <div style={{ textAlign: "center" }}>
                    <div
                        style={{
                            display: "inline-block",
                            textAlign: "left",
                            width: "100%",
                            maxWidth: "600px"
                        }}
                    >
                        <h2>Instant Sell</h2>
                        <Message>
                            <b>Instant Sell</b> will be unavilable soon. Please
                            try to use <Link to="/sell">Sell</Link> instead.
                        </Message>
                        {this.state.fetching && (
                            <Dimmer active>
                                <Loader>Creating...</Loader>
                            </Dimmer>
                        )}
                        <h3>Amount</h3>
                        <Input
                            fluid
                            name="amount"
                            size="huge"
                            type="number"
                            label={
                                <Dropdown
                                    name="currency"
                                    defaultValue={
                                        this.state.invoiceData.currency
                                    }
                                    options={param.currencies}
                                    onChange={this.handleChange}
                                    direction="left"
                                />
                            }
                            labelPosition="right"
                            placeholder="Price"
                            onChange={this.handleChange}
                        />
                        <h3>Receiver</h3>
                        <Dropdown
                            placeholder="Choose Receiver"
                            name="receiver"
                            fluid
                            selection
                            options={[...param.receivers, ...param.exchanges]}
                            onChange={this.handleChange}
                            style={{ fontSize: "16pt" }}
                        />
                        <h3>Memo (optional)</h3>
                        <Form>
                            <TextArea
                                name="memo"
                                placeholder="Transaction message"
                                onChange={this.handleChange}
                                style={{ fontSize: "16pt" }}
                            />
                        </Form>
                        <br />
                        <Button
                            size="big"
                            circular
                            disabled={!this.isReady()}
                            fluid
                            onClick={() =>
                                this.createPayment(this.onPaymentCreated)
                            }
                        >
                            Create Invoice
                        </Button>
                    </div>
                </div>
            )
        );
    };

    render() {
        return this.state.invoiceId ? (
            <Redirect
                push
                to={this.props.location.pathname + "/" + this.state.invoiceId}
            />
        ) : (
            this.showInvoiceForm()
        );
    }
}

InvoiceForm.defaultProps = {
    users: [],
    exchanges: [],
    feed: {}
};

export default withRouter(InvoiceForm);
