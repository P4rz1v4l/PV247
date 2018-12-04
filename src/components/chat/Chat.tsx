import * as React from 'react';
import Sidebar from 'react-sidebar';

import { ChatHeader } from './ChatHeader';
import { ChatMessagesContainer} from '../../containers/ChatMessages';
import { ChatInfos } from './ChatInfos';

import './chat.scss';

const mql = window.matchMedia(`(min-width: 1300px)`);

interface IChatState {
    sidebarDocked: any;
    sidebarOpen: boolean;
}

export class Chat extends React.PureComponent<{}, IChatState> {
    constructor(props: {}) {
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
        return (
            <div id="chat" className="col-12">
                <div className="row align-content-start">
                    <Sidebar
                        sidebar={<ChatInfos />}
                        open={this.state.sidebarOpen}
                        docked={this.state.sidebarDocked}
                        onSetOpen={this.onSetSidebarOpen}
                        pullRight
                        styles={{sidebar: {width: '350px'}}}
                    >
                        <ChatHeader />
                        <ChatMessagesContainer />
                    </Sidebar>
                </div>
            </div>
        );
    }
}
