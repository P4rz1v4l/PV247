import { connect } from 'react-redux';
import { MenuHeader } from "../components/menu/MenuHeader";

const mapStateToProps = (state) => {
  return {
    user: state.get('user')
  };
};

export const MenuHeaderContainer = connect(mapStateToProps)(MenuHeader);
