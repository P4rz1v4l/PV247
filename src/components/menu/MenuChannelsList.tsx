import * as React from 'react';
import {MenuChannelsListItem} from './MenuChannelsListItem';
import {BeatLoader} from 'react-spinners';
import {StateChannels} from '../../model/stateChannels';

export interface IMenuChannelsListStateProps {
    channelLoading: boolean;
    actualChannelId: string | null;
    channels: StateChannels;
    actualUser: string;
    usersOrderedChannels: string[];
}

export interface IMenuChannelsListDispatchProps {
    fetchChannels: () => void;
    channelsUpdate: () => void;
    changeChannel: (channelsId: string) => void;
    toggleChannelCreate: (inCreateChannel: boolean) => void;
    userChangeChannelsOrder: (orderedChannels: string[]) => void;
}

export class MenuChannelsList extends React.PureComponent<IMenuChannelsListStateProps & IMenuChannelsListDispatchProps> {
    _channelUpdater: any;

    constructor(props: IMenuChannelsListStateProps & IMenuChannelsListDispatchProps) {
        super(props);

        this.state = {
            orderedChannels: null,
        };
    }

    componentDidMount() {
        this.props.fetchChannels();
        this._channelUpdater = setInterval(this.props.channelsUpdate, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._channelUpdater);
    }

    updateOrder = (oldIndex: number, newIndex: number) => {
        if (newIndex >= 0 && newIndex < this.props.usersOrderedChannels.length) {
            const clone = this.props.usersOrderedChannels.slice(0);
            clone[oldIndex] = clone.splice(newIndex, 1, clone[oldIndex])[0];
            this.props.userChangeChannelsOrder(clone);
        }
    };

    render() {
        const channels = this.props.usersOrderedChannels.map((channelID: string, index: number) => {
            return (
                <MenuChannelsListItem
                    key={this.props.channels.getIn([channelID, 'id'])}
                    id={channelID}
                    index={index}
                    name={this.props.channels.getIn([channelID, 'name'])}
                    active={(channelID === this.props.actualChannelId)}
                    changeChannel={this.props.changeChannel}
                    updateIndex={this.updateOrder}
                />
            );
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
