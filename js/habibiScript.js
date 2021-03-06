document.addEventListener('DOMContentLoaded', function() {
  // Do after the document fully loaded
});

// ===============================================================
// ================== SHOW/HIDE PAGES - ADMIN ====================
// ===============================================================
var adminCPItems = document.querySelector('.admin-cp-items');
var adminCPBtn = document.querySelector('.admin-cp-button');
adminCPBtn.addEventListener('click', function(){ adminCPItems.classList.toggle('hidden'); }, false);



// ---------------------- Pages ---------------------- //

// Splash Page
var pageSplash = document.querySelector('#pageSplash');
// --
var splashScreenLogo = document.querySelector('#splashScreenLogo');


// Play Delay Page
var pagePlayDelay = document.querySelector('#pagePlayDelay');
// --
var palyDelayCont = document.querySelector('#palyDelayCont');
var playDelayNum = document.querySelector('#playDelayNum');


// Play Area Page
var pagePlayArea = document.querySelector('#pagePlayArea');
// --
var gmStatsTimeProgress = document.querySelector('#gmStatsTimeProgress');
var gmStatsPauseBtn = document.querySelector('#gmStatsPauseBtn');
var gmStatsInfoBtn = document.querySelector('#gmStatsInfoBtn');
var gmStatsScore = document.querySelector('#gmStatsScore');
//var gmStatsLvlNumb = document.querySelector('#gmStatsLvlNumb');
var gameSpace = document.querySelector('#gameSpace');
var gmStatsCurrentTapCount = document.querySelector('#gmStatsCurrentTapCount');
var gmStatsTotalTapCount = document.querySelector('#gmStatsTotalTapCount');

// Game Menu Page
//var pageGameMenu = document.querySelector('#pageGameMenu');
// --
//var newGameBtn = document.querySelector('#newGameBtn');
var highScoresBtn = document.querySelector('#highScoresBtn');
//var aboutBtn = document.querySelector('#aboutBtn');

// Tutorial Page
var pageTutorial = document.querySelector('#pageTutorial');
// --
var tutPgStartGameBtn = document.querySelector('#tutPgStartGameBtn');


// Pause Menu Page
var pagePauseMenu = document.querySelector('#pagePauseMenu');
// --
var lvlPausedScore = document.querySelector('#lvlPausedScore');
var pmRstrtLvlBtn = document.querySelector('#pmRstrtLvlBtn');
var pmCntnuGmBtn = document.querySelector('#pmCntnuGmBtn');

// Level passed page
var pageLevelPassed = document.querySelector('#pageLevelPassed');
// --
var lvlPssdTitle = document.querySelector('#lvlPssdTtl');
var lvlPssdScore = document.querySelector('#lvlPssdScore');
var lvlPssdContinueNextLvlBtn = document.querySelector('#lvlPssdContinueNextLvlBtn');


// You lost page
var pageYouLost = document.querySelector('#pageYouLost');
// --
var lvlLostScore = document.querySelector('#lvlLostScore');
var lvlLostBestScore = document.querySelector('#lvlLostBestScore');
var lvlLostTryAgainBtn = document.querySelector('#lvlLostTryAgainBtn');


// High Score Page
var pageHighScore = document.querySelector('#pageHighScore');
// --
var lvlLostNewHighScore = document.querySelector('#lvlLostNewHighScore');


// About Page
var pageAbout = document.querySelector('#pageAbout');
// --
var abtPageBackBtn = document.querySelector('#abtPageBackBtn');


// ------- Show Hide Pages Control Panel ------- //
var playDelayPageToggle = document.getElementById('playDelayPageToggle');
var playAreaPageToggle = document.getElementById('playAreaPageToggle');
//var gameMenuPageToggle = document.getElementById('gameMenuPageToggle');
var tutorialPageToggle = document.getElementById('tutorialPageToggle');
var pauseMenuPageToggle = document.getElementById('pauseMenuPageToggle');
var levelPassedPageToggle = document.getElementById('levelPassedPageToggle');
var youLostPageToggle = document.getElementById('youLostPageToggle');
var highScorePageToggle = document.getElementById('highScorePageToggle');
//var aboutPageToggle = document.getElementById('aboutPageToggle');
var splashPageToggle = document.getElementById('splashPageToggle');

