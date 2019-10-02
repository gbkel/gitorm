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

	it('Should get a file', async () => {
		const file = await Gitorm.find({ path: 'src/' + 'index.txt' })
		assert.notStrictEqual(file, false)
	})

	it('Should fail to get file with incorrect [path]', async () => {
		const file = await Gitorm.find({ path: 'src/123/' + 'index.txt' })
		assert.strictEqual(file, false)
	})

	it('Should fail to get file with incorrect [name]', async () => {
		const file = await Gitorm.find({ path: 'src/' + 'index.png' })
		assert.strictEqual(file, false)
	})
})
