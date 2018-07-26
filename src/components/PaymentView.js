import React, { Component } from "react";
import { Dimmer, Loader, Button } from "semantic-ui-react";
import InvoiceDetailView from "components/InvoiceDetailView";
import Api from "shared/API";

class PaymentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: null
        };
    }

    componentDidMount() {
        Api.fetchInvoice(
            this.props.invoiceId,
            data => {
                this.setState({ invoice: data });
            },
            error => {
                this.setState({ errorMessage: "Failed to open invoice" });
            }
        );
    }

    payViaSteemConnect = rate => {
        let info = this.state.invoice;

        // Check upbit account and reject.
        if (info.receiver === "myupbit") {
            alert(
                "결제 코드가 myupbit로 되어 있습니다. 업비트 거래소가 지갑 계정과 코드를 변경한 관계로 이 결제는 진행할 수 없습니다. 판매자에게 알려주세요."
            );
            return;
        }

        let amount = info.amount + " " + info.currency;
        let amountSBD = (info.amount / rate.price).toFixed(3) + " SBD";
        let message = "";
        if (info.type === "exchange") {
            message = info.receiverDetail.wallet;
        } else {
            message =
                "[SteemPay] " + info.memo + " | " + amount + " | " + amountSBD;
        }
        console.log(message);
        let scUrl =
            "https://steemconnect.com/sign/transfer?to=" +
            info.receiver +
            "&amount=" +
            encodeURIComponent(amountSBD) +
            "&memo=" +
            encodeURIComponent(message);
        document.location.href = scUrl;
    };

    renderPaymentBlock = () => {
        const rate = this.props.feed.prices[this.state.invoice.currency];
        return (
            <div>
                <h2>PAYMENT DETAIL</h2>
                <InvoiceDetailView invoice={this.state.invoice} rate={rate} />
                <Button
                    circular
                    fluid
                    size="huge"
                    onClick={() => this.payViaSteemConnect(rate)}
                >
                    Pay via SteemConnect
                </Button>
            </div>
        );
    };

    renderLoadingBlock = () => {
        return this.state.errorMessage ? (
            <div>{this.state.errorMessage}</div>
        ) : (
            <Dimmer active>
                <Loader>Loading</Loader>
            </Dimmer>
        );
    };

    render() {
        return this.state.invoice && this.props.feed
            ? this.renderPaymentBlock()
            : this.renderLoadingBlock();
    }
}

export default PaymentView;
