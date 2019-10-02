import 'dotenv/config'
import gitorm from '../index'
import * as assert from 'assert'
import generateRandomNumber from '../utils/RandomNumber'

describe('=> POST Request', () => {
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

	it('Should create a file', async () => {
		const data = JSON.stringify({ teste: 123 })
		const file = await Gitorm.create({
			name: `${fileName}.json`,
			data,
			path: '/src'
		})
		assert.notStrictEqual(file, false)
	})

	it('Should fail to create a file that already exists', async () => {
		const data = JSON.stringify({ teste: 123 })
		const file = await Gitorm.create({
			name: `${fileName}.json`,
			data,
			path: '/src'
		})
		assert.strictEqual(file, false)
	})
})
