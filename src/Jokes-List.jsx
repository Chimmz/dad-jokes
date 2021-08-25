import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css';
import Joke from './Joke';
import { v4 as uuidv4 } from 'uuid';

class JokesList extends Component {
   static defaultProps = {
      numJokesToGet: 10
   };
   constructor(props) {
      super(props);
      this.state = {
         jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
         loading: false
      };
      this.seenJokes = new Set(this.state.jokes.map(j => j.text));
      console.log(this.seenJokes);

      this.handleVote = this.handleVote.bind(this);
      this.getJokes = this.getJokes.bind(this);
      this.handleClick = this.handleClick.bind(this);
   }

   async getJokes() {
      const url = 'https://icanhazdadjoke.com/';
      let jokesFromApi = [];
      try {
         while (jokesFromApi.length < this.props.numJokesToGet) {
            const response = await axios.get(url, {
               headers: { Accept: 'application/json' }
            });

            let newJoke = response.data.joke;
            if (!this.seenJokes.has(newJoke))
               jokesFromApi.push({ id: uuidv4(), text: newJoke, votes: 0 });
            else console.log('Duplicate!', newJoke);
         }
         this.setState(
            st => ({
               loading: false,
               jokes: [...st.jokes, ...jokesFromApi]
            }),
            () =>
               window.localStorage.setItem(
                  'jokes',
                  JSON.stringify(this.state.jokes)
               )
         );
      } catch (err) {
         setTimeout(() => {
            alert("We couldn't fetch your jokes. Please try again soon.");
         }, 3000);
         this.setState({ loading: true });
      }
   }
   componentDidMount() {
      !this.state.jokes.length && this.getJokes();
   }
   componentDidUpdate(prevProps, prevState) {
      window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
   }

   handleClick() {
      this.setState({ loading: true }, () => this.getJokes());
   }

   handleVote(id, change) {
      this.setState(st => {
         return {
            jokes: st.jokes.map(j =>
               j.id === id ? { ...j, votes: j.votes + change } : j
            )
         };
      });
   }

   render() {
      if (this.state.loading) {
         return (
            <div className='JokesList-spinner'>
               <i className='far fa-8x fa-laugh fa-spin'></i>
               <h1 className='Jokeslist-title'>Loading...</h1>
            </div>
         );
      }
      let alljokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
      return (
         <div className='JokesList'>
            <div className='JokesList-sidebar'>
               <h1 className='JokesList-title'>
                  <span>Dads</span> Jokes
               </h1>
               <button className='JokesList-getmore' onClick={this.handleClick}>
                  Fetch Jokes
               </button>
            </div>
            <div className='JokesList-jokes'>
               {alljokes.map(j => (
                  <Joke
                     key={j.id}
                     text={j.text}
                     votes={j.votes}
                     upvote={() => this.handleVote(j.id, 1)}
                     downvote={() => this.handleVote(j.id, -1)}
                  />
               ))}
            </div>
         </div>
      );
   }
}

export default JokesList;
