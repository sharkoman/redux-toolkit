import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Issue } from '../../api/githubAPI';
import { fetchCommentsAction } from '../../store/slices/comments.slice';
import { setCurrentIssue } from '../../store/slices/github-issues.slice';

interface Props {
	issue: Issue;
}

const IssueBody: React.FC<Props> = ({ issue }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const onIssueClick = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		dispatch(setCurrentIssue(issue));
		dispatch(fetchCommentsAction(issue.comments_url));
		history.push(`/issues/${issue.number}`);
	};

	return (
		<div>
			<h3>
				<a href='#/' onClick={onIssueClick}>
					{issue.title} [comments: {issue.comments}]
				</a>
			</h3>
		</div>
	);
};

export default IssueBody;