var pagesTogglesArray = [
  playAreaPageToggle, gameMenuPageToggle, tutorialPageToggle, playDelayPageToggle,
  pauseMenuPageToggle, levelPassedPageToggle,
  youLostPageToggle, highScorePageToggle, aboutPageToggle, splashPageToggle
]
var pagesArray = [
  pagePlayArea, //pageGameMenu, 
  pageTutorial, pagePlayDelay,
  pagePauseMenu, pageLevelPassed, pageYouLost, pageHighScore, //pageAbout, 
  pageSplash
]

// show/hide pages if the checkbox is checked
togglePage = function(pageToggle, page) {
  if (pageToggle.checked) {
    toolsBox.showPage(page);
  } else {
    toolsBox.hidePage(page);
  }
}

// on click event to all toggles on the page to show/hide pages
for (var i = 0; i < pagesTogglesArray.length; i++) {
  pagesTogglesArray[i].addEventListener('click', function(){
    for (var i = 0; i < pagesTogglesArray.length; i++) {
      togglePage(pagesTogglesArray[i], pagesArray[i]);
    }
  }, false);
}
// ===============================================================
// ===============================================================


// ------------- GENERAL FUNCTIONS ------------- //
toolsBox = {
  delay: function(fun, delayTime) {
    var delayAction = setTimeout(fun, delayTime);
  },
  gnrtRndmNum: function() { // generate random number in range
    return 1;
  },
  showPage: function(page) {
    page.style.display = "block";
  },
  hidePage: function(page) {
    page.style.display = "none";
  },
  hideSplashScreen: function() {
    splashScreenLogo.classList.add('fadeOut-animation');
    toolsBox.delay(function() {
      tutText.start();
      toolsBox.showPage(pageTutorial);
      toolsBox.hidePage(pageSplash);
    }, 1500); // Show after 1.5s because the fadeOut-animation takes 0.5s and has 1s delay
  },
  onClickNTouchstart: function(element, fun) { // add click and touchstart event listeners
    element.addEventListener('click', fun, false);
    element.addEventListener('touchstart', fun, false);
  },
  toggleAnimation: function(element, animationClass) { // add animation class and remove it when it's done (to enable repeating it)
    element.classList.add(animationClass);
    element.addEventListener('animationend', function() {
      element.classList.remove(animationClass);
    }, false);
  },
  windowSize: { // get the size of the page
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  },
  pagePlayDelay: {
    updateNumber: function() {
      toolsBox.toggleAnimation(playDelayNum, 'grow-animation');
      playDelayNum.innerHTML = parseInt(playDelayNum.innerHTML, 10) - 1;
    },
    start: function() { // start counting down
      toolsBox.toggleAnimation(playDelayNum, 'grow-animation');
      var timer = setInterval(function(){
        if (playDelayNum.innerHTML > 1) {
          audioPool.playSound(delayCount);
          toolsBox.pagePlayDelay.updateNumber();
        } else {
          clearInterval(timer);
          toolsBox.hidePage(pagePlayDelay);
          playDelayNum.innerHTML = 3;
        }
      },500);
    }
  },
  pageAbout: {
    creditsAnimation:'',
    creditsCont: document.querySelector('.credits-cont'),
    moveCredits: function() {
      var creditsCont = toolsBox.pageAbout.creditsCont;
      toolsBox.pageAbout.creditsAnimation = window.setInterval(function() {
        creditsCont.scrollTop += 2;
        if (creditsCont.scrollTop === creditsCont.scrollHeight-creditsCont.offsetHeight) {
          clearInterval(toolsBox.pageAbout.creditsAnimation);
          creditsCont.scrollTop = 0;
          toolsBox.pageAbout.moveCredits();
        }
      }, 40)
    },
    stopMovingCredits: function() {
      clearInterval(toolsBox.pageAbout.creditsAnimation);
    }
  }
}


