import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IChatHeaderStateToProps {
    chatName: string;
    chatDesc: string;
}

export class ChatHeader extends React.PureComponent<IChatHeaderStateToProps> {
    render() {
        return (
            <div className="col-12 header">
                <div className="d-flex align-items-center name">
                    <h2>{this.props.chatName}</h2>
                    <FontAwesomeIcon icon="cog" />
                </div>
                <div className="description">
                    <span>
                        {this.props.chatDesc}
                    </span>
                </div>
            </div>
        );
    }
}
