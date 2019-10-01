import 'dotenv/config'
import gitorm from './index'
import * as assert from 'assert'

describe('=> Repository connection', () => {
	it('Should connect to github repository', async () => {
		const Gitorm = new gitorm({
			token: process.env.GIT_TOKEN,
			repository: 'database',
			owner: 'guilhermebkel'
		})

		await Gitorm.connect()
		assert.notStrictEqual(Gitorm.status, false)
	})
})
