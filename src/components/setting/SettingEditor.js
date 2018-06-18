import React, { Component } from "react";
import { Button, Image, List, Divider, Container, Header, Segment, Dimmer, Loader } from 'semantic-ui-react'
import AddUser from './AddUser';
import AddExchange from './AddExchange';
import Utils from 'shared/Utils'

let steem = require('steem');

class SettingEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { config: false };
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
        this.state.config.users.push(userData);
        this.setState(this.state.config.users);
        this.getUserAccounts();
    }

    deleteUser = (userId) => {
        this.state.config.users = this.state.config.users.filter((user) => user.account !== userId);
        this.setState(this.state.config.users);
    }

    addExchange = (exchangeData) => {
        this.state.config.exchanges.push(exchangeData);
        this.setState(this.state.config.exchanges);
    }
    deleteExchange = (index) => {
        this.state.config.exchanges.splice(index, 1);
        this.setState(this.state.config.exchanges);
    }

    save = () => {
        this.props.onSave(this.state.config);
    }

    rednerSetting = () => {
        let config = this.state.config;
        return (
            <Container>
                <h2>
                Setting
                </h2>
                <Header as='h4' attached='top'>
                Steem Accounts
                <AddUser onSave={this.addUser}/>
                </Header>
                <Segment attached>
                <List verticalAlign='middle' size='big'>
                    {config && config.users.map( (user, key) => ( 
                        <List.Item key={key}>
                            <List.Content floated='right'>
                                <Button circular onClick={() => this.deleteUser(user.account)}>Delete</Button>
                            </List.Content>
                            <Image avatar src={user.img} />
                            <List.Content>
                                {user.account}
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
                </Segment>

                <Header as='h4' attached='top'>
                    Exchange Accounts
                    <AddExchange onSave={this.addExchange} />
                </Header>
                <Segment attached>
                <List divided verticalAlign='middle' size='big'>
                    {config && config.exchanges.map( (exchange, index) => ( 
                        <List.Item key={index}>
                            <List.Content floated='right'>
                                <Button circular onClick={() => this.deleteExchange(index)}>Delete</Button>
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
                <Divider/>
                <Button circular fluid positive onClick={ this.save }>Save</Button>
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