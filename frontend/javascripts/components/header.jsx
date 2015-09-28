import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
  render: function() {
    return (
      <div className="border-block--bottom">
        <header className="header">
          <div className="header__main-block">
            <Link to="app" className="header__logo header__link">Colubrine</Link>

            <ul className="header__tabs-block">
              <li className="header__tab">
                <Link to="notes" className="header__tab-link">Notes</Link>
              </li>
            </ul>
          </div>
        </header>
      </div>
    );
  }
});

export default Header;
