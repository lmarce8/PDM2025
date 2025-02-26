
let startContext, samples, sampler, button1, button2, button3, button4, button5, button6, button7, button8, delTimeSlider, feedbackSlider, distSlider, wetSlider;

let rev = new Tone.Reverb(0.5).toDestination()
let dist = new Tone.Distortion(0).connect(rev)
let del = new Tone.FeedbackDelay(0, 0).connect(dist)
del.wet.value = 0.5;

//load audio in preload function
function preload() {
  samples = new Tone.Players({
    bang: "media/bang.mp3",         //1
    boat: "media/boat.mp3",         //2
    bounce: "media/bounce.mp3",     //3
    heavy: "media/heavy.mp3",       //4
    pingpong: "media/pingpong.mp3", //5
    siren: "media/siren.mp3",       //6
    twinkle: "media/twinkle.mp3",   //7
    whistle: "media/whistle.mp3"    //8
  }).connect(del)
}

function setup() {
  createCanvas(800, 250);
  
  startContext = createButton("Start Audio Context");
  startContext.position(0,0);
  startContext.mousePressed(startAudioContext)
  

  //Buttons for Audio
  
  button1 = createButton("Banging");
  button1.position (15,30);
  button2 = createButton("Boat Horn");
  button2.position (205,30);
  button3 = createButton("Spring");
  button3.position (405,30);
  button4 = createButton("Heart Beat");
  button4.position (605,30);
  button5 = createButton("Ping Pong Ball");
  button5.position (15,100);
  button6 = createButton("Siren");
  button6.position (205,100);
  button7 = createButton("Twinkle");
  button7.position (405,100);
  button8 = createButton("Whistle");
  button8.position (605,100);
 


  //Starts Audio
  button1.mousePressed(() => {samples.player("bang").start()})
  button2.mousePressed(() => {samples.player("boat").start()})
  button3.mousePressed(() => {samples.player("bounce").start()})
  button4.mousePressed(() => {samples.player("heavy").start()})
  button5.mousePressed(() => {samples.player("pingpong").start()})
  button6.mousePressed(() => {samples.player("siren").start()})
  button7.mousePressed(() => {samples.player("twinkle").start()})
  button8.mousePressed(() => {samples.player("whistle").start()})


  // DelayTime Slider
  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(10, 200);
  delTimeSlider.input(() => {del.delayTime.value = delTimeSlider.value()}) //map value of delayTime to value of slider
  // Feedback Slider
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 200);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()})
  // Distortion Slider
  distSlider = createSlider(0, 10, 0.01);
  distSlider.position(400, 200);
  distSlider.input(() => {dist.distortion = distSlider.value()});
  // Wet Slider
  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(600,200);
  wetSlider.input(() => {rev.wet.value = wetSlider.value()});
}

// Label Sliders
function draw() {
  background(220);
  text("Delay Time: " + delTimeSlider.value(), 15, 190); 
  text("Feedback Amount: " + feedbackSlider.value(), 205, 190);
  text("Distortion Amount: " + distSlider.value(), 405, 190);
  text("Reverb Wet Amount: " + wetSlider.value(), 605, 190);
}

//funtion to start the audio context
function startAudioContext() {
  if (Tone.context.state != 'running') {
    //starts the audio context
    Tone.start(); //must be triggered by user interaction (click or key click) 
    console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already running")
  }

}