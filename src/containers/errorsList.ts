import {IState} from '../model/state';
import {Dispatch} from 'redux';
import {errorRemove} from '../actions/errorsActionCreators';
import {connect} from 'react-redux';
import {IErrorsListDispatchToProps, IErrorsListStateToProps, ErrorsList} from '../components/error/errorsList';

const mapStateToProps = (state: IState) => {
    return {
        errors: state.errors,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        removeError: (id: string) => dispatch(errorRemove(id)),
    };
};

export const ErrorsListContainer = connect<IErrorsListStateToProps, IErrorsListDispatchToProps>(mapStateToProps, mapDispatchToProps)(ErrorsList);
