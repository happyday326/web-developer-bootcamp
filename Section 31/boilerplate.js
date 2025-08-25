const fs = require('fs');
const foldername = process.argv[2] || 'Project';

// fs.mkdir('dogs', { recursive: true }, (err) => {
//     console.log("creating!")
//     if (err) throw err;
// });

try {
    fs.mkdirSync(foldername);
    fs.writeFileSync(`${foldername}/index.html`);
    fs.writeFileSync(`${foldername}/app.js`);
    fs.writeFileSync(`${foldername}/style.css`);
} catch (e) {
    console.log("Error creating files:");
    console.log(e);
}
