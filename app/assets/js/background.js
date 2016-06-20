// Credit: http://codepen.io/abergin/pen/JBmhC

(function() {
  var ShapeController,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ShapeController = (function() {
    function ShapeController() {
      this.render = bind(this.render, this);
      this.draw = bind(this.draw, this);
    }

    ShapeController.prototype.shapes = [];

    ShapeController.prototype.frame = new Date().getTime();

    ShapeController.prototype.vel = {
      scrollX: 100,
      scrollY: 100
    };

    ShapeController.prototype.data = {
      amount: 50,
      scale: 0.1,
      minVel: 0.2,
      maxVel: 0.8,
      allowShuffle: true,
      colors: [" #ffe44d", "#f58d17", "#009a5b", "#adc459" , "#e84253", "#a0d9e0"],
      shapes: {
        rectangle: [
          {
            x: 0.33,
            y: -0.33
          }, {
            x: 0.66,
            y: -0.33
          }, {
            x: 0.66,
            y: 1.33
          }, {
            x: 0.33,
            y: 1.33
          }, {
            x: 0.33,
            y: -0.33
          }
        ],
        triangle: [
          {
            x: 0.5,
            y: 0.07
          }, {
            x: 1.0,
            y: 0.93
          }, {
            x: 0.0,
            y: 0.93
          }, {
            x: 0.5,
            y: 0.07
          }
        ],
        circle: [1],
        cross: [
          {
            x: 0.33,
            y: 0.00
          }, {
            x: 0.66,
            y: 0.00
          }, {
            x: 0.66,
            y: 0.33
          }, {
            x: 1.00,
            y: 0.33
          }, {
            x: 1.00,
            y: 0.66
          }, {
            x: 0.66,
            y: 0.66
          }, {
            x: 0.66,
            y: 1.00
          }, {
            x: 0.33,
            y: 1.00
          }, {
            x: 0.33,
            y: 0.66
          }, {
            x: 0.00,
            y: 0.66
          }, {
            x: 0.00,
            y: 0.33
          }, {
            x: 0.33,
            y: 0.33
          }, {
            x: 0.33,
            y: 0.00
          }
        ]
      }
    };

    ShapeController.prototype.init = function() {
      this.getElements();
      this.initShapes();
      return this.render();
    };

    ShapeController.prototype.getElements = function() {
      this.el = document.getElementsByTagName("canvas")[0];
      return this.stage = this.el.getContext("2d");
    };

    ShapeController.prototype.initShapes = function() {
      var i;
      i = 0;
      while (i < this.data.amount) {
        this.addShape();
        i++;
      }
      return console.log(this.shapes);
    };

    ShapeController.prototype.addShape = function(type, color, x, y, r, xvel, yvel, rvel) {
      var buffer, colors, dir, types, vel;
      buffer = this.data.scale * 250;
      types = Object.getOwnPropertyNames(this.data.shapes);
      if (type === void 0 || types.indexOf(type) === -1) {
        type = types[Math.floor(Math.random() * types.length)];
      }
      colors = this.data.colors;
      if (color === void 0 || colors.indexOf(color) === -1) {
        color = colors[Math.floor(Math.random() * colors.length)];
      }
      if (x === void 0) {
        x = -buffer + Math.random() * (window.innerWidth + (2 * buffer));
      }
      if (y === void 0) {
        y = -buffer + Math.random() * (window.innerHeight + (2 * buffer));
      }
      if (r === void 0) {
        r = Math.random() * 360;
      }
      if (xvel === void 0) {
        dir = 0;
        vel = this.data.minVel + (Math.random() * (this.data.maxVel - this.data.minVel));
        if (Math.random() > 0.5) {
          dir = -1;
        } else {
          dir = 1;
        }
        xvel = dir * vel;
      }
      if (yvel === void 0) {
        dir = 0;
        vel = this.data.minVel + (Math.random() * (this.data.maxVel - this.data.minVel));
        if (Math.random() > 0.5) {
          dir = -1;
        } else {
          dir = 1;
        }
        yvel = dir * vel;
      }
      if (rvel === void 0) {
        dir = 0;
        vel = this.data.minVel + (Math.random() * (this.data.maxVel - this.data.minVel));
        if (Math.random() > 0.5) {
          dir = -1;
        } else {
          dir = 1;
        }
        rvel = dir * vel;
      }
      return this.shapes.push({
        type: type,
        color: color,
        mult: 0.5 + Math.random() * 2,
        pos: {
          x: x,
          y: y,
          r: r
        },
        vel: {
          x: xvel,
          y: yvel,
          r: rvel
        }
      });
    };

    ShapeController.prototype.repo = function(shape, rate) {
      var buffer, color, colors, shuffle, type, types;
      buffer = this.data.scale * 250;
      shape.pos.x += (shape.vel.x + (this.vel.scrollX * shape.mult)) * (rate / (1000 / 60));
      shape.pos.y += (shape.vel.y + (this.vel.scrollY * shape.mult)) * (rate / (1000 / 60));
      shape.pos.r += (shape.vel.r / 2) * (rate / (1000 / 60));
      shuffle = false;
      if (shape.pos.x > window.innerWidth + buffer) {
        shape.pos.x = -buffer;
        shuffle = true;
      }
      if (shape.pos.x < -buffer) {
        shape.pos.x = window.innerWidth + buffer;
        shuffle = true;
      }
      if (shape.pos.y > window.innerHeight + buffer) {
        shape.pos.y = -buffer;
        shuffle = true;
      }
      if (shape.pos.y < -buffer) {
        shape.pos.y = window.innerHeight + buffer;
        shuffle = true;
      }
      if (shape.pos.r > 360) {
        shape.pos.r -= 360;
      }
      if (shape.pos.r < 0) {
        shape.pos.r += 360;
      }
      if (shuffle === true && this.data.allowShuffle === true) {
        types = Object.getOwnPropertyNames(this.data.shapes);
        colors = this.data.colors;
        type = types[Math.floor(Math.random() * types.length)];
        color = colors[Math.floor(Math.random() * colors.length)];
        shape.type = type;
        return shape.color = color;
      }
    };

    ShapeController.prototype.draw = function(shape) {
      var c, i, m, p, s, x, y;
      c = this.stage;
      s = shape;
      p = this.data.shapes[s.type];
      m = this.data.scale * 200;
      i = 0;
      c.save();
      c.fillStyle = s.color;
      c.translate(s.pos.x, s.pos.y);
      c.rotate(s.pos.r * (Math.PI / 180));
      c.beginPath();
      if (p.length > 1) {
        while (i < p.length) {
          x = (p[i].x - 0.5) * m;
          y = (p[i].y - 0.5) * m;
          if (i === 0) {
            c.moveTo(x, y);
          } else {
            c.lineTo(x, y);
          }
          i++;
        }
      } else {
        c.arc(0, 0, p[0] * m * 0.5, 0, 2 * Math.PI);
      }
      c.fill();
      return c.restore();
    };

    ShapeController.prototype.scale = function() {
      if (this.width !== window.innerWidth || this.height !== window.innerHeight) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.el.width = document.body.clientWidth;
        return this.el.height = document.body.clientHeight;
      }
    };

    ShapeController.prototype.friction = function(rate) {
      if (Math.abs(this.vel.scrollX) > 0.01) {
        this.vel.scrollX = Math.round(this.vel.scrollX * 0.95 * 1000) / 1000;
      } else {
        this.vel.scrollX = 0;
      }
      if (Math.abs(this.vel.scrollY) > 0.01) {
        return this.vel.scrollY = Math.round(this.vel.scrollY * 0.95 * 1000) / 1000;
      } else {
        return this.vel.scrollY = 0;
      }
    };

    ShapeController.prototype.render = function() {
      var elapsed, i;
      i = 0;
      this.scale();
      elapsed = new Date().getTime();
      this.stage.clearRect(0, 0, this.width, this.height);
      this.friction(elapsed - this.frame);
      while (i < this.shapes.length) {
        this.repo(this.shapes[i], elapsed - this.frame);
        this.draw(this.shapes[i]);
        i++;
      }
      this.frame = elapsed;
      return requestAnimationFrame(this.render);
    };

    return ShapeController;

  })();

  window.App = new ShapeController;

  App.init();

}).call(this);
