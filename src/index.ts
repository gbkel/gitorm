import Api from './modules/Api'
import { Config, Find, File, Create, Update, Where } from './definitions'

export default class Gitorm {
	token: string
	repository: string
	status: any
	owner: string

	constructor({ token, repository, owner, log = true }: Config) {
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

	async find({ path }: Find) {
		try {
			const response = await Api.get(
				`/repos/${this.owner}/${this.repository}/contents/${path}`,
				{
					headers: {
						Authorization: 'token ' + this.token
					}
				}
			)
			if (response.status !== 200) return false

			const file: File = response.data

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

	async create({ data, path, message = 'Create', branch = 'master' }: Create) {
		try {
			const response = await Api.put(
				`/repos/${this.owner}/${this.repository}/contents/${path}`,
				{
					message,
					content: Buffer.from(data).toString('base64'),
					branch
				},
				{
					headers: {
						Authorization: 'token ' + this.token
					}
				}
			)

			if (
				response.status !== 200 &&
				response.status !== 201 &&
				response.status !== 422
			)
				return false

			const file: File = response.data.content

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

	async update({ data, message = 'Update' }: Update, where: Find) {
		try {
			const fileExists: boolean | File = await this.find({ path: where.path })

			if (!fileExists) return false

			const response = await Api.put(
				`/repos/${this.owner}/${this.repository}/contents/${fileExists.path}`,
				{
					message,
					content: Buffer.from(data).toString('base64'),
					sha: fileExists.sha
				},
				{
					headers: {
						Authorization: 'token ' + this.token
					}
				}
			)

			if (response.status !== 200) return false

			const file: File = response.data.content

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