// ===============================================================

// ---------------------- Tutorial text ---------------------- //
var tutText = {
  start: function() {
    var example = ["Click to play!"];      
    function textSequence(i) {
      if( example.length  > i ){
        setTimeout(function() {
          document.getElementById("Tutorial_text").innerHTML = example[i];
          textSequence(++i);
        }, 20000); // 1 second (in milliseconds)
      }
    }   
    textSequence(0);
   }
}
// ---------------------- Tutorial text ---------------------- //
var randomplayers = {
  start: function() {
    var example = ["Computer joined","Computer liked", "Player40700 joined", "Player40700 liked","Computer liked","Player1070 joined","Computer liked","Player1070 liked", "Player40700 liked"];      
    var i = document.getElementById("randomplayers");
    function textSequence(i) {
      if( example.length  > i ){
        setTimeout(function() {
          document.getElementById("randomplayers").innerHTML = example[i];
          i.style.display = "block";
          textSequence(++i);
        }, 1000); // 1 second (in milliseconds)
      }
    }   
    textSequence(0);
   }
}
// ---------------------- Strip ---------------------- //
var randomNumber = Math.floor(Math.random() * 1000)+ 1; //you can like up to 1000 pictures before your account gets banned on Instagram
console.log(randomNumber);

clickNo = 1;
var clickNo = Math.floor(Math.random() * 11);
console.log(clickNo);
// ------------------------------------------------------ //

var timeEngine = {
  progressTimer: '',
  timeLeft: 0,
  levelTime: 0,
  progressValue: 100,
  endingSound: false,
  start: function(time) { // play time in seconds
    timeEngine.timeLeft = time;
    // Every 0.1 of a second
    timeEngine.progressTimer = setInterval(function(){timeEngine.updateTimeProgress(time)}, 100);
  },
  stop: function() {
    clearInterval(timeEngine.progressTimer);
    gmStatsTimeProgress.classList.remove('switchColors-animation'); // remove the animation red/blue on the bar
    if (timeEngine.endingSound) {
      timeEngine.endingSound = false;
      audioPool.stopSound(timeAlmostUp); // stop playing the ending sound
    }
  },
  resume: function() { // continue from where it stopped
    timeEngine.start(timeEngine.timeLeft);
  },
  reset: function() {
    timeEngine.stop();
    timeEngine.timeLeft = 0;
    timeEngine.progressValue = 100;
    timeEngine.progressValue = timeEngine.progressValue; // Progress bar value
    gmStatsTimeProgress.style.height = timeEngine.progressValue + "%";
  },
  updateTimeProgress: function(time) {
    // Subtract (100 / total game play time / 10)
    // 10 to make it smaller, and the time is 0.1 of a second (100ms)
    // 100ms is the time in the Start function
    timeEngine.timeLeft = timeEngine.timeLeft - (1/10); // update time left
    timeEngine.progressValue = timeEngine.timeLeft * 100 / gameEngine.levelTime; // update the value for the progress bar
    gmStatsTimeProgress.style.height = timeEngine.progressValue + "%";
    timeEngine.checkTime(); // Check if game's time is 0
  },
  checkTime: function() {
    if (timeEngine.timeLeft <= 0) {
      timeEngine.stop();
      gameEngine.timesUp();
      timeEngine.endingSound = false;
      audioPool.stopSound(timeAlmostUp); // stop playing the ending sound
    }
    if (timeEngine.timeLeft < 4 && timeEngine.timeLeft > 0) { // if there are smaller than 4 and greater than 0 seconds left
      gmStatsTimeProgress.classList.add('switchColors-animation'); // animate the bar to red/blue
      if (!timeEngine.endingSound) {
        timeEngine.endingSound = true;
        audioPool.playSound(timeAlmostUp);
      }
    }
  }
}

// ----------------------------------------------------------------- //
// -------------------- Tappable Circle Object -------------------- //

