var axios = require('axios');
var data = JSON.stringify({
    "collection": "users",
    "database": "Nestec",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://eu-west-2.aws.data.mongodb-api.com/app/data-cyvuy/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': '<API_KEY>',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
