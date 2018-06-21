import React, { Component } from "react";
import { Button, Dimmer, Loader, Dropdown, Label, Message, Table, Divider, Icon } from 'semantic-ui-react'
import { Redirect, withRouter, Link } from 'react-router-dom';
import Api from 'shared/API';
import Utils from 'shared/Utils';

class SellForm extends Component {
    constructor(props) {
        super(props);
        let store = props.config.stores.length > 0 ? props.config.stores[0] : false

        this.state = {
            store: store,
            itemList : [],
            receiverInfo: false,
            invoiceId: null,
            fetching: false,
            receivers: this.props.users.map((user) => {
                var key = JSON.stringify({account: user.account});
                return {text: user.account, key: user.account, value: key}
            }),
            exchanges: this.props.exchanges.map((exchange) => {
                var key = JSON.stringify({exchange: exchange.name, account: exchange.account, wallet: exchange.wallet, nickname: exchange.nickname});
                return {text: exchange.nickname + ' (' + exchange.account + ')', value: key, key: key };
            }),
            currencies: Utils.getCurrencies().map((currency) => {
                return {key: currency.code, text: currency.symbol, value: currency.code, content: currency.code + ", " + currency.name };
            })
        };
        this.handleChange = this.handleChange.bind(this);
    }

    onStoreChange = (event, data) => {
        let store = this.props.config.stores.find((store) => store.name === data.value)
        this.setState({store, itemList: []});
    }

    handleChange = (event, data) => {
        let SellData = this.state.SellData;
        SellData[data.name] = data.value;
        this.setState(SellData);
    }

    onPaymentCreated = (result) => {
        console.log(result)
        this.setState({fetching: false, invoiceId: result.invoiceId});
    }

    onPaymentCreationFailed = (err) => {
        this.setState({fetching: false});
    }

    getTotalAmount = (items) => {
        let totalAmount = 0;
        items.forEach(item => {
            totalAmount += Utils.safeMultiply(item.price, item.count);
        })
        return totalAmount
    }

    createPayment = (onSuccess) => {
        localStorage.setItem('preferred_store', this.state.store.name);

        let items = this.getUniqueItemList()
        let totalAmount = this.getTotalAmount(items);
        let memo = items.map(item => item.name + '✕' + item.count).join(', ')

        this.setState({fetching: true});
        var receiver = this.getReceiverDetail();
        console.log(receiver)

        var payload = {
            creater: this.props.username,
            receiver: receiver.account,
            type: receiver.type,
            receiverDetail: receiver,
            amount: totalAmount,
            currency: this.state.store.currency,
            memo: memo
        };

        Api.createInvoice(payload,
            (data) => { this.onPaymentCreated(data); },
            (error) => { this.onPaymentCreationFailed(error); }
        );
    }

    isReady = () => {
        return this.state.itemList.length > 0
    }

    getParameters = () => {
        let config = this.props.config;

        return config && {
            receivers: config.users.map((user) => {
                var key = JSON.stringify({account: user.account});
                return {text: user.account, key: user.account, value: key}
            }),
            exchanges: config.exchanges.map((exchange) => {
                var key = JSON.stringify({exchange: exchange.name, account: exchange.account, wallet: exchange.wallet, nickname: exchange.nickname});
                return {text: exchange.nickname + ' (' + exchange.account + ')', value: key, key: key };
            }),
            currencies: Utils.getCurrencies().map((currency) => {
                return {key: currency.code, text: currency.symbol, value: currency.code, content: currency.code + ", " + currency.name };
            })
        }
    }

    getUniqueItemList = () => {
        let itemList = this.state.itemList;
        let uniqItems = []
        itemList.forEach((item) => {
            let uniqItem = uniqItems.find(uniqItem => uniqItem.name === item.name);
            if (!uniqItem) {
                uniqItems.push({...item, count: 1});
            } else {
                uniqItem.count += 1;
            }
        });
        return uniqItems;
    }

    addItemList = (item) => {
        let itemList = this.state.itemList;
        itemList.push(item)
        this.setState({itemList});
    }

    removeItemList = (name) => {
        let itemList = this.state.itemList;
        let index = itemList.findIndex((item) => item.name === name)
        if (index > -1) {
            itemList.splice(index, 1);
        }
        this.setState({itemList});
    }

    renderStorePanel = () => {
        return (
            <div>
                <Label.Group color='teal'>
                    {this.state.store.items.map((item, index) => (
                        <Button key={index} basic color='black' size='small' onClick={() => this.addItemList(item)} style={{marginTop: '5px'}}>
                            {item.name}
                        </Button>
                    ))}
                </Label.Group>
            </div>
        )
    }

    renderSelectedItems = () => {
        let currency = this.state.store.currency;
        let selectedItems = this.getUniqueItemList();
        let totalAmount = this.getTotalAmount(selectedItems);

        return (
            <div>
                <Table compact='very' unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                Item Name
                            </Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>
                                Qty
                            </Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'>
                                Price
                            </Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'>
                                Net Price
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {selectedItems.map((item, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>
                                <b>{item.name}</b>
                            </Table.Cell>
                            <Table.Cell textAlign='center'>
                                {item.count}
                                <Icon name='minus circle' color='orange' onClick={() => this.removeItemList(item.name)} style={{marginLeft: '2px'}}/>

                            </Table.Cell>
                            <Table.Cell textAlign='right'>
                            {Utils.currencyFormat(item.price, currency)}
                            </Table.Cell>
                            <Table.Cell textAlign='right'>
                            {Utils.currencyFormat(Utils.safeMultiply(item.count, item.price), currency)}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table>
                <div style={{textAlign: 'right'}}>
                <Label floated='right' color='orange' size='big' tag as='a'>{Utils.currencyFormat(totalAmount, currency)}</Label>
                </div>
            </div>
        )
    }

    getReceiverDetail = () => {
        let config = this.props.config;
        let accountId = this.state.store.linkedAccount;
        let receiverInfo = [...config.users, ...config.exchanges].find(user => user.id === accountId);
        return receiverInfo;
    }

    renderAllCase() {
        if (this.state.invoiceId) {
            return <Redirect push to={"/invoice/" + this.state.invoiceId} />
        }
        if (this.props.config.stores.length === 0) {
            return <Message info icon='help' size='large' header='You have no store' content={<span>Add your store at <Link to='/setting'>Setting</Link> and try again.</span>}/>
        }
        let stores = this.props.config.stores.map((store, index) => { return {text: store.name, value: store.name, key: index} });

        return (
            <div>
                <h2>Sell Items</h2>
                <Divider />
                <Dropdown placeholder='Choose Receiver' name='receiver' fluid selection options={[...stores]}
                    onChange={this.onStoreChange}  style={{fontSize: '14pt'}} defaultValue={this.state.store.name}
                    />
                {this.renderStorePanel()}
                <h3>Items to Sell</h3>
                {this.renderSelectedItems()}
                <Divider hidden />
                <Button color='teal' size='big' circular disabled={!this.isReady()} fluid onClick={() => this.createPayment(this.onPaymentCreated)}>
                    Sell!
                </Button>
                {this.state.fetching && (
                    <Dimmer active>
                        <Loader>Creating...</Loader>
                    </Dimmer>
                )}
            </div>
        )
    }

    render() {
        return  <div style={{textAlign:'center'}}>
                    <div style={{display:'inline-block', textAlign: 'left', width: '100%', maxWidth: '600px'}}>
                        {this.renderAllCase()}
                    </div>
                </div>
    }
}

SellForm.defaultProps = {
    users: [],
    exchanges: [],
    feed: {}
}



export default withRouter(SellForm);