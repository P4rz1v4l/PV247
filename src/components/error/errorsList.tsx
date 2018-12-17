import * as React from 'react';
import {StateError} from '../../model/stateErrors';
import {ErrorsListItem} from './erorrsListItem';
import './errors.scss';

export interface IErrorsListStateToProps {
    errors: StateError;
}

export interface IErrorsListDispatchToProps {
    removeError: (id: string) => void;
}

export class ErrorsList extends React.PureComponent<IErrorsListStateToProps & IErrorsListDispatchToProps, {}> {
    render() {
        return (
          <div className="d-flex align-items-end flex-column error-container">
              {
                  this.props.errors.map((value: string, key: string) => {
                      return <ErrorsListItem key={key} id={key} text={value} removeError={this.props.removeError} />;
                  }).valueSeq()
              }
          </div>
        );
    }
}
