import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    //Ex: boards?name=abc&age=7
    console.log('req.body', req.query)
    //params được gọi tới dưới dạng /:id Ex: boards/id-123?name=abc&age=7
    console.log('req.body', req.params)
    res.status(StatusCodes.CREATED).json({ message: 'Note: API create new boards from controller' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const boardController = {
  createNew
}