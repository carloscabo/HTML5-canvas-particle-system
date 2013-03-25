var
  animID, ww, wh;

var stopAnim = function () {
  window.cancelAnimationFrame(animID)
  animID = undefined;
}

$(document).ready(function() {

  /* VARIABLES Y CONSTANTES ---------------------------- */
  var
  $mibodi = $('#mibodi'),
  $micanvas = $('#micanvas'),
  bw = $mibodi.width(),
  bh = $mibodi.height();
  ww = 800;
  wh = 512;
  //ww = document.documentElement.clientWidth;
  //wh = document.documentElement.clientHeight;

  $micanvas.attr('width', ww);
  $micanvas.attr('height', wh);
  $micanvas.css('left', (bw/2 - ww/2));
  $micanvas.css('top', bh/2 - wh/2);
  $micanvas.css('background-color', '#242424');

  ctx = document.getElementById('micanvas').getContext('2d');
  /*ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;*/

/* ---------------------------------------------------- */
//OBJETOS

// Particle systems array
var ps = [];

var ps1_options = {
    // Particle system
    pnum: 60,
    posi: new PVector(150, 150),
    bounds: [ -50, -50, 512, 512 ],

    // Particles only
    velo: {
      x: { min: -1, max: 1 },
      y: { min: -1, max: 1 }
    },
    acel: { x: 0, y: 0 },
    angl: {
      min: -9,
      max: 9,
      dec: 0.05
    },
    f__c: 0,
    life: 3000,
    rate: 50
};
ps.push (new ParticleSystem (ps1_options));

var ps2_options = {
    pnum: 60,
    posi: new PVector(150, 500),
    bounds: [ -50, -50, 512, 512 ],

    // Particles only
    velo: {
      x: { min: -2, max: 2 },
      y: { min: -6, max: -2 }
    },
    acel: { x: 0, y: 0.1 },
    angl: {
      min: -9,
      max: 9,
      dec: 0.05
    },
    f__c: 0,
    life: 3000,
    rate: 50
};
ps.push (new ParticleSystem (ps2_options));

var ps3_options = {
    // Particle system
    pnum: 60,
    posi: new PVector(400, 500),
    bounds: [ -50, -50, 512, 512 ],

    // Particles only
    velo: {
      x: { min: -1, max: 1 },
      y: { min: -4, max: -4 }
    },
    acel: { x: 0, y: 0.05 },
    angl: {
      min: -9,
      max: 9,
      dec: 0.05
    },
    f__c: 0,
    life: 3000,
    rate: 50
};
ps.push (new ParticleSystem (ps3_options));

var ps4_options = {
    // Particle system
    pnum: 60,
    posi: new PVector(400, 150),
    bounds: [ -50, -50, 512, 512 ],

    // Particles only
    velo: {
      x: { min: -3, max: 3 },
      y: { min: -3, max: 3 }
    },
    acel: { x: 0, y: 0 },
    angl: {
      min: -9,
      max: 9,
      dec: 0.05
    },
    f__c: 0.001,
    life: 1000,
    rate: 0
};
ps.push (new ParticleSystem (ps4_options));

var ps5_options = {
    // Particle system
    pnum: 60,
    posi: new PVector(750, 256),
    bounds: [ -50, -50, 512, 512 ],

    // Particles only
    velo: {
      x: { min: -10, max: -5 },
      y: { min: -0.5, max: 0.5 }
    },
    acel: { x: -0.1, y: 0 },
    angl: {
      min: -1,
      max: 1,
      dec: -0.1
    },
    f__c: 0,
    life: 3000,
    rate: 60
};
ps.push (new ParticleSystem (ps5_options));

var ps6_options = {
    // Particle system
    pnum: 60,
    posi: new PVector(750, 50),
    bounds: [ -50, -50, 512, 512 ],

    // Particles only
    velo: {
      x: { min: -0.5, max: 0.5 },
      y: { min: 0, max: 0 }
    },
    acel: { x: 0, y: 0.05 },
    angl: {
      min: -1,
      max: 1,
      dec: -0.1
    },
    f__c: 0,
    life: 5000,
    rate: 100
};
ps.push (new ParticleSystem (ps6_options));

var ps7_options = {
    // Particle system
    pnum: 100,
    posi: [
      new PVector(550, 400),
      new PVector(650, 500)
    ],
    bounds: [ -50, -50, 512, 512 ],

    // Particles only
    velo: {
      x: { min: -0.1, max: 0.1 },
      y: { min: 0, max: -2 }
    },
    acel: { x: 0, y: -0.01 },
    angl: {
      min: -1,
      max: 1,
      dec: 0.1
    },
    f__c: 0,
    life: 3500,
    rate: 100
};
ps.push (new ParticleSystem (ps7_options));



/* ---------------------------------------------------- */
//FUNCIÓN DE INICIALIZACIÓN

function init() {
    //CLEAR CANVAS
    ctx.fillStyle = 'rgba(36,36,36,1)';
    ctx.fillRect (0, 0, ww, wh);

    animate();

    // cancelRequestAnimFrame to stop the loop in 1 second
    /*setTimeout(function(){
        window.cancelAnimationFrame(animID);
    }, 1*1000);*/
} //INIT

/* ---------------------------------------------------- */
//FUNCIÓN DE DIBUJADO

var time;

function animate() {
  animID = requestAnimationFrame(animate);
  draw();
}

function draw() {
  //ANIMAR
  var now = new Date().getTime(), lastFrame = now - (time || now);
  time = now;
  //console.log(lastFrame); //DIFERENCIA TIEMPO

  // Clear canvas
  ctx.fillStyle = 'rgba(36,36,36,0.2)';
  ctx.fillRect(0, 0, ww, wh);

  for (var i = ps.length - 1; i >= 0; i--) {
    if (ps[i].particles.length == 0 && ps[i].set.plimit == 0) {
      console.log('Dead!');
      ps.splice(i, 1); // Delete particle system
    } else {
      ps[i].render();

    }
  };
} //DRAW


/* ---------------------------------------------------- */
//EVENTO SAVE CANVAS

/*$('a#save-canvas-button').click(function (e) {
  e.preventDefault();
  snt.saveCanvasToPng();
});*/



/* ---------------------------------------------------- */
//INICIALIZA EL DIBUJADO
init();

});
