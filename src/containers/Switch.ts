import { connect } from 'react-redux';
import { Switch, ISwitchStateProps, ISwitchDispatchProps } from '../components/Switch';
import { Dispatch } from 'redux';
import { userLogin } from '../actions/userActionCreator';

const mapStateToProps = (state: any) => {
    return {
        user: state.get('user'),
        app: state.get('app')
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        userLogin: (mail: string) => dispatch(userLogin(mail))
    };
};

export const SwitchContainer = connect<ISwitchStateProps, ISwitchDispatchProps>(mapStateToProps, mapDispatchToProps)(Switch);
