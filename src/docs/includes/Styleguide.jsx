import React from 'react';

import {Header} from './Header';
import {Sidebar} from './Sidebar';
import {Footer} from './Footer';

export class Styleguide extends React.Component {
  render() {
    return <div>
      <Header />
      <div className='container'>
        <div className='grid grid--gutter soft-top'>
          <div className='column column--three column-t--three column-m--twelve'>
            <Sidebar />
          </div>
          <div className='column column--nine column-t--nine column-m--twelve'>
            {this.props.children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
      ;
  }
}
