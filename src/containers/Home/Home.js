import React, { Component } from 'react';
// import { Link } from 'react-router';
// import { CounterButton, GithubButton } from 'components';
import config from '../../config';
import {Login} from 'components';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>

         </div>
        </div>

        <div className="container">

          <p>This starter boilerplate app uses the following technologies:</p>

          <Login />

                    <h3>From the author</h3>

          <p>
            I cobbled this together from a wide variety of similar "starter" repositories. As I post this in June 2015,
            all of these libraries are right at the bleeding edge of web development. They may fall out of fashion as
            quickly as they have come into it, but I personally believe that this stack is the future of web development
            and will survive for several years. I'm building my new projects like this, and I recommend that you do,
            too.
          </p>

          <p>Thanks for taking the time to check this out.</p>

          <p>– Erik Rasmussen</p>
        </div>
      </div>
    );
  }
}
