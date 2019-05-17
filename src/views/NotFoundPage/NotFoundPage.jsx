import React, { Component } from 'react';

import Footer from '../../components/layout/Footer';
import HeaderLayout from '../../components/layout/HeaderLayout';

const NotFoundPage = () => (
  <section id="home">
    <HeaderLayout />
    <div className="row home">
      <div className="column">
        <div className="not-found">
          <h1 className="not-found__title">Oops!</h1>
          <div className="not-found-description">
            <h3 className="not-found-description__title">404 - PAGE NOT FOUND</h3>
            <p>
              The page you are looking for might have been removed
              <br/>
              had its name changed or is temporarily unavailable.
            </p>
            <a href="/" className="not-found-description__button">Go to main page</a>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </section>
);

export default NotFoundPage;
