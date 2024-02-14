const LOW = 300;
const MID = 150;
const HIGH = 50;
const MAX = 10;
var SPEED = MID;

var right = new KeyboardEvent('keydown', {
    key: 'ArrowRight',
    bubbles: true,
    keyCode: 39,
});
var left = new KeyboardEvent('keydown', {
    key: 'ArrowLeft',
    bubbles: true,
    keyCode: 37,
});
var up = new KeyboardEvent('keydown', {
    key: 'ArrowUp',
    bubbles: true,
    keyCode: 38,
});
var down = new KeyboardEvent('keydown', {
    key: 'ArrowDown',
    bubbles: true,
    keyCode: 40,
});

function selectCase() {
    var randomNumber = Math.floor(Math.random() * 4) + 1;
    switch (randomNumber) {
        case 1:
            document.body.dispatchEvent(right);
            break;
        case 2:
            document.body.dispatchEvent(left);
            break;
        case 3:
            document.body.dispatchEvent(up);
            break;
        case 4:
            document.body.dispatchEvent(down);
            break;
        default:
            break;
    }
}

setInterval(selectCase, SPEED);
