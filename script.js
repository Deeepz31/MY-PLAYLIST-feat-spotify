console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentSongName = document.getElementById('currentSongName');

let songs = [
    { songName: "APT", filePath: "apt.mp3", coverPath: "apt.jpg" },
    { songName: "Dandelions", filePath: "dandelion.mp3", coverPath: "dandelion.jpg" },
    { songName: "Afsos", filePath: "afsos.mp3", coverPath: "afsos.jpg" },
    { songName: "Kabhi Kabhi", filePath: "Kabhi Kabhi.mp3", coverPath: "kabhi kabhi.png" },
    { songName: "Finding Her", filePath: "Finding Her.mp3", coverPath: "finding her.png" },
    { songName: "O Mahi", filePath: "O Mahi.mp3", coverPath: "o mahi.jpg" },
    { songName: "Co2", filePath: "Co2.mp3", coverPath: "Co2.jpg" },
    { songName: "Wishes", filePath: "Wishes.mp3", coverPath: "wishes.jpg" },
    { songName: "ALAG AASMAAN", filePath: "alag asman.mp3", coverPath: "alag.jpg" },
    { songName: "Apocalypse", filePath: "Apocalypse.mp3", coverPath: "apocalypse.jpg" }
];

// Initialize song list covers and names
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
        document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        document.getElementById(`${songIndex}`).classList.remove('fa-pause-circle');
        document.getElementById(`${songIndex}`).classList.add('fa-play-circle');
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

function makeAllPlays() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src = songs[songIndex].filePath;
        currentSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

function playSong(index) {
    makeAllPlays();
    audioElement.src = songs[index].filePath;
    currentSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById(`${index}`).classList.remove('fa-play-circle');
    document.getElementById(`${index}`).classList.add('fa-pause-circle');
}  
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');

volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value;
    updateVolumeIcon();
});

function updateVolumeIcon() {
    const vol = audioElement.volume;
    if (vol === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (vol < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}
let lastVolume = 1;

volumeIcon.addEventListener('click', () => {
    if (audioElement.volume === 0) {
        lastVolume = audioElement.volume;
        audioElement.volume = 0;
        volumeSlider.value = 0;
    } 
    else {
        // Unmute and restore volume
        audioElement.volume = lastVolume;
        volumeSlider.value = lastVolume;
    }

    updateVolumeIcon();
});

