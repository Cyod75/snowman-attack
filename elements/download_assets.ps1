cd "public\assets\snowmen"

$urls = @(
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/background.png",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/overlay.png",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/gameover.png",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/title.png",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sprites.png",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sprites.json",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/snow.glsl.js",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/music.ogg",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/music.m4a",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/music.mp3",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/throw.ogg",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/throw.m4a",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/throw.mp3",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/move.ogg",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/move.m4a",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/move.mp3",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/hit-snowman.ogg",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/hit-snowman.m4a",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/hit-snowman.mp3",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/gameover.ogg",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/gameover.m4a",
    "https://cdn.phaserfiles.com/v385/assets/games/snowmen-attack/sounds/gameover.mp3"
)

foreach ($url in $urls) {
    $filename = [System.IO.Path]::GetFileName($url)
    Invoke-WebRequest -Uri $url -OutFile $filename
}