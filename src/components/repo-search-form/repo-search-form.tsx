import React, { useState } from 'react';

export interface GitRepoModel {
	org: string;
	repo: string;
	page: string | number;
}

interface Props {
	submit(e: React.FormEvent<HTMLFormElement>, values: GitRepoModel): void;
}

const RepoSearchForm: React.FC<Props> = ({ submit }: Props) => {
	const [formValue, setFormValue] = useState<GitRepoModel>({ org: '', repo: '', page: '1' });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	return (
		<form onSubmit={(e) => submit(e, formValue)}>
			<label>
				Org:
				<input type='text' id='org' name='org' onChange={handleChange} value={formValue.org} />
			</label>
			<label>
				Repo Name:
				<input type='text' id='repo' name='repo' onChange={handleChange} value={formValue.repo} />
			</label>
			<label>
				Page:
				<input type='number' id='pageNum' name='page' onChange={handleChange} value={formValue.page} />
			</label>
			<button type='submit'>Load Issues</button>
		</form>
	);
};

export default RepoSearchForm;
