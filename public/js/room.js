const socket = io('/');  //socket connection
const videoGrid = document.getElementById('video-grid');

let navigationBarWhiteboard = true;
let navigationBarInterviewQuestionsIntPOV = true;
let navigationBarInterviewQuestionsCandPOV = true;
let navigationBarProfile = true;

const navSliderbtn = document.querySelector("#whiteboard-Slider-btn");
const intPOVsliderBtn = document.querySelector("#intPOV-Slider-btn");
const candPOVsliderBtn = document.querySelector("#candPOV-Slider-btn");
const ProfilesliderBtn = document.querySelector("#Profile-Slider-btn");



//trail for voice reco...

const voiceRecoAreaDiv = document.querySelector("#voice-recognize-area");



const navWhiteboard = document.querySelector("#nav-slider-whiteboard");
const navIntPOV = document.querySelector("#nav-slider-intPOV");
const navCandPOV = document.querySelector("#nav-slider-candPOV");
const navProfile = document.querySelector("#nav-slider-profile");

let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
// let resultElement = document.getElementById('result');

const userDropDown = document.getElementById('myDropdown');
const myVideo = document.createElement('video');
myVideo.muted = true;
let peers = {}, currentPeer = [];
let userlist = [];
let cUser;

let YourName = PERSON_NAME;
// let bar = confirm('Confirm or deny');
console.log(YourName);

var peer = new Peer(undefined, {
  port: 3000,
  host: '/',
  path: '/peerjs'
  //path: '/peerjs',
  //host: '/',
  //port: '3001'
});

let myVideoStream;
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream);
  myVideoStream = stream;

  peer.on('call', call => {


    //if(acceptsCall){
    console.log("answered");
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
    let gride;
    peers[call.peer] = call;
    call.on('close', () => {
      video.remove()
    })

    //   }else{
    //    console.log("Call denied !");
    //   }
  });

  socket.on('user-connected', (userId) => {
    setTimeout(() => {
      console.log('user ID fetch connection: ' + userId);
      connectToNewUser(userId, stream);
    }, 2000);
  })

});

//if someone try to join room
peer.on('open', async id => {
  cUser = id;
  await socket.emit('join-room', ROOM_ID, id);

})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close();
  console.log('user ID fetch Disconnect: ' + userId);

});


const connectToNewUser = (userId, stream) => {
  console.log('User-connected :-' + userId);
  let call = peer.call(userId, stream);
  //currentPeer = call.peerConnection;
  const video = document.createElement('video');
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream);
  })
  call.on('close', () => {
    video.remove()
  })
  //currentPeer = call.peerConnection;
  peers[userId] = call;
  currentPeer.push(call.peerConnection);
  console.log(currentPeer);
}


const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.controls = true;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  })
  videoGrid.append(video);
}

//to Mute or Unmute Option method
const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setMuteButton();
  } else {
    setUnmuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
}

const setUnmuteButton = () => {
  const html = `<i class="fas fa-microphone"></i>
                <span>Mute</span>`;
  document.querySelector('.Mute__button').innerHTML = html;
  console.log("You are Unmuted");
}

const setMuteButton = () => {
  const html = `<i class="fas fa-microphone-slash" style="color:red;"></i>
                <span>Unmute</span>`;
  document.querySelector('.Mute__button').innerHTML = html;
  console.log("Muted");
}

//Video ON or OFF
const videoOnOff = () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    unsetVideoButton();
  } else {
    setVideoButton();
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}

const setVideoButton = () => {
  const html = `<i class="fas fa-video"></i>
                <span>Stop Video</span>`;
  document.querySelector('.Video__button').innerHTML = html;
  console.log("Camera Mode ON");
}

const unsetVideoButton = () => {
  const html = `<i class="fas fa-video-slash" style="color:red;"></i>
                <span>Start Video</span>`;
  document.querySelector('.Video__button').innerHTML = html;
  console.log("Camera Mode OFF");
}

//code for disconnect from client
const disconnectNow = () => {
  window.location = "http://localhost:3000/";
}

//code to share url of roomId
// const share = () => {
//   let share = document.createElement('input'),
//     text = window.location.href;

