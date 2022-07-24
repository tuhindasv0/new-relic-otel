
const AWS = require('aws-sdk');
const docClient  = new AWS.DynamoDB.DocumentClient();

const tableName = 'TestTable';

exports.main = async function(event, context) {
  try {
    var method = event.httpMethod;

    if (method === "GET") {
      if (event.path === "/putItem") {
        let id=Math.floor(Math.random()*100000);
        let value=Math.floor(Math.random()*100000);
        let associatedKey=Math.floor(Math.random()*100000);

        var params = {
          TableName:tableName,          
          Item:{
             id: id.toString(),
             value: value.toString(),
             associatedKey: associatedKey.toString()
          }
      };
      try {
        console.log("params>",params)
        const result=await docClient.put(params).promise();
        console.log(result);
      } catch (error) {
        console.log(error)
        
      }
      

        const response =params.Item;
        return {
          statusCode: 200,
          body: JSON.stringify(response)
        };
      } else if (event.path === "/getItem"){

        var getParams = {
          FilterExpression: "associatedKey = :associatedKey",
          ExpressionAttributeValues: {
           ":associatedKey": "77815"
          }, 
          
          TableName: tableName
         };
         console.log("Params>",getParams);
        const response =await docClient.scan(getParams).promise();
        console.log("Response >",response)
        return {
          statusCode: 200,
          body: JSON.stringify(response)
        };

      }
    }
    
    return {
      statusCode: 400,
      body: "We only accept GET /"
    };
  } catch(error) {
    var body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
        body: JSON.stringify(body)
    }
  }
}
