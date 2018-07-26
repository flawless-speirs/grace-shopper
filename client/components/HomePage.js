import React, { Component } from 'react';
import Creator from './Creator';

const creators = [
  {
    id: 1,
    name: 'Andrew Miller',
    title: 'Fullstack Software Engineer',
    description: 'cool guy',
    imageUrl:
      'https://static1.squarespace.com/static/58daab3d1b10e3e2a2358f0e/59e001f51f318d21e6e6c18c/59e001f8f14aa1fa521a9c75/1518156986151/AAEAAQAAAAAAAAtCAAAAJDgzMDIxZjAxLTczNGItNDQ5YS1iMTQ1LWVjN2M3OWJiNjI3ZQ.jpg',
    urlArray: [],
  },
  {
    id: 2,
    name: 'Rick Terry',
    title: 'Fullstack Software Engineer',
    description: 'also cool',
    imageUrl:
      'https://static1.squarespace.com/static/58daab3d1b10e3e2a2358f0e/59e001f51f318d21e6e6c18c/59e001f8f14aa1fa521a9c75/1518156986151/AAEAAQAAAAAAAAtCAAAAJDgzMDIxZjAxLTczNGItNDQ5YS1iMTQ1LWVjN2M3OWJiNjI3ZQ.jpg',
    urlArray: [],
  },
  {
    id: 3,
    name: 'Michael Lin',
    title: 'Fullstack Software Engineer',
    description: 'very cool',
    imageUrl:
      'https://static1.squarespace.com/static/58daab3d1b10e3e2a2358f0e/59e001f51f318d21e6e6c18c/59e001f8f14aa1fa521a9c75/1518156986151/AAEAAQAAAAAAAAtCAAAAJDgzMDIxZjAxLTczNGItNDQ5YS1iMTQ1LWVjN2M3OWJiNjI3ZQ.jpg',
    urlArray: [],
  },
  {
    id: 4,
    name: 'Kevin Ho',
    title: 'Fullstack Software Engineer',
    description: 'coolest of all',
    imageUrl:
      'https://static1.squarespace.com/static/58daab3d1b10e3e2a2358f0e/59e001f51f318d21e6e6c18c/59e001f8f14aa1fa521a9c75/1518156986151/AAEAAQAAAAAAAAtCAAAAJDgzMDIxZjAxLTczNGItNDQ5YS1iMTQ1LWVjN2M3OWJiNjI3ZQ.jpg',
    urlArray: [],
  },
];

export const HomePage = props => {
  return (
    <div>
      <h1>Wubba Lubba Dub Dub!</h1>
      {creators.map(creator => (
        <div key={creator.id}>
          <Creator creator={creator} />
        </div>
      ))}
    </div>
  );
};
