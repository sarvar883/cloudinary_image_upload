import { FC } from 'react';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
      <div className="container">

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Paint Order</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">Upload Image</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;