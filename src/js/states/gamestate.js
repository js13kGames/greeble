//---gamestate.js------------------------------

states.game = {

  messageDelay: 240,
  messageIndex:  0,

  helpLoops: [
    [
      'CRITICAL SYSTEM FAILURE IMMINENT.',
      'FIND FUEL SOURCE.',
      'WASD / ZASD / ARROWS TO PERAMBULATE',
      'AUX JETS OFFLINE. HOLD LEFT/RIGHT\nTAP JUMP TO MOVE'
    ],

    [
      'MAX ENERGY CAPACITY REACHED.',
      'FIND MISSING COMPONENTS TO INCREASE CAPACITY',
    ],

    [
      'PRESS X TO USE DISINTIGRATOR'
    ],
    [
      ''
    ]

  ],

  step(dt) {
    // if(!s_gameSong){
    //   s_gameSong = true;
    //   gamesong = playSound(sounds.gameMusic, 1, 0, true);
    // }

    if(Key.isDown(Key.r)){
      player.init();
      state = 'menu';
    }
    player.update(dt);
    fuelTimer -= dt;

    if(fuelTimer > 350){
      helpSection = 1;
    } else{
       helpSection = 0;
     }

    this.messageDelay--;
    if(this.messageDelay < 0){
      messages.push(new message(
        this.helpLoops[helpSection][this.messageIndex],
        fuelTimer < 150 ? 27 : 9,
        240
      ))
      this.messageDelay = 240;
      this.messageIndex++;
      if(this.messageIndex > this.helpLoops[helpSection].length){
        this.messageIndex = 0;
      }
    }

  },

  render(dt) {
    renderTarget = SCREEN; clear(0);
    renderSource = BACKGROUND; spr();
    renderTarget = BUFFER; clear(0);
    drawThings();
    renderSource = MIDGROUND; spr();
    player.draw();
    renderSource = FOREGROUND; spr();

    renderTarget= SCREEN;

    if(fuelTimer > 0){
      if(fuelTimer > 15){
        renderSource = BUFFER; spr();
        //renderSource = DEBUG; spr();
      } else{
        if(Math.random() > fuelTimer/15){

          renderTarget = SCREEN; clear(0);
          let i = 1000;
          while(i--)pset(Math.random()*WIDTH, Math.random()*HEIGHT, 27);
          i = 6000;
          while(i--){
            let x = Math.random()*WIDTH,
                y = Math.random()*HEIGHT
            pset(x, y,   ram[BUFFER + x + y * WIDTH] > 0 ? 28 : 0)
          }
        }
      }

    } else state = 'gameover';

    renderTarget = SCREEN;

    text([
      fuelTimer.toFixed(2).toString(),
      WIDTH/2,
      10,
      2,
      2,
      'center',
      'top',
      1,
      fuelTimer < 150 ? 27 : 10,
    ]);

    splodes.forEach(function(splode, index, arr){splode.draw(index)});

    messages.forEach(function(message, index, arr){
      message.draw(index)
    });


  },
}





//---END gamestate.js------------------------------
