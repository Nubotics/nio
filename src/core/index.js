import tools from '../tools'
import _ from 'nio-tools'

let core = {
  async init(app){

    app.log('loading hangar environment...')

    //TODO: on nio init find path of hanger by hangar config file, not process
    let { np, env } = tools
    let { has } = _
    let {
      hangarPath,
      botPath,
      productPath,
      shelterPath,
      cargoPath,
      developer,
      } = ''

    hangarPath = np.resolve(process.cwd())
    env.set('HANGAR_PATH', hangarPath)
    app.log('HANGAR_PATH ->', hangarPath)

    let config = await tools.load(`${hangarPath}/hangar.config.js`)

    if (!config) {
      throw 'Derp! No hangar.config.js file found.'
    }

    let { convention } = config

    botPath = np.resolve(hangarPath, `/${convention.bots ? 'bots' : convention.bots}`)
    env.set('BOT_PATH', botPath)
    app.log('env set -> BOT_PATH ->', botPath)

    productPath = np.resolve(hangarPath, `/${convention.products ? 'products' : convention.products}`)
    env.set('PRODUCT_PATH', productPath)
    app.log('env set -> PRODUCT_PATH ->', productPath)

    shelterPath = np.resolve(hangarPath, `/${convention.shelter ? 'shelter' : convention.shelter}`)
    env.set('SHELTER_PATH', shelterPath)
    app.log('env set -> SHELTER_PATH ->', shelterPath)

    cargoPath = np.resolve(hangarPath, `/${convention.cargo ? 'cargo' : convention.cargo}`)
    env.set('CARGO_PATH', cargoPath)
    app.log('env set -> CARGO_PATH ->', cargoPath)

    developer = app.localStorage.getItem('developer') || ''
    env.set('DEVELOPER', developer)
    app.log('env set -> DEVELOPER ->', developer)

    //-> collect products
    let productFolders = tools.getFolders(np.join(hangarPath, productPath))
    app.log('loading hangar products...')

    let productCollection = []
    for (let productFolder of productFolders) {
      let currentProductPath = np.join(hangarPath, productPath, productFolder)
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

    //-> collect boxes in shelter

    return {
      paths: {
        bots: botPath,
        products: productPath,
        shelter: shelterPath,
        cargo: cargoPath,
      },
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
