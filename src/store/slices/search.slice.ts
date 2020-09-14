import { GitRepoModel } from './../../components/repo-search-form/repo-search-form';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
	values: GitRepoModel;
}
const initialState: SearchState = {
	values: {
		org: '',
		repo: '',
		page: 1
	}
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchValues(state, action: PayloadAction<GitRepoModel>) {
			state.values = action.payload;
		},
		clearSearchValues(state) {
			state.values = {
				org: '',
				repo: '',
				page: 1
			}
		}
	}
});

export default searchSlice.reducer;

export const { setSearchValues, clearSearchValues } = searchSlice.actions;
