

SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});


var playBtn = document.querySelector("#play");
var pauseBtn = document.querySelector("#pause");
var backBtn = document.querySelector("#back");
var nextBtn = document.querySelector("#next");
var info = document.querySelector("#information");
var userName = document.querySelector("#name");
var art = document.querySelector("#albumArt");
var userUrl = document.querySelector("#userUrl");




function Song (){
  this.currentSong;
  this.id;
  this.getSongId();
  this.index = 0;
  this.playlist = []
  this.songUrls = this.playlist;
}

// store urls
  Song.prototype.getInfo = function (){
  SC.resolve('https://soundcloud.com/particlehearts/sets/film-rescores').then(function(response) {
    this.index = 0;
    this.playlist = response.tracks
    this.songNames = this.playlist[this.index].artwork_url
    console.log(this.songNames)
  art.setAttribute("src", "https://i1.sndcdn.com/artworks-000127494156-jnbx7s-large.jpg")

  var name = response.user.username;
  userName.innerHTML = name + ": Artist";
  var genre = response.genre
  var title = response.title;
  var description = response.description;
  info.innerHTML = "The genre: " + genre  + "Title: " + title + " Playlist info:" + description
  var siteUrl = response.permalink_url;
  userUrl.setAttribute("href",siteUrl)


 //  var trackName= response.kind;

 //  var tracks = response.stream_url;
 // console.log(response.id)

//   titles.innerHTML = "The artist name is " + name + "." + "The artist site is" + userUrl + "The genre is "+ genre  + "the song title is " + title +" the song type is " + trackName + " the track release date is" + trackId + "the description "+ description + id + "hello"+playlistUrls + "silly"+ tracks
//
})
}
// Getting the Ids of the song from Playlist URL
Song.prototype.getSongId = function(){
  SC.resolve('https://soundcloud.com/particlehearts/sets/film-rescores').then(function(playlist){
    this.playlist = playlist.tracks
    this.songUrls = this.playlist[this.index].id
    this.getSong(this.songUrls)
  }.bind(this));
}
// Passing in the song Id and playing
Song.prototype.getSong = function(id) {
  SC.stream('/tracks/' + id ).then(function(player) {
    this.currentSong = player;
  }.bind(this));
}
Song.prototype.play = function(){
  this.currentSong.play();
}
//Back button
Song.prototype.back = function() {
  this.currentSong.pause();
  if (this.index - 1 >= 0) {
    this.index--;
    this.songUrls = this.playlist[this.index].id;
    this.getSong(this.songUrls)
    // titles.innerHTML = songNames[this.index];
  }else if(this.index - 1 < 0) {
    this.index = this.playlist.length - 1
    this.songUrls = this.playlist[this.index].id;
    this.getSong(this.songUrls);
    // titles.innerHTML = songNames[this.index];
  };
};
Song.prototype.next = function() {
  this.currentSong.pause();
  if (this.index + 1 < this.playlist.length) {
    this.index++;
    this.songUrls = this.playlist[this.index].id;
    this.getSong(this.songUrls);
  }else if(this.index + 1 == this.playlist.length) {
    this.index = 0;
    this.songUrls = this.playlist[this.index].id;
    this.getSong(this.songUrls);
    // titles.innerHTML = songNames[this.index];
  };
};

// Playing the stream
Song.prototype.playSong = function() {
  // this.getSongId();
  this.play();
}
// Pausing the stream
Song.prototype.pauseSong = function () {
  this.currentSong.pause();


}

playBtn.addEventListener("click", function(e) {
  song.playSong();
  song.getInfo();
  e.preventDefault();
})
pauseBtn.addEventListener("click", function(e) {
  song.pauseSong();
  console.log("i was clicked");
  e.preventDefault();
})
backBtn.addEventListener("click", function(e) {
  song.back();
  song.playSong();
  e.preventDefault();
})
nextBtn.addEventListener("click", function(e) {
  song.next();
  song.playSong();
  e.preventDefault();
})

var song = new Song;
