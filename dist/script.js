let selectedLocation = 0;
let locations = []

let thumbnails = document.getElementById("thumbnails")
let playersCounter = document.querySelector("#players-counter")
let title = document.querySelector("#title")
let main = document.getElementById("main")

const SOUND_VOLUME = 0.1
let reloadSound = new Audio('reload.mp3');
reloadSound.volume = SOUND_VOLUME

function loadLocations(locs) {
  locations = locs
  thumbnails.innerHTML = ""
  
  // Fill conent
  locations.forEach((v,k) => {
    let imageUrl = v[2]
    thumbnails.innerHTML += `<img draggable="false" id="img-${k}" src="${imageUrl}">`
  })

  // Add click handlers
  locations.forEach((v,k) => {
    let titleText = v[0]
    let imageUrl = v[2]
    let el = document.querySelector(`#img-${k}`)
    el.addEventListener("click", function () {
      main.style = `background-image: url("${imageUrl}"`
      title.innerHTML = titleText
      playersCounter.innerHTML = v[1]
      selectedLocation = k

      reloadSound = new Audio('reload.mp3');
      reloadSound.volume = SOUND_VOLUME
      reloadSound.play();
    })
  })

  title.innerHTML = locations[selectedLocation][0]
  playersCounter.innerHTML = locations[selectedLocation][1]
  main.style = `background-image: url("${locations[selectedLocation][2]}");`
}

let shotSound = new Audio('shot.mp3');
shotSound.volume = SOUND_VOLUME
title.addEventListener("click", function() {
  shotSound = new Audio('shot.mp3');
  shotSound.volume = SOUND_VOLUME
  shotSound.play();

  notifyClientSide("teleportTo", {
    idx: selectedLocation
  })
})

title.addEventListener('mouseover', (event) => {
  title.innerHTML = "Click to Teleport"
});

title.addEventListener('mouseout', (event) => {
  title.innerHTML = locations[selectedLocation][0]
});

addGameEventHandler("updateLocations", function(data) {
  loadLocations(data)
})

if (!isInGame()) {
  loadLocations([
    ["Emerald Ranch Fence", 0, "https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/c/8/s/c8sxlu8ykru11-bf749.png"],
    ["UFO Cult House", 2, "https://media.rockstargames.com/rockstargames-newsite/uploads/4bf52a5de2b369a35c07ce094e2377c72edf9acd.jpg"],
    ["Emerald Ranch Fence", 0, "https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/c/8/s/c8sxlu8ykru11-bf749.png"],
    ["UFO Cult House", 2, "https://media.rockstargames.com/rockstargames-newsite/uploads/4bf52a5de2b369a35c07ce094e2377c72edf9acd.jpg"],
    ["Emerald Ranch Fence", 0, "https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/c/8/s/c8sxlu8ykru11-bf749.png"],
    ["UFO Cult House", 2, "https://media.rockstargames.com/rockstargames-newsite/uploads/4bf52a5de2b369a35c07ce094e2377c72edf9acd.jpg"],
    ["Emerald Ranch Fence", 0, "https://res.cloudinary.com/lmn/image/upload/c_limit,h_360,w_640/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/c/8/s/c8sxlu8ykru11-bf749.png"],
    ["UFO Cult House", 2, "https://media.rockstargames.com/rockstargames-newsite/uploads/4bf52a5de2b369a35c07ce094e2377c72edf9acd.jpg"],
  ])
}