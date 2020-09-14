import { getIssues, Issue } from './../../api/githubAPI';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { GitRepoModel } from '../../components/repo-search-form/repo-search-form';

interface GithubIssuesResponse {
	issues: Issue[];
	pageCount: number;
}

interface GithubIssuesState extends GithubIssuesResponse {
	loading: boolean;
	errMsg: string;
	currentIssue: Issue | null;
}

const initialState: GithubIssuesState = {
	issues: [],
	pageCount: 0,
	loading: false,
	errMsg: '',
	currentIssue: null
}

const github_issues = createSlice({
	name: 'github_issues',
	initialState,
	reducers: {
		getIssuesStart(state) {
			state.loading = true;
		},
		getIssuesSuccess(state, { payload }: PayloadAction<GithubIssuesResponse>) {
			state.issues = payload.issues;
			state.pageCount = payload.pageCount;
			state.loading = false;
			state.errMsg = '';
		},
		getIssuesFailed(state, { payload }: PayloadAction<string>) {
			state.loading = false;
			state.errMsg = payload;
		},
		setCurrentIssue(state, { payload }: PayloadAction<Issue>) {
			state.currentIssue = payload;
		},
		clearCurrentIssue(state) {
			state.currentIssue = null;
		}
	}
});

export default github_issues.reducer;

export const { getIssuesStart, getIssuesSuccess, getIssuesFailed, setCurrentIssue, clearCurrentIssue } = github_issues.actions;

export const fetchIssuesAction = ({ org, repo, page = 1 }: GitRepoModel): AppThunk => async dispatch => {
	dispatch(getIssuesStart());
	try {
		const res: GithubIssuesResponse = await getIssues(org, repo, +page);
		dispatch(getIssuesSuccess(res));
	} catch (error) {
		dispatch(getIssuesFailed('Error Fetch Issues'));
	}
}