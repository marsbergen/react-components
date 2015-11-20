import React from "react";

export class Header extends React.Component {
  render() {
    return <header className="docs__top-bar">
      <div className="container">
        <a href="/" className="docs__logo color--white">Craft Studio</a>

        <nav className="docs__nav right">
          <ul className="list--horizontal">
            <li><a href="/scaffolding">Docs</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/getting-started">Getting started</a></li>
          </ul>
        </nav>
      </div>
    </header>;
  }
}
