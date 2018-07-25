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
