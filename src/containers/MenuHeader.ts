import { connect } from 'react-redux';
import {MenuHeader, IMenuHeaderStateProps, IMenuHeaderDispatchToProps} from '../components/menu/MenuHeader';
import {IState} from '../model/state';
import {Dispatch} from 'redux';
import {userChangeNick} from '../actions/userActionCreator';

const mapStateToProps = (state: IState) => {
    return {
        user: state.user,
        userChangingName: state.app.userChangingName,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        userChangeNick: (nick: string) => dispatch(userChangeNick(nick)),
    };
};

export const MenuHeaderContainer = connect<IMenuHeaderStateProps, IMenuHeaderDispatchToProps>(mapStateToProps, mapDispatchToProps)(MenuHeader);
