import React, { Component } from "react";
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import Utils from 'shared/Utils'
import uuid from 'uuid/v4'

const inlineStyle = {
    modal : {
      marginTop: '40px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
};

const currencies = Utils.getCurrencies().map((currency) => {
    return {key: currency.code, text: currency.code + ", " + currency.name, value: currency.code };
})

class AddStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            storeData: this.props.storeData ? this.props.storeData : {id: uuid()},
        };
    }

    getParameters = (config) => {
        return config && {
            receivers: config.users.map((user) => {
                var key = JSON.stringify({account: user.account});
                return {text: user.account, key: user.account, value: user.id}
            }),
            exchanges: config.exchanges.map((exchange) => {
                var key = JSON.stringify({exchange: exchange.name, account: exchange.account, wallet: exchange.wallet, nickname: exchange.nickname});
                return {text: exchange.nickname + ' (' + exchange.account + ')', value: exchange.id, key: key };
            })
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (event, data) => {
        let store = this.state.storeData;
        store[data.name] = data.value;
        this.setState({storeData: store});
    }

    handleSave = () => {
        this.props.onSave(this.state.storeData);
        this.setState({storeData: {}});
        this.handleClose();
    }

    render() {
        if (!this.props.config) return false
        let editMode = this.props.storeData ? true : false
        let params = this.getParameters(this.props.config)
        let trigger = <span onClick={this.handleOpen}>{this.props.trigger}</span> 
        return (
        <Modal size='tiny' 
            trigger={trigger}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            style={inlineStyle.modal}>
        <Header icon='paste' content={editMode ? 'Modify a store' : 'Add a store'} />
        <Modal.Content>
        <Form>
            <Form.Input fluid name='name' label='Store Name' placeholder='Name of your store'
                defaultValue={this.state.storeData.name} onChange={this.handleChange}/>
            <Form.Input fluid name='description' label='Store Description' placeholder='About your store'
                defaultValue={this.state.storeData.description} onChange={this.handleChange}/>
            <Form.Input fluid name='address' label='Address' placeholder='Address of your store'
                defaultValue={this.state.storeData.address} onChange={this.handleChange}/>
            <Form.Select fluid name='linkedAccount' label='Receiving Account' options={[...params.receivers, ...params.exchanges]} placeholder='Choose the receiving account'
                defaultValue={this.state.storeData.linkedAccount} onChange={this.handleChange}/>
            <Form.Select fluid name='currency' label='Currency' name='currency' options={currencies} placeholder='Choose the currency'
                defaultValue={this.state.storeData.currency} onChange={this.handleChange} direction='left' />
        </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button circular onClick={this.handleClose}>
                Cancel
            </Button>
            <Button circular color='teal' onClick={this.handleSave} 
                icon='checkmark' labelPosition='right' content='Save' />
            </Modal.Actions>
        </Modal>
        );
    }
}

  export default AddStore;