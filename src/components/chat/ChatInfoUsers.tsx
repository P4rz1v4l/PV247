import * as React from 'react';

export interface IChatInfosUsersStateToProps {
    users: string[];
}

export class ChatInfoUsers extends React.PureComponent<IChatInfosUsersStateToProps> {
    render() {
        return (
            <div>
                <ul>
                    {this.props.users.map((user) => {
                        return <li key={user}>{user}</li>;
                    })}
                </ul>
            </div>
        );
    }
}
