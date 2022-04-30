// Assignment 1 | COMP1073 Client-Side JavaScript

/* Variables
-------------------------------------------------- */

//Selectors for the buttons
const noun1Btn = document.getElementById("noun1");
const verbBtn = document.getElementById("verb");
const adjectiveBtn = document.getElementById("adjective");
const noun2Btn = document.getElementById("noun2");
const settingBtn = document.getElementById("setting");
const showStoryBtn = document.getElementById("playback");
const randomStoryBtn = document.getElementById("random");
const resetBtn = document.getElementById("reset");

//variables to store click count
var noun1CC = 0;
var verbCC = 0;
var adjectiveCC = 0;
var noun2CC = 0;
var settingCC = 0;

//Selectors for the lables to show selected words
const noun1BtnLabel = document.getElementById("noun1Label");
const verbBtnLabel = document.getElementById("verbLabel");
const adjectiveBtnLabel = document.getElementById("adjectiveLabel");
const noun2BtnLabel = document.getElementById("noun2Label");
const settingBtnLabel = document.getElementById("settingLabel");
const storyLabel = document.getElementById("story");
const randomStoryLabel = document.getElementById("randomStory")

//variables to store the selected wordd
var noun1 = noun1BtnLabel.innerText;
var verb = verbBtnLabel.innerText;
var adjective = adjectiveBtnLabel.innerText;
var noun2 = noun2BtnLabel.innerText;
var setting = settingBtnLabel.innerText;


//Arrays of word or phrases
const noun1Array = ['The Turkey', 'Mom', 'Dad', 'The Dog', 'My teacher', 'The elephant', 'The cat'];
const verbArray = ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed"];
const adjectiveArray = ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"];
const noun2Array = ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"];
const settingArray = ["on the moon.", "on the chair.", "in my spaghetti.", "in my soup.", "on the grass.", "in my shoes."];



/* Functions
-------------------------------------------------- */

//This functions is used to iterate through the passed array and select the word
function selectWord(btnArray, btnCC, btnLabel) {
    var word = btnArray[btnCC];
    btnLabel.innerHTML = word;
    if (btnCC === btnArray.length - 1) {
        btnCC = 0;
    } else {
        btnCC += 1;
    }
    textToSpeech(word);
    return [btnCC, word];
}

//For displaying the story if fully compleated
function showStory() {
    if (noun1 !== "-------------------" &&
        verb !== "-------------------" &&
        adjective !== "-------------------" &&
        noun2 !== "-------------------" &&
        setting !== "-------------------") {
        story = noun1 + " " + verb + " " + adjective + " " + noun2 + " " + setting;
        storyLabel.textContent = story;
        textToSpeech(story);
    } else {
        storyLabel.innerHTML = "<i> Your story is not completed yet. </i>"
    }

}

//for generating random story
function generateStory() {
    var randomStory = "";
    const topicArray = [noun1Array, verbArray, adjectiveArray, noun2Array, settingArray];
    for (var i = 0; i < 5; i++) {
        var index = Math.floor(Math.random() * (topicArray[i].length - 1)) + 1;
        randomStory += topicArray[i][index] + " ";
    }
    randomStory = randomStory.slice(0, randomStory.length - 1);
    randomStoryLabel.textContent = randomStory;
    textToSpeech(randomStory);
}

//Function to convert text into speech.
//Reference: https://www.educative.io/edpresso/how-to-convert-text-to-speech-in-javascript
function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.cancel(); //to stop the playing if sth is already played
    speechSynthesis.speak(utterance);
}

//to reset and reload the page again
//for now we are not saving any variables so if reload teh page it will act like reset
//Reference: https://www.w3schools.com/jsref/met_loc_reload.asp
function reset() {
    location.reload();
}


/* Event Listeners
-------------------------------------------------- */

//For noun1 button
noun1Btn.addEventListener('click', event => {
    returnedArray = selectWord(noun1Array, noun1CC, noun1BtnLabel);
    noun1CC = returnedArray[0];
    noun1 = returnedArray[1];
});

//For verb button
verbBtn.addEventListener('click', event => {
    returnedArray = selectWord(verbArray, verbCC, verbBtnLabel);
    verbCC = returnedArray[0];
    verb = returnedArray[1];

});

//for adjective button
adjectiveBtn.addEventListener('click', event => {
    returnedArray = selectWord(adjectiveArray, adjectiveCC, adjectiveBtnLabel);
    adjectiveCC = returnedArray[0];
    adjective = returnedArray[1];

});

//for noun2 button
noun2Btn.addEventListener('click', event => {
    returnedArray = selectWord(noun2Array, noun2CC, noun2BtnLabel);
    noun2CC = returnedArray[0];
    noun2 = returnedArray[1];

});

//for setting button
settingBtn.addEventListener('click', event => {
    returnedArray = selectWord(settingArray, settingCC, settingBtnLabel);
    settingCC = returnedArray[0];
    setting = returnedArray[1];
});

//for button to show user's story
showStoryBtn.addEventListener('click', showStory);

//for button to generate story
randomStoryBtn.addEventListener('click', generateStory);


//for the reset button
resetBtn.addEventListener('click', reset);