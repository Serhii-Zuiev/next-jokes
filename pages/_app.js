import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import "bootstrap/dist/css/bootstrap.min.css";

import { store } from "../store";
import "../styles/globals.css";

function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(App);
