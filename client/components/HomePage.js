import React from 'react';
import Creator from './Creator';

const creators = [
  {
    id: 1,
    name: 'Andrew Miller',
    title: 'Fullstack Software Engineer',
    description: 'cool guy',
    imageUrl: 'https://avatars3.githubusercontent.com/u/31660392?s=400&v=4',
    urlArray: [],
  },
  {
    id: 2,
    name: 'Rick Terry',
    title: 'Fullstack Software Engineer',
    description: 'also cool',
    imageUrl:
      'http://athletics.amherst.edu/sports/bsb/2012-13/photos/0001/Terry.jpg?max_width=300',
    urlArray: [],
  },
  {
    id: 3,
    name: 'Michael Lin',
    title: 'Fullstack Software Engineer',
    description: 'very cool',
    imageUrl:
      'https://media.licdn.com/dms/image/C4D03AQGK98hiiIsXZQ/profile-displayphoto-shrink_800_800/0?e=1538006400&v=beta&t=y7wRzUurB4b9G7PY4pGzMyx74pfpWi6EaXOuMmvaTxQ',
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
