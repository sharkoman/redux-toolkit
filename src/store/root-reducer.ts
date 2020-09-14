import { combineReducers } from '@reduxjs/toolkit'
import TodosReducer from './slices/todo.slice';
import GitIssuesReducer from './slices/github-issues.slice';
import CommentReducer from './slices/comments.slice';
import SearchReducer from './slices/search.slice';

const rootReducer = combineReducers({
	todos: TodosReducer,
	issues: GitIssuesReducer,
	comments: CommentReducer,
	search: SearchReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
