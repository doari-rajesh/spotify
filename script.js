console.log("hello")

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar =  document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSong = document.getElementById('masterSong');
let songsItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warino Mortals- NCS" , filePath: "songs/1.mp3" , coverPath: "covers/1.jpg"},
    {songName: "cielo -Huma-Huma" , filePath: "songs/2.mp3" , coverPath: "covers/2.jpg"},
    {songName: "Deaf kev - Invincible [NCS]" , filePath: "songs/3.mp3" , coverPath: "covers/3.jpg"},
    {songName: "Different Heaven &Ehi!DE" , filePath: "songs/4.mp3" , coverPath: "covers/4.jpg"},
    {songName: "Janhji-Hereos-Ncs" , filePath: "songs/5.mp3" , coverPath: "covers/5.jpg"},
    {songName: "Rabba - honey singh" , filePath: "songs/6.mp3" , coverPath: "covers/6.jpg"},
    {songName: "sakhiyaan" , filePath: "songs/7.mp3" , coverPath: "covers/7.jpg"},
    {songName: "jhugnu - Baadshah" , filePath: "songs/8.mp3" , coverPath: "covers/8.jpg"},
    {songName: "Tere Naal - guru randhawa" , filePath: "songs/9.mp3" , coverPath: "covers/9.jpg"},
    {songName: "Bijile - Hardy sandhu" , filePath: "songs/10.mp3" , coverPath: "covers/10.jpg"}
]


songsItem.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


// Handle play/pause click

// listen to events

masterPlay.addEventListener('click',()=>{

    if(audioElement.paused || audioElement.currentTime<=0){
        console.log('play')
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');   
        gif.style.opacity = 1;
    }
    else{
        console.log('pause')
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle'); 
        gif.style.opacity = 0;

    }
})

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);  
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration )/100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })       
        
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e);
        makeAllPlay();
        masterSong.innerText = songs[songIndex].songName;
        songIndex = parseInt(e.target.id);
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    })
})


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>9){
        songIndex=0;
    }
    else{
        songIndex+=1;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSong.innerText = songs[songIndex].songName;

        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -=1;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSong.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        
    }
})