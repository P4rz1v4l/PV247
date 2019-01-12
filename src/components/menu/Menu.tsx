import * as React from 'react';

import { MenuHeaderContainer } from '../../containers/MenuHeader';
import { MenuChannelsListContainer } from '../../containers/MenuChannelsList';

import './menu.scss';

export interface IMenuDispatchToProps {
    logout: () => void;
}

export class Menu extends React.PureComponent<IMenuDispatchToProps> {
    render(): JSX.Element {
        return (
            <div id="menu" className="col-12">
                <div className="row">
                    <div className="col-12">
                        <MenuHeaderContainer />
                    </div>
                    <div className="col-12">
                        <MenuChannelsListContainer />
                    </div>
                    <div className="logout" onClick={this.props.logout}>
                        LOG OUT
                    </div>
                </div>
            </div>
        );
    }
}
