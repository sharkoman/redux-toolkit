import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { fetchIssuesAction } from '../../store/slices/github-issues.slice';
import { setSearchValues } from '../../store/slices/search.slice';
import IssueBody from '../issue/issue.component';
import RepoSearchForm, { GitRepoModel } from '../repo-search-form/repo-search-form';

interface Props {}

const GithubPage: React.FC<Props> = () => {
	const issues = useSelector<RootState, RootState['issues']['issues']>((state) => state.issues.issues);
	const isIssuesLoading = useSelector<RootState, RootState['issues']['loading']>((state) => state.issues.loading);
	const dispatch = useDispatch();

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>, values: GitRepoModel) => {
		e.preventDefault();
		dispatch(setSearchValues({ ...values, page: +values.page }));
		dispatch(fetchIssuesAction({ ...values, page: +values.page }));
	};

	return (
		<div>
			<RepoSearchForm submit={onSubmitHandler} />
			{isIssuesLoading && <h2>Loading</h2>}
			{issues.map((issue) => (
				<IssueBody key={issue.id} issue={issue} />
			))}
		</div>
	);
};

export default GithubPage;
