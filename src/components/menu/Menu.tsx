import * as React from 'react';

import { MenuHeaderContainer } from '../../containers/MenuHeader';
import { MenuChannelsListContainer } from '../../containers/MenuChannelsList';

import './menu.scss';

export class Menu extends React.PureComponent {
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
                </div>
            </div>
        );
    }
}
