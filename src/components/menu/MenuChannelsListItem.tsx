import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface IMenuChannelsListItemProps {
    id: string;
    index: number;
    name: string;
    active: boolean;
    changeChannel: (ChannelsId: string) => void;
    updateIndex: (oldIndex: number, newIndex: number) => void;
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
                <div className="d-flex align-items-center flex-column move">
                    <div className="d-flex align-self-end" onClick={(event) => {event.stopPropagation(); this.props.updateIndex(this.props.index, this.props.index - 1); }}><FontAwesomeIcon icon={['fas', 'sort-up']} /></div>
                    <div className="d-flex align-self-start" onClick={(event) => {event.stopPropagation(); this.props.updateIndex(this.props.index, this.props.index + 1); }}><FontAwesomeIcon icon={['fas', 'sort-down']} /></div>
                </div>
            </div>
        );
    }
}
