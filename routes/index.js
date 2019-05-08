if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const azureStorage = require('azure-storage')
const blobService = azureStorage.createBlobService()
const {
  getStorageAccountName,
  getStorageEndpoint
} = require('../config/getters')

const CONTAINER_NAME = 'images'
const storageAccountName = getStorageAccountName()
const storageEndpoint = getStorageEndpoint(storageAccountName, CONTAINER_NAME)

module.exports = router =>
  router.get('/', (req, res, next) => {
    blobService.listBlobsSegmented(CONTAINER_NAME, null, (err, data) => {
      if (err) {
        console.log(err)
        res.status(500)
        return
      }

      res.render('index', {
        storageEndpoint,
        data
      })
    })
  })
