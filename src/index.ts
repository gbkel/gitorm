import Api from './modules/Api'

export default class Gitorm {
	token: string
	repository: string
	status: any
	owner: string

	constructor(options: Options) {
		this.token = options.token
		this.repository = options.repository
		this.owner = options.owner
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

interface Options {
	token: string
	repository: string
	owner: string
}
