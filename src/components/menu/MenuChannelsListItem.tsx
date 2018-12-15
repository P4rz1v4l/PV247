import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface IMenuChannelsListItemProps {
    id: string;
    name: string;
    active: boolean;
    changeChannel: (ChannelsId: string) => void;
}

export class MenuChannelsListItem extends React.PureComponent<IMenuChannelsListItemProps> {
    render() {
        return (
            <div className={this.props.active ? 'd-flex align-items-stretch justify-content-between channel active' : 'd-flex align-items-stretch justify-content-between channel'} onClick={() => this.props.changeChannel(this.props.id)}>
                <div>
                    <div className="d-flex align-items-start name">
                        <FontAwesomeIcon icon="comments" />
                        <div>
                            <h3>{this.props.name}</h3>
                            <span>Message</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center move" onClick={(event) => {event.stopPropagation(); }}>
                    ...
                </div>
            </div>
        );
    }
}
