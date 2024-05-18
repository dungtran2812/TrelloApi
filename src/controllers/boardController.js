/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
import ApiError from '~/utils/apiError'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    //Ex: boards?name=abc&age=7
    console.log('req.body', req.query)
    //params được gọi tới dưới dạng /:id Ex: boards/id-123?name=abc&age=7
    console.log('req.body', req.params)
    // navigate to service layer
    const createdBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdBoard)

  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}