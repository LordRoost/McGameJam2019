var sprites = {};
var player = {};
var zombies = [];
var bullets = [];

var gameState = 1;
var maxTime = 2;
var timer = maxTime;

var myFont = null;

var score = 0;

love.load = function()
{
    sprites.player = love.graphics.newImage('sprites/player.png');
    sprites.bullet = love.graphics.newImage('sprites/bullet.png');
    sprites.zombie = love.graphics.newImage('sprites/zombie.png');
    sprites.background = love.graphics.newImage('sprites/background.png');

    player.x = love.graphics.getWidth()/2;
    player.y = love.graphics.getHeight()/2;
    player.speed = 180;

    myFont = love.graphics.newFont(40);
}

love.update = function(dt)
{
    if(gameState == 2)
    {
        if(love.keyboard.isDown("s") && player.y < love.graphics.getHeight())
        {
            player.y += player.speed*dt;
        }

        if(love.keyboard.isDown("w") && player.y > 0)
        {
            player.y -= player.speed*dt;
        }

        if(love.keyboard.isDown("a") && player.x > 0)
        {
            player.x -= player.speed*dt;
        }

        if(love.keyboard.isDown("d") && player.x < love.graphics.getWidth())
        {
            player.x += player.speed*dt;
        }
    }

    var i = 0;
    var z = null;
    for(i=0;i<zombies.length;i++)
    {
        z = zombies[i];

        if(z.dead)
        {
            table.remove(zombies,i);
            i--;
            continue;
        }

        z.x += math.cos(zombie_player_angle(z)) * z.speed * dt;
        z.y += math.sin(zombie_player_angle(z)) * z.speed * dt;

        if(distanceBetween(z.x,z.y,player.x,player.y) < 30)
        {
            zombies = [];
            maxTime = 2;
            timer = maxTime;
            gameState = 1;
            player.x = love.graphics.getWidth()/2;
            player.y = love.graphics.getHeight()/2;
            break;
        }
    }

    var b = null;
    for(i=0;i<bullets.length;i++)
    {
        b = bullets[i];

        if(b.dead)
        {
            table.remove(bullets,i);
            i--;
            continue;
        }

        b.x += math.cos(b.direction) * b.speed * dt;
        b.y += math.sin(b.direction) * b.speed * dt;

        if(b.x < 0 || b.y < 0 || b.x > love.graphics.getWidth() || b.y > love.graphics.getHeight())
        {
            table.remove(bullets, i);
            i--;
        }
    }

    var j=0;
    for(i=0;i<zombies.length;i++)
    {
        z = zombies[i];
        for(j=0;j<bullets.length;j++)
        {
            b = bullets[j];
            if(distanceBetween(z.x,z.y,b.x,b.y) < 20)
            {
                z.dead = true;
                b.dead = true;
                score++;
            }
        }
    }

    if(gameState == 2)
    {
        timer -= dt;
        if(timer <= 0)
        {
            spawnZombie();
            maxTime = maxTime * 0.95;
            timer = maxTime;
        }
    }
}

love.draw = function()
{
    love.graphics.draw(sprites.background, 0, 0);

    love.graphics.setFont(myFont);
    love.graphics.printf("Score: "+score,0, love.graphics.getHeight()-100, love.graphics.getWidth(), "center");

    love.graphics.draw(sprites.player, player.x, player.y, player_mouse_angle(), nil, nil, sprites.player.getWidth()/2, sprites.player.getHeight()/2);

    if(gameState == 1)
    {
        love.graphics.printf("Click anywhere to begin!", 0, 50, love.graphics.getWidth(), "center");
    }


    //draw zombies
    var i=0;
    var z = null;
    for(i=0;i<zombies.length;i++)
    {
        z = zombies[i];
        love.graphics.draw(sprites.zombie, z.x, z.y, zombie_player_angle(z), nil, nil, sprites.zombie.getWidth()/2, sprites.zombie.getHeight()/2);
    }

    var b = null;
    for(i=0;i<bullets.length;i++)
    {
        b = bullets[i];
        love.graphics.draw(sprites.bullet, b.x, b.y, nil, 0.5, 0.5, sprites.bullet.getWidth()/2, sprites.bullet.getHeight()/2);
    }
}


function player_mouse_angle()
{
    return math.atan2(love.mouse.getY() - player.y, love.mouse.getX() - player.x);
}

function zombie_player_angle(enemy)
{
    return math.atan2(player.y - enemy.y, player.x - enemy.x);
}

function spawnZombie()
{
    var zombie = {};
    zombie.x = 0;
    zombie.y = 0;
    zombie.speed = 140;
    zombie.dead = false;

    var side = math.random(1,4);

    if(side == 1)
    {
        zombie.x = -30;
        zombie.y = math.random(0,love.graphics.getHeight());
    }
    else if(side == 2)
    {
        zombie.x = math.random(0, love.graphics.getWidth());
        zombie.y = -30;
    }
    else if(side == 3)
    {
        zombie.x = love.graphics.getWidth()+30;
        zombie.y = math.random(0,love.graphics.getHeight());
    }
    else
    {
        zombie.x = math.random(0, love.graphics.getWidth());
        zombie.y = love.graphics.getHeight()+30;
    }

    table.insert(zombies, zombie);
}

function spawnBullet()
{
    bullet = {};
    bullet.x = player.x;
    bullet.y = player.y;
    bullet.speed = 500;
    bullet.direction = player_mouse_angle();
    bullet.dead = false;

    table.insert(bullets, bullet);
}

love.keypressed = function(key, scancode, isrepeat)
{
    if(key == "space")
    {
        spawnZombie();
    }
}

love.mousepressed = function (x,y,b,isTouch)
{
    if(gameState == 1)
    {
        gameState = 2;
        maxTime = 2;
        timer = 2;
        score = 0;
    }
    else
    {
        if(b==1)
        {
            spawnBullet();
        }
    }
}

function distanceBetween(x1, y1, x2, y2)
{
    return math.sqrt((y2-y1)**2 + (x2-x1)**2);
}