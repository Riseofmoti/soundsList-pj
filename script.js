const containerBoxTag = document.getElementsByClassName("containerBox");
const footerContainerTag = document.getElementsByClassName("footerContainer") [0];
const audioTag = document.getElementsByClassName("audioTag") [0];
const songTitleTag = document.getElementsByClassName("songTitle") [0];
const playerTitleTag = document.getElementsByClassName("playerTitle") [0];
const playButtonTag = document.getElementsByClassName("playButton") [0];
const pauseButtonTag = document.getElementsByClassName("pauseButton") [0];
const currentBarTag = document.getElementById("currentBar");
const backButtonTag = document.getElementsByClassName("backButton") [0];
const forwardButtonTag = document.getElementsByClassName("forwardButton") [0];

const tracks = [
    {trackId : "music/Benson_Boone_-_In_the_Stars__Lyrics_(720p)_mp3.mp3", title : "In the Stars- Benson Boone"},
    {trackId : "music/Aaron_Smith_-_Dancin__KRONO_Remix__-_Lyrics(720p)_mp3.mp3" ,title : "Dancing - Aaron smith"},
    {trackId : "music/JID_-_Surround_Sound__Lyrics__ft._21_Savage___Baby_Tate(720p)_mp3.mp3", title : "Surround Sound - JID ft. 21 savage"},
    {trackId : "music/New_Medicine_-_Take_Me_Away_-_Official_Lyric_Video(720p)_mp3.mp3", title : "Take Me Away - New Medicine"},
    {trackId : "music/Tate_McRae_-_you_broke_me_first_(Official_Video)(1080p)_mp3.mp3", title : "You Broke Me First - Tate McRae" },
    {trackId : "music/Alec_Benjamin_-_Let_Me_Down_Slowly__Lyrics_(720p)_mp3.mp3", title : "Let Me Down Slowly - alec Benjamin" },
    {trackId : "music/Lewis_Capaldi_-_Before_You_Go__Lyrics_(720p)_mp3.mp3", title : "Before You Go" },
    {trackId : "music/UNDREAM___Kobi_McCoull_-_Skeletons___Ghosts(1080p60)_mp3.mp3", title : "Skeletons & Ghosts - Kobi McCoull" }
];  

let buttonTag = true;
for ( let i = 0; i < containerBoxTag.length && i < tracks.length ; i++) {
    containerBoxTag[i].addEventListener("click", () =>  {
        footerContainerTag.style.display = "inline";
        const trackId = tracks[i].trackId;
        audioTag.src = trackId;
        currentPlayingIndex = i;
        audioTag.play();

       const titleUpdate = tracks[i].title;
       songTitleTag.textContent = titleUpdate;

       playAndPauseTag(buttonTag);
    });
};
let duration = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata", () => {
  duration = Math.floor(audioTag.duration); 
  durationText = createMinuteAndSecondText(duration);
});


audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);
    const currentTimeTextAndDurationText = currentTimeText + " / " + durationText;
    playerTitleTag.textContent = currentTimeTextAndDurationText;
    updateProgressBar(currentTime);
  });

let updateProgressBar = (currentTime) => {
    const progressBarWidth = (300/duration) * currentTime;
     console.log (currentBarTag.style.width = progressBarWidth.toString() + "px");
};




const createMinuteAndSecondText = (totalSecond) => {
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;
  
    const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minuteText + ":" + secondText;
  };

pauseButtonTag.addEventListener ("click", () => {
buttonTag = false;
playAndPauseTag(buttonTag);
audioTag.pause();
});

let currentPlayingIndex  = 0;
playButtonTag.addEventListener ("click", () => {
buttonTag = true;
playAndPauseTag(buttonTag);
audioTag.play();
});

backButtonTag.addEventListener("click", () => {
  if (currentPlayingIndex === 0) {
    return;
  }
  currentPlayingIndex -= 1;
  const songIdToPlay = tracks[currentPlayingIndex].trackId;
  audioTag.src = songIdToPlay;
  audioTag.play();
});

forwardButtonTag.addEventListener("click", () => {
  if (currentPlayingIndex === tracks.length - 1) {
    return;
  }
  currentPlayingIndex += 1;
  const songIdToPlay = tracks[currentPlayingIndex].trackId;
  audioTag.src = songIdToPlay;
  audioTag.play();
});

const playAndPauseTag = () => {
  if (buttonTag) {
    playButtonTag.style.display = "none";
    pauseButtonTag.style.display = "block";
  } else {
    playButtonTag.style.display = "block";
    pauseButtonTag.style.display = "none";
  }
};