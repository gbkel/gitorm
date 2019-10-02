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

export interface Where {
	path: string
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
