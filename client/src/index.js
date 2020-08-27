import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql' 
})


ReactDOM.render(
    <ApolloProvider client={client}>
    <BrowserRouter>
	<App />
	</BrowserRouter>
    </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
