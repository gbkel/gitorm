import Api from './modules/Api'
import { Config, Options, Find, File } from './definitions'

export default class Gitorm {
	token: string
	repository: string
	status: any
	owner: string

	constructor(
		{ token, repository, owner }: Config,
		{ log }: Options = { log: true }
	) {
		this.token = token
		this.repository = repository
		this.owner = owner

		if (!log) {
			console.error = () => {
				return
			}
		}
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

	async find({ name, path }: Find) {
		try {
			const response = await Api.get(
				`/repos/${this.owner}/${this.repository}/contents${path}`,
				{
					headers: {
						Authorization: 'token ' + this.token
					}
				}
			)
			if (response.status !== 200) return false

			const [file] = response.data.filter((file: File) => file.name === name)

			if (!file) return false

			return {
				name: file.name,
				path: file.path,
				sha: file.sha,
				size: file.size,
				url: file.url,
				html_url: file.html_url,
				git_url: file.git_url,
				download_url: file.download_url,
				type: file.type
			}
		} catch (error) {
			console.error(error)
			return false
		}
	}
}
