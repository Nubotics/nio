import Vorpal from 'vorpal'

import Ext from './extensions'

import core from './core'

import tools from './tools'

import _ from 'nio-tools'

module.exports = async function nio() {
  let { has, is } = _
  let app = Vorpal()

  app.localStorage('nio')
  let hangar = {}
  try {
    hangar = await core.init(app, tools)
  } catch (e) {
    console.log('error initializing hangar', e)
  }
  app.hangar = hangar || {}
  app.bots = core.bots

  const ext = Ext(app, tools)

  app
    .use(ext)

  if (has(app.hangar,'productCollection')){
    if (app.hangar.productCollection.length > 0){
      for(let product of app.hangar.productCollection){
        if (has(product,'Commands')){
          if (is(product.Commands,'function')){
            let commands = product.Commands(app,tools)

            app.use(commands)
          }
        }

      }
    }
  }

  return app
    .delimiter('nio$')
    .log(`${app.hangar.developer == '' ? 'Welcome developer, please say hello' : `Welcome back ${app.hangar.developer}`}`)
    .show()
}



