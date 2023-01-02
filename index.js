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

// Consumindo Promises com Async/Await
const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Raça: ${data}`);
        
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
    
        await writeFilePro('dog-img.txt', res.body.message);
        console.log('Imagem de cachorro aleatória salva no arquivo');
    } catch (err) {
        console.log(err.message);
        throw(err);
    }
    return '2: PRONTO'
};

(async () => {
    try {
        console.log('1: Pegando foto de dog');
        const x = await getDogPic();
        console.log(x);
        console.log('3: Já pegou a foto do dog');
    } catch(err) {
        console.log('ERROR');
    }
})();

/* console.log('1: Pegando foto de dog');
getDogPic()
    .then(x => {
        console.log(x);
        console.log('3: Já pegou a foto do dog');
    })
    .catch(err => {
        console.log('ERROR');
    }); */


// Construindo Promises
/* readFilePro(`${__dirname}/dog.txt`)
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
    }); */