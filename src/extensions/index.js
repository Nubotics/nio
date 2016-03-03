import folderExplorer from 'inquirer-folder-explorer'


export default function (app, tools) {
  return function (ctx, opts) {
    ctx.api = ctx.api || {}

    let { chalk, lodash, ui } = ctx
    let { has } = lodash
    let { inquirer } = ui

    let setDeveloper = (developer)=>{
      app.localStorage.setItem('developer', developer)
    }

    let getDeveloper = ()=>{
      return app.localStorage.getItem('developer') || 'nobody'
    }

    ctx
      .command('hello [name]', 'greets nio and sets current developer')
      .action(function (args) {

        return new Promise((resolve, reject)=> {

          if (has(args, 'name')) {

            let { name } = args
            this.log(`Hello ${name}.`)
            setDeveloper(name)
            resolve()

          } else {

            this.log('Hello. I am nio, your personal development assistant\n')

            this.prompt({
              type: "input",
              name: "developer_name",
              message: "what is your name developer? "
            }, (answer)=> {
              let { developer_name } = answer

              this.log(`Hello ${developer_name}.`)

              setDeveloper(developer_name)

              resolve()

            })
          }

        })

      })

    ctx
      .command('who', 'who is the current developer')
      .action(function (args, cb) {
        let currentName = getDeveloper()
        this.log(`${currentName} is the current developer`)
        cb()
      })

    ctx
      .command('bye', 'bids farewell to nio and unsets the current developer')
      .action(function (args, cb) {
        let currentName = getDeveloper()
        this.log(`Good bye ${currentName}.`)
        setDeveloper('')
        ctx.exec('exit',cb)

      })

    ctx
      .command('bots list', 'lists currently running hangar bots')
      .action(async function(args, cb){
        let list = await app.bots.list()
        this.log('bots -> list', list)
        cb()
      })

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
