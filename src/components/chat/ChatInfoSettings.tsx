import * as React from 'react';
import {ChannelRecord, IChannel} from '../../model/stateChannels';

interface IChatInfoSettingsState {
    nameValue: string;
    decsValue: string;
}

export interface IChatInfoSettingsStateToProps {
    channel: ChannelRecord;
    actualUserId: string;
}

export interface IChatInfoSettingsDispatchToProps {
    channelUpdate: (channel: IChannel) => void;
    channelDelete: (channelId: string) => void;
    leaveUser: (channelId: string) => void;
}

export class ChatInfoSettings extends React.PureComponent<IChatInfoSettingsStateToProps & IChatInfoSettingsDispatchToProps, IChatInfoSettingsState> {
    constructor(props: IChatInfoSettingsStateToProps & IChatInfoSettingsDispatchToProps) {
        super(props);

        this.state = {
            nameValue: this.props.channel.name,
            decsValue: this.props.channel.customData.description,
        };
    }

    onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameValue = event.target.value;

        this.setState((prevState) => ({...prevState, nameValue}));
    };

    onChangeDecs = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const decsValue = event.target.value;

        this.setState((prevState) => ({...prevState, decsValue}));
    };

    onKeyPressedDecs = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!event.shiftKey) {
                this.channelUpdate();
            }
            else {
                this.setState((prevState) => {
                    return {...prevState, decsValue: prevState.decsValue + '\r\n' };
                });
            }
        }
    };

    onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.channelUpdate();
    };

    channelUpdate = () => {
        const channelData: IChannel = this.props.channel.toObject();
        channelData.name = this.state.nameValue;
        channelData.customData.description = this.state.decsValue;

        this.props.channelUpdate(channelData);
    };

    render() {
        return (
            <div>
                <form className="settings-form" onSubmit={this.onSubmit}>
                    <h4>Name</h4>
                    <div className="settings-line">
                        <input type="text" placeholder="name" value={this.state.nameValue} onChange={this.onChangeName}/>
                        <button type="submit"/>
                    </div>
                </form>

                <form className="settings-form" onSubmit={this.onSubmit}>
                    <h4>Description</h4>
                    <div className="settings-line">
                        <textarea value={this.state.decsValue} onChange={this.onChangeDecs} onKeyPress={this.onKeyPressedDecs} />
                        <button type="submit"/>
                    </div>
                </form>

                <div className="settings-menu">
                    {this.props.channel.customData.owner === this.props.actualUserId ?
                        <div className="settings-item" onClick={() => { this.props.channelDelete(this.props.channel.id); }}>
                            <img src="media/img/delete.png" width="45" height="38"/>
                            <h5>Delete channel </h5>
                            <h6>only owner can delete channel</h6>
                        </div>
                        :
                        <div className="settings-item" onClick={() => { this.props.leaveUser(this.props.channel.id); }}>
                            <img src="media/img/leave.png" width="45" height="38"/>
                            <h5>Leave channel </h5>
                            <h6>permanently leave channel</h6>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
