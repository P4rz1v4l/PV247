import * as React from 'react';
import {MenuChannelsListItem} from './MenuChannelsListItem';
import {BeatLoader} from 'react-spinners';
import {IStateChannels} from '../../model/stateChannels';

export interface IMenuChannelsListStateProps {
    channelLoading: boolean;
    actualChannelId: string | null;
    channels: IStateChannels;
}

export interface IMenuChannelsListDispatchProps {
    fetchChannels: () => void;
    changeChannel: (channelsId: string) => void;
    toggleChannelCreate: (inCreateChannel: boolean) => void;
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
                    <span onClick={() => this.props.toggleChannelCreate(true)}>+</span>
                </div>
                <div className="list">
                    <BeatLoader loading={this.props.channelLoading} color={'#f15066'} className={'loader'} />
                    {this.props.channels.valueSeq().map((channel) => (
                        <MenuChannelsListItem
                            key={channel.get('id')}
                            id={channel.get('id')}
                            name={channel.get('name')}
                            active={(channel.get('id') === this.props.actualChannelId)}
                            changeChannel={this.props.changeChannel}
                        />
                    ))
                    }
                </div>
            </div>
        );
    }
}
