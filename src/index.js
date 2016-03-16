import Vorpal from 'vorpal'

import Ext from './extensions'

import core from './core'

import tools from './tools'

import _ from 'nio-tools'

module.exports = async function nio() {
  let { has, is } = _
  let app = Vorpal()

  app.localStorage('nio')

  app.init = core.init
  app.bots = core.bots
  app.shelter = core.shelter
  app.products = core.products

  let ctx = {}
  try {
    ctx = await app.init(app, tools)
  } catch (e) {
    console.log('error initializing nio context', e)
  }

  app.ctx = ctx || {}

  const ext = Ext(app, tools)

  app
    .use(ext)
  try {
  if (!is(app.ctx.productCollection, 'zero-len')) {

      for (let product of app.ctx.productCollection) {
        if (has(product, 'Commands')) {
          if (is(product.Commands, 'function')) {
            let commands = product.Commands(app, tools)
            app.use(commands)

          }
          if (has(product, 'onInit')){
            if (is(product.onInit,'function')){
              product.onInit.call(app)
            }
          }
        }

      }

  }
  } catch (e) {
    console.log('error loading product extensions', e)
  }

  return app
    .delimiter('nio$')
    .log(`${app.ctx.developer === '' ? 'Welcome developer, please say hello to initialize products' : `Welcome back ${app.ctx.developer}`}`)
    .show()
}



