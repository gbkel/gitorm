export interface Config {
	token: string
	repository: string
	owner: string
}

export interface ConfigOptions {
	log: boolean
}

export interface Find {
	name: string
	path: string
}

export interface Create {
	name: string
	data: any
	path: string
}

export interface CreateOptions {
	message: string
	branch: string
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
