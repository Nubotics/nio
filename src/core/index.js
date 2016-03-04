import tools from '../tools'
import _ from 'nio-tools'
import lookup from 'look-up'

let core = {
  async init(app){

    app.log('loading hangar environment...')

    //TODO: on nio init find path of hanger by hangar config file, not process
    let { np, env } = tools
    let { has, is } = _
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

    //:-> nio home path
    let nioHomePath = process.cwd()

    //:-> nio mode
    let mode = 'hangar'

    //:-> detect mode -> hangar / product
    let nioFile = lookup('*hangar.js', {cwd: nioHomePath})

    if (is(nioFile, 'nothing') || is(nioFile, 'zero-len')) {
      nioFile = lookup('*product.js', {cwd: nioHomePath})
      if (!is(nioFile, 'nothing') && !is(nioFile, 'zero-len')) {
        mode = 'product'
      }
    }

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

    //:-> load environment vars

    env.set('NIO_HOME', nioHomePath)
    app.log('NIO_HOME -> ', nioHomePath)

    env.set('NIO_MODE', mode)
    app.log('NIO_MODE -> ', mode)

    hangarPath = setPath('HANGAR_PATH', '')

    let config = require(nioFile)

    let { convention } = config

    setPath('BOT_PATH', `/${convention.bots ? 'bots' : convention.bots}`)

    let productRawPath = mode === 'hangar' ? `/${convention.products ? 'products' : convention.products}` : nioHomePath

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
    spawnVagrant(){
    },
    up(){
    },
    halt(){
    },
    status(){
    },
    isRunning(){
    },
    isInstalled(){
    },
    version(){
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
