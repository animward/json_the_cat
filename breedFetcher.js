const request = require('request');

const breedName = process.argv[2];

const fetchBreedDescription = function(breedName, callback) {
    const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

    request(url, (error, _, body) => {
        if (error) {
            callback(error, null);
            return;
        }

        const data = JSON.parse(body);

        if (data.length === 0) {
            callback(`Breed "${breedName}" not found.`, null);
            return;
        }

        const description = data[0].description;
        callback(null, description);
    });
};

fetchBreedDescription(breedName, (error, description) => {
    if (error) {
        console.log('Error fetch details:', error);
    } else {
        console.log(description);
    }
});
