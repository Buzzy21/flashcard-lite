const revealFrontButton = document.querySelector('#revealFrontButton');
const nextButton = document.querySelector('#nextButton');
const prevButton = document.querySelector('#prevButton');
const revealBackButton = document.querySelector('#revealBackButton');
const front = document.querySelector('.front');
const back = document.querySelector('.back');
const cardTracker = document.querySelector('#cardTracker');
const autoFront = document.querySelector('#autoFront');
const autoBack = document.querySelector('#autoBack');

let fronts = ["Example Front"];
let backs = ["Example Back"]
let idx = 0;
let revealingFront = false;
let revealingBack = false;
let autoRevealFront = false;
let autoRevealBack = false;

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

    // Auto reveal front/back
    revealingFront = autoRevealFront;
    revealingBack = autoRevealBack;

    update();
}

front.addEventListener('input', function() {
    fronts[idx] = front.textContent;
    saveContent();
})

back.addEventListener('input', function() {
    backs[idx] = back.textContent;
    saveContent();
})

document.addEventListener("keydown", function(event) {
    // Exit editing mode
    if(event.key == 'Escape') {
        front.blur();
        back.blur();
    }

    // Prevent accidental shortcut usages when actually typing
    if (document.activeElement.tagName == 'INPUT' ||
        document.activeElement.tagName == 'TEXTAREA' ||
        document.activeElement.isContentEditable) {
        return;
    }

    // Reveal toggling
    if(event.key == 'l') {
        event.preventDefault();
        toggle(false);
    }
    if(event.key == 'k') {
        event.preventDefault();
        toggle(true);
    }

    // Traversing
    if(event.key == 'a' || event.key == 'ArrowLeft') {
        event.preventDefault();
        traverse(false);
    }
    if(event.key == 'd' || event.key == 'ArrowRight') {
        event.preventDefault();
        traverse(true);
    }

    // Quick editing
    if(event.key == 'i') {
        event.preventDefault();
        front.focus();
    }
    if(event.key == 'o') {
        event.preventDefault();
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

// Updating auto reveal front and back
autoFront.addEventListener('change', function() {
    autoRevealFront = autoFront.checked;
    saveContent();
});

autoBack.addEventListener('change', function() {
    autoRevealBack = autoBack.checked;
    saveContent();
});

function saveContent() {
    // Stores content
    localStorage.setItem('fronts',JSON.stringify(fronts));
    localStorage.setItem('backs',JSON.stringify(backs));
    localStorage.setItem('idx',idx);
    localStorage.setItem('autoRevealFront',autoRevealFront);
    localStorage.setItem('autoRevealBack',autoRevealBack);
}

function loadContent() {
    // Loads stored content
    if(localStorage.getItem('fronts')){
        fronts = JSON.parse(localStorage.getItem('fronts'));
    }
    if(localStorage.getItem('backs')){
        backs = JSON.parse(localStorage.getItem('backs'));
    }
    if(localStorage.getItem('idx')){
        idx = parseInt(localStorage.getItem('idx'));
    }
    if(localStorage.getItem('autoRevealFront')){
        autoRevealFront = JSON.parse(localStorage.getItem('autoRevealFront'));
        autoFront.checked = autoRevealFront;
    }
    if(localStorage.getItem('autoRevealBack')) {
        autoRevealBack = JSON.parse(localStorage.getItem('autoRevealBack'));
        autoBack.checked = autoRevealBack
    }

    revealingFront = autoRevealFront;
    revealingBack = autoRevealBack;

    update();
}

window.addEventListener('load', loadContent)