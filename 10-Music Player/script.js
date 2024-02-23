const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress= document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//song titles
const songs = ['hey','summer','ukulele'];

//Keep track of song
let songIndex = 1;

//initially load song detailst into DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(song){
    title.innerText =song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}


// PauseSong()

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

// Play Song
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}


// next song

function nextSong(){
    if(songs.length-1>songIndex){
        songIndex++;
    }else {
        songIndex=0;
    }
    loadSong(songs[songIndex])
    playSong();
}

//prev song
function prevSong(){
    if(0<songIndex) {
        songIndex--;
    }else{
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex])
    playSong();
}


//update progress bar

function updateProgress(e){

    // duration form audio element means is audio total time
    const {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration) *100
    progress.style.width =`${progressPercent}%`;
}

// Set Porgress Bar

function setProgress(e){
    const width = this.clientWidth;
    console.log(width);
    const clickX = e.offsetX;
    const duration =audio.duration;
    audio.currentTime = (clickX/width) *duration;
}

// Event Listeners

playBtn.addEventListener('click',()=>{

    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }else {
        playSong();
    }

});

nextBtn.addEventListener('click',()=>{
    nextSong();
});

prevBtn.addEventListener('click',prevSong);

//time /song update
audio.addEventListener('timeupdate',updateProgress);

// click on progress bar

progressContainer.addEventListener('click',setProgress);