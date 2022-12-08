import { Link } from "react-router-dom";

import { ConnectButton } from "web3uikit";
import log1 from "../log1.png";
export default function Navbar(){

    return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <img className="logo" src={log1} alt="logo..."></img>
        <button
            className='navbar-toggler'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/home'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/election'>
                Start Campaign
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/vote'>
                Vote
              </Link>
            </li>
          </ul>
        </div>
        <div className="btn">
            <ConnectButton></ConnectButton>
        </div>

  </nav>
    </>
    );
}