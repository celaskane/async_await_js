const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('Não encontrado');
            resolve(data);
        });
    });
}

const writeFilePro= (file, data)=> {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Não foi possível escrever o arquivo');
            resolve('Sucesso');
        });
    });
}

readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Raça: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => {
        console.log('Imagem de cachorro aleatória salva no arquivo');
    })
    .catch(err => {
        console.log(err.message);
    });