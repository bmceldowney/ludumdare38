let game
let currentSong
const songs = {}

export default {
  loadResources: (state) => {
    game = state.game
    game.load.audio('menuSong', 'fantasy_game_loop.wav', true)
    // game.load.audio('gameOverSong', 'assets/looperman-l-1319133-0090841-fanto8bc-julian-8-bit.wav', true)
    // game.load.audio('brickImpact', 'assets/brick_impact.wav', true)
    // game.load.audio('throwBrick', 'assets/throw_brick.wav', true)
    // game.load.audio('alienAttack', 'assets/alien_attack.wav', true)
    // game.load.audio('stageComplete', 'assets/stage_complete.wav', true)
  },

  init: () => {
    songs.menuSong = game.add.audio('menuSong', 1, true)
    songs.gameOverSong = game.add.audio('gameOverSong', 1, true)
  },

  playMusic: (key, volume) => {
    const song = songs[key]

    if (!song) {
      console.log('no song ' + key)
      return
    }

    if (currentSong && currentSong.key === song.key) {
      currentSong.volume = volume
      return
    }

    if (currentSong) {
      currentSong.stop()
    }

    currentSong = song
    currentSong.play('', 0, volume)
  },

  stopMusic: () => {
    if (currentSong) {
      currentSong.stop()
      currentSong = null
    }
  },

  setMusicVolume: (volume) => {
    if (currentSong) {
      currentSong.volume = volume
    }
  }
}
