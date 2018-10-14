import React from 'react';

import { Delete, DeleteOutlined } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ChatInfo extends React.PureComponent {
  render() {
    return (
      <div>
        <h2>Name <Delete /> <DeleteOutlined /></h2>
        <div>Description <FontAwesomeIcon icon="align-left" /></div>
      </div>
    );
  }
}
