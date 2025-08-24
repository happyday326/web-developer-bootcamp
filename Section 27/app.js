const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if (rand < 0.7) {
                resolve("you fake data here");
            } else {
                reject("error");
            }
        }, 1000);
    });
}

async function makeTwoRequests() {
    try {
        const data1 = await fakeRequest("/dog/1");
        console.log(data1);
        const data2 = await fakeRequest("/dog/2");
        console.log(data2);
    } catch (error) {
        console.log(`Caught an error: ${error}`);
    }
}

// fakeRequest("/dog/1")
//     .then((data) => {
//         console.log("done!");
//         console.log(data);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// const delayColor = (color, delay) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             document.body.style.backgroundColor = color;
//             resolve();
//         }, delay);
//     });
// };

// // delayColor("red", 1000)
// //     .then(() => delayColor("orange", 1000))
// //     .then(() => delayColor("yellow", 1000))
// //     .then(() => delayColor("green", 1000))
// //     .then(() => delayColor("blue", 1000))
// //     .then(() => {
// //         console.log("All done!");
// //     });


// async function rainbow() {
//     await delayColor("red", 1000);
//     await delayColor("orange", 1000);
//     await delayColor("yellow", 1000);
//     await delayColor("green", 1000);
//     await delayColor("blue", 1000);
//     await delayColor("indigo", 1000);
//     await delayColor("violet", 1000);
//     return "All done!";
// }

// // rainbow().then(() => {
// //     console.log("End of rainbow!");
// // });

// async function printRainbow() {
//     await rainbow();
//     console.log("End of rainbow!");
// }

// printRainbow();
