import * as React from 'react';
import {ChatInfoUserContainer} from '../../containers/ChatInfoUsers';
import {ChatInfoSettingsContainer} from '../../containers/ChatInfoSettings';

interface IChatInfoState {
    cardID: number;
}

export class ChatInfo extends React.PureComponent<{}, IChatInfoState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            cardID: 1,
        };
    }

    changeCard = (cardID: number) => {
        this.setState(() => ({cardID}));
    }

    render() {
        let content;

        switch (this.state.cardID) {
            case 1: {
                content = <ChatInfoUserContainer />;
                break;
            }

            case 2: {
                content = <ChatInfoSettingsContainer />;
                break;
            }

            default: {
                content = '';
            }
        }

        return (
            <div className="col-12 channel-info">
                <div className="title">
                    <h4 onClick={() => {this.changeCard(1); }}>
                        <span>Users</span>
                        {this.state.cardID === 1 ? <div className="highlight-line"/> : ''}
                    </h4>
                    <h4 onClick={() => {this.changeCard(2); }}>
                        <span>Settings</span>
                        {this.state.cardID === 2 ? <div className="highlight-line"/> : ''}
                    </h4>
                </div>
                <div className="body">
                    {content}
                </div>
            </div>
        );
    }
}
