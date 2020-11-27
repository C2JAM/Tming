import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function NonAuthLayout({ children }) {
  useEffect(() => {
    document.title = '테스트 | Tming';
  }, []);

  return <>{children}</>;
}

NonAuthLayout.propTypes = { children: PropTypes.node.isRequired };

export default withRouter(NonAuthLayout);
