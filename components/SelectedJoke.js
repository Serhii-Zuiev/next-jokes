import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";

import { fetchSelectedJokeRequested } from "../store/jokesReducer";
import css from "../styles/selectedJoke.module.css";

const SelectedJoke = () => {
    const router = useRouter();
    const id = router.query.id;
    const dispatch = useDispatch();
    const allJokes = useSelector((state) => state.jokes);
    const jokeToRender = allJokes.find((joke) => joke.id?.toString() === id);

    useEffect(() => {
        if (!jokeToRender && id) {
            dispatch(fetchSelectedJokeRequested(id));
        }
    }, [id]);

    return (
        <>
            <div className={css.GoBackLinkContainer}>
                <Link href="/">
                    <Button variant="primary" type="button">
                        <ArrowLeft color="#fff" size={26} />
                        Go back
                    </Button>
                </Link>
            </div>

            <div className={css.SelectedJoke}>{jokeToRender?.joke}</div>
        </>
    );
};

export default SelectedJoke;

SelectedJoke.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
};
