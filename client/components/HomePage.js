import React from 'react';
import Creator from './Creator';

const creators = [
  {
    id: 1,
    name: 'Andrew Miller',
    title: 'Fullstack Software Engineer',
    description: 'Math, Amherst.',
    imagePath: './Andrew.jpg',
    urlArray: [],
  },
  {
    id: 2,
    name: 'Rick Terry',
    title: 'Fullstack Software Engineer',
    description: 'Computer Science, Amherst, ⚾.',
    imagePath: './Rick.jpg',
    urlArray: [],
  },
  {
    id: 3,
    name: 'Michael Lin',
    title: 'Fullstack Software Engineer',
    description: 'Math, Binghamton.',
    imagePath: './Michael.jpg',
    urlArray: [],
  },
  {
    id: 4,
    name: 'Kevin Ho',
    title: 'Fullstack Software Engineer',
    description: 'Computer Science, Fordham, 🏀.',
    imagePath: './Kevin.jpg',
    urlArray: [],
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