//   console.log(text);
//   document.body.appendChild(share);
//   share.value = text;
//   share.select();
//   document.execCommand('copy');
//   document.body.removeChild(share);
//   alert('Copied');
// }


const share = () => {
  let share = document.createElement('input');
  let text = window.location.href;

  // Extract the ID at the end of the URL
  let id = text.split('/').pop();

  console.log(id);
  document.body.appendChild(share);
  share.value = id;
  share.select();
  document.execCommand('copy');
  document.body.removeChild(share);
  alert('Copied ID: ' + id);
}

//msg sen from user
let text = $('input');

// $('html').keydown((e) =>{
//   if(e.which == 13 && text.val().length !== 0){
//     console.log(text.val());
//     socket.emit('message', text.val(),YourName);
//     text.val('')
//   }
// });


// $('html').keydown((e) => {
//   if(e.which == 13 && text.val().length !== 0){
//       let messageContent = text.val();  
//       console.log(messageContent);
//       socket.emit('message', messageContent, YourName);
//       text.val(''); 
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  const text = document.getElementById('chat_messages');



  text.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && text.value.trim().length !== 0) {
      let messageContent = text.value.trim();
      console.log(messageContent);
      socket.emit('message', messageContent, YourName);
      text.value = '';
    }
  });
});



//Print msg in room
socket.on('createMessage', (msg, user) => {

  $('ul').append(`<li class= "message"><small>~${user}</small><br>${msg}</li>`);

  scrollToBottom();
});

const scrollToBottom = () => {
  var d = $('.main__chat_window');
  d.scrollTop(d.prop("scrollHeight"));
}

//screenShare
const screenshare = () => {
  navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: 'always'
    },
    audio: {
      echoCancellation: true,
      noiseSupprission: true
    }

  }).then(stream => {
    let videoTrack = stream.getVideoTracks()[0];
    videoTrack.onended = function () {
      stopScreenShare();
    }
    for (let x = 0; x < currentPeer.length; x++) {

      let sender = currentPeer[x].getSenders().find(function (s) {
        return s.track.kind == videoTrack.kind;
      })

      sender.replaceTrack(videoTrack);
    }

  })

}

function stopScreenShare() {
  let videoTrack = myVideoStream.getVideoTracks()[0];
  for (let x = 0; x < currentPeer.length; x++) {
    let sender = currentPeer[x].getSenders().find(function (s) {

      return s.track.kind == videoTrack.kind;
    })
    sender.replaceTrack(videoTrack);
  }
}

//raised hand
const raisedHand = () => {
  const symbol = "&#9995;";
  socket.emit('message', symbol, YourName);
  unChangeHandLogo();
}

const unChangeHandLogo = () => {
  const html = `<i class="far fa-hand-paper" style="color:red;"></i>
                <span>Raised</span>`;
  document.querySelector('.raisedHand').innerHTML = html;
  console.log("change")
  changeHandLogo();
}

const changeHandLogo = () => {
  setInterval(function () {
    const html = `<i class="far fa-hand-paper" style="color:"white"></i>
                <span>Hand</span>`;
    document.querySelector('.raisedHand').innerHTML = html;
  }, 3000);
}

//kick option
socket.on('remove-User', (userId) => {
  if (cUser == userId) {
    disconnectNow();
  }
});

const getUsers = () => {
  socket.emit('seruI',);

}

const listOfUser = () => {
  //userDropDown.innerHTML = '';
  while (userDropDown.firstChild) {
    userDropDown.removeChild(userDropDown.lastChild);
  }
  for (var i = 0; i < userlist.length; i++) {
    let x = document.createElement("a");
    let t = document.createTextNode(`VideoSector ${i + 1}`);
    x.appendChild(t);
    userDropDown.append(x);
  }
  const anchors = document.querySelectorAll('a');
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', () => {
      console.log(`Link is clicked ${i}`);
      anchoreUser(userlist[i]);
    });
  }
}

const anchoreUser = (userR) => {
  socket.emit('removeUser', cUser, userR);
}


socket.on('all_users_inRoom', (userI) => {
  console.log(userI);
  userlist.splice(0, userlist.length);
  userlist.push.apply(userlist, userI);
  console.log(userlist);
  listOfUser();
  document.getElementById("myDropdown").classList.toggle("show");
});


function askQuestion(question) {
  socket.emit('question-selected', question);
}


