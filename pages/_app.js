import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import "bootstrap/dist/css/bootstrap.min.css";

import { store } from "../store";
import "../styles/globals.css";
import css from "../styles/home.module.css";

function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <div className={css.AppContainer}>
                <div className={css.appWrapper}>
                    <header>
                        <h1 className={css.AppHeading}>
                            <span role="img" aria-label="face emoji">
                                😄
                            </span>
                            Joke app
                        </h1>
                    </header>
                    <Component {...pageProps} />
                </div>
            </div>
        </Provider>
    );
}

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(App);
