import * as React from 'react';

interface IErrorsListItem {
    id: string;
    text: string;
    removeError: (id: string) => void;
}

export class ErrorsListItem extends React.PureComponent<IErrorsListItem> {
    _removeTimer: any;

    destruction = () => {
        this.props.removeError(this.props.id);
    };

    componentDidMount() {
        this._removeTimer = setTimeout(this.destruction, 3500);
    }

    render() {
        return (
            <div className="mt-auto error-item" onClick={this.destruction}>
                <h2>Hmm...</h2>
                <h4>Yes, channel name is mandatory!</h4>
            </div>
        );
    }
}
