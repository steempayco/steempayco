import React, { Component } from "react";
import { Button, Header, Icon, Modal, Segment, Input, Form } from 'semantic-ui-react'

const inlineStyle = {
    modal : {
      marginTop: '40px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
};

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false };
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange(event, data) {
        this.setState({ account: data.value });
    }

    handleSave() {
        this.props.onSave({account: this.state.account});
        this.handleClose();
    }

    render() {
        return (
        <Modal size='tiny' 
            trigger={<Button fluid onClick={this.handleOpen}>New User</Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            style={inlineStyle.modal}>
        <Header icon='paste' content='Add a Steem accoubt' />
        <Modal.Content>
        <Form>
            <Form.Group widths='equal'>
            <Form.Field control={Input} onChange={this.handleChange} label='Steem Account' placeholder='Steem account' />
            </Form.Group>
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

  export default AddUser;