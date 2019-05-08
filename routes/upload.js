if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const multer = require('multer')
const azureStorage = require('azure-storage')
const getStream = require('into-stream')
const { getBlobName } = require('../utils/blob')

const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image')
const blobService = azureStorage.createBlobService()

const CONTAINER_NAME = 'images'

module.exports = router =>
  router.post('/upload', uploadStrategy, (req, res) => {
    const blobName = getBlobName(req.file.originalname)
    const stream = getStream(req.file.buffer)
    const streamLength = req.file.buffer.length

    blobService.createBlockBlobFromStream(CONTAINER_NAME, blobName, stream, streamLength, err => {
      if (err) {
        console.log(err)
        res.status(500)
        return
      }

      res.render('success', {
        message: 'File uploaded to Azure Blob storage.'
      })
    })
  })
