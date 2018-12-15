import { connect } from 'react-redux';
import { Switch, ISwitchStateProps, ISwitchDispatchProps } from '../components/Switch';
import { Dispatch } from 'redux';
import { userLogin } from '../actions/userActionCreator';
import {IState} from '../model/state';

const mapStateToProps = (state: IState) => {
    return {
        user: state.user,
        app: state.app,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        userLogin: (mail: string) => dispatch(userLogin(mail))
    };
};

export const SwitchContainer = connect<ISwitchStateProps, ISwitchDispatchProps>(mapStateToProps, mapDispatchToProps)(Switch);
