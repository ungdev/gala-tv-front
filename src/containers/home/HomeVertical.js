import React from 'react';
import './home-vertical.css';
import Time from './components/Time';
import Partners from './components/Partners';
import Events from './components/Events';
import logo from '../../assets/logo.png';
import Notifications from './components/Notifications';

class HomeVertical extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="home home-vertical">
          <div className="home-top">
            <div className="home-logo">
              <img src={logo} alt="" />
            </div>
            <div className="home-time-and-partners-container">
              <div className="home-time-container">
                <Time />
              </div>
            </div>
          </div>
          <div className="home-middle">
            <Events />
            {/*<div className='home-tweets'>
              <div className='tweets-title'> {/* changer la classe pour que ça ait du sens mais faire attention ça disparait*/}
            {/*<span>Annonces</span>
              </div>
              <Tweets />
            </div>*/}
            <div className="home-partners">
              <Partners />
            </div>
          </div>
        </div>
        <Notifications />
      </React.Fragment>
    );
  }
}

export default HomeVertical;
