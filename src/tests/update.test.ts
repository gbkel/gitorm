import 'dotenv/config'
import gitorm from '../index'
import * as assert from 'assert'
import generateRandomNumber from '../utils/RandomNumber'

describe('=> PUT Request', () => {
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

	it('Should update a file', async () => {
		const data = JSON.stringify({ teste: 123 })
		const file: any = await Gitorm.create({
			data,
			path: 'src/' + `${fileName}.json`
		})

		const newData = JSON.stringify({ teste: 321 })
		const updatedFile = await Gitorm.update(
			{ data: newData },
			{ path: file.path }
		)

		assert.notStrictEqual(updatedFile, false)
	})
})
