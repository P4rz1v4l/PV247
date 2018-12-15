import {connect} from 'react-redux';
import {ICreateCahnnelFormDispetchToProps, CreateCahnnelForm, ICreateCahnnelFormStateToProps} from '../components/chat/CreateCahnnelForm';
import {Dispatch} from 'redux';
import {toggleChannelCreate} from '../actions/appActionCreator';
import {channelCreate} from '../actions/channelsActionCreator';
import {IState} from '../model/state';

const mapStateToProps = (state: IState) => {
    return {
        channelCreating: state.app.channelCreating,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        toggleChannelCreate: (inCreateChannel: boolean) => dispatch(toggleChannelCreate(inCreateChannel)),
        channelCreate: (name: string, description: string) => dispatch(channelCreate(name, description)),
    };
};

export const CreateChannelFormContainer = connect<ICreateCahnnelFormStateToProps, ICreateCahnnelFormDispetchToProps>(mapStateToProps, mapDispatchToProps)(CreateCahnnelForm);
