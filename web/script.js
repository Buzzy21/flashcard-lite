const revealFrontButton = document.querySelector('#revealFrontButton');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
const revealBackButton = document.querySelector('#revealBackButton');
const front = document.querySelector('.front');
const back = document.querySelector('.back');

let fronts = ["Example Front"];
let backs = ["Example Back"]
let idx = 0;
let revealingFront = false;
let revealingBack = false;

//TODO: Saving edits

function update() {
    // Front
    if(revealingFront) {
        // Set front content and make it editable
        front.textContent = fronts[idx];
        front.contentEditable = true;
    }
    else {
        // Hide front content and make it uneditable
        front.innerHTML = "<h3>Hidden</h3>";
        front.contentEditable = false;
    }

    // Back
    if(revealingBack) {
        // Set back content and make it editable
        back.textContent = backs[idx];
        back.contentEditable = true;
    }
    else {
        // Hide back content and make it uneditable
        back.innerHTML = "<h3>Hidden</h3>";
        back.contentEditable = false;
    }
}

function toggle(swapFront) {
    // Swap the revealing modes
    if(swapFront) {
        revealingFront = !revealingFront;
    }
    else {
        revealingBack = !revealingBack;
    }
    update();
}

document.addEventListener("keydown", function(event) {
    // Prevent accidental shortcut usages when actually typing
    if (document.activeElement.tagName == 'INPUT' ||
        document.activeElement.tagName == 'TEXTAREA' ||
        document.activeElement.isContentEditable) {
        return;
    }

    if(event.key == 'l') {
        toggle(false);
    }
    if(event.key == 'k') {
        toggle(true);
    }
})

revealFrontButton.addEventListener('click', function() {
    toggle(true);
})

revealBackButton.addEventListener('click', function() {
    toggle(false)
})

nextButton.addEventListener('click', function() {

})

prevButton.addEventListener('click', function() {

})
