const userInput = prompt("Please enter some text:");

if (userInput) {
    console.log("Truthy value entered:", userInput);
} else {
    console.log("Falsy value entered or no input provided.");
}