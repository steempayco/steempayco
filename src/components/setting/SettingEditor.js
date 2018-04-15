import React, { Component } from "react";
import { Button, Image, List, Divider, Container, Modal } from 'semantic-ui-react'
import AddUser from './AddUser';
import AddExchange from './AddExchange';

let steem = require('steem');

const config = {
    users: [],
    exchanges: [],
}

const exchangeImg = {
    'myupbit': './img/upbit.jpg',
};

const inlineStyle = {
    modal : {
      marginTop: '40px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
};

class SettingEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: this.getStateFromConfig()
        };

        this.getUserAccounts = this.getUserAccounts.bind(this);
        this.addUser = this.addUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addExchange = this.addExchange.bind(this);
        this.deleteExchange = this.deleteExchange.bind(this);
        this.save = this.save.bind(this);
    }

    getStateFromConfig() {
        let rawConfig = localStorage.getItem('steempay_config');
        if (!rawConfig) return config;
        try {
            return JSON.parse(rawConfig);
        } catch(error) {
            return config;
        }
    }

    setStateToConfig() {
        localStorage.setItem('steempay_config', JSON.stringify(this.state.config));
    }

    getUserAccounts() {
        let userList = this.state.config.users.map((user) => user.account);
        steem.api.getAccountsAsync(userList)
        .then( (result) => {
            for (let i = 0  ; i < result.length ; i++) {
                this.state.config.users[i].img = "https://steemitimages.com/400x0/" + JSON.parse(result[i].json_metadata).profile.profile_image;
            }
            this.setState(this.state.config);
        })
        .catch((error) => {
        })
        .done();
    }

    addUser(userData) {
        this.state.config.users.push(userData);
        this.setState(this.state.config.users);
        this.getUserAccounts();
    }

    deleteUser(userId) {
        this.state.config.users = this.state.config.users.filter((user) => user.account != userId);
        this.setState(this.state.config.users);
    }

    addExchange(exchangeData) {
        console.log(exchangeData);

        this.state.config.exchanges.push(exchangeData);
        this.setState(this.state.config.exchanges);
        console.log(this.state.config.exchanges);
    }
    deleteExchange(index) {
        this.state.config.exchanges.splice(index, 1);
        this.setState(this.state.config.exchanges);
    }

    save() {
        this.setStateToConfig();
        this.props.onSave();
    }

    componentDidMount() {
        this.getUserAccounts();
    }
    
    render() {
        return (
            <div>
                <Divider horizontal >User Accounts</Divider>
                <List verticalAlign='middle' size='huge'>
                    {this.state.config.users.map( (user, key) => ( 
                        <List.Item key={key}>
                            <List.Content floated='right'>
                                <Button onClick={() => this.deleteUser(user.account)}>Delete</Button>
                            </List.Content>
                            <Image avatar src={user.img} />
                            <List.Content>
                                {user.account}
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
                <AddUser onSave={this.addUser}/>

                <Divider horizontal>Exchange Accounts</Divider>
                <List divided verticalAlign='middle' size='huge'>
                    {this.state.config.exchanges.map( (exchange, index) => ( 
                        <List.Item key={index}>
                            <List.Content floated='right'>
                                <Button onClick={() => this.deleteExchange(index)}>Delete</Button>
                            </List.Content>
                            <Image avatar src={exchangeImg[exchange.account]} />
                            <List.Content>
                                {exchange.nickname}
                            </List.Content>
                            <Container text textAlign='left'>
                                <span style={{fontSize: 11, fontFamily: "'Source Code Pro', monospace"}}>
                                {exchange.wallet}
                                </span>
                            </Container>
                        </List.Item>
                    ))}
                </List>
                <AddExchange onSave={this.addExchange}/>

                <Divider/>
                <Button large fluid positive onClick={ this.save }>Save</Button>
            </div>
        )
    }
}

export default SettingEditor;