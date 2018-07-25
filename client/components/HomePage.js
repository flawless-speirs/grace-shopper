import React, { Component } from 'react';
import Creator from './Creator';

// export default class HomePage extends Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   render() {

const creators = [
  {
    id: 1,
    name: 'Andrew Miller',
    title: 'Fullstack Software Engineer',
    description: 'cool guy',
    imageUrl: '',
    urlArray: []
  },
  {
    id: 2,
    name: 'Rick Terry',
    title: 'Engineer',
    description: 'also cool',
    imageUrl: '',
    urlArray: []
  },
  {
    id: 3,
    name: 'Michael Lin',
    title: 'Engin33r',
    description: 'very cool',
    imageUrl: '',
    urlArray: []
  },
  {
    id: 4,
    name: 'Kevin Ho',
    title: 'Engin00r',
    description: 'coolest of all',
    imageUrl: '',
    urlArray: []
  }
]

export const HomePage = (props) => {
  console.log('inside homepage render');

  return (
    <div>
      <h1>Hello!!!!</h1>
      {
        creators.map(creator => <div key={creator.id}><Creator creator={creator} /></div>)
      }

    </div>
  )
}

//     return (
//       <div>
//         <h1>Hello!!!!</h1>
//         <Creator user={{ name: 'Rick' }} />
//       </div>
//     );
//   }
// }
