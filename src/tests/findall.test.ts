import 'dotenv/config'
import gitorm from '../index'
import * as assert from 'assert'

describe('=> GET Request', () => {
	let Gitorm: gitorm

	before(async () => {
		Gitorm = new gitorm({
			token: process.env.GIT_TOKEN,
			repository: process.env.GIT_REPOSITORY,
			owner: process.env.GIT_OWNER
		})

		await Gitorm.connect()
	})

	it('Should get all files', async () => {
		const files = await Gitorm.findAll({ path: 'src/' })
		assert.notStrictEqual(files, false)
	})
})
