import React,  {Suspense, lazy} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import {compose} from "redux";
import s from '../src/components/users/users.module.scss';
import Home from '../src/components/main/index.js';
import { Header } from './components/header';

const Users = lazy(() => import('../src/components/users'))
const Posts = lazy(() => import('../src/components/posts'))
const Register = lazy(() => import('../src/components/register'))

const App = () => {
    return (
        <div className=''>
            <div className=''>
                <Header />
                    <Switch>
						<Route exact path='/' render={() => <Home/>}/>
                        <Suspense fallback={<div>Load ...</div>}>
                            <Route path='/users' render={() => <Users/>}/>
							<Route path='/posts' render={() => <Posts/>}/>
                            <Route path='/register' render={() => <Register/>}/>
						</Suspense>
					</Switch>
				</div>
        </div>
    );
}

export default compose(
	withRouter)(App);
