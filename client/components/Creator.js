import React from 'react';

export default function Creator(props) {
  const name = props.creator.name;
  const title = props.creator.title;
  const description = props.creator.description;
  const imageUrl = props.creator.imageUrl;
  const urlArray = props.creator.urlArray;
  console.log(props.creator)
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
