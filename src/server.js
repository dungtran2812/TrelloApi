/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorhandlingMiddleware'


const START_SERVER = () => {
  const app = express()

  //Enable req.body json data
  app.use(express.json())
  app.use('/v1', APIs_V1)
  //middleware tập trung xử lý lỗi
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })

  //thư viện bắt sự kiện đóng server để đóng kết nối database
  exitHook(() => {
    console.log('disconnecting to db')
    CLOSE_DB()
    console.log('disconnected to db')
  })

}

// IIFE
// (async() => {
//   try {
//     console.log('connecting to mongodb atlas ...')
//     await CONNECT_DB()
//     console.log('connected to mongodb atlas')
//     START_SERVER()
//   } catch (error) {
//     console.error(error)
//     process.exit(0)
//   }
// })()

CONNECT_DB()
  .then(() => console.log('connected to mongodb atlas'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })