import React from 'react';
import JokesList from './Jokes-List';
import './App.css';

class App extends React.Component {
   render() {
      return (
         <div className='App'>
            <JokesList />
         </div>
      );
   }
}
export default App;
