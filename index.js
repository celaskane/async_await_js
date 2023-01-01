const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Raça: ${data}`);

    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .end((err, res) => {
            if (err) console.log(err.message);
            console.log(res.body.message);

            fs.writeFile('dog-img.txt', res.body.message, err => {
                console.log('Imagem de cachorro aleatória salva no arquivo');
            });
        });
});