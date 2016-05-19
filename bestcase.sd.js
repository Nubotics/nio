
const hangar = {
  name:'nubotics',
  start(){

  },
  stop(){

  },
  die(){

  },
}

const digitalOcean = {
  name:'nubotics',
  domain:'',
  transport:{},
  username:'',
  password:'',
}

const hotServer = {
  name:'hot-server',
  propTypes:{},
  defaultProps:{},
  start(ctx, props){},
  stop(ctx){},
  die(ctx){},
}

const hotWeb = {
  name:'hot-server',
  propTypes:{},
  defaultProps:{},
  start(ctx, props){},
  stop(ctx){},
  die(ctx){},
}

const cargo = {
  name:'hot-server',
  propTypes:{},
  defaultProps:{},
  start(ctx, props){},
  stop(ctx){},
  die(ctx){},
}

const cloudStarter = {
  name:'cloud-starter',
  config:{},
  bots:[
    hotServer,
    hotWeb,
    cargo,
  ],
  start(ctx){

  },
  stop(ctx){

  },
  cargo(ctx){},
  ship(ctx){},
  die(err, ctx){

  },
}

const scotchBox = {
  name:'',
  hostPath:'',
  guestPath:'',
  repository:'',
  provider:'',
}

const nio = {
  name:'',
  repository:'',
  prePublish(ctx){},
  postPublish(ctx){},
}

const nioCore = {
  name:'',
  repository:'',
  prePublish(ctx){},
  postPublish(ctx){},
}

const nioTools = {
  name:'',
  repository:'',
  prePublish(ctx){},
  postPublish(ctx){},
}

export default {
  ...hangar,
  bots:[],
  cargo:[
    digitalOcean,
  ],
  products:[
    cloudStarter,
  ],
  shelter:[
    scotchBox,
  ],
  modules:{
    server:[
      nio,
      nioCore,
    ],
    universal:[
      nioTools,
    ],
  }
}