var circlesEngine = {
  create: function(typeOfCircle, numOfCircles) {
    console.log("circlesEngine.create called");
    var ele = document.getElementById('strip');
    //strip.start();
    //var element = document.createElement('div');

    var strip = {
      start: function() {
        let countHeartsOnly = 0;

        console.log("strip.start called");
        var strip = document.getElementById('strip');
        var clickCount = 0;
        for( var i = 0; i < randomNumber; i++){
          
          if(Math.random() > 0.5){
            countHeartsOnly++;
            var element = document.createElement('div');
            element.setAttribute('class', 'unliked');
            element.classList.add('post');
            element.classList.add('unliked');
            strip.appendChild(element);
            console.log("added element");

            element.addEventListener("click", function(){
              // console.log("clicked on", element, this);
              
              this.classList.add('class', 'liked');
              audioPool.playSound(touchBlue);
              gameEngine.goodCircleTap();
              gameSpace.appendChild(element);
              this.removeEventListener('click',arguments.callee,false);//this makes sure the element gets clicked once
            });
            element.addEventListener("mouseout", function(){
            //console.log("vid", element, this);
            this.classList.add('class', 'others');
            randomplayers.start();
            });
          
            //return element;
          } else {
            var element = document.createElement('div');
    
            element.classList.add('post');
            element.classList.add('grey');
            strip.appendChild(element);

            element.addEventListener("click", function(){
              console.log("clicked on");
              audioPool.playSound(touchRed);
              gameEngine.gameLost();
            });
            //return element;
          }
          
        }
        
        console.log(randomNumber, countHeartsOnly)
        gameEngine.tapsGoal = countHeartsOnly
        levelsEngine.levels.tapsGoal = countHeartsOnly
        gameEngine.updateTapCount(0, countHeartsOnly);

       }
    
    }

    strip.start();
    // reset the time and start it
    
    timeEngine.reset();
    timeEngine.start(55);

    // switch (typeOfCircle.toLowerCase()) {
    //   case ".evil-circle":
    //     element.setAttribute('class', 'grey');
    //     gameSpace.appendChild(element);
    //     toolsBox.onClickNTouchstart(element, function(){ // on click & touch start function
    //       circlesEngine.evilCircleTap();
    //     });
    //     return element;
    //     break;

    //   case ".good-circle":
    //     element.setAttribute('class', 'unliked');
    //     gameSpace.appendChild(ele);
    //     toolsBox.onClickNTouchstart(ele, function(){ // on click & touch start function
    //       circlesEngine.goodCircleTap(typeOfCircle, numOfCircles);
    //     });
    //     return element;
    //     break;

    //   default:
    // }
  },
  destroy: function(circle){ // destroy all the circles of a specific type
    // Convert the Node List into in Array and delete all the items in it
    Array.from(circle).forEach(function(element){
      element.parentNode.removeChild(element);
    });
  },
  randomPosition: function(circle){ // random x,y position in the gameSpace
    gameSpcWidth = gameSpace.offsetWidth;
    gmSpcHeight = gameSpace.offsetHeight;
    tpblCircleWidth = circle.offsetWidth;
    tpblCircleHeight = circle.offsetHeight;

    circle.style.left = toolsBox.gnrtRndmNum(tpblCircleWidth, (gameSpcWidth - tpblCircleWidth)) + "px";
    circle.style.top = toolsBox.gnrtRndmNum(tpblCircleHeight, (gmSpcHeight - tpblCircleHeight)) + "px";
  },
  add: function(typeOfCircle, numOfCircles) { // Add circles to the game space
    console.log("circlesEngine.add called")
    // Chcek if that kind of circle exists & delete them
    if (document.querySelectorAll(typeOfCircle).length > 0) {
      circle = document.querySelectorAll(typeOfCircle);
      circlesEngine.destroy(circle);
    }
    if (numOfCircles) { // check if there's a number of circles, else create 1 only
      for (var i = 0; i < numOfCircles; i++) { // create and throw in random positions
        circle = circlesEngine.create(typeOfCircle, numOfCircles);
        circlesEngine.randomPosition(circle);
        circlesEngine.addWithDelay(i, circle, typeOfCircle); // add CSS animation class with delay
      }
    } else { // if only type of circle, add 1 circle only
      circle = circlesEngine.create(typeOfCircle, numOfCircles);
      circlesEngine.randomPosition(circle);
    }
  },
  addWithDelay: function(i, circle, typeOfCircle) { // add CSS class with delay
    setTimeout(function() {
      circle.classList.add('grow-animation');
      audioPool.playSound(circleAppear);
    }, i*50); // delay each using the index (i) * 50ms
  },
  goodCircleTap: function(typeOfCircle, numOfCircles){
    gameEngine.goodCircleTap(); // do actions in game engine
    //circlesEngine.add(typeOfCircle, numOfCircles); // re-generate good circles //we dont want to add more circles

    evilCircles = document.querySelectorAll('.evil-circle');
    if (evilCircles.length > 0) { // recreate evil circles if there are any in the game space
      circlesEngine.add('.evil-circle', evilCircles.length);
    }
  },
  evilCircleTap: function(){
    gameEngine.evilCircleTap();
  },
  goodCirclesTapCount: 0,
  redCirclesTapCount: 0
}

