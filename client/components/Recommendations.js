import React from 'react';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */

// WHAT IF THERE ARE NO SIMILAR TAGS?

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
      {props.recommendedProducts.map((recommendedProduct, index) => {
        if (index === 0) {
          return (
            <div
              key={props.recommendedProduct.id}
              className="carousel-item active"
            >
              <Link to={'/products/' + props.recommendedProduct.id}>
                <img
                  className="d-block"
                  src={props.recommendedProduct.imageUrl}
                  alt={'Image for ' + recommendedProduct.name}
                  width="150"
                  height="150"
                />
              </Link>
            </div>
          );
        }
        return (
          <div key={props.recommendedProduct.id} className="carousel-item">
            <Link to={'/products/' + props.recommendedProduct.id}>
              <img
                className="d-block"
                src={props.recommendedProduct.imageUrl}
                alt={'Image for ' + recommendedProduct.name}
                width="150"
                height="150"
              />
            </Link>
          </div>
        );
      })}
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
