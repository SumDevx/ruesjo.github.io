var facts=[
    "2.Sun orbits the solar system at the speed of 820,000 km an hour.",
    "3.Many scientists claim that the sun is supposed to be 4.603 billion years old.",
    "4.Sun is a perfect sphere in shape and is 109 times wider than earth.",
    "5.Sun is the source of light and energy to our planet earth "
    ];
  var images=[
    "https://i.postimg.cc/7YnKKN3m/sun2.png",
    "https://i.postimg.cc/yxqLbQpr/sun3.png",
    "https://i.postimg.cc/wTpW5rm1/sun4.png",
    "https://i.postimg.cc/D0qxkrtf/sun5.png"
  ];

  var i=0;
  function sunfacts(){
    document.getElementById("one").innerHTML=facts[i];
    document.getElementById("sunimage").src=images[i];
    i++;
    if(i==4){
      i=0;
    }}
  
  
  var reasons=[
    "2. 70% of the Earth’s Surface is Covered in Water.",
    "3.  The Earth’s Atmosphere Extends to a Distance of 10,000 km",
    "4. The Earth’s Molten Iron Core Creates a Magnetic Field.",
    "5. Earth has 1 Moon and 2 Co-Orbital Satellites."
    ];
  var pictures=[
    "https://i.postimg.cc/T2r0Pc4f/earth8.png",
    "https://i.postimg.cc/HxM2X0W0/earth2.png",
    "https://i.postimg.cc/PJkM4LNg/earth7.png",
    "https://i.postimg.cc/Hnpzxpsb/earth3.png"
  ];
  var i=0;
  function earthfacts(){
    document.getElementById("first").innerHTML=reasons[i];
    document.getElementById("earthimage").src=pictures[i];
    i++;
    if(i==4){
      i=0;
    }}

    //kj]

    // helper functions
const PI2 = Math.PI * 2
const random = (min, max) => Math.random() * (max - min + 1) + min | 0
const timestamp = _ => new Date().getTime()

// container
class Birthday {
  constructor() {
    this.resize()

    // create a lovely place to store the firework
    this.fireworks = []
    this.counter = 0

  }
  
  resize() {
    this.width = canvas.width = window.innerWidth
    let center = this.width / 2 | 0
    this.spawnA = center - center / 4 | 0
    this.spawnB = center + center / 4 | 0
    
    this.height = canvas.height = window.innerHeight
    this.spawnC = this.height * .1
    this.spawnD = this.height * .5
    
  }
  
  onClick(evt) {
     let x = evt.clientX || evt.touches && evt.touches[0].pageX
     let y = evt.clientY || evt.touches && evt.touches[0].pageY
     
     let count = random(3,5)
     for(let i = 0; i < count; i++) this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        x,
        y,
        random(0, 260),
        random(30, 110)))
          
     this.counter = -1
     
  }
  
  update(delta) {
    ctx.globalCompositeOperation = 'difference'
    ctx.fillStyle = `rgba(20,20,20,${ 7 * delta })`
    
    ctx.clearRect(0, 0, this.width, this.height)

    ctx.globalCompositeOperation = 'lighter'
    for (let firework of this.fireworks) firework.update(delta)

    // if enough time passed... create new firework
    this.counter += delta * 3 // each second
    if (this.counter >= 1) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        random(0, this.width),
        random(this.spawnC, this.spawnD),
        random(0, 360),
        random(30, 110)))
      this.counter = 0
    }

    // remove the dead fireworks
    if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

  }
}

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false
    this.offsprings = offsprings

    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY

    this.shade = shade
    this.history = []
  }
  update(delta) {
    if (this.dead) return

    let xDiff = this.targetX - this.x
    let yDiff = this.targetY - this.y
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
      this.x += xDiff * 2 * delta
      this.y += yDiff * 2 * delta

      this.history.push({
        x: this.x,
        y: this.y
      })

      if (this.history.length > 20) this.history.shift()

    } else {
      if (this.offsprings && !this.madeChilds) {
        
        let babies = this.offsprings / 2
        for (let i = 0; i < babies; i++) {
          let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
          let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

          birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

        }

      }
      this.madeChilds = true
      this.history.shift()
    }
    
    if (this.history.length === 0) this.dead = true
    else if (this.offsprings) { 
        for (let i = 0; this.history.length > i; i++) {
          let point = this.history[i]
          ctx.beginPath()
          ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
          ctx.arc(point.x, point.y, 1, 0, PI2, false)
          ctx.fill()
        } 
      } else {
      ctx.beginPath()
      ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
      ctx.arc(this.x, this.y, 1, 0, PI2, false)
      ctx.fill()
    }

  }
}

let canvas = document.getElementById('birthday')
let ctx = canvas.getContext('2d')

let then = timestamp()

let birthday = new Birthday
window.onresize = () => birthday.resize()
document.onclick = evt => birthday.onClick(evt)
document.ontouchstart = evt => birthday.onClick(evt)

// document.getElementById("birthday").style.background = "url('https://i.postimg.cc/pXfywS0Q/lookatthesky.png')";

// var background= new Image();
//background.src= "https://i.postimg.cc/pXfywS0Q/lookatthesky.png"

//background.onload = function(){
//  ctx.drawImage(background,0,0);
//}

  ;(function loop(){
  	requestAnimationFrame(loop)

  	let now = timestamp()
  	let delta = now - then

    then = now
    birthday.update(delta / 1000)
  	

  })()

 // $(document).bind("contextmenu",function(e){
 //   return false;
 //     });
      

 //timer countup js code for time increment

 window.onload = function() {
  // Month Day, Year Hour:Minute:Second, id-of-element-container
  countUpFromTime("Nov 27, 2018 17:00:00", 'countup1'); // ****** Change this line!
};
function countUpFromTime(countFrom, id) {
  countFrom = new Date(countFrom).getTime();
  var now = new Date(),
      countFrom = new Date(countFrom),
      timeDifference = (now - countFrom);
    
  var secondsInADay = 60 * 60 * 1000 * 24,
      secondsInAHour = 60 * 60 * 1000;
    
  days = Math.floor(timeDifference / (secondsInADay) * 1);
  years = Math.floor(days / 365);
  if (years > 1){ days = days - (years * 365) }
  hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
  mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
  secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);

  var idEl = document.getElementById(id);
  idEl.getElementsByClassName('years')[0].innerHTML = years;
  idEl.getElementsByClassName('days')[0].innerHTML = days;
  idEl.getElementsByClassName('hours')[0].innerHTML = hours;
  idEl.getElementsByClassName('minutes')[0].innerHTML = mins;
  idEl.getElementsByClassName('seconds')[0].innerHTML = secs;

  clearTimeout(countUpFromTime.interval);
  countUpFromTime.interval = setTimeout(function(){ countUpFromTime(countFrom, id); }, 1000);
}



// New Timer Code here


// Timer Banner to Auto-Destruct

// Declare time variables and link them to math.floor function to calculate DD:HH:MM:SS
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = ('00' + t.days).slice(-2);
      hoursSpan.innerHTML = ('00' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('00' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('00' + t.seconds).slice(-2);

      if (t.total <= 0) {
          clearInterval(timeinterval);
          $('.countdown').remove();
      }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
var deadline = 'May 17, 2024 00:00 UTC+0530';
initializeClock('countdown', deadline);