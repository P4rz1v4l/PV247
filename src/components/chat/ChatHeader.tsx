import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ChatHeader extends React.PureComponent {
    render() {
        return (
            <div className="col-12 header">
                <div className="d-flex align-items-center name">
                    <h2>nullnull</h2>
                    <FontAwesomeIcon icon="cog" />
                    <FontAwesomeIcon icon={['far', 'star']} color="red" />
                </div>
                <div className="description">
                    <span>
                        Lorem ipsum dolor sit amet, sed ea wisi eius. Quo lorem deserunt ex, quo iudicabit vituperata scriptorem ex.
                    </span>
                </div>
            </div>
        );
    }
}
