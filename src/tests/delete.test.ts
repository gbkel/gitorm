import 'dotenv/config'
import gitorm from '../index'
import * as assert from 'assert'
import generateRandomNumber from '../utils/RandomNumber'

describe('=> DELETE Request', () => {
	let Gitorm: gitorm
	let fileName: string

	before(async () => {
		Gitorm = new gitorm({
			token: process.env.GIT_TOKEN,
			repository: process.env.GIT_REPOSITORY,
			owner: process.env.GIT_OWNER
		})

		await Gitorm.connect()
		fileName = `test${generateRandomNumber(0, 1e10)}`
	})

	it('Should delete a file', async () => {
		const data = JSON.stringify({ teste: 123 })
		const file: any = await Gitorm.create({
			data,
			path: 'src/' + `${fileName}.json`
		})

		const isFileDeleted = await Gitorm.delete({ path: file.path })

		assert.notStrictEqual(isFileDeleted, false)
	})
})
