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

function update() {
    // Front
    if(revealingFront) {
        front.textContent = fronts[idx];
        front.contenteditable = true;
    }
    else {
        front.innerHTML = "<h3>Hidden</h3>";
        front.contenteditable = false;
    }

    // Back
    if(revealingBack) {
        back.textContent = backs[idx];
        back.contenteditable = true;
    }
    else {
        back.innerHTML = "<h3>Hidden</h3>";
        back.contenteditable = false;
    }
}

revealFrontButton.addEventListener('click', function() {
    revealingFront = !revealingFront;
    update();
})

revealBackButton.addEventListener('click', function() {
    revealingBack = !revealingBack;
    update();
})

nextButton.addEventListener('click', function() {

})

prevButton.addEventListener('click', function() {

})
