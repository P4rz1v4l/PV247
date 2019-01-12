import * as React from 'react';
import Sidebar from 'react-sidebar';
import {LoginPage} from './login/LoginPage';
import {ChatContainer} from '../containers/Chat';
import {StateUserRecord} from '../model/stateUser';
import {StateAppRecord} from '../model/stateApp';
import {ErrorsListContainer} from '../containers/errorsList';
import {MenuContainer} from '../containers/Menu';

const mql = window.matchMedia(`(min-width: 800px)`);


interface ISwitchState {
    sidebarDocked: any;
    sidebarOpen: boolean;
}

export interface ISwitchStateProps {
    user: StateUserRecord;
    app: StateAppRecord;
}

export interface ISwitchDispatchProps {
    userLogin: (email: string) => void;
}

export class Switch extends React.PureComponent<ISwitchStateProps & ISwitchDispatchProps, ISwitchState> {
    constructor(props: ISwitchStateProps & ISwitchDispatchProps) {
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
            <LoginPage
                userLogin={this.props.userLogin}
                userLoginProcess={this.props.app.get('userLoginProcess')}
            />);

        if ( this.props.user.get('isLogged') ) {
            content = () => (
                <Sidebar
                    sidebar={<MenuContainer />}
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{sidebar: {width: '270px'}}}
                >
                    <div className="container-fluid">
                        <div className="row">
                            <ChatContainer />

                            <ErrorsListContainer />
                        </div>
                    </div>
                </Sidebar>
            );
        }

        return (
            content()
        );
    }
}
