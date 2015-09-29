import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
  render: function() {
    return (
      <header className="header">
        <Link to="app" className="header__logo header__link">Colubrine</Link>
      </header>
    );
  }
});

export default Header;
