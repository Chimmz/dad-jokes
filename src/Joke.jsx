import React from "react";
import "./Joke.css";

class Joke extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   getColor() {
      const votes = this.props.votes;

      if (votes >= 15) return "#4CAF50";
      else if (votes >= 12) return "#8BC34A";
      else if (votes >= 9) return "#CDDC39";
      else if (votes >= 6) return "#FFEB3B";
      else if (votes >= 3) return "#FFC107";
      else if (votes > 0) return "#FF9800";
      else return "#f44336";
   }

   getEmoji() {
      const votes = this.props.votes;
      if (votes >= 15) return "em em-rolling_on_the_floor_laughing";
      else if (votes >= 12) return "em em-laughing";
      else if (votes >= 9) return "em em-smiley";
      else if (votes >= 6) return "em em-slightly_smiling_face";
      else if (votes >= 3) return "em em-neutral_face";
      else if (votes > 0) return "em em-confused";
      else return "em em-angry";
   }

   render() {
      return (
         <div className="Joke">
            <div className="Joke-buttons">
               <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
               <span
                  className="Joke-votes"
                  style={{ border: `2px solid ${this.getColor()}` }}
               >
                  {this.props.votes}
               </span>
               <i
                  className="fas fa-arrow-down"
                  onClick={this.props.downvote}
               ></i>
            </div>
            <div className="Joke-text">{this.props.text}</div>
            <div className="Joke-smiley">
               <i className={this.getEmoji()}></i>
            </div>
         </div>
      );
   }
}

export default Joke;
