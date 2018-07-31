import React from 'react';

/**
 * COMPONENT
 */

const Recommendations = props => {
  return !props.recommendedProducts.length ? (
    <div>None.</div>
  ) : (
    <div className="row">
      <div id="recommended" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          {props.recommendedProducts.map((recommendedProduct, index) => {
            if (index === 0) {
              return (
                <li
                  key={recommendedProduct.id}
                  data-target="#recommended"
                  data-slide-to={index}
                  className="active"
                />
              );
            }
            return (
              <li
                key={recommendedProduct.id}
                data-target="#recommended"
                data-slide-to={index}
              />
            );
          })}
        </ol>
        <div className="carousel-inner">
          {props.recommendedProducts.map((recommendedProduct, index) => {
            if (index === 0) {
              return (
                <div
                  key={recommendedProduct.id}
                  className="carousel-item active"
                  onClick={() => props.clickCarousel(recommendedProduct.id)}
                >
                  <img
                    className="d-block"
                    src={recommendedProduct.imageUrl}
                    alt={'Image for ' + recommendedProduct.name}
                    width="200"
                    height="200"
                  />
                </div>
              );
            }
            return (
              <div
                key={recommendedProduct.id}
                className="carousel-item"
                onClick={() => props.clickCarousel(recommendedProduct.id)}
              >
                <img
                  className="d-block"
                  src={recommendedProduct.imageUrl}
                  alt={'Image for ' + recommendedProduct.name}
                  width="200"
                  height="200"
                />
              </div>
            );
          })}
        </div>
        <a
          className="carousel-control-prev"
          href="#recommended"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#recommended"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Recommendations;
