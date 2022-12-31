score=0;
cross=true;

audio=new Audio('music.mp3')
audiogo=new Audio('gameover.mp3')

setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown=function(e){
    //console.log("Key code is: ",e.keyCode)
    if(e.keyCode==38){
        player=document.querySelector('.player');
        player.classList.add('animatep')
        setTimeout(() => {
            player.classList.remove('animatep');
        }, 1000);
    }

    if(e.keyCode==39){
        player=document.querySelector('.player');
        currx=parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
        player.style.left = currx + 150 + "px";
    }

    if(e.keyCode==37){
        player=document.querySelector('.player');
        currx=parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
        player.style.left = (currx - 150) + "px";
    }
}

setInterval(() => {
    player = document.querySelector('.player');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    px=parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
    py=parseInt(window.getComputedStyle(player,null).getPropertyValue('top'));

    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetx=Math.abs(px-ox);
    offsety=Math.abs(py-oy);

    if(offsetx<100 && offsety<70)
    {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('animateo');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
 
    }
    else if(offsetx<130 && cross){
        score=score+1;
        updatescore(score);
        cross=false;
        setTimeout(() => {
            cross=true;
        }, 1000);

        setInterval(() => {
            anidur=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            if(anidur>=4)   newdur=anidur-0.01;
            else            newdur=anidur;
            console.log("newdur is: ",anidur)
            obstacle.style.animationDuration=newdur+'s';
        }, 500);

    }

}, 50);

function updatescore(score){
    scorecnt.innerHTML="Your Score: " + score
}