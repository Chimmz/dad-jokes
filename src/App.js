import React from 'react';
import './App.css';
import JokesList from './Jokes-List'

class App extends React.Component{
	render(){
		return (
			<div className="App">
				<JokesList/>
			</div>
		)
	}
}
export default App;
