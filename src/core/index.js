import tools from '../tools'
import _ from 'nio-tools'
import lookup from 'look-up'
import log from 'npmlog'
const spawn = require('child_process').spawn


let core = {
  async init(app){

    app.log('loading hangar environment...')

    //TODO: on nio init find path of hanger by hangar config file, not process
    let { np, env } = tools
    let { has, is, includes } = _
    let {
      hangarPath,
      botPath,
      productPath,
      shelterPath,
      cargoPath,
      developer,
      } = ''

    const createPath = function (...paths) {
      return np.resolve(np.join(...paths))
    }

    //:-> run path
    let processPath = process.cwd()

    //:-> nio home path
    let nioHomePath = processPath

    //:-> nio mode
    let mode = 'hangar'

    //:-> detect mode -> hangar / product
    let nioFile = lookup('*hangar.js', {cwd: nioHomePath})

    if (is(nioFile, 'nothing') || is(nioFile, 'zero-len')) {
      //nioFile = lookup('*product.js', {cwd: nioHomePath})
      if (!is(nioFile, 'nothing') && !is(nioFile, 'zero-len')) {
        mode = 'product'
      }
    }

    if (mode === 'hangar' && includes(nioHomePath, '/products')) {
      nioHomePath = np.resolve(np.join(nioHomePath, '../../'))
      mode = 'product'
    }

    env.set('NIO_FILE_PATH', nioFile)
    app.log('NIO_FILE_PATH -> ', nioFile)

    if (!nioFile) {
      //TODO: set an out of environment mode and prompt user to scaffold hangar / product
      throw 'Derp! No hangar.js or product.js file found.'
    }

    const setPath = function (key, path) {
      let createdPath = path != '' ? createPath(nioHomePath, path) : ''
      env.set(key, createdPath)
      app.log(`env set -> ${key} ->`, createdPath)

      return createdPath
    }

    //:-> load environment lets

    env.set('NIO_HOME', nioHomePath)
    app.log('NIO_HOME -> ', nioHomePath)

    env.set('NIO_MODE', mode)
    app.log('NIO_MODE -> ', mode)

    hangarPath = setPath('HANGAR_PATH', '/')

    let config = {convention: {
      bots: 'bots',
      cargo: 'cargo',
      products: 'products',
      shelter: 'shelter'
    }}

    if (mode === 'hangar'){
      config = require(nioFile)
    }

    let { convention } = config

    if (is(convention, 'nothing')) {
      convention = {
        bots: 'bots',
        cargo: 'cargo',
        products: 'products',
        shelter: 'shelter'
      }
    }

    setPath('BOT_PATH', `/${convention.bots ? 'bots' : convention.bots}`)

    let productRawPath = mode === 'hangar' && includes(nioFile, 'hangar.js') ? `/${convention.products ? 'products' : convention.products}` : ''

    if (mode === 'product') productRawPath = nioHomePath

    productPath = setPath('PRODUCT_PATH', productRawPath)

    let shelterRawPath = mode === 'hangar' ? `/${convention.shelter ? 'shelter' : convention.shelter}` : ''

    setPath('SHELTER_PATH', shelterRawPath)

    setPath('CARGO_PATH', `/${convention.cargo ? 'cargo' : convention.cargo}`)

    developer = app.localStorage.getItem('developer')
    developer = is(developer, 'nothing') ? '' : developer
    env.set('DEVELOPER', developer)
    app.log('env set -> DEVELOPER ->', developer)

    //:-> load products
    let productFolders = []
    app.log('loading hangar products...')

    let productCollection = []
    if (mode === 'hangar') {


      productFolders = tools.getFolders(createPath(productPath))

      for (let productFolder of productFolders) {
        let currentProductPath = createPath(productPath, productFolder)

        if (np.resolve(processPath) === productPath) {
          currentProductPath = processPath
        }

        let currentProduct = await tools.load(`${currentProductPath}/product.js`) || {}

        if (has(currentProduct, 'default')) {
          currentProduct = currentProduct.default
        }

        if (has(currentProduct, 'name')) {
          productCollection.push({
            path: currentProductPath,
            ...currentProduct,
          })
        }
      }
    }
    //-> collect boxes in shelter

    return {
      developer,
      mode,
      paths: {
        home: env.get('NIO_HOME'),
        hangar: env.get('HANGAR_PATH'),
        products: env.get('PRODUCT_PATH'),
        bots: env.get('BOT_PATH'),
        shelter: env.get('SHELTER_PATH'),
        cargo: env.get('CARGO_PATH'),
      },
      productCollection,
    }

  },
  bots: {
    start(config){
      let { pm2 } = tools
      return new Promise((resolve, reject)=> {
        pm2.connect((err)=> {
          if (err) {
            reject(err)
          } else {
            pm2.start(config, (err, proc)=> {
              if (err) {
                reject(err)
              } else {
                pm2.disconnect()
                resolve(proc)
              }
            })
          }
        })
      })
    },
    restart(procNameOrId){
      let { pm2 } = tools
      return new Promise((resolve, reject)=> {
        pm2.connect((err)=> {
          if (err) {
            reject(err)
          } else {
            pm2.restart(procNameOrId, (err, proc)=> {
              if (err) {
                reject(err)
              } else {
                pm2.disconnect()
                resolve(proc)
              }
            })
          }
        })
      })
    },
    stop(procNameOrId){
      let { pm2 } = tools
      return new Promise((resolve, reject)=> {
        pm2.connect((err)=> {
          if (err) {
            reject(err)
          } else {
            pm2.stop(procNameOrId, (err, proc)=> {
              if (err) {
                reject(err)
              } else {
                pm2.disconnect()
                resolve(proc)
              }
            })
          }
        })
      })
    },
    status(procNameOrId){
      let { pm2 } = tools
      return new Promise((resolve, reject)=> {
        pm2.connect((err)=> {
          if (err) {
            reject(err)
          } else {
            pm2.describe(procNameOrId, (err, list)=> {
              if (err) {
                reject(err)
              } else {
                pm2.disconnect()
                resolve(list)
              }
            })
          }
        })
      })
    },
    list(){
      let { pm2 } = tools
      return new Promise((resolve, reject)=> {
        pm2.connect((err)=> {
          if (err) {
            reject(err)
          } else {
            pm2.list((err, list)=> {
              if (err) {
                reject(err)
              } else {
                pm2.disconnect()
                resolve(list)
              }
            })
          }
        })
      })
    },
    kill(procNameOrId){
      let { pm2 } = tools
      return new Promise((resolve, reject)=> {
        pm2.connect((err)=> {
          if (err) {
            reject(err)
          } else {
            pm2.describe(procNameOrId, (err, proc)=> {
              if (err) {
                reject(err)
              } else {
                pm2.disconnect()
                resolve(proc)
              }
            })
          }
        })
      })
    },
  },
  shelter: {
    spawnVagrant(binary, args, options){

      //log.info('Vagrant spawn -> args, options', args, options)

      let vagrant = spawn(binary, args, options)
      log.verbose('vagrant', 'vagrant ' + args.join(' '))
      let stdout = ''
      let stderr = ''
      vagrant.stdout.on('data', function (data) {
        data = _.trim(data + '')
        if (data) log.silly('vagrant', '%s', data)
        stdout += '' + data
      })
      vagrant.stderr.on('data', function (data) {
        data = _.trim(data + '')
        if (data) log.error('vagrant', '%s', data)
        stderr += '' + data
      })
      vagrant.on('close', function (code) {
        if (code) log.error('vagrant', 'close code %s', code)
        vagrant.emit('done', code, stdout, stderr)
      })
      return vagrant
    },
    up(options, machine, cwd){
      let provision = options.provision || false
      let provider = options.provider || 'virtualbox'
      let binary = options.binary || 'vagrant'
      return new Promise(function (resolve, reject) {
        let vagrant = core.shelter.spawnVagrant(binary, [
          'up', machine,
          provider ? '--provider=' + provider : '',
          !provision ? '--no-provision' : '--provision=' + provision
        ], {cwd})
        let booted = null
        vagrant.stdout.on('data', function (data) {
          data += ''
          if (data.match(/Machine booted and ready!/)) {
            booted = true
          }
          if (data.match(/is already running.$/)) {
            booted = false
          }
        })
        vagrant.on('done', function (code, stdout, stderr) {
          if (stderr) {
            reject(stderr)
          } else {
            resolve(booted)
          }
        })
      })

    },
    halt(options, cwd){
      let binary = options.binary || 'vagrant'
      return new Promise(function (resolve, reject) {
        let vagrant = core.shelter.spawnVagrant(binary, ['halt'], {cwd})
        vagrant.on('done', function (code, stdout, stderr) {
          if (stderr) {
            reject(stderr)
          } else {
            resolve(true)
          }
        })
      })
    },
    status(options, cwd){
      let machines = {}
      let reg = /([a-z0-9-_]+)\s+(running|poweroff|aborted|not created)\s+[(](virtualbox|libvirt)[)]/i
      let binary = options.binary || 'vagrant'
      return new Promise(function (resolve, reject) {
        let vagrant = core.shelter.spawnVagrant(binary, ['status'], {cwd})
        vagrant.stdout.on('data', function (data) {
          data += ''
          data.split('\n').forEach(function (line) {
            let regRes = line.match(reg)
            if (regRes) {
              let name = regRes[1]
              machines[name] = {
                status: regRes[2],
                provider: regRes[3]
              }
            }
          })
        })
        vagrant.on('done', function (code, stdout, stderr) {
          if (stderr) {
            reject(stderr)
          } else {
            resolve(machines)
          }
        })
      })

    },
    async isRunning(options, cwd){
      let machines = await core.shelter.status(options, cwd)
      let running = false
      Object.keys(machines).forEach(function (name) {
        if (machines[name].status == 'running') {
          running = true
        }
      })
      return running
    },
    version(options){
      let binary = options.binary || 'vagrant'
      return new Promise(function (resolve, reject) {
        let vagrant = spawnVagrant(binary, ['-v'])
        let version = ''
        vagrant.stdout.on('data', function (data) {
          version = (data + '').match(/Vagrant\s+([0-9.]+)/)[1]
          if (version) version = version[1]
        })
        vagrant.on('done', function (code, stdout, stderr) {
          if (stderr) {
            reject(stderr)
          } else {
            resolve(version)
          }
        })
      })

    },
    async isInstalled(options){
      let version = null
      let installed = false
      try {
        version = await core.shelter.version(options)
        installed = version ? true : false
      } catch (e) {
        installed = false
      }
      return installed
    },
    addBox(){
    },
  },
  cargo: {},
  developer: {},
  git: {},
  bitBucket: {},
  gitHub: {},
  npm: {},
  plugins: {},
}

export default core
