import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import RSSA from './apps/rssa';
// import RSSABaseline from './apps/rssaBaseline';
// import PrefViz from './apps/prefviz';
import ERS from './apps/ers';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import SurveyPortal from './app';

// ReactDOM.render(<RSSA />, document.getElementById('root'));
// ReactDOM.render(<RSSABaseline />, document.getElementById('root'));
// ReactDOM.render(<PrefViz />, document.getElementById('root'));
// ReactDOM.render(<ERS />, document.getElementById('root'));
ReactDOM.render(<SurveyPortal />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
