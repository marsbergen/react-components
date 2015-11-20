import React from "react";

import {Link} from 'react-router'

export class Sidebar extends React.Component {
  render() {
    return <nav className="sidebar push-bottom">
      <ul>
        <li>
          <Link to='/buttons' className='sidebar__item'>Buttons</Link>
        </li>
      </ul>
    </nav>;
  }
}
