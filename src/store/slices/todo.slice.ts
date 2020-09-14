import { getTodosAPI } from './../../api/todo.service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { TodoModel } from '../../interfaces/todo.interface';

interface TodoState {
	data: TodoModel[];
	errMsg: string;
	loading: boolean;
}
const initialState: TodoState = { data: [], loading: false, errMsg: '' };

export const TodoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		getDataStart(state) {
			state.loading = true;
		},
		getDataSuccess(state, action: PayloadAction<TodoModel[]>) {
			state.data = action.payload;
			state.loading = false;
		},
		getDataFailure(state, action: PayloadAction<string>) {
			state.errMsg = action.payload;
			state.loading = false;
		}
	}
});

export const {
	getDataStart,
	getDataSuccess,
	getDataFailure
} = TodoSlice.actions;

export default TodoSlice.reducer;

export const fetchTodos = (): AppThunk => async (dispatch) => {
	try {
		dispatch(getDataStart());
		const res = await getTodosAPI();
		const data = await res.json();
		dispatch(getDataSuccess(data))
	} catch (error) {
		dispatch(getDataFailure('error'))
	}
}
