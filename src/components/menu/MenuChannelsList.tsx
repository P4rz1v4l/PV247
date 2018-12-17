import * as React from 'react';
import {MenuChannelsListItem} from './MenuChannelsListItem';
import {BeatLoader} from 'react-spinners';
import {ChannelRecord, StateChannels} from '../../model/stateChannels';

export interface IMenuChannelsListStateProps {
    channelLoading: boolean;
    actualChannelId: string | null;
    channels: StateChannels;
    actualUser: string;
}

export interface IMenuChannelsListDispatchProps {
    fetchChannels: () => void;
    channelsUpdate: () => void;
    changeChannel: (channelsId: string) => void;
    toggleChannelCreate: (inCreateChannel: boolean) => void;
}

export class MenuChannelsList extends React.PureComponent<IMenuChannelsListStateProps & IMenuChannelsListDispatchProps> {
    _channelUpdater: any;

    componentDidMount() {
        this.props.fetchChannels();
        this._channelUpdater = setInterval(this.props.channelsUpdate, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._channelUpdater);
    }

    render() {
        const channels = this.props.channels.valueSeq().map((channel: ChannelRecord) => {
            if (channel.customData.users.indexOf(this.props.actualUser) > -1) {
                return (
                    <MenuChannelsListItem
                        key={channel.id}
                        id={channel.id}
                        name={channel.name}
                        active={(channel.id === this.props.actualChannelId)}
                        changeChannel={this.props.changeChannel}
                    />
                );
            }

            return '';
        });

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
                    {channels}
                </div>
            </div>
        );
    }
}
