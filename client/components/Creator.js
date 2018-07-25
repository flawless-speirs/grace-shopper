import React from 'react';

export default (Creator = props => {
  const name = props.user.name;
  const title = props.user.title;
  const description = props.user.description;
  const imageUrl = props.user.imageUrl;
  const urlArray = props.user.urlArray;

  return (
    <div>
      <div className="profile">
        <div className="headshot">
          <img src={imageUrl} />
        </div>
        <div className="profileRight">
          <div className="profileName">{name}</div>
          <div className="profileTitle">{title}</div>
          <div className="profileDescription">{description}</div>
          <div className="profileLinks">
            {urlArray.map(url => {
              return (
                <div className="profileLink">
                  <img src={url.image} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
