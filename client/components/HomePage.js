import React from 'react';
import Creator from './Creator';

const creators = [
  {
    id: 1,
    name: 'Andrew Miller',
    title: 'Fullstack Software Engineer',
    description: 'Math, Amherst	⚽',
    imagePath: './Andrew.jpg'	,
    urlArray: ['https://www.linkedin.com/in/admiller9/','https://github.com/andrwmillr'],
  },
  {
    id: 2,
    name: 'Rick Terry',
    title: 'Fullstack Software Engineer',
    description: 'Computer Science, Amherst ⚾',
    imagePath: './Rick.jpg',
    urlArray: ['https://www.linkedin.com/in/rick-terry-64aa8b17/','https://github.com/fdterr'],
  },
  {
    id: 3,
    name: 'Michael Lin',
    title: 'Fullstack Software Engineer',
    description: 'Math, Binghamton 🎾',
    imagePath: './Michael.jpg',
    urlArray: ['https://www.linkedin.com/in/michaellindev/','https://github.com/mmichaellin'],
  },
  {
    id: 4,
    name: 'Kevin Ho',
    title: 'Fullstack Software Engineer',
    description: 'Computer Science, Fordham 🏀',
    imagePath: './Kevin.jpg',
    urlArray: ['https://www.linkedin.com/in/kevinho6/','https://github.com/kevinho6'],
  },
];

export const HomePage = () => {
  return (
    <div className="container-fluid text-center profile-bg">
      <h1 className="cool-header">Wubba Lubba Dub Dub!</h1>
      <div className="row">
        {creators.map(creator => (
          <div className="col-6" key={creator.id}>
            <Creator creator={creator} />
          </div>
        ))}
      </div>
    </div>
  );
};
