const form = document.querySelector("#shelterForm");
const input = document.querySelector("#catName");
const list = document.querySelector("#cats");
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    console.log(input.value);
    const catName = input.value;
    const newLI = document.createElement("LI");
    newLI.innerText = catName;
    list.appendChild(newLI);
})
