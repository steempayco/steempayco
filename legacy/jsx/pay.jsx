
class QRReader extends React.Component {
    constructor(props) {
        super(props);
        this.onQRCode = this.onQRCode.bind(this);
        this.openQRCamera = this.openQRCamera.bind(this);
    }

    onQRCode(result) {
        this.setState({receiver: result});
    }

    openQRCamera(files) {
        var reader = new FileReader();
        var _this = this;
        reader.onload = function() {
            qrcode.callback = function(res) {
                if(res instanceof Error) {
                alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
                } else {
                    _this.onQRCode(JSON.parse(b64DecodeUnicode(res)));
                }
            };
            qrcode.decode(reader.result);
        };
        reader.readAsDataURL(files[0]);
    }
    
    render() {
        return (
        <div>
                <input type="text" size="16" placeholder="Tracking Code" className="qrcode-text"/>
                <label className="qrcode-text-btn">
                <input type="file" accept="image/*" capture="environment"
                onChange={ (e) => this.openQRCamera(e.target.files) } />
                </label>
        </div>
        );
    }
}

class PayInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className="pay-summary mb2">
                <tbody>
                    <tr>
                        <td className="pay-summary-left">수취인</td>
                        <td className="pay-summary-right">{this.props.metadata.user}</td>
                    </tr>
                    <tr>
                        <td className="pay-summary-left">금액</td>
                        <td className="pay-summary-right">{this.props.metadata.amount} {this.props.metadata.currency}
                            {this.props.metadata.currency == "KRW" && (
                                <span>
                            {"(" + (this.props.metadata.amount / this.props.metadata.rate).toFixed(3) + " SBD)"}</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="pay-summary-left">환율</td>
                        <td className="pay-summary-right">1 SBD = {this.props.metadata.rate} KRW</td>
                    </tr>
                    <tr>
                        <td className="pay-summary-left">메시지</td>
                        <td className="pay-summary-right">{this.props.metadata.message}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

class Sender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payInfo: JSON.parse(b64DecodeUnicode(this.props.payInfo))
        }
        this.payViaSteemConnect = this.payViaSteemConnect.bind(this);
    }
    
    payViaSteemConnect() {
        var info = this.state.payInfo;
        var amount = (info.currency === "KRW" ? (info.amount / info.rate) : info.amount).toFixed(3) + " SBD";
        var message = "[SteemPay] " + info.message + (info.currency === "KRW" && ", " + info.amount + " KRW (환율: " + info.rate + ") ");
        console.log(message);
        var scUrl = "https://steemconnect.com/sign/transfer?to=" + info.user
                + "&amount=" + encodeURIComponent(amount)
                + "&memo=" + encodeURIComponent(message);
        document.location.href = scUrl;
    }

    render() {
        return (
            <div className="receiver-panel">
                <div className="page-title">스팀달러 송금</div>
                <PayInfo metadata={this.state.payInfo} />
                <button
                        type="button"
                        className="btn btn-secondary btn-lg btn-block mb-2" data-dismiss="modal"
                        onClick={() => this.payViaSteemConnect()}
                        >Steem Connect 송금
                </button>
            </div>
        )
    }
}

// Start reading metadata
var upbeatPriceFeed = (callback) => {
    fetch("https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/60?code=CRIX.UPBIT.KRW-SBD&count=12&to")
    .then(res => res.json())
    .then(
        (result) => {
            var average = result.map((hr) => hr.highPrice).reduce((avg,e,i,arr)=>avg+e/arr.length,0);
            callback(average);
        },
        (error) => {
            alert("Critical Error! Please retry later." + error)
        })
    .catch((error) => {
        alert("Critical Error! Please retry later." + error)
    });
};

class PayDetail extends React.Component {
    constructor(props) {
        super(props);
        this.getQR = this.getQR.bind(this);
    }

    getQR(msg) {
        var baseUrl = document.location.href;
        var url = baseUrl + "/?pay=" + b64EncodeUnicode(JSON.stringify(msg));
        console.log(url);
        return "https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=" + encodeURIComponent(url) + "&choe=UTF-8";
    }

