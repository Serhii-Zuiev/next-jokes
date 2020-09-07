import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import {
    Eyeglasses,
    PatchExclamation,
    EmojiSmile,
} from "react-bootstrap-icons";

import css from "../styles/jokesList.module.css";

const defineJokeCategory = (category) => {
    let Icon;
    let iconTitle;
    switch (category) {
        case "nerdy":
            Icon = Eyeglasses;
            iconTitle = "Nerdy";
            break;
        case "explicit":
            Icon = PatchExclamation;
            iconTitle = "Explicit";
            break;
        default:
            Icon = EmojiSmile;
            iconTitle = "Funny";
    }
    return { Icon, iconTitle };
};

const JokeItem = ({ text, categories, jokeID }) => {
    const category = defineJokeCategory(categories[0]);

    return (
        <div className={css.CardContainer}>
            <Card style={{ height: "100%" }}>
                <Card.Body className={css.cardBody}>
                    <Card.Text style={{ marginBottom: "0" }}>
                        {text.length > 60 ? `${text.slice(0, 60)}...` : text}
                    </Card.Text>
                    <div className={css.JokeCategoryWrapper}>
                        <Link href="/joke/[id]" as={`/joke/${jokeID}`}>
                            <Button variant="outline-primary">Read joke</Button>
                        </Link>

                        <div
                            className={css.JokeCategory}
                            title={category.iconTitle}
                        >
                            <category.Icon color="#777" size={30} />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default JokeItem;

JokeItem.propTypes = {
    text: PropTypes.string,
    categories: PropTypes.array,
    jokeID: PropTypes.number,
};

JokeItem.defaultProps = {
    text: "",
    categories: [],
    jokeID: "",
};

// to={{
//     pathname: `/joke/${jokeID}`,
//     state: { id: jokeID, from: "/" },
// }}
