import { AppThunk } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, getComments } from '../../api/githubAPI';

export interface CommentState {
	data: Comment[];
	loading: boolean;
	error: string;
}

const initialState: CommentState = {
	data: [],
	loading: false,
	error: ''
}

const commentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		getCommentsStart(state) {
			state.loading = true;
		},
		getCommentSuccess(state, action: PayloadAction<Comment[]>) {
			state.data = action.payload;
			state.loading = false;
			state.error = '';
		},
		getCommentFailed(state, action: PayloadAction<string>) {
			state.data = [];
			state.loading = false;
			state.error = action.payload;
		},
		clearComments(state) {
			state.data = [];
			state.loading = false;
			state.error = '';
		}
	}
});

export default commentSlice.reducer;

export const { getCommentsStart, getCommentSuccess, getCommentFailed, clearComments } = commentSlice.actions;

export const fetchCommentsAction = (url: string): AppThunk => async dispatch => {
	dispatch(getCommentsStart());
	try {
		const res = await getComments(url);
		dispatch(getCommentSuccess(res));
	} catch (error) {
		dispatch(getCommentFailed('Fails Load Comments'));
	}
}
