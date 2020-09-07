import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

import css from "../styles/jokesList.module.css";
import JokeItem from "./JokeItem";

const JokesList = ({ allJokes }) => {
    return (
        <ul className={css.JokesList}>
            {allJokes.map((joke) => (
                <li key={shortid.generate()} className={css.jokesListItem}>
                    <JokeItem
                        text={joke.joke}
                        categories={joke.categories}
                        jokeID={joke.id}
                    />
                </li>
            ))}
        </ul>
    );
};

export default JokesList;

JokesList.propTypes = {
    allJokes: PropTypes.arrayOf(PropTypes.object),
};

JokesList.defaultProps = {
    allJokes: [],
};
