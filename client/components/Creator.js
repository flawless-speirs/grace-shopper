import React from 'react';

export default function Creator(props) {
  const name = props.creator.name;
  const title = props.creator.title;
  const description = props.creator.description;
  const imagePath = props.creator.imagePath;
  const urlArray = props.creator.urlArray;
  return (
    <div>
      <div className="profile profile-card">
        <div className="headshot">
          <img className="profile-picture" src={imagePath} />
        </div>
        <div className="profileRight">
          <div className="profileName">{name}</div>
          <div className="profileTitle">{title}</div>
          <div className="profileDescription">{description}</div>
          <div className="profileLinks">
            {/* {urlArray.map(url => {
              return (
                <div className="profileLink">
                  <img src={url.image} />
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
