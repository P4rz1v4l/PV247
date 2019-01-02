import * as React from 'react';
import {ChatInfoUsersItem} from './ChatInfoUsersItem';

interface IChatInfoUsersState {
    emailValue: string;
}

export interface IChatInfosUsersStateToProps {
    users: string[];
    token: string;
}

export interface IChatInfoUsersDispatchToProps {
    inviteUser: (email: string) => void;
}

export class ChatInfoUsers extends React.PureComponent<IChatInfosUsersStateToProps & IChatInfoUsersDispatchToProps, IChatInfoUsersState> {
    constructor(props: IChatInfosUsersStateToProps & IChatInfoUsersDispatchToProps) {
        super(props);

        this.state = {
            emailValue: '',
        };
    }

    onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;

        this.setState(() => ({emailValue}));
    };

    onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        this.props.inviteUser(this.state.emailValue);
        this.setState(() => ({emailValue: ''}));
    };

    render() {
        const disabled = !this.state.emailValue.trim().length || !this.state.emailValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

        return (
            <div>
                <form className="settings-form" onSubmit={this.onSubmit}>
                    <h4>Name</h4>
                    <div className="settings-line">
                        <input type="text" placeholder="email" value={this.state.emailValue} onChange={this.onChangeEmail}/>
                        <button type="submit" disabled={disabled} />
                    </div>
                </form>

                <div className="user-list">
                    {this.props.users.map((user) => {
                        return (
                            <ChatInfoUsersItem key={user} email={user} token={this.props.token} />
                        );
                    })}
                </div>
            </div>
        );
    }
}
