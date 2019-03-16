var love = new Love(document.getElementById("canvas"));
var table = new Table();
var math = new CustomMath();
var nil = null;

var electron_filesystem = null;

if(requireElectron)
{
    electron_filesystem = require('fs');
}

function run()
{
    love.updateDeltaTime();

    love.update(love.deltaTime);

    love.graphics.clear();
    love.draw();

    requestAnimationFrame(run);
}

document.getElementById('canvas').onmousedown = function(e)
{
    love.mousepressed(
        (e.x-love.canvasBounds.left)*love.pixelDensity,
        (e.y-love.canvasBounds.top)*love.pixelDensity,
        e.button+1,
        false
    );
}

document.getElementById('canvas').addEventListener('mousemove', function(evt) {
    love.mouse.cursorPosX = (evt.clientX - love.canvasBounds.left)*love.pixelDensity;
    love.mouse.cursorPosY = (evt.clientY - love.canvasBounds.top)*love.pixelDensity;
}, false);

window.onkeyup = function(e)
{
    love.keyboard.keyUp(e.keyCode);
}


window.onkeydown = function(e)
{
    //alert(e.keyCode);
    love.keyboard.keyDown(e.keyCode);
    love.keypressed(love.keyboard.keyMap[e.keyCode],e.keyCode,false);
}