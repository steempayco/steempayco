import React, { Component } from "react";
import { Button, Header, Icon, Modal, Segment, Input, Form, Dropdown } from 'semantic-ui-react'

const inlineStyle = {
    modal : {
      marginTop: '40px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
};

const exchanges = [
    { key: 'upbit', text: 'Upbit', value: 'myupbit' },
];

class AddExchange extends Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false, exchangeData: {} };
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (event, data) => {
        this.state.exchangeData[data.name] = data.value;
        this.setState(this.state.exchangeData);
    }

    handleSave = () => {
        console.log(this.state.exchangeData);

        this.props.onSave(this.state.exchangeData);
        this.state.exchangeData = {};
        this.handleClose();
    }

    render() {
        return (
        <Modal size='tiny' 
            trigger={<Button fluid onClick={this.handleOpen}>New Exchange</Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            style={inlineStyle.modal}>
        <Header icon='paste' content='Add an exchange account' />
        <Modal.Content>
        <Form>
            <Form.Select fluid name='account' label='Gender' options={exchanges} placeholder='Choose Exchange'  onChange={this.handleChange}/>
            <Form.Input fluid name='nickname' label='Nick Name' placeholder='Nick name of this wallet'  onChange={this.handleChange}/>
            <Form.Input fluid name='wallet' label='Wallet Code' placeholder='Your personal SBD wallet code'  onChange={this.handleChange}/>
        </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={this.handleClose}>
                Cancel
            </Button>
            <Button positive onClick={this.handleSave} 
                icon='checkmark' labelPosition='right' content='Add' />
            </Modal.Actions>
        </Modal>
        );
    }
}

  export default AddExchange;