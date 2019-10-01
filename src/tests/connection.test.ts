import 'dotenv/config'
import gitorm from '../index'
import * as assert from 'assert'

describe('=> Repository connection', () => {
	it('Should connect to github repository', async () => {
		const Gitorm = new gitorm(
			{
				token: process.env.GIT_TOKEN,
				repository: process.env.GIT_REPOSITORY,
				owner: process.env.GIT_OWNER
			},
			{
				log: false
			}
		)

		await Gitorm.connect()
		assert.notStrictEqual(Gitorm.status, false)
	})

	it('Should fail to connect with incorrect [owner]', async () => {
		const Gitorm = new gitorm({
			token: process.env.GIT_TOKEN,
			repository: process.env.GIT_REPOSITORY,
			owner: 'process.env.GIT_OWNER'
		})

		await Gitorm.connect()
		assert.strictEqual(Gitorm.status, false)
	})

	it('Should fail to connect with incorrect [repository]', async () => {
		const Gitorm = new gitorm({
			token: process.env.GIT_TOKEN,
			repository: 'process.env.GIT_REPOSITORY',
			owner: process.env.GIT_OWNER
		})

		await Gitorm.connect()
		assert.strictEqual(Gitorm.status, false)
	})

	it('Should fail to connect with incorrect [token]', async () => {
		const Gitorm = new gitorm({
			token: 'process.env.GIT_TOKEN',
			repository: process.env.GIT_REPOSITORY,
			owner: process.env.GIT_OWNER
		})

		await Gitorm.connect()
		assert.strictEqual(Gitorm.status, false)
	})
})
