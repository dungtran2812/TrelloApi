/* eslint-disable no-useless-catch */
import { boardModel } from '~/models/boardModel'
import { slugify } from '~/utils/formatters'
const createNew = async(reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBoard = await boardModel.createNew(newBoard)
    console.log('createdBoard', createdBoard)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    console.log('createdBoard.insertedId', createdBoard.insertedId)
    return getNewBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}