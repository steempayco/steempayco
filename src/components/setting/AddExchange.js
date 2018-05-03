import React, { Component } from "react";
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import Utils from 'shared/Utils'

const inlineStyle = {
    modal : {
      marginTop: '40px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
};

const exchanges = Utils.getExchange().map((exchange) => (
{key: exchange.name, value: exchange.name, text: exchange.name, image: exchange.image }));

class AddExchange extends Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false, exchangeData: {} };
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (event, data) => {
        let exchange = this.state.exchangeData;
        exchange[data.name] = data.value;
        this.setState({exchangeData: exchange});
    }

    handleSave = () => {
        let exchange = this.state.exchangeData;
        exchange.account = Utils.getExchangeAccount(this.state.exchangeData.name);
        this.props.onSave(exchange);
        this.setState({exchangeData: {}});
        this.handleClose();
    }

    render() {
        return (
        <Modal size='tiny' 
            trigger={<Button icon='add user' floated='right' onClick={this.handleOpen} style={{backgroundColor: 'white'}}/>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            style={inlineStyle.modal}>
        <Header icon='paste' content='Add an exchange account' />
        <Modal.Content>
        <Form>
            <Form.Select fluid name='name' label='Exchange' options={exchanges} placeholder='Choose Exchange'  onChange={this.handleChange}/>
            <Form.Input fluid name='nickname' label='Nick Name' placeholder='Nick name of this wallet'  onChange={this.handleChange}/>
            <Form.Input fluid name='wallet' label='Wallet Code' placeholder='Your personal SBD wallet code'  onChange={this.handleChange}/>
        </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button circular onClick={this.handleClose}>
                Cancel
            </Button>
            <Button circular positive onClick={this.handleSave} 
                icon='checkmark' labelPosition='right' content='Add' />
            </Modal.Actions>
        </Modal>
        );
    }
}

  export default AddExchange;