socket.on('display-question', (question) => {

  navCandPOV.innerHTML = `<p>${question}</p>
  
  <div id="voice-recognize-area" style="display: block;">
				<textarea id="result" rows="7" cols="70"></textarea> <br>
				<button id="start" class="record-btn" onclick="startButtonPressed()">Start</button>
				<button id="stop" class="record-btn" onclick="stopButtonPressed()">Stop and submit</button>

			</div>`;


  

  // showVoiceRecoArea();
});

// function showVoiceRecoArea() {
//   console.log(voiceRecoAreaDiv);
//   voiceRecoAreaDiv.style.display = "block";
// }








//whiteboard






const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

let drawing = false;
let erasing = false;

let lastX = 0;
let lastY = 0;
let drawingPenColor = '#000000';

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('mousemove', throttle(draw, 20));

function startDrawing(event) {
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = event.clientX - rect.left;
  lastY = event.clientY - rect.top;

  socket.emit('startDrawing', { x: lastX, y: lastY, color: drawingPenColor, lineWidth: ctx.lineWidth, erasing });
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
  socket.emit('stopDrawing');
}

function draw(event) {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ctx.lineWidth = document.getElementById('lineWidth').value;
  ctx.lineCap = 'round';

  if (erasing) {
    ctx.strokeStyle = 'white';
  } else {
    ctx.strokeStyle = drawingPenColor;
  }

  ctx.beginPath(); // Start a new path
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();


  socket.emit('drawing', { lastX, lastY, x, y, color: drawingPenColor, lineWidth: ctx.lineWidth, erasing });

  lastX = x;
  lastY = y;
}


function throttle(callback, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = (new Date()).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return callback(...args);
  };
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  socket.emit('clearCanvas');
}

function changeColor(color) {
  drawingPenColor = color;
  erasing = false;
}

function changeLineWidth(width) {
  ctx.lineWidth = width;
}

function toggleEraser() {
  erasing = !erasing;
}


socket.on('drawing', (data) => {
  ctx.lineWidth = data.lineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = data.erasing ? 'white' : data.color;


  ctx.beginPath();
  ctx.moveTo(data.lastX, data.lastY);
  ctx.lineTo(data.x, data.y);
  ctx.stroke();
});

socket.on('clearCanvas', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
});

socket.on('startDrawing', (data) => {
  ctx.beginPath();
  ctx.moveTo(data.x, data.y);
});

socket.on('stopDrawing', () => {
  ctx.beginPath();
});




// let navigationBarWhiteboard = true;
// let navigationBarInterviewQuestionsIntPOV = true;
// let navigationBarInterviewQuestionsCandPOV = true;
// let navigationBarProfile = true;

// const navSliderbtn = document.querySelector("#whiteboard-Slider-btn");
// const intPOVsliderBtn = document.querySelector("#intPOV-Slider-btn");
// const candPOVsliderBtn = document.querySelector("#candPOV-Slider-btn");
// const ProfilesliderBtn = document.querySelector("#Profile-Slider-btn");



// const navWhiteboard = document.querySelector("#nav-slider-whiteboard");
// const navIntPOV = document.querySelector("#nav-slider-intPOV");
// const navCandPOV = document.querySelector("#nav-slider-candPOV");
// const navProfile = document.querySelector("#nav-slider-profile");


// whiteboard

function closeNavigationBar() {
  navigationBarWhiteboard = true;
  navWhiteboard.style.right = "-100%";
  // menu.style.display = "unset";
  // cross.style.display = "none";
}


function openNavigationBar() {
  navigationBarWhiteboard = false;
  navWhiteboard.style.right = "0%";
  // menu.style.display = "none";
  // cross.style.display = "unset";
}


//intPOV

function closeNavigationBarIntPOV() {
  navigationBarInterviewQuestionsIntPOV = true;
  navIntPOV.style.right = "-100%";
  // menu.style.display = "unset";
  // cross.style.display = "none";
}


function openNavigationBarIntPOV() {
  navigationBarInterviewQuestionsIntPOV = false;
  navIntPOV.style.right = "0%";
  // menu.style.display = "none";
  // cross.style.display = "unset";
}


//candPOV


