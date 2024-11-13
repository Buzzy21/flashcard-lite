const revealFrontButton = document.querySelector('#revealFrontButton');
const nextButton = document.querySelector('#nextButton');
const prevButton = document.querySelector('#prevButton');
const revealBackButton = document.querySelector('#revealBackButton');
const front = document.querySelector('.front');
const back = document.querySelector('.back');
const cardTracker = document.querySelector('#cardTracker');

let fronts = ["Example Front"];
let backs = ["Example Back"]
let idx = 0;
let revealingFront = false;
let revealingBack = false;

// TODO: Allow saving
// TODO: Frontend that informs the user the shortcuts
// TODO: Make the size of the cards dynamic

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
    cardTracker.textContent = `${idx+1}/${fronts.length}`;
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

function traverse(traverseNext) {
    if(traverseNext) {
        idx++;
        // Though a if statement should suffice, use a while loop just in case
        while(idx >= fronts.length) {
            fronts.push("");
            backs.push("");
        }
    }
    else {
        if(idx >= 1) {
            idx--;
        }
        // If idx is at the first index, then insert an element at the first index since idx cannot be negative
        else {
            fronts.unshift("");
            backs.unshift("");
        }
    }
    update();
    console.log(fronts.length);
}

front.addEventListener('input', function() {
    fronts[idx] = front.textContent;
})

back.addEventListener('input', function() {
    backs[idx] = back.textContent;
})

document.addEventListener("keydown", function(event) {
    // Exit editing mode
    if(event.key == 'Escape') {
        front.blur();
        back.blur();
        console.log('blurred');
    }

    // Prevent accidental shortcut usages when actually typing
    if (document.activeElement.tagName == 'INPUT' ||
        document.activeElement.tagName == 'TEXTAREA' ||
        document.activeElement.isContentEditable) {
        return;
    }

    // Reveal toggling
    if(event.key == 'l') {
        toggle(false);
    }
    if(event.key == 'k') {
        toggle(true);
    }

    // Traversing
    if(event.key == 'a' || event.key == 'ArrowLeft') {
        traverse(false);
    }
    if(event.key == 'd' || event.key == 'ArrowRight') {
        traverse(true);
    }

    // Quick editing
    if(event.key == 'i') {
        front.focus();
    }
    if(event.key == 'o') {
        back.focus();
    }
})

revealFrontButton.addEventListener('click', function() {
    toggle(true);
})

revealBackButton.addEventListener('click', function() {
    toggle(false)
})

nextButton.addEventListener('click', function() {
    traverse(true);
})

prevButton.addEventListener('click', function() {
    traverse(false);
})