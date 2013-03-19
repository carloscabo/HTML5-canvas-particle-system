HTML5-canvas-particle-system
============================

Basic particle system done in HTML5 / Canvas / Javascript

![Alt text](/img/sample.jpg "Optional title")

This is a pre-release, some parts are still unfinished or are buggy (specially the friction part).

Based upon the fantastic explanations you can find in http://thenatureofcode.com (a must buy). My kudos for Daniel @shiffman .

Great thanks to @vortizhe and @antarticonorte for their help of my JS progress. The errors / bugs you may find are only my responsibility ;D


Usage
=====

I think the best way to understand all the parameters is playing with them at: <http://jsfiddle.net/DgqCm/1/>


But for the record a little explanation:

  
  var ps_options = {
      // Particle system settings.
      // Max number of simultaneous particles "alive" (see below)
      pnum: 100, 
      
      // Position of the particle emitter.
      // If you pass an array of two points the particles
      // will born at any point over the imaginary line that
      // connects that points.
      posi: [
        new PVector(550, 400),
        new PVector(650, 500)
      ],
      // Particles are "killed" if are outside this limits.
      // (usually fixed to the canvas limits).
      // In the following sample data:
      // P1(x: -50, y: -50 ) P2 (x: 512, y: 512)
      bounds: [ -50, -50, 512, 512 ],

      // Particles settings
      // Velocity
      // The initial particle velocity will be a random float
      // between the min and max values.
      velo: {
        x: { min: -0.1, max: 0.1 },
        y: { min: 0, max: -2 }
      },

      // Acceleration in both axis.
      acel: { x: 0, y: -0.01 },
         
      // Rotation angle.
      // Will be a random value between max and min limits.
      // dec: defines a increase or decreae in the angle value
      // each time the particle "is drawn".
      angl: {
        min: -1,
        max: 1,
        dec: 0.1
      },
      // Friction.
      // Still in beta stage.
      f__c: 0,
      
      // Life (in ms).
      // Time until the particle is killed.
      life: 3500,
      
      // Creation rate (in ms)
      // Defines the "delay" between each particle generation.
      // The lower the faster.
      rate: 100
  };
  
  // Creates the particle ssytem
  ps = new ParticleSystem (ps7_options);
  
  // Draw it!
  ps.render();
