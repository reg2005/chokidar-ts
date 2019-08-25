/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import test from 'japa'
import { join, normalize } from 'path'
import { Filesystem } from '@poppinss/dev-utils'

import { TypescriptCompiler } from '../src/TypescriptCompiler'
const fs = new Filesystem(join(__dirname, 'app'))

test.group('Compiler', (group) => {
  group.afterEach(async () => {
    await fs.cleanup()
  })

  group.beforeEach(async () => {
    await fs.ensureRoot()
  })

  test('load config and ensure file paths are normalized', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['*'],
    }))

    await fs.add('source.ts', '')

    const compiler = new TypescriptCompiler(
      require('typescript/lib/typescript'),
      'tsconfig.json',
      fs.basePath,
    )

    const config = compiler.parseConfig()
    assert.deepEqual(config.config!.fileNames, config.config!.fileNames.map((name) => {
      return normalize(name)
    }))
  })

  test('return error when config file is missing', async (assert) => {
    const compiler = new TypescriptCompiler(
      require('typescript/lib/typescript'),
      'foo.json',
      join(fs.basePath),
    )

    const config = compiler.parseConfig()
    assert.equal(config.error!.messageText, `File '${join(fs.basePath, 'foo.json')}' not found.`)
  })

  test('normalize includes and excludes defined in tsconfig file', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['**/*'],
      exclude: ['node_modules', 'build'],
    }))

    const compiler = new TypescriptCompiler(
      require('typescript/lib/typescript'),
      'tsconfig.json',
      fs.basePath,
    )

    compiler.parseConfig()
    assert.deepEqual(compiler['_includePatterns'], [join(fs.basePath, '**', '*')])
    assert.deepEqual(compiler['_excludePatterns'], [
      join(fs.basePath, 'node_modules'),
      join(fs.basePath, 'build'),
    ])
  })

  test('emit relative path of source file', async (assert, done) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['**/*'],
      exclude: ['node_modules', 'build'],
    }))

    const compiler = new TypescriptCompiler(
      require('typescript/lib/typescript'),
      'tsconfig.json',
      fs.basePath,
    )

    const config = compiler.parseConfig()
    compiler.on('subsequent:build', (filePath) => {
      assert.equal(filePath, normalize('foo/source.ts'))
      compiler.watcher!.close()
      done()
    })

    compiler.on('watcher:ready', async () => {
      await fs.add('foo/source.ts', '')
    })

    compiler.watch(config.config!)
  }).timeout(0)

  test('emit relative path of non source file', async (assert, done) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['**/*'],
      exclude: ['node_modules', 'build'],
    }))

    const compiler = new TypescriptCompiler(
      require('typescript/lib/typescript'),
      'tsconfig.json',
      fs.basePath,
    )

    const config = compiler.parseConfig()
    compiler.on('add', (filePath) => {
      assert.equal(filePath, normalize('foo/hello.txt'))
      compiler.watcher!.close()
      done()
    })

    compiler.on('watcher:ready', async () => {
      await fs.add('foo/hello.txt', '')
    })

    compiler.watch(config.config!)
  }).timeout(0)

  test('do not emit when file is excluded explicitly', async (_assert, done) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['**/*'],
      exclude: ['foo/source.ts'],
    }))

    const compiler = new TypescriptCompiler(
      require('typescript/lib/typescript'),
      'tsconfig.json',
      fs.basePath,
    )

    const config = compiler.parseConfig()
    compiler.on('subsequent:build', () => {
      done(new Error('Never expected to be called'))
    })

    compiler.on('watcher:ready', async () => {
      await fs.add('foo/source.ts', '')
      setTimeout(() => {
        compiler.watcher!.close()
        done()
      }, 2000)
    })

    compiler.watch(config.config!)
  }).timeout(0)
})