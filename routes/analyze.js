const request = require('request')

// Replace <Subscription Key> with your valid subscription key.
// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".

const {
  COGNITIVE_API_ENDPOINT,
  COGNITIVE_API_SUBSCRIPTION_KEY
} = require('../config/env')

module.exports = router =>
  router.get('/analyze', (req, res) => {
    const imageUrl = JSON.stringify({
      url: req.query.src
    })

    // Request parameters.
    const params = {
      'visualFeatures': 'Categories,Description,Color',
      'details': '',
      'language': 'en'
    }

    // Request options.
    const options = {
      uri: COGNITIVE_API_ENDPOINT,
      qs: params,
      body: imageUrl,
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': COGNITIVE_API_SUBSCRIPTION_KEY
      }
    }

    // Request action
    request.post(options, (error, response, body) => {
      if (error) {
        console.log(error)
        res.status(500)
        return
      }

      const data = JSON.parse(body)
      console.log(data)
      res.render('analyzed', {
        data
      })
    })
  })
