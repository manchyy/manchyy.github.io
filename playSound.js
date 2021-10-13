function playMusic()
{
    //var music = new Audio('manaBreak.mp3');
    //music.play();

    const origAudio = document.getElementById("manaBreak.mp3");
    const newAudio = origAudio.cloneNode()
    newAudio.play()
}