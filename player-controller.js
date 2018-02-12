function PlayerController() {

  var loading = true; //Start the spinner
  var playerService = new PlayersService(ready)
  var nflPlayerElem = document.getElementById('roster')
  var myPlayerElem = document.getElementById('my-team')

  function ready(){
    loading = false;

  }


  // this.getAllPlayers = function getAllPlayers(e) {
  //   e.preventDefault();
  //   var players = playerService.getAllPlayers()
  // }

  this.getPlayersByTeam = function (teamName) {
    var players = playerService.getPlayersByTeam(teamName)
    draw(players)
  }
  this.submitTeamForm = function (e) {
    e.preventDefault()
    var form = e.target
    var teamName = form.teamName.value
    this.getPlayersByTeam(teamName)
  }

  this.getPlayersByPosition = function (position) {
    var players = playerService.getPlayersByPosition(position)
    draw(players)
  }
  this.submitPositionForm = function (e) {
    e.preventDefault()
    var form = e.target
    var position = form.position.value
    this.getPlayersByPosition(position)
  }

  this.getPlayersByName = function (name) {
    var players = playerService.getPlayersByName(name)
    draw(players)
  }
  this.submitNameForm = function (e) {
    e.preventDefault()
    var form = e.target
    var name = form.name.value
    this.getPlayersByName(name)
  }

  function draw(players) {
    var nflPlayerElem = document.getElementById('roster')
    console.log(players)
    var template = ''
    for (let i = 0; i < players.length; i++) {
      var player = players[i];
      template += `
      <div class="player-card">
        <div class="card-mg-top player-image">
          <img src="${player.photo}" alt="NFL Player Photo"> 
        </div>
          <ul class="list-group list-group-flush">  
            <li class="list-group-item player-name">${player.fullname}</li>
            <li class="list-group-item position">${player.position}</li>
            <li class="list-group-item team">${player.pro_team}</li>
            </ul>
            <button class="btn btn-primary" onclick="app.controllers.playerCtrl.addToTeam(${player.id})">Add to Team</button>
      </div>
      `
    }
    nflPlayerElem.innerHTML = template
  }

  function drawMyTeam(arr) {
    console.log("did i get this far?")
    var myPlayerElem = document.getElementById('my-team')
    var template = ''
    for (var i = 0; i < arr.length; i++) {
      var player = arr[i]
      template += `
        <div class="player-card">
        <div class="card-mg-top player-image">
          <img src="${player.photo}" alt="NFL Player Photo"> 
        </div>
          <ul class="list-group list-group-flush">  
            <li class="list-group-item player-name">${player.fullname}</li>
            <li class="list-group-item position">${player.position}</li>
            <li class="list-group-item team">${player.pro_team}</li>
            </ul>
            <button class="btn btn-primary" onclick="app.controllers.playerCtrl.removeFromTeam(${player.id})">Remove from Team</button>
      </div>
        `
    }
    myPlayerElem.innerHTML = template
  }



  this.addToTeam = function addToTeam(id) {
    console.log('add to team')
    playerService.addToTeam(id)
    console.log('right before the drawMyTeam')
    drawMyTeam(playerService.getMyTeam())
  }

  this.removeFromTeam = function removeFromTeam(id) {
    playerService.removeFromTeam(id)
    console.log("coach says we gotta trade ya")
    drawMyTeam(playerService.getMyTeam())
  }

}


