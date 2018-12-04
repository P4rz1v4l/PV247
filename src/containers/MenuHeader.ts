import { connect } from 'react-redux';
import { MenuHeader, IMenuHeaderStateProps } from '../components/menu/MenuHeader';

const mapStateToProps = (state: any) => {
    return {
        user: state.get('user')
    };
};

export const MenuHeaderContainer = connect<IMenuHeaderStateProps>(mapStateToProps)(MenuHeader);
