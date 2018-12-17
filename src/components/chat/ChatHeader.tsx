import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {BeatLoader} from 'react-spinners';

export interface IChatHeaderStateToProps {
    chatName: string;
    chatDesc: string;
    channelUpdating: boolean;
}

export class ChatHeader extends React.PureComponent<IChatHeaderStateToProps> {
    render() {
        return (
            <div className="col-12 header">
                <div className="d-flex align-items-center name">
                    {this.props.channelUpdating ?
                        <BeatLoader color={'#383566'} className={'loader'} />
                        :
                        <div><h2>{this.props.chatName} </h2><FontAwesomeIcon icon="cog" /></div>
                    }
                </div>
                <div className="description">
                    <span>
                        {this.props.channelUpdating ?
                            <BeatLoader color={'#383566'} className={'loader'} />
                            :
                            this.props.chatDesc
                        }
                    </span>
                </div>
            </div>
        );
    }
}
