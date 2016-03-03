import np from 'path'
import spawnShell from 'spawn-shell'
import * as fse from 'fs-extra-promise-es6'
import pm2 from 'pm2'
import SSH from 'node-ssh'
import loader from 'node-glob-loader'
import env from 'process-env'
import folderContents from 'folder-contents'

import _ from 'nio-tools'

const runShell = async function (command, options = {}) {
  return await spawnShell(command, options).exitPromise
}

const load = async function (glob) {

  let run = function () {
    return new Promise(function (resolve) {
      let requires = null
      loader.load(glob, function (exports) {
        requires = exports
      }).then(function () {
        resolve(requires)
      })
    })
  }

  return await run()

}

const getFolders = function (path) {
  const options = {
    path
  }
  const result = folderContents(options)
  let folders = []
  if (_.has(result, '.folders')) folders = result['.folders']
  return folders
}


export default {
  np,
  spawnShell,
  runShell,
  fse,
  pm2,
  SSH,
  loader,
  env,
  load,
  getFolders,
}
