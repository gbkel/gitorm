import gitorm from 'index'

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
	({ token, repository, owner, log }: Config)
	connect: () => any
	find: ({ path }: Find) => Promise<any>
	create: ({ data, path, message, branch }: Create) => Promise<any>
	update: ({ data, path, message }: Update) => Promise<any>
	delete: ({ path }: Delete) => Promise<any>
}

declare const Gitorm: GitormInterface

export default Gitorm
