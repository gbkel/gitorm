import Api from './modules/Api'

export default class Gitorm {
	token: string
	repository: string
	status: any
	owner: string

	constructor({ token, repository, owner }: Config) {
		this.token = token
		this.repository = repository
		this.owner = owner
	}

	async connect() {
		try {
			const status = await Api.get(`/repos/${this.owner}/${this.repository}`, {
				headers: {
					Authorization: 'token ' + this.token
				}
			})
			this.status =
				status && status.data && status.data.git_url
					? status.data.git_url
					: false
		} catch (error) {
			this.status = false
			console.error(error)
		}
	}
}

interface Config {
	token: string
	repository: string
	owner: string
}
