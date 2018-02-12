function PlayersService(callback) {


    var playersData = [];
    var myTeam = [];
    
    this.getAllPlayers = function(){
        return playersData;
    }

    this.getMyTeam = function (){
        console.log("this is where we return team in order to then draw")
        return myTeam
    }

    this.removeFromTeam = function (id){
        console.log("back in the service to get player by myTeam, id")
        var player = getPlayerById(myTeam, id)
        if(!player){return}
        
        var i = myTeam.indexOf(player)

        myTeam.splice(i, 1)

    }

    this.addToTeam = function (id) {
        
        console.log("are we checking by id?")
        var playerData = getPlayerById(playersData, id)

        if (
            !playerData ||
            getPlayerById(myTeam, id) ||
            myTeam.length >= 16
         )
         { return }
         console.log('I CAN ADD THIS PERSON TO MY TEAM')
         myTeam.push(playerData)
    }


    function getPlayerById(arr, id) {
        console.log("We can add! Load up the Player...")
        for (var i = 0; i < arr.length; i++) {
            var playerData = arr[i]
            if (id == playerData.id) {
                return playerData
            }
        }
    }

    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback(playersData);
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback(playersData)
        });
    }



    this.getPlayersByTeam = function (teamName) {
        return playersData.filter(function (player) {
            if (player.pro_team == teamName) {
                return true;
            }
        });
    }

    this.getPlayersByPosition = function (position) {
        return playersData.filter(function (player) {
            if (player.position == position) {
                return true;
            }
        });
    }

    this.getPlayersByName = function (name) {
        return playersData.filter(function (player) {
            if (player.firstname == name || player.lastname === name) {
                return true;
            }
        });

        return arr;
    }

    loadPlayersData();
}
