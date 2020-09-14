import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIssue } from '../../api/githubAPI';
import { RootState } from '../../store/root-reducer';
import { clearComments, fetchCommentsAction } from '../../store/slices/comments.slice';
import { clearCurrentIssue, setCurrentIssue } from '../../store/slices/github-issues.slice';
import { clearSearchValues } from '../../store/slices/search.slice';

interface Props {}

export const IssueSinglePage: React.FC<Props> = () => {
	const currentIssue = useSelector<RootState, RootState['issues']['currentIssue']>((state) => state.issues.currentIssue);
	const comments = useSelector<RootState, RootState['comments']['data']>((state) => state.comments.data);
	const commentsLoading = useSelector<RootState, RootState['comments']['loading']>((state) => state.comments.loading);
	const { values: formValues } = useSelector<RootState, RootState['search']>((state) => state.search);

	const pageParams: { id: string } = useParams();
	const dispatch = useDispatch();

	const getIssueByNumber = async () => {
		const res = await getIssue(formValues.org, formValues.repo, +pageParams['id']);
		dispatch(setCurrentIssue(res));
		dispatch(fetchCommentsAction(res.comments_url));
	};

	useEffect(() => {
		if (!currentIssue) {
			getIssueByNumber();
		}

		return () => {
			dispatch(clearCurrentIssue());
			dispatch(clearComments());
			dispatch(clearSearchValues());
		};
	}, []);

	const commentsSection = (
		<section>
			<h2>Comments: </h2>
			{comments.map((comment) => (
				<p key={comment.id}>{comment.body}</p>
			))}
		</section>
	);

	return (
		<article>
			{!currentIssue && <h2>Loading...</h2>}
			{currentIssue && (
				<h2>
					Issue Title: <br />
					{currentIssue.title}
				</h2>
			)}
			{commentsLoading && <h2>Loading Comments...</h2>}
			{comments.length > 0 && commentsSection}
		</article>
	);
};
