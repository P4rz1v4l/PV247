import { connect } from 'react-redux';
import { MenuChannelsList } from "../components/menu/MenuChannelsList";

const mapStateToProps = (state) => {
  return {
    channels: state.get('channels'),
    app: state.get('app')
  };
};

export const MenuChannelsListContainer = connect(mapStateToProps)(MenuChannelsList);
