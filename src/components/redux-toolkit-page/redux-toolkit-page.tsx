import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { fetchTodos } from '../../store/slices/todo.slice';

interface Props {}

const ReduxToolkitPage: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const todos = useSelector<RootState, RootState['todos']>((state) => state.todos);

	const loading = <h2>Loading...</h2>;

	const list = (
		<ul>
			{todos.data.map((todo, i) => (
				<li key={i}>{todo.title}</li>
			))}
		</ul>
	);
	return (
		<div>
			<button onClick={() => dispatch(fetchTodos())}>fetch</button>
			{todos.loading && loading}
			<div>{todos.data && list}</div>
		</div>
	);
};

export default ReduxToolkitPage;
