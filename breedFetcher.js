const request = require("request");

//set the url for the cat api request
const url = "https://api.thecatapi.com/v1/breeds/search";

//get the breed name from the command line
const breedName = process.argv[2];

//take breed from command line and fetch cat breed data
const breedFetcher = function(breedName, callback) {
    //set the url and query string for the request options
    const options = {
        url: url,
        qs: {
            q: breedName
        }
    };

    //make the request
    request(options, function(err, response, body) {
        //check response status code
        if (response.statusCode === 200) {
            //parse the response body
            const parsedBody = JSON.parse(body);

            //check if parsed body is empty
            if (parsedBody.length === 0) {
                callback("Breed not found");
            } else {
                //use the callback to pass the parsed body
                callback(parsedBody);
            }
        } else {
            //call the callback function passing the request error
            callback(err);
        }
    });
};

//fetch the provided breed from the cat api
breedFetcher(breedName, function(data) {
    //check if the data is an error
    if (data instanceof Error) {
        //print the error
        console.log(data.message);
    } else {
        //print the data
        console.log(data);
    }
});