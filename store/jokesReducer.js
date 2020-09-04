import axios from "axios";
import { takeEvery, put, call } from "redux-saga/effects";

export const types = {
    FETCH_JOKES_REQ: "joke-app/reducer/FETCH_JOKES_REQ",
    FETCH_JOKES_OK: "joke-app/reducer/FETCH_JOKES_OK",
    FETCH_JOKES_ERR: "joke-app/reducer/FETCH_JOKES_ERR",
    FETCH_SELECTED_JOKE_REQ: "joke-app/reducer/FETCH_SELECTED_JOKE_REQ",
    START_LOADING: "joke-app/reducer/START_LOADING",
    STOP_LOADING: "joke-app/reducer/STOP_LOADING",
    FILTER_JOKES: "joke-app/reducer/FILTER_JOKES",
};

export const innitialState = {
    jokes: [],
    filter: "All",
    isLoading: false,
    error: null,
};

export default function reducer(state = innitialState, { type, payload }) {
    switch (type) {
        case types.FETCH_JOKES_OK:
            return { ...state, jokes: [...state.jokes, ...payload] };

        case types.FILTER_JOKES:
            return { ...state, filter: payload };

        case types.START_LOADING:
            return { ...state, isLoading: true };

        case types.STOP_LOADING:
            return { ...state, isLoading: false };

        case types.FETCH_JOKES_ERR:
            return { ...state, error: payload };

        default:
            return state;
    }
}

export const fetchJokesRequested = (params) => ({
    type: types.FETCH_JOKES_REQ,
    payload: params,
});

export const fetchSelectedJokeRequested = (params) => ({
    type: types.FETCH_SELECTED_JOKE_REQ,
    payload: params,
});

export const fetchJokesSuccess = (data) => ({
    type: types.FETCH_JOKES_OK,
    payload: data,
});

export const fetchJokesError = (data) => ({
    type: types.FETCH_JOKES_ERR,
    payload: data,
});

export const startLoading = () => ({
    type: types.START_LOADING,
});

export const stopLoading = () => ({
    type: types.STOP_LOADING,
});

export const filterJokes = (filter) => ({
    type: types.FILTER_JOKES,
    payload: filter,
});

// SAGA
export function* sagaWatcher() {
    yield takeEvery(types.FETCH_JOKES_REQ, JokesSagaWorker);
    yield takeEvery(types.FETCH_SELECTED_JOKE_REQ, SelectedJokeSagaWorker);
}

function* JokesSagaWorker({ payload }) {
    try {
        yield put(startLoading());
        const data = yield call(fetchJokes, payload);
        yield put(fetchJokesSuccess(data));
        yield put(stopLoading());
    } catch (err) {
        console.warn(err);
        yield put(fetchJokesError(err));
        yield put(stopLoading());
    }
}

function* SelectedJokeSagaWorker({ payload }) {
    try {
        yield put(startLoading());
        const data = yield call(fetchSelectedJoke, payload);
        yield put(fetchJokesSuccess([data]));
        yield put(stopLoading());
    } catch (err) {
        console.warn(err);
        yield put(fetchJokesError(err));
        yield put(stopLoading());
    }
}

async function fetchJokes(params) {
    const response = await axios.get(
        `http://api.icndb.com/jokes/random/${params}?exclude=[]`
    );
    return await response.data.value;
}

async function fetchSelectedJoke(params) {
    const response = await axios.get(`http://api.icndb.com/jokes/${params}`);
    return await response.data.value;
}
