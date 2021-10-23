import { expect, test } from '@oclif/test'

describe('explore', () => {
  test
    .stdout()
    .command(['explore'])
    .it('runs explore', ctx => {
      // expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['explore', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      // expect(ctx.stdout).to.contain('hello jeff')
    })
})