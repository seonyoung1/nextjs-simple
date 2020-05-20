import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import Head from 'next/head';
import Router from "next/router";
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import NProgress from 'nprogress';
import reducer from '../store/reducers';
import rootSaga from '../store/sagas';
import MyLayout from '../components/common/MyLayout';
import '../assets/styles/common.scss';
import '../assets/css/nprogress.css';

Router.events.on('routeChangeStart', () => {
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
    NProgress.done();
});
Router.events.on('routeChangeError', () => {
    NProgress.done();
});

const MyApp = ({ Component, pageProps, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>Next.js</title>
            </Head>
            <MyLayout>
                <Component {...pageProps} />
            </MyLayout>
        </Provider>
    );
};

MyApp.getInitialProps = async context => {
    const { ctx, Component } = context;
    let pageProps = {};
    if( Component.getInitialProps ){
        pageProps = await Component.getInitialProps(ctx);
    }
    return {
        pageProps
    }
}

const configureStore = ( initialState, options ) => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middleware)) : composeWithDevTools(applyMiddleware(...middleware));
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

export default withRedux(configureStore)(withReduxSaga(MyApp));
