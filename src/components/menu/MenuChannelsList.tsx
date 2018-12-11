import * as React from 'react';
import { MenuChannelsListItem } from './MenuChannelsListItem';
import * as Immutable from 'immutable';
import { BeatLoader } from 'react-spinners';

export interface IMenuChannelsListStateProps {
    app: Immutable.Map<any, any>;
    channels: Immutable.List<Immutable.Map<any, any>>;
}

export interface IMenuChannelsListDispatchProps {
    fetchChannels: () => void;
}

export class MenuChannelsList extends React.PureComponent<IMenuChannelsListStateProps & IMenuChannelsListDispatchProps> {
    componentDidMount() {
        this.props.fetchChannels();
    }

    render() {
        return (
            <div className="channels">
                <div className="d-flex justify-content-between title">
                    <h2 className="d-flex align-items-center">
                        Channels
                    </h2>
                    <span>+</span>
                </div>
                <div className="list">
                    <BeatLoader loading={this.props.app.get('channelLoading')} color={'#f15066'} className={'loader'} />
                    {this.props.channels.map((channel) => (
                        <MenuChannelsListItem
                            key={channel.get('id')}
                            name={channel.get('name')}
                            active={(channel.get('id') === this.props.app.get('actualChannelId'))}
                        />
                    ))
                    }
                </div>
            </div>
        );
    }
}
