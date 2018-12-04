import * as React from 'react';
import * as Immutable from 'immutable';

export interface IMenuHeaderStateProps {
    user: Immutable.Map<any, any>;
}

export class MenuHeader extends React.PureComponent<IMenuHeaderStateProps> {
    render() {
        return (
            <div className="d-flex align-items-stretch justify-content-between header">
                <div>
                    <h1>{this.props.user.get('name')}</h1>
                    <span>{this.props.user.get('mail')}</span>
                </div>
                <div className="d-flex align-items-center">
                    <div className="avatar" />
                </div>
            </div>
        );
    }
}
