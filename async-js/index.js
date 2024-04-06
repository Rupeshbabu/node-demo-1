const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((reslove, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file :(');
      reslove(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((reslove, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not file :(');
      reslove('success');
    });
  });
};

//Async and Await method
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    //if multiple promises call
    // const res1 =  superagent.get(
    //     `https://dog.ceo/api/breed/${data}/images/random`
    //   );
    // const res2 =  superagent.get(
    //     `https://dog.ceo/api/breed/${data}/images/random`
    //   );
    // const res3 =  superagent.get(
    //     `https://dog.ceo/api/breed/${data}/images/random`
    //   );
    
    //   const all = await Promise.all([res1, res2, res3]);
    // const imgs = all.map(el => el.body.message);
    // console.log(imgs);

    // await writeFilePro('dog-img.txt', imgs.join('\n'));

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Randome  dog image save file! ');
  } catch (error) {
    console.log(error);
    throw error;
  }
  return '2: READY DOG';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics');
  } catch (error) {
    console.log(error);
    throw error;
  }
})();

/*
console.log('1: Will get dog pics!');
getDogPic().then((x) => {
  console.log(x);
  console.log('3: Done getting dog pics');
})
.catch(err =>{
    console.log(`ERROR: ${err}`);
});
*/

/*
//Promise method
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message)
  })
  .then(() =>{
    console.log('Randome  dog image save file! ');
  })
  .catch((err) => {
    console.log(err);
  });
*/

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Randome save dog image file! ');
//       });
//     }).catch(err =>{
//       console.log(err.message);
//     });
// });
