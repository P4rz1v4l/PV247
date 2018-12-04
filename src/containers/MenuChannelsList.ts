import { connect } from 'react-redux';
import { MenuChannelsList, IMenuChannelsListStateProps, IMenuChannelsListDispatchProps } from '../components/menu/MenuChannelsList';
import {Dispatch} from 'redux';
import { fetchChannels } from '../actions/channelsActionCreator';

const mapStateToProps = (state: any) => {
    return {
    channels: state.get('channels'),
    app: state.get('app')
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchChannels: () => dispatch(fetchChannels())
    };
};

export const MenuChannelsListContainer = connect<IMenuChannelsListStateProps, IMenuChannelsListDispatchProps>(mapStateToProps, mapDispatchToProps)(MenuChannelsList);
