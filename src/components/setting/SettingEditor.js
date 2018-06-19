import React, { Component } from "react";
import { Button, Image, List, Divider, Container, Header, Segment, Dimmer, Loader, Icon, Grid, Form ,Table } from 'semantic-ui-react'
import AddUser from './AddUser';
import AddExchange from './AddExchange';
import ManageStore from './ManageStore';
import Utils from 'shared/Utils'
import config from 'config'

let steem = require('steem');

class SettingEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { config: config.defaultConfig };
    }

    componentDidMount() {
        this.props.loadConfig(this.onConfig);
    }

    onConfig = (config) => {
        this.setState({config});
    }

    getUserAccounts = () => {
        let userList = this.state.config.users.map((user) => user.account);
        steem.api.getAccountsAsync(userList)
        .then( (result) => {
            let config = this.state.config;
            for (let i = 0  ; i < result.length ; i++) {
                config.users[i].img = "https://steemitimages.com/400x0/" + JSON.parse(result[i].json_metadata).profile.profile_image;
            }
            this.setState(config);
        })
        .catch((error) => {
        })
        .done();
    }

    addUser = (userData) => {
        let users = this.state.config.users
        if (!users) {
            users = []
        }
        users.push(userData);
        this.setState(this.state.config.users);
        this.getUserAccounts();
    }
    
    addStore = (storeData) => {
        console.log(storeData);
        let stores = this.state.config.stores;
        if (!stores) {
            stores = []
        }
        let updated = false;
        stores.forEach((item, index) => {
            if (item.name == storeData.name) {
                stores[index] = storeData;
                updated = true
            }
        });
        if (!updated) {
            this.state.config.stores.push(storeData)
        }
        this.setState(this.state.config.stores)
    }

    deleteUser = (userId) => {
        this.state.config.users = this.state.config.users.filter((user) => user.account !== userId);
        this.setState(this.state.config.users);
    }

    addExchange = (exchangeData) => {
        if (!this.state.config.exchanges) {
            this.state.config.exchanges = []
        }
        this.state.config.exchanges.push(exchangeData);
        this.setState(this.state.config.exchanges);
    }
    deleteExchange = (index) => {
        this.state.config.exchanges.splice(index, 1);
        this.setState(this.state.config.exchanges);
    }

    deleteStore = (index) => {
        this.state.config.stores.splice(index, 1);
        this.setState(this.state.config.stores);
    }

    save = () => {
        this.props.onSave(this.state.config);
    }

    renderAccountSetting = () => {
        let config = this.state.config;

        return (
            <div>
            <Header as='h2'>
                <Icon name='users' />
                <Header.Content>
                Account Settings
                <Header.Subheader>Manage your preferences</Header.Subheader>
                </Header.Content>
            </Header>
            <Grid stackable columns={2}>
            <Grid.Column>
            <Header as='h4' attached='top'>
                Steem Accounts
                <AddUser onSave={this.addUser}/>
            </Header>
            <Segment attached>
                <List verticalAlign='middle' size='big'>
                    {config && config.users.map( (user, key) => ( 
                        <List.Item key={key}>
                            <List.Content floated='right'>
                                <Button circular onClick={() => this.deleteUser(user.account)} icon="trash" color='orange' />
                            </List.Content>
                            <Image avatar src={user.img} />
                            <List.Content>
                                {user.account}
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </Segment>
            </Grid.Column>
            <Grid.Column>
            <Header as='h4' attached='top'>
                Exchange Accounts
                <AddExchange onSave={this.addExchange} />
            </Header>
            <Segment attached>
                <List divided verticalAlign='middle' size='big'>
                    {config && config.exchanges.map( (exchange, index) => ( 
                        <List.Item key={index}>
                            <List.Content floated='right'>
                                <Button circular onClick={() => this.deleteExchange(index)} icon="trash" color='orange' />
                            </List.Content>
                            <Image avatar src={Utils.getExchangeImage(exchange.name)} />
                            <List.Content>
                                {exchange.nickname}
                            </List.Content>
                            <Container text textAlign='left'>
                                <span style={{fontSize: 11, fontFamily: "monospace"}}>
                                {exchange.wallet}
                                </span>
                            </Container>
                        </List.Item>
                    ))}
                </List>
            </Segment>
            </Grid.Column>
            </Grid>
            </div>
        )
    }

    renderProducts = (store) => {
        if (!store.items) {
            store.items = []
        }
        let items = store.items;
        return (
        <div>
            <Form onSubmit={(event) => {
                event.preventDefault();
                if (!event.target[0].value || !event.target[1].value) return;
                if (items.find(item => item.name == event.target[0].value)) return;

                items.push({name: event.target[0].value, price: event.target[1].value});
                this.setState({stores: this.state.stores});
                event.target[0].value = ''
                event.target[1].value = ''
                event.target[0].focus()
            }
            }>
                <Form.Group unstackable width={16}>
                    <Form.Input placeholder='Name' name='name' width={10} />
                    <Form.Input placeholder='price' name='price'  width={4}  />
                    <Form.Button icon='add' width={2} />
                </Form.Group>
            </Form>
            <Table compact='very' unstackable>
                <Table.Body>
                {items.map((item, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>
                                <b>{item.name}</b>
                        </Table.Cell>
                        <Table.Cell>
                                {item.price}
                        </Table.Cell>
                        <Table.Cell>
                                <Button floated='right' icon='trash' color='orange' size='mini'
                                    onClick={() => {
                                        console.log(index);

                                        items.splice(index, 1);
                                        this.setState(this.state.config);
                                    }}
                                />
                        </Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
        </div>
        )
    }

    renderStoreSetting = () => {
        let config = this.state.config;
        let storeComponent = false;
        return (
            <div>
                <Header as='h2'>
                    <Icon name='home' />
                    <Header.Content>
                    Store Settings
                    <Header.Subheader>Manage your Store</Header.Subheader>
                    </Header.Content>
                </Header>  
                <ManageStore
                    onSave={this.addStore}
                    config={this.state.config}
                    trigger={<Button color='teal'>Add a new store</Button>}
                />
                {this.state.config.stores.map((store, index) => (
                    <div key={index} style={{marginTop: '10px'}}>
                        <Header as='h3' attached='top'>
                        {store.name}
                            <span><Button icon="trash" floated='right' style={{backgroundColor: 'white'}} onClick={() => this.deleteStore(index)}/></span>
                            <ManageStore
                                onSave={this.addStore}
                                config={this.state.config}
                                storeData={store}
                                trigger={<Button icon='pencil' floated='right' style={{backgroundColor: 'white'}}/>}
                            />
                        </Header>
                        <Segment attached>
                            <List divided verticalAlign='middle' size='medium'>
                            <Grid stackable columns={2}>
                                <Grid.Column>
                                    <h4>Description</h4>
                                    {store.description}
                                    <h4>Address</h4>
                                    {store.address}
                                    <h4>Linked Account</h4>
                                    {store.linkedAccount}
                                    <h4>Currency</h4>
                                    {store.currency}
                                </Grid.Column>
                                <Grid.Column>
                                    <h3>Products</h3>
                                    {this.renderProducts(store, index)}
                                </Grid.Column>
                            </Grid>
                            </List>
                        </Segment>
                    </div>
                ))}
            </div>
        )
    }

    rednerSetting = () => {
        return (
            <Container>
                {this.renderAccountSetting()}
                <Divider/>
                {this.renderStoreSetting()}
                <Divider/>
                <Button circular fluid color='teal' onClick={ this.save }>Save</Button>
            </Container>
        )
    }

    render() {
        return (
            <div>
                {this.rednerSetting()}
                {this.props.inProgress && (
                    <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                    </Dimmer>)}
            </div>
        )
    }
}

export default SettingEditor;