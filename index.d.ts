import gitorm from './src/index'

export interface Config {
	token: string
	repository: string
	owner: string
	log?: boolean
}

export interface Find {
	path: string
}

export interface Create {
	data: any
	path: string
	message?: string
	branch?: string
}

export interface Update {
	data: any
	path: string
	message?: any
}

export interface Delete {
	path: string
	message?: string
}

export interface File {
	name: string
	path: string
	sha: string
	size: string
	url: string
	html_url: string
	git_url: string
	download_url: string
	type: string
}

export interface GitormInterface extends gitorm {
	new ({ token, repository, owner, log }: Config)
	connect: () => any
	find({ path }: Find): Promise<File | boolean>
	create({ data, path, message, branch }: Create): Promise<File | boolean>
	update({ data, path, message }: Update): Promise<File | boolean>
	delete({ path }: Delete): Promise<boolean>
	status: boolean
}

declare const Gitorm: GitormInterface

export default Gitorm
