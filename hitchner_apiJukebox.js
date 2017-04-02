SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});
// My variables
var playBtn = document.querySelector("#play");
var pauseBtn = document.querySelector("#pause");
var backBtn = document.querySelector("#back");
var nextBtn = document.querySelector("#next");
var info = document.querySelector("#information");
var userName = document.querySelector("#name");
var art = document.querySelector("#albumArt");
var userUrl = document.querySelector("#userUrl");
var trackName1 = document.querySelector("#songName1");
var trackName2 = document.querySelector("#songName2");
var trackName3 = document.querySelector("#songName3");
var trackName4 = document.querySelector("#songName4");
var titleGenre = document.querySelector("#title_genre");
var songLink1 = document.querySelector("#songLink1");
var songLink2 = document.querySelector("#songLink2");
var songLink3 = document.querySelector("#songLink3");
var songLink4 = document.querySelector("#songLink4");
var name;
var genre;
var title;
var description;
var siteUrl;

// constructor function Song
function Song (){
  this.getInfo();
  this.currentSong;
  this.id;
  this.index = 0;
  this.playlist = [];
  this.songUrls = this.playlist;
  this.trackTitles = this.songNames;
}
// resolving and displaying playlist info
Song.prototype.getInfo = function (){
  SC.resolve('https://soundcloud.com/particlehearts/sets/film-rescores').then(function(response) {
    this.index = 0;
    this.playlist = response.tracks;
    this.playlist[this.index].artwork_url;
    // Having a hard time finding an eloquent solution to the track names. Still working on it.
    trackName1.innerHTML = this.playlist[0].title;
    songOne = this.playlist[0].permalink_url;
    songLink1.setAttribute("href",songOne);
    songTwo = this.playlist[1].permalink_url;
    songLink2.setAttribute("href",songTwo);
    songThree = this.playlist[2].permalink_url;
    songLink3.setAttribute("href",songThree);
    songFour= this.playlist[3].permalink_url;
    songLink4.setAttribute("href",songFour);
    trackName2.innerHTML = this.playlist[1].title;
    trackName3.innerHTML = this.playlist[2].title;
    trackName4.innerHTML = this.playlist[3].title;
    name = response.user.username;
    userName.innerHTML = name + ": Artist";
    genre = response.genre;
    title = response.title;
    titleGenre.innerHTML = title +": "+ genre ;
    description = response.description;
    info.innerHTML = " Playlist info:" + description;
    siteUrl = response.permalink_url;      userUrl.setAttribute("href",siteUrl);
    art.setAttribute("src", "https://i1.sndcdn.com/artworks-000127494156-jnbx7s-large.jpg");
  });
};
// Getting the Id of the songs from Playlist URL
Song.prototype.getSongId = function(){
  SC.resolve('https://soundcloud.com/particlehearts/sets/film-rescores').then(function(playlist){
    this.playlist = playlist.tracks
    this.songUrls = this.playlist[this.index].id
    this.getSong(this.songUrls)
  }.bind(this));
};
// Passing in the song Id and playing
Song.prototype.getSong = function(id) {
  SC.stream('/tracks/' + id ).then(function(player) {
    this.currentSong = player;
    this.currentSong.play();
  }.bind(this));
};
//Back button
Song.prototype.back = function() {
  this.currentSong.pause();
  if (this.index - 1 >= 0) {
    this.index--;
    this.songUrls = this.playlist[this.index].id;
    this.getSong(this.songUrls)
  }else if(this.index - 1 < 0) {
    this.index = this.playlist.length - 1
    this.songUrls = this.playlist[this.index].id;
    this.getSong(this.songUrls);
  };
};
// Next Button
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
  };
};
// Playing the stream
Song.prototype.playSong = function() {
  this.getSongId();
};
// Pausing the stream
Song.prototype.pauseSong = function () {
  this.currentSong.pause();
};
playBtn.addEventListener("click", function(e) {
  song.playSong();
  e.preventDefault();
});
pauseBtn.addEventListener("click", function(e) {
  song.pauseSong();
  e.preventDefault();
});
backBtn.addEventListener("click", function(e) {
  song.back();
  e.preventDefault();
});
nextBtn.addEventListener("click", function(e) {
  song.next();
  e.preventDefault();
});
// song object
var song = new Song;
