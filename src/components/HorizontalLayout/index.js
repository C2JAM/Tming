import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Layouts
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  useEffect(() => {
    // scroll to 0,0
    window.scrollTo(0, 0);
    document.title = `Tming`;
  }, []);

  return (
    <>
      <div id="layout-wrapper">
        <Header />
        <div className="main-content">{children}</div>
        <Footer />
      </div>
    </>
  );
}

Layout.propTypes = { children: PropTypes.node.isRequired };

export default connect(null, null)(withRouter(Layout));
