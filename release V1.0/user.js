const menuContainer = document.createElement('div');
menuContainer.style.position = 'absolute';
menuContainer.style.top = '20px';
menuContainer.style.left = '20px';
menuContainer.style.padding = '20px';
menuContainer.style.backgroundColor = '#1e1e1e';
menuContainer.style.border = '2px solid #4d4dff';
menuContainer.style.borderRadius = '5px';
menuContainer.style.color = '#ffffff';
menuContainer.style.fontFamily = 'Arial, sans-serif';

const heading = document.createElement('h1');
heading.textContent = '2048 Enhancer Beta';
heading.style.marginBottom = '10px';
menuContainer.appendChild(heading);

const inputX = document.createElement('div');
inputX.innerHTML = '<label for="x">x:</label> <select id="x"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select>';
inputX.style.marginBottom = '10px';
menuContainer.appendChild(inputX);

const inputY = document.createElement('div');
inputY.innerHTML = '<label for="y">y:</label> <select id="y"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select>';
inputY.style.marginBottom = '10px';
menuContainer.appendChild(inputY);

const inputValue = document.createElement('div');
inputValue.innerHTML = '<label for="value">value:</label> <select id="value"><option value="2">2</option><option value="4">4</option><option value="8">8</option><option value="16">16</option><option value="32">32</option><option value="64">64</option><option value="128">128</option><option value="256">256</option><option value="512">512</option><option value="1024">1024</option><option value="2048">2048</option></select>';
inputValue.style.marginBottom = '10px';
menuContainer.appendChild(inputValue);

const injectButton = document.createElement('button');
injectButton.textContent = 'inject';
injectButton.style.backgroundColor = '#4d4dff';
injectButton.style.color = '#ffffff';
injectButton.style.padding = '5px 10px';
injectButton.style.border = 'none';
injectButton.style.borderRadius = '5px';
injectButton.style.cursor = 'pointer';
menuContainer.appendChild(injectButton);

document.body.appendChild(menuContainer);

function main() {
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
    gameState.grid.cells[x_val][y_val] = { position: { x: x_val, y: y_val }, value: data_inj };
    localStorage.setItem('gameState', JSON.stringify(gameState));
    location.reload();
}

injectButton.addEventListener('click', main);