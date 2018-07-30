import React from 'react';

/**
 * COMPONENT
 */

const testProps = [];

const Recommendations = props => (
  <div
    id="carouselExampleIndicators"
    className="carousel slide"
    data-ride="carousel"
  >
    <ol className="carousel-indicators">
      <li
        data-target="#carouselExampleIndicators"
        data-slide-to="0"
        className="active"
      />
      <li data-target="#carouselExampleIndicators" data-slide-to="1" />
    </ol>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          className="d-block"
          src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png"
          alt="First slide"
          width="100"
          height="100"
        />
      </div>
      <div className="carousel-item">
        <img
          className="d-block"
          src="https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png"
          alt="Second slide"
          width="100"
          height="100"
        />
      </div>
    </div>
    <a
      className="carousel-control-prev"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a
      className="carousel-control-next"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </div>
);

export default Recommendations;
