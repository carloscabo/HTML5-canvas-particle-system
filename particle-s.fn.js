/*
Based upon the fantastic explanations you can find in
http://thenatureofcode.com (a must buy)

My kudos for Daniel @shiffman

Great thanks to @vortizhe and @antarticonorte for their
help of my JS progress. Errors you may find are only my
resposability ;D

*/

// Utils - - - - -

function getRandomFloat (min, max) {
  if (min == max) {
    return min;
  } else {
    return Math.random() * (max - min) + min;
  }
}

/*
Borrowed from Emre Erkan at:
http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically#answer-8625261
*/

function mergeObj () {
  var obj = {},
  i = 0,
  il = arguments.length,
  key;
  if (il === 0) {
    return obj;
  }
  for (; i < il; i++) {
    for (key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        obj[key] = arguments[i][key];
      }
    }
  }
  return obj;
};

// Draw rectangle
rect = function (x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x-(w/2), y-(h/2), w, h);
  ctx.fill();
} //plot

// Vector - - - - - - - - - - - - - -

function PVector (x, y) {
  this.x = x;
  this.y = y;
} // PVector

// Add and substract vectors
PVector.prototype.add = function (vector) {
  this.x = this.x + vector.x;
  this.y = this.y + vector.y;
}

// Magnitude of vector
PVector.prototype.mag = function () {
  return Math.sqrt((this.x * this.x) + (this.y * this.y));
}

// Multiply vector
PVector.prototype.mult = function (n) {
  this.x = this.x * n;
  this.y = this.y * n;
}

// Normalize
PVector.prototype.normalize = function () {
  var m = this.mag();
  if (m != 0) {
    this.x = this.x / m;
    this.y = this.y / m;
  }
}

// Particle - - - - - - - - - - - - - -

function Particle (opt) {

  this.set = {
    posi: new PVector(0, 0),
    velo: new PVector(0, 0),
    acel: new PVector(0, 0),
    angl: 0,
    adec: 0.01,
    f__c: 0,
    life: 1000,
    born: Date.now()
  };

  this.set = mergeObj (this.set, opt);

  // Friction
  // Revise! It has an extrange behaviour!
  this.set.fric = new PVector(
    this.set.velo.x,
    this.set.velo.y
  );
  this.set.fric.normalize();
  this.set.fric.mult(-1);
  this.set.fric.mult(this.set.f__c);

  // Initilize particle
  this.init();
};

Particle.prototype.init = function () {
  // Magic goes here
};

Particle.prototype.applyForce = function (vector) {
  this.set.acel.add(vector);
};

Particle.prototype.isDead = function () {
  if (Date.now() - this.set.born > this.set.life ) {
    return true;
  } else {
    return false;
  }
};

Particle.prototype.isOutsideBounds = function (wid, hei) {
  var margin = 10;
  if (
    this.set.posi.x < (-1 * margin) ||
    this.set.posi.x > (wid + margin) ||
    this.set.posi.y < (-1 * margin) ||
    this.set.posi.y > (hei + margin)
  ) {
    return true;
  } else {
    return false;
  }
};

Particle.prototype.update = function () {
  this.applyForce  (this.set.fric);
  this.set.velo.add(this.set.acel);
  this.set.posi.add(this.set.velo);
  this.set.angl = this.set.angl - this.set.adec;
};

Particle.prototype.render = function () {
  ctx.save();
  ctx.fillStyle = '#ccc';
  ctx.translate(this.set.posi.x, this.set.posi.y);
  ctx.rotate(this.set.angl);
  rect(0, 0, 12, 4);
  ctx.restore();
};

// Particle system - - - - - - - - - - - - - -

function ParticleSystem (opt) {

  this.particles = [];

  // PS Default settings
  this.set = {
    // Particle system
    pnum: 20,
    posi: new PVector(0, 0),
    bounds: [ -9999, -9999, 9999, 9999 ],
    // Particle only
    velo: {
      x: { min: 0, max: 0 },
      y: { min: 0, max: 0 }
    },
    acel: { x: 0, y: 0 },
    angl: {
      min: 0,
      max: 0,
      dec: 0
    },
    f__c: 0,
    life: 1000,
    rate: 20,
  };

  this.set = mergeObj (this.set, opt);

  // Start PS!
  this.init();
};

ParticleSystem.prototype.debug = function (message) {
  console.log(message);
};

ParticleSystem.prototype.init = function () {
  // Timer
  var self = this;
  this.timer = setInterval(function() { self.addP(); }, self.set.rate);

  // Initial particles
  /*for (var i = this.set.pnum - 1; i >= 0; i--) {
    this.addP();
  };*/
};

// Add particle to system
ParticleSystem.prototype.getPos = function () {

  // Pass values as array
  if (this.set.posi instanceof Array) {
    // Is line
    var x0 = this.set.posi[0].x;
    var y0 = this.set.posi[0].y;
    var x1 = this.set.posi[1].x;
    var y1 = this.set.posi[1].y;

    // Draw line
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.closePath();
    ctx.stroke();

    // Random point in line
    var tp = Math.random();
    var tx = x0 + (x1 - x0) * tp;
    var ty = y0 + (y1 - y0) * tp;

    return [tx, ty];

  } else {
    // Is point (PVector)
    return [this.set.posi.x, this.set.posi.y];
  }

};

// Add particle to system
ParticleSystem.prototype.addP = function () {
  var self = this;

  if (self.particles.length < self.set.pnum) {

    // Get PS pos
    var tpos = self.getPos();

    var single_particle_settings = {
      posi: new PVector(
        tpos[0],
        tpos[1]
      ),
      velo: new PVector(
        getRandomFloat(self.set.velo.x.min, self.set.velo.x.max),
        getRandomFloat(self.set.velo.y.min, self.set.velo.y.max)
      ),
      acel: new PVector(
        self.set.acel.x,
        self.set.acel.y
      ),
      angl: getRandomFloat (self.set.angl.min, self.set.angl.max),
      angd: self.set.angl.dec,
      f__c: self.set.f__c,
      life: self.set.life
    };

    self.particles.push( new Particle(single_particle_settings));

  } // if
};

ParticleSystem.prototype.render = function () {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    this.particles[i].update();
    if (this.particles[i].isDead() ||
        this.particles[i].isOutsideBounds(
          this.set.max_x, this.set.max_y))
    {
      this.particles.splice(i, 1); // Delete Particle
    } else {
      this.particles[i].render();
    }
  };
};
