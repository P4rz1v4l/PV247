import * as React from 'react';
import Sidebar from 'react-sidebar';

import {ChatHeaderContainer} from '../../containers/ChatHeader';
import {ChatMessagesContainer} from '../../containers/ChatMessages';
import {ChatInfo} from './ChatInfo';
import {CreateChannelFormContainer} from '../../containers/CreateChannelForm';

import './chat.scss';
import './draft.css';

const mql = window.matchMedia(`(min-width: 1300px)`);

interface IChatState {
    sidebarDocked: any;
    sidebarOpen: boolean;
}

export interface IChatStateToProps {
    inCreateChannel: boolean;
    actualChannelId: string | null;
}

export class Chat extends React.PureComponent<IChatStateToProps, IChatState> {
    constructor(props: IChatStateToProps) {
        super(props);
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false
        };
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen = (open: boolean) => {
        this.setState(() => ({ sidebarOpen: open }));
    };

    mediaQueryChanged = () => {
        this.setState(() => ({ sidebarDocked: mql.matches, sidebarOpen: false }));
    };

    render(): JSX.Element {
        let content = () => (
            <div id="chat" className="col-12">
                <div className="row align-content-start">
                    <Sidebar
                        sidebar={<ChatInfo />}
                        open={this.state.sidebarOpen}
                        docked={this.state.sidebarDocked}
                        onSetOpen={this.onSetSidebarOpen}
                        pullRight
                        styles={{sidebar: {width: '350px'}}}
                    >
                        <ChatHeaderContainer />
                        <ChatMessagesContainer />
                    </Sidebar>
                </div>
            </div>
        );

        if (this.props.inCreateChannel || !this.props.actualChannelId ) {
            content = () => (
                <div id="chatCreate" className="col-12"><CreateChannelFormContainer /></div>
            );
        }

        return (
            content()
        );
    }
}
