import { connect } from 'react-redux';
import { MenuChannelsList } from "../components/menu/MenuChannelsList";

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    app: state.app
  };
};

export const MenuChannelsListContainer = connect(mapStateToProps)(MenuChannelsList);