    render() {
        return (<div style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                    <img src={this.getQR(this.props.metadata)}/>
                    <PayInfo metadata={this.props.metadata} />
                    <button
                        type="button"
                        className="btn btn-secondary btn-lg btn-block mb-2" data-dismiss="modal"
                        >닫기</button>
                </div>);
    }
}

class Receiver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transfer: {},
            qrData: '',
            price: null,
            lastUpdate: null
        };
        this.showQR = this.showQR.bind(this);
        this.upbeatPriceFeed = this.upbeatPriceFeed.bind(this);
    }

    componentDidMount() {
        var _this = this;
        this.upbeatPriceFeed();
    }

    upbeatPriceFeed() {
        fetch("https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/60?code=CRIX.UPBIT.KRW-SBD&count=24&to")
        .then(res => res.json())
        .then(
            (result) => {
                var average = result.map((hr) => hr.highPrice).reduce((avg,e,i,arr)=>avg+e/arr.length,0);
                var date = new Date();
                this.setState({price: Math.round(average), lastFeedUpdate: date.toLocaleDateString() + " " + date.toLocaleTimeString()});
            },
            (error) => {
                alert("Critical Error! Please retry later." + error)
            })
        .catch((error) => {
            alert("Critical Error! Please retry later." + error)
        });
    }

    showQR() {
        if (!this.receiver.value) {
            alert("계정명을 입력하세요.");
            return;
        }
        if (!this.amount.value) {
            alert("금액을 입력하세요.");
            return;
        }
        
        if (this.message.value && this.message.value.length > 20) {
            alert("메시지는 20 글자 이내로 입력하세요.");
            return;
        }
        var msg = {
            user: this.receiver.value,
            amount: this.amount.value,
            currency: this.currency.value,
            message: this.message.value,
            rate: this.state.price
        };

        ReactDOM.render(
            <PayDetail metadata={msg} />,
            document.getElementById('pay-detail'));
        $('#pay-modal').modal();
    }
    
    render() {
        return (
            <div className="receiver-panel">
                <div className="page-title">
                    스팀달러 청구
                </div>
                {this.state.price && (
                <div className="price-feed">Upbit 24 시간 평균시세: 1 SBD = {this.state.price} KRW ({this.state.lastFeedUpdate})</div>
                )}
                <div className="input-group input-group-lg mb-2">
                    <div className="input-group-prepend">
                        <label className="input-group-text" for="inputGroupSelect01">수신계정</label>
                    </div>
                    <input type="text"
                        className="form-control"
                        ref={(input) => { this.receiver = input; }}
                        placeholder="받는 사람의 Steem 계정"/>
                </div>
                <div className="input-group input-group-lg mb-2">
                    <div className="input-group-prepend">
                        <label className="input-group-text">청구금액</label>
                    </div>
                    <input type="text"  style={{width:200}}
                        className="form-control"
                        ref={(input) => { this.amount = input; }}
                        placeholder="청구 금액"/>
                    <select className="custom-select form-control"
                        ref={(input) => { this.currency = input; }}>
                        <option value='KRW'>원</option>
                        <option value='SBD'>SBD</option>
                    </select>
                </div>
                <div className="input-group input-group-lg mb-2">
                    <div className="input-group-prepend">
                        <label className="input-group-text">메시지</label>
                    </div>
                    <input type="text"
                        className="form-control"
                        ref={(input) => { this.message = input; }}
                        placeholder="이 메시지는 송금자에게 보여집니다."/>
                </div>
                <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block mb-2"
                    onClick={() => this.showQR()}>완료
                </button>
                {this.state.qrData && (
                    <img src={this.state.qrData}/>
                )}
            </div>
        )
    }
}

class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payInfo: getQueryVariable('pay')
        }
    }
    render() {
        console.log(this.state.payInfo);
        return (
            <div className="main-panel">
                {this.state.payInfo ? (
                    <Sender payInfo={this.state.payInfo} />
                ) : (
                    <Receiver />
                )}
            </div>
        )
    }
}

ReactDOM.render(
    <Pay/>,
    document.getElementById('content_area')
);