// ----------------------------------------------------------------- //
// ---------------- End of / Tappable Circle Object ---------------- //
// ----------------------------------------------------------------- //



// ---------------------- Game Engine Object ---------------------- //

var gameEngine = { 
  // Current level settings
  levelNum:1, // current level number
  levelTime: 55, // Time in seconds for the current level. As Facebook's current head of marketing bragged in this speech, the average millennial checks his or her phone 157 times daily. That's a total average of 145 minutes every day that we're trying to feel connected, validated, and liked.
  tapNum: 0, // how many times it was tapped so far
  tapsGoal: randomNumber, // Number of taps required to finish the level
  tapValue: 13, // How much does the tap add to the score
  score: 0, // current score <- should be carried from a level to another
  goodCirclesCount: 1, // number of good circles in game space
  evilCirclesCount: 4,
  highestScore: 0,
  bonusScore: 0,
  updateScore: function(amount) { //add amount to score
    gameEngine.score = amount;
    gmStatsScore.innerHTML = gameEngine.score;
  },
  updateLevel: function(levelNum) { // Update the level number in the game space and add to engine
    gameEngine.levelNum = levelNum;
    gmStatsLvlNumb.innerHTML = "Likes";
  },
  updateTapCount: function(tapNum, tapsGoal) { // Update tabs count in the game space & add to engine
    gameEngine.tapNum = tapNum;
    gmStatsCurrentTapCount.innerHTML = gameEngine.tapNum;
    gameEngine.tapsGoal = tapsGoal;
    gmStatsTotalTapCount.innerHTML = "/" + gameEngine.tapsGoal;
  },
  updateLevelTime: function(time) {
    gameEngine.levelTime = time;
  },
  updateBonusScore: function(bonus) {
    gameEngine.bonusScore = bonus;
  },
  reset: function() { // reset the level values from the levels engine to start a new game
    levelsEngine.resetLevels();
    gameEngine.updateScore(0);
    gameEngine.updateLevel(levelsEngine.levels[0].levelNum);
    gameEngine.updateLevelTime(levelsEngine.levels[0].time);
    gameEngine.updateTapCount(0, levelsEngine.levels[0].tapsGoal);
    gameEngine.tapValue = levelsEngine.levels[0].tapValue;
    gameEngine.goodCirclesCount = levelsEngine.levels[0].goodCirclesCount;
    gameEngine.evilCirclesCount = levelsEngine.levels[0].evilCirclesCount;
  },
  start: function(score, level, time, tapsGoal, tapValue, goodCirclesCount, evilCirclesCount) {
    // Inatial level setup & adding data to the game engine
    gameEngine.updateScore(score);
    gameEngine.updateLevel(level);
    gameEngine.updateLevelTime(time);
    gameEngine.updateTapCount(0, tapsGoal);
    gameEngine.tapValue = tapValue;
    gameEngine.goodCirclesCount = 0;
    gameEngine.evilCirclesCount = 0;

    // adding circles to the game space
    circlesEngine.add('.good-circle', 0);
    //circlesEngine.add('.evil-circle', 0);

    // reset the time and start it
    timeEngine.reset();
    timeEngine.start(time);

    console.log('Game Started! 🏁');
  },
  startLevel: function() { // start level using the current level value in the game engine
    gameEngine.start(
      gameEngine.score, //score
      levelsEngine.levels[gameEngine.levelNum-1].levelNum, // level
      levelsEngine.levels[gameEngine.levelNum-1].time, // time
      levelsEngine.levels[gameEngine.levelNum-1].tapsGoal, // taps goal
      levelsEngine.levels[gameEngine.levelNum-1].tapValue, // tap value
      levelsEngine.levels[gameEngine.levelNum-1].goodCirclesCount, // good circles count
      //levelsEngine.levels[gameEngine.levelNum-1].evilCirclesCount // evil cirlcs count
    );
  },
  checkTapsCount: function() {
    if (gameEngine.tapNum >= gameEngine.tapsGoal) {
      if (timeEngine.timeLeft > 0) { // score one after one 
        toolsBox.hidePage(pagePlayArea);
        toolsBox.showPage(pageLevelPassed);
      }
      gameEngine.levelPassed();
    
  }
  },
  goodCircleTap: function() {
    gameEngine.tapNum = gameEngine.tapNum + 1;
    gameEngine.updateScore(gameEngine.score + gameEngine.tapValue);
    gameEngine.updateTapCount(gameEngine.tapNum, gameEngine.tapsGoal);
    gameEngine.checkTapsCount(); // check if taps finished
    audioPool.playSound(touchBlue);
    // ga('send', 'event', 'Circle_Tap', 'Good'); // Google analytics events
  },
  evilCircleTap: function() {
    gameEngine.deadlyTap();
    audioPool.playSound(touchRed);
    // ga('send', 'event', 'Circle_Tap', 'Evil'); // Google analytics events
  },
  pause: function() {
    timeEngine.stop();
  },
  resume: function() {
    timeEngine.resume();
  },
  stop: function() { // stop the game and reset level values
    timeEngine.stop();
    console.log('game STOPPED!');
    gameEngine.reset();
  },
  gameLost: function() {
    audioPool.playSound(levelLost);
    lvlLostScore.innerHTML = gameEngine.score;
    toolsBox.hidePage(pagePlayArea);
    toolsBox.showPage(pageYouLost);
    gameEngine.stop();
  },
  deadlyTap: function() { // tapping a red circle
    console.log('You lost! 🐜');
    gameEngine.gameLost();
  },
  timesUp: function() {
    console.log('time is up! ⏱');
    gameEngine.gameLost();
  },
  levelPassed: function() {
    console.log('Level passed! 💃');
    audioPool.playSound(levelPassed);
    timeEngine.stop(); // stop the count down

    // update level passed page info
    //lvlPssdTtl.innerHTML = "Level " + gameEngine.levelNum;
    if (gameEngine.bonusScore > 0) { // if there is a bonus, display score without bonus
      lvlPssdScore.innerHTML = gameEngine.score + 0;
    } else {
      lvlPssdScore.innerHTML = gameEngine.score;
    }

    console.log("passed score", gameEngine.score);

    gameEngine.updateLevel(gameEngine.levelNum + 1); // Update level number in the game engine

    // Add new level
    levelsEngine.addNewLevel( // add new level to the levels engine
      gameEngine.levelNum,
      gameEngine.levelTime + 1,
      gameEngine.tapValue + 2,
      gameEngine.tapsGoal + 1,
      1, // good circles count
      gameEngine.evilCirclesCount + 1
    );

    toolsBox.hidePage(pagePlayArea);
    toolsBox.showPage(pageLevelPassed);
  },
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// -------------------------------------------------------------- //
// ---------------- End of / Game Engine Object ---------------- //

// -------------------- Levels Engine -------------------- //

levelsEngine = {
  levels : [
    {
      levelNum: 1,
      time: 55, // Time in seconds for the current level
      tapValue: 1,
      tapsGoal: randomNumber,
      goodCirclesCount: 1,
      evilCirclesCount: 1
    }
  ],
  addNewLevel: function(lN, t, tV, tG, gC, eC) {
    levelsEngine.levels.push({
      levelNum: lN,
      time: t,
      tapValue: tV,
      tapsGoal: tG,
      goodCirclesCount: gC,
      evilCirclesCount: eC
    });
  },
  resetLevels: function() { // TODO
    levelsEngine.levels = [];
    levelsEngine.addNewLevel(1, 55, 1, randomNumber, 1, 4);
  }
}


// -------------------------------------------- //
// ---------------- Audio Pool --------------- //

var audioPool = {
  sounds: [
    circleAppear = { sound: "circleAppear", preaload: true, volume: 1, loop: false },
    touchBlue = { sound: "touchBlue", preaload: true, volume: 0.5, loop: false },
    touchRed = { sound: "touchRed", preaload: true, volume: 1, loop: false },
    levelPassed = { sound: "levelPassed", preload: true, volume: 1, loop: false },
    levelLost = { sound: "levelLost", preload: true, volume: 1, loop: false },
    buttonTap = { sound: "buttonTap", preload: true, volume: 1, loop: false },
    delayCount = { sound: "delayCount", preload: true, volume: 1, loop: false },
    timeAlmostUp = { sound: "timeAlmostUp", preload: true, volume: 0.5, loop: true }
  ],
  createAudioPlayer: function(element) {
    element.audioPlayer = document.createElement('audio');

    mp3Source = document.createElement('source');
    oggSource = document.createElement('source');

    // Get the name of the sounds from the object inside the array
    mp3Link = "sounds/mp3/" + element.sound + ".mp3";
    oggLink = "sounds/ogg/" + element.sound + ".ogg";

    // Setting the attributes for the source elemnts
    mp3Source.setAttribute('type', 'audio/mpeg');
    oggSource.setAttribute('type','audio/ogg');
    mp3Source.setAttribute('src', mp3Link);
    oggSource.setAttribute('src', oggLink);

    // Appending the sources to the player, and appending the player to the page
    element.audioPlayer.appendChild(mp3Source);
    element.audioPlayer.appendChild(oggSource);
    document.body.appendChild(element.audioPlayer);

    element.audioPlayer.volume = element.volume; // setting the volume

    if (element.preload) {
      element.audioPlayer.load(); // preload the sound
    }
    if (element.loop) { // repeat sound
      element.audioPlayer.loop = true;
    }
  },
  addSounds: function() {
    // Create a player for each  sound
    for (var i = 0; i < audioPool.sounds.length; i++) {
      audioPool.createAudioPlayer(audioPool.sounds[i]);
    }
  },
  playSound: function(soundName) {
    soundName.audioPlayer.currentTime = 0;
    soundName.audioPlayer.play();
  },
  stopSound: function(soundName) {
    soundName.audioPlayer.pause();
    soundName.audioPlayer.currentTime = 0;
  }
}

audioPool.addSounds(); // Add sounds to the page in separate audio players


// ------------------ Buttons ------------------ //
// Stop the rubber effect on iOS
document.ontouchmove = function(e) {
  e.preventDefault();
}


// Tutorial Page Buttons
// -- Start game Button
toolsBox.onClickNTouchstart(tutPgStartGameBtn, function(){
  audioPool.playSound(buttonTap);
  gameEngine.stop(); // Reset the levels and time

  toolsBox.hidePage(pageTutorial);
  toolsBox.showPage(pagePlayDelay); // Show the 1.5 seconds delay page
  toolsBox.pagePlayDelay.start(); // Start the count down

  toolsBox.delay( function() {
    toolsBox.showPage(pagePlayArea)
  }, 1500);
  toolsBox.delay(gameEngine.startLevel, 1500); // Delay starting the level until the countdown is finished
});

// Level Passed Page Buttons
// -- Start next level button
toolsBox.onClickNTouchstart(lvlPssdContinueNextLvlBtn, function() {
  audioPool.playSound(buttonTap);
  toolsBox.hidePage(pageLevelPassed);
  toolsBox.showPage(pagePlayDelay); // Show the 1.5 seconds delay page
  toolsBox.pagePlayDelay.start(); // Start the count down

  toolsBox.delay( function() {
    toolsBox.showPage(pagePlayArea)
  }, 1500);
  toolsBox.delay(gameEngine.startLevel, 1500); // Delay starting the level until the countdown is finished
});

// Lost Page Buttons
// -- Try again button
lvlLostTryAgainBtn.addEventListener('click', function() {
  audioPool.playSound(buttonTap);
  toolsBox.hidePage(pageYouLost);
  toolsBox.showPage(pageTutorial);
  gameEngine.stop();
}, false);

// Play Area Buttons
// -- Pause game button
toolsBox.onClickNTouchstart(gmStatsPauseBtn, function() {
  audioPool.playSound(buttonTap);
  gameEngine.pause();
  toolsBox.showPage(pagePauseMenu);
  toolsBox.hidePage(pagePlayArea);
  lvlPausedScore.innerHTML = gameEngine.score;
});

// -- Info game button
toolsBox.onClickNTouchstart(gmStatsInfoBtn, function() {
  audioPool.playSound(buttonTap);
  alert("Tipitap is a game, gamifying Instagram to demonstrates the platform's manipulative tactics through the strategy of this game. The name of the game was inspired by the English saying Tit for tat, meaning this for that which was first used in 1558 but called tip for tap. A highly effective technique in game theory, where the user using this strategy will first cooperate, then repeat the previous action of an opponent. This is shown in Tipitap, as it is intended to be a 2 player game where both must have liked a post to win causing a pause when the player sees that they have scored. Instagram uses this tactic to keep users hooked if a person posts a picture they will not see everyone who has liked it right away to wait and keep the user on the app for longer. The number of posts that can be liked is up to a maximum of 1000 (because if you like this many posts in a day, Instagram bans your account), but the number of posts that can be liked varies every time the game is refreshed. Mimicking how Instagram refreshes the user with new photos whenever they open the app and display the images through an infinite scroll, but they would not like all the posts.  The timer is a metaphor for how social media platforms benefit from the length of time we spend on their apps which a former head of marketing at Facebook bragged in this speech, the average millennial checks his or her phone 157 times daily. That's a total average of 145 minutes every day that we're trying to feel connected, validated, and liked this is equivalent to 55 seconds each time.  The game was is intended to be designed as addictive and you can learn more about my development on www.maielamin.com.");
});

// Pause Menu Buttons
// -- Restart button
toolsBox.onClickNTouchstart(pmRstrtLvlBtn, function() {
  audioPool.playSound(buttonTap);
  toolsBox.showPage(pageTutorial);
  toolsBox.hidePage(pagePauseMenu);
  gameEngine.stop();
});
// -- Continue button
toolsBox.onClickNTouchstart(pmCntnuGmBtn, function() {
  audioPool.playSound(buttonTap);
  toolsBox.showPage(pagePlayArea);
  toolsBox.hidePage(pagePauseMenu);
  gameEngine.resume();
});

// About Page Buttons
// -- Back Button
//abtPageBackBtn.addEventListener('click', function() {
  //audioPool.playSound(buttonTap);
  //toolsBox.showPage(pageGameMenu);
  //toolsBox.hidePage(pageAbout);
  //toolsBox.pageAbout.stopMovingCredits(); // stop animating the credits in the about page
//}, false);

// Game Menu Buttons
// -- New Game Button
//newGameBtn.addEventListener('click', function() {
  //audioPool.playSound(buttonTap);
  //toolsBox.showPage(pageTutorial);
  //toolsBox.hidePage(pageGameMenu);
//}, false);
// -- About Button
//aboutBtn.addEventListener('click', function() {
  //audioPool.playSound(buttonTap);
  //toolsBox.showPage(pageAbout);
  //toolsBox.hidePage(pageGameMenu);
  //toolsBox.pageAbout.moveCredits(); // animate the credits in the about page
//}, false);




// Hide Splash Screen when everything is loaded
toolsBox.hideSplashScreen();
