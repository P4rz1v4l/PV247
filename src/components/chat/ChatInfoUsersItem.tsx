import * as React from 'react';
import {memoizeFetchUserInfo} from '../../util/fetchUserInfo';
import {IApiUser} from '../../util/apiInterfaces';

interface IChatInfoUsersItemState {
    nick: string;
    avatar: string;
}

export interface IChatInfosUsersOwnProps {
    email: string;
    token: string;
}

export class ChatInfoUsersItem extends React.PureComponent<IChatInfosUsersOwnProps, IChatInfoUsersItemState> {
    constructor(props: IChatInfosUsersOwnProps) {
        super(props);

        this.state = {
            nick: '',
            avatar: '',
        };
    }

    componentDidMount() {
        memoizeFetchUserInfo(this.props.email, this.props.token)
            .then((data: IApiUser) => {
                this.setState(() => ({nick: data.customData.nick, avatar: data.customData.avatar}));
            })
            .catch(() => {
                console.log('error');
            });
    }

    render() {
        return (
            <div className="user-item">
                <img src={this.state.avatar ? this.state.avatar : 'media/img/avatar.png'} />
                <h5>{this.state.nick ? this.state.nick : this.props.email}</h5>
                <h6>{this.props.email}</h6>
            </div>
        );
    }
}
