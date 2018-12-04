import * as React from 'react';
import {Menu} from './menu/Menu';
import {Chat} from './chat/Chat';
import Sidebar from 'react-sidebar';
import * as Immutable from 'immutable';
import {LoginPage} from './login/LoginPage';

const mql = window.matchMedia(`(min-width: 800px)`);


interface ISwitchState {
    sidebarDocked: any;
    sidebarOpen: boolean;
}

export interface ISwitchStateProps {
    user: Immutable.Map<any, any>;
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
        let content = () => (<LoginPage userLogin={this.props.userLogin} />);
        if ( this.props.user.get('isLogged') ) {
            content = () => (
                <Sidebar
                    sidebar={<Menu />}
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{sidebar: {width: '270px'}}}
                >
                    <div className="container-fluid">
                        <div className="row">
                            <Chat />
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
