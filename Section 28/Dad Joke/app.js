// axios.get("https://swapi.tech/api/people/1/")
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error(error);
//     });


// const getStarWarsPerson = async (id) => {
//     try {
//         const res = await axios.get(`https://swapi.tech/api/people/${id}/`);
//         console.log(res.data);
//     } catch (e) {
//         console.log("ERROR: ", e);
//     }
// }

// getStarWarsPerson(5);

const jokes = document.querySelector('#jokes');
const button = document.querySelector('button');


const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    console.log(jokeText);
    const newLI = document.createElement('li');
    newLI.append(jokeText);
    jokes.append(newLI);
}
button.addEventListener('click', addNewJoke);


const getDadJoke = async () => {
    try {
        const config = {
            headers: {
                Accept: "application/json"
            }
        }
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        return res.data.joke;
    } catch (e) {
        console.log("ERROR: ", e);
        return "No joke available";
    }
}

