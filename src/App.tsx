import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './components/home-page/homePage';
import GithubPage from './components/github-issues-page/github-page';
import ReduxToolkitPage from './components/redux-toolkit-page/redux-toolkit-page';
import { IssueSinglePage } from './components/issue-single-page/issue-single-page';

function App() {
	return (
		<Router>
			<div className='App'>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/github'>Github Issues</Link>
					</li>
					<li>
						<Link to='/test'>JsonPlaceHolder</Link>
					</li>
				</ul>
			</div>
			<hr />
			<Switch>
				<Route path='/' exact>
					<HomePage />
				</Route>
				<Route path='/github'>
					<GithubPage />
				</Route>
				<Route path='/test'>
					<ReduxToolkitPage />
				</Route>
				<Route path="/issues/:id">
					<IssueSinglePage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
