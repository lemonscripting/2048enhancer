const menuContainer = document.createElement('div');
menuContainer.classList.add('menu-container');
menuContainer.innerHTML = `
    <h2 class="heading">2048 Enhancer V1.2</h2>
    <h3 class="author">@lemonscripting</h3>
    <div class="input-row">
        <label for="x">x:</label>
        <div class="custom-dropdown">
            <select id="x" class="select-box">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <div class="dropdown-arrow"></div>
        </div>
    </div>
    <div class="input-row">
        <label for="y">y:</label>
        <div class="custom-dropdown">
            <select id="y" class="select-box">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <div class="dropdown-arrow"></div>
        </div>
    </div>
    <div class="input-row">
        <label for="value">Value:</label>
        <div class="custom-dropdown">
            <select id="value" class="select-box">
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>
                <option value="128">128</option>
                <option value="256">256</option>
                <option value="512">512</option>
                <option value="1024">1024</option>
                <option value="2048">2048</option>
            </select>
            <div class="dropdown-arrow"></div>
        </div>
    </div>
    <div class="input-row">
        <label for="custom">Custom Value :</label>
        <input type="text" id="custom" name="customInput" class="custom-input" placeholder="null">
    </div>

    <div class="input-row">
        <label for="custom">Edit Score :</label>
        <input type="text" id="score" name="customInput" class="custom-input" placeholder="null">
    </div>

    <div class="input-row">
    <label for="value">Autobot Speed:</label>
    <div class="custom-dropdown">
        <select id="botspeed" class="select-box">
        <option value="999">OFF</option>
            <option value="300">LOW</option>
            <option value="150">MID</option>
            <option value="50">HIGH</option>
            <option value="10">MAX</option>
        </select>
        <div class="dropdown-arrow"></div>
    </div>
</div>

    <button id="clearData" class="inject-button">Clear Data</button>

    <button id="startBot" class="inject-button">Start Bot</button>

    <br><br>

    <button id="injectButton" class="inject-button">Inject</button>
`;

document.body.appendChild(menuContainer);

// Styles
const style = document.createElement('style');
style.textContent = `
    .menu-container {
        position: absolute;
        top: 20px;
        left: 20px;
        padding: 20px;
        background: linear-gradient(135deg, #ff6b6b, #ffe66d);
        border-radius: 20px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        color: #333;
        font-family: 'Roboto', sans-serif;
        z-index: 99999999;
        animation: pulse 2s ease infinite alternate;
    }
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.02);
        }
    }
    .heading {
        margin-bottom: 10px;
        font-size: 1.5em;
        color: #fff;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    .author {
        margin-bottom: 20px;
        font-size: 1.1em;
        color: #fff;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    .input-row {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .input-row label {
        margin-right: 10px;
        color: #fff;
    }
    .custom-dropdown {
        position: relative;
        width: 70px;
    }
    .custom-dropdown select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding: 8px;
        border-radius: 10px;
        border: none;
        background-color: rgba(255, 255, 255, 0.5);
        color: #333;
        font-family: 'Roboto', sans-serif;
        width: 110%;
        cursor: pointer;
    }
    .dropdown-arrow {
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #666;
        pointer-events: none;
    }
    .custom-input {
        padding: 8px;
        border-radius: 10px;
        border: none;
        background-color: rgba(255, 255, 255, 0.5);
        color: #333;
        font-family: 'Roboto', sans-serif;
        width: 100px;
    }
    .inject-button {
        background-color: #4d4dff;
        color: #ffffff;
        padding: 10px 20px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .inject-button:hover {
        background-color: #333;
    }
`;

document.head.appendChild(style);


function main() {
    var cus = document.getElementById('custom');
    var cus_val = cus.value;

    var score = document.getElementById('score');
    var score_val = score.value;

    var xDropdown = document.getElementById('x');
    var x_val = xDropdown.value;
    if (x_val != 0) {
        x_val -= 1;
    }

    var yDropdown = document.getElementById('y');
    var y_val = yDropdown.value;
    if (y_val != 0) {
        y_val -= 1;
    }

    var dataDropdown = document.getElementById('value');
    var data_inj = dataDropdown.value;

    var originalGameState = localStorage.getItem('gameState');
    var gameState;
    if (originalGameState) {
        gameState = JSON.parse(originalGameState);
    } else {
        var gridSize = 4;
        var grid = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => null));
        gameState = {
            grid: {
                size: gridSize,
                cells: grid
            },
            score: 0,
            over: false,
            won: false,
            keepPlaying: false
        };
    }
    /*
    0,0     1,0     2,0     3,0
    0,1     1,1     2,1     3,1
    0,2     1,2     2,2     3,2
    0,3     1,3     2,3     3,3
    */
    if (cus_val == 0) {
        gameState.grid.cells[x_val][y_val] = { position: { x: x_val, y: y_val }, value: data_inj };
    } else {
        gameState.grid.cells[x_val][y_val] = { position: { x: x_val, y: y_val }, value: cus_val };
    }
    if (score_val != 0){
        gameState.score = score_val;
    }
    
    localStorage.setItem('gameState', JSON.stringify(gameState));
    location.reload();
}

function whipe(){
    localStorage.clear();
    console.clear();
    location.reload();
}

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

var botID;

function startBOT() {
    clearInterval(botID);
    var speed_raw = document.getElementById('botspeed');
    var SPEED = parseInt(speed_raw.value);
    if (SPEED != 999) {
        botID = setInterval(selectCase, SPEED);
    }
}


injectButton.addEventListener('click', main);

clearData.addEventListener('click', whipe);

startBot.addEventListener('click', startBOT);
