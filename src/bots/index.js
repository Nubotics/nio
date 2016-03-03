import micro, { json, send } from 'micro'

const srv = micro(async function (req, res) {
  res.writeHead(200)
  res.end('woot')
})

srv.listen(3000,()=>{
  console.log('bot started')
})
