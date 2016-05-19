//::-> HANGAR
const hangar = {
  name: 'nubotics',
  bitBucket: {
    token: '',
  },
  gitHub: {
    token: '',
  },
  start(){

  },
  stop(){

  },
  die(){

  },
}

//::-> CARGO
const digitalOcean = {
  name: 'nubotics',
  domain: '',
  transport: {},
  username: '',
  password: '',
}

//::-> PRODUCTS

//-> bots
const hotServer = {
  name: 'hot-server',
  propTypes: {},
  defaultProps: {},
  start(ctx, props){
  },
  stop(ctx){
  },
  die(ctx){
  },
}

const hotWeb = {
  name: 'hot-server',
  propTypes: {},
  defaultProps: {},
  start(ctx, props){
  },
  stop(ctx){
  },
  die(ctx){
  },
}

const cargo = {
  name: 'hot-server',
  propTypes: {},
  defaultProps: {},
  start(ctx, props){
  },
  stop(ctx){
  },
  die(ctx){
  },
}

const cloudStarter = {
  name: 'cloud-starter',
  repo: '',
  config: {},
  bots: [
    hotServer,
    hotWeb,
    cargo,
  ],
  start(ctx){

  },
  stop(ctx){

  },
  cargo(ctx){
  },
  ship(ctx){
  },
  die(err, ctx){

  },
}

//::-> SHELTER
const scotchBox = {
  name: '',
  hostPath: '',
  guestPath: '',
  repository: '',
  provider: '',
}

//::-> MODULES
const nio = {
  name: '',
  repository: '',
  prePublish(ctx){
  },
  postPublish(ctx){
  },
}

const nioCore = {
  name: '',
  repository: '',
  prePublish(ctx){
  },
  postPublish(ctx){
  },
}

const nioTools = {
  name: '',
  repository: '',
  prePublish(ctx){
  },
  postPublish(ctx){
  },
}


//::-> NIO CONTEXT
export default {
  ...hangar,
  bots: [],
  cargo: [
    digitalOcean,
  ],
  products: [
    cloudStarter,
  ],
  shelter: [
    scotchBox,
  ],
  modules: {
    server: [
      nio,
      nioCore,
    ],
    universal: [
      nioTools,
    ],
  }
}
