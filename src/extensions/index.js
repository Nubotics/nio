import folderExplorer from 'inquirer-folder-explorer'


export default function (app, tools) {
  return function (ctx, opts) {
    ctx.api = ctx.api || {}

    let { chalk, lodash, ui } = ctx
    let { has, is } = tools._
    let { inquirer } = ui

    let setDeveloper = (developer)=> {
      app.localStorage.setItem('developer', developer)
    }

    let getDeveloper = ()=> {
      return app.localStorage.getItem('developer') || 'nobody'
    }

    let init = async function () {
    return  await app.init(app, tools)
    }

    ctx
      .command('hello [name]', 'greets nio and sets current developer')
      .action(async function (args, cb) {


        if (has(args, 'name')) {

          let { name } = args
          this.log(`Hello ${name}.`)
          setDeveloper(name)

          this.log('Initializing nio context for developer', name)

          try {
            app.ctx = await init()
          } catch (e) {
            this.log('error initializing nio context', e)
          }
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

          cb()


        } else {


          this.log('Hello. I am nio, your personal development assistant\n')

          this.prompt({
            type: "input",
            name: "developer_name",
            message: "what is your name developer? "
          }, async (answer)=> {
            let { developer_name } = answer

            this.log(`Hello ${developer_name}.`)

            setDeveloper(developer_name)

            this.log('Initializing nio context for developer', developer_name)
            try {
            app.ctx = await init()
            } catch (e) {
              this.log('error initializing nio context', e)
            }
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
            cb()

          })
        }

      })


    ctx
      .command('who', 'who is the current developer')
      .action(function (args, cb) {
        let currentName = getDeveloper()
        ctx.log(`${currentName} is the current developer`)
        cb()
      })

    ctx
      .command('bye', 'bids farewell to nio and unsets the current developer')
      .action(function (args, cb) {
        let currentName = getDeveloper()
        ctx.log(`Good bye ${currentName}.`)
        setDeveloper('')
        ctx.exec('exit', cb)

      })

    ctx
      .command('ctx', 'logs the nio context')
      .action(function (args, cb) {
        ctx.log('nio context ->', app.ctx)
        cb()
      })

    /* ctx
     .command('bots list', 'lists currently running hangar bots')
     .action(async function(args, cb){
     let list = await app.bots.list()
     this.log('bots -> list', list)
     cb()
     })*/

    /*  ctx
     .command('ext explore [folder]', 'launch file explorer')
     .action(function (args) {

     return new Promise((resolve, reject)=> {

     this.log('explore args', args)

     folderExplorer('Please select your folder', process.cwd(),(folder)=>{

     this.log('you chose folder -> ', folder)

     resolve()

     })


     })

     })*/
  }
}