function closeNavigationBarCandPOV() {
  navigationBarInterviewQuestionsCandPOV = true;
  navCandPOV.style.right = "-100%";
  // menu.style.display = "unset";
  // cross.style.display = "none";
}


function openNavigationBarCandPOV() {
  navigationBarInterviewQuestionsCandPOV = false;
  navCandPOV.style.right = "0%";
  // menu.style.display = "none";
  // cross.style.display = "unset";
}


//profile

function closeNavigationBarProfile() {
  navigationBarProfile = true;
  navProfile.style.right = "-100%";
  // menu.style.display = "unset";
  // cross.style.display = "none";
}


function openNavigationBarProfile() {
  navigationBarProfile = false;
  navProfile.style.right = "0%";
  // menu.style.display = "none";
  // cross.style.display = "unset";
}







navSliderbtn.addEventListener("click", (e) => {

  if (navigationBarWhiteboard === false) {
    closeNavigationBar();

  }
  else {
    openNavigationBar();

  }
})


intPOVsliderBtn.addEventListener("click", (e) => {

  if (navigationBarInterviewQuestionsIntPOV === false) {
    closeNavigationBarIntPOV();

  }
  else {
    openNavigationBarIntPOV();

  }
})

candPOVsliderBtn.addEventListener("click", (e) => {

  if (navigationBarInterviewQuestionsCandPOV === false) {
    closeNavigationBarCandPOV();

  }
  else {
    openNavigationBarCandPOV();

  }
});


// ProfilesliderBtn.addEventListener("click", (e) => {
//   console.log("clicked");

//   if (navigationBarProfile === false) {
//       closeNavigationBarProfile();

//   }
//   else {
//       openNavigationBarProfile();

//   }
// });

const alternateProfileBtn = () => {
  console.log("clicked");

  if (navigationBarProfile === false) {
    closeNavigationBarProfile();

  }
  else {
    openNavigationBarProfile();

  }
};



// let startButton = document.getElementById('start');
// 		let stopButton = document.getElementById('stop');
// 		let resultElement = document.getElementById('result');

let recognition = new webkitSpeechRecognition();

recognition.lang = window.navigator.language;
recognition.interimResults = true;
recognition.continuous = true;

let isStoppedManually = false;
let finalTranscript = '';





function startButtonPressed() {
  console.log("start button pressed");
  isStoppedManually = false;
  finalTranscript = '';
  recognition.start();

}

// startButton.addEventListener('click', () => {
//   isStoppedManually = false;
//   finalTranscript = '';
//   recognition.start();
// });

function stopButtonPressed() {
  isStoppedManually = true;
  recognition.stop();
}

// stopButton.addEventListener('click', () => {
//   isStoppedManually = true;
//   recognition.stop();
// });

recognition.addEventListener('result', (event) => {
  let resultElement = document.getElementById('result');
  let interimTranscript = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      
      finalTranscript += transcript + ' ';
      
    } else {
      console.log("interimTranscript : ", interimTranscript)
      interimTranscript += transcript;
      
    }
  }
  resultElement.value = finalTranscript + interimTranscript;
});

recognition.addEventListener('end', () => {
  if (!isStoppedManually) {
    recognition.start();
  }
  else {
    let resultElement = document.getElementById('result');
    resultElement.value = '';
  }
});


// let recognition = new webkitSpeechRecognition();
// recognition.lang = window.navigator.language;
// recognition.interimResults = true;
// recognition.continuous = true;

// let isStoppedManually = false;
// let finalTranscript = '';

// startButton.addEventListener('click', () => {
//   isStoppedManually = false;
//   finalTranscript = '';
//   recognition.start();
// });

// stopButton.addEventListener('click', () => {
//   isStoppedManually = true;
//   recognition.stop();
// });

// recognition.addEventListener('result', (event) => {
//   let interimTranscript = '';
//   for (let i = event.resultIndex; i < event.results.length; i++) {
//     const transcript = event.results[i][0].transcript;
//     if (event.results[i].isFinal) {
//       finalTranscript += transcript + ' ';
//     } else {
//       interimTranscript += transcript;
//     }
//   }
//   resultElement.value = finalTranscript + interimTranscript;
// });

// recognition.addEventListener('end', () => {
//   if (!isStoppedManually) {
//     recognition.start();
//   }
// });









