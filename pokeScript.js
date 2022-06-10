let pokemonID;
let moves = [];
let abilities = [];
let games = [];

function defaultPokeinfo(){
    var pokeInput = "charizard";
    console.log(pokeInput);
    searchPokedexInfo(pokeInput);
    searchPokedexSprites(pokeInput);
}

function selectAttribute(attribute){
  document.getElementById("pokeAbilities").innerHTML = "";
  if (attribute == 1){
    document.getElementById("dropdownMenuButton1").innerHTML = "Abilities - " + abilities.length;
  
    for(ab of abilities){
      document.getElementById("pokeAbilities").innerHTML += "<li>"+ab+"</li>";
    }
  }
  else if(attribute == 2){
    document.getElementById("dropdownMenuButton1").innerHTML = "Moves - " + moves.length;
    for(mv of moves){
      document.getElementById("pokeAbilities").innerHTML += "<li>"+mv+"</li>";
    }
  }
  else{
    document.getElementById("dropdownMenuButton1").innerHTML = "Games - " + games.length;
    for(gm of games){
      document.getElementById("pokeAbilities").innerHTML += "<li>"+gm+"</li>";
    }
  }
}

function getAllPokeinfo(pokemonHere){
    let pokeInput = document.getElementById("pokeEntry").value.toLowerCase();
    console.log(pokeInput);
    searchPokedexInfo(pokeInput);
    searchPokedexSprites(pokeInput);
}

function getAllPokeinfo1(pokemonHere){
  console.log(pokemonHere);
  searchPokedexInfo(pokemonHere);
  searchPokedexSprites(pokemonHere);
}


function getID(my_id){
  document.getElementById("dexNum").innerHTML= "DEX #" + my_id; 
}

function move(direction){
  console.log(direction);
  if(direction == 1){
    var currentId = pokemonID;
    currentId+=1;
    (currentId %= 650);
    if(currentId == 0){
      currentId+=1;
    }
    getAllPokeinfo1(currentId);}
  else{
    var currentId = pokemonID;
    if(currentId > 1){currentId-=1;}
    else{
      currentId = 649;
    }
    getAllPokeinfo1(currentId);
  }
}

function searchPokedexSprites(info){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("cancer").innerHTML ="";
      var pokeData1 = JSON.parse(this.response);
      console.log(pokeData1.sprites.front_default);
      document.getElementById("pokeImage").innerHTML = "<img src=\""+pokeData1.sprites.other.dream_world.front_default+"\">";
      pokemonID = pokeData1.id;
      getID(pokemonID);

      moves = [];
      abilities = [];
      games = [];
      
      document.getElementById("dropdownMenuButton1").innerHTML = "Abilities";

      document.getElementById("pokeAbilities").innerHTML = "";
      for(var i=0;i<pokeData1.abilities.length;i++){
        abilities.push(pokeData1.abilities[i].ability.name) 
        document.getElementById("pokeAbilities").innerHTML += "<li>"+pokeData1.abilities[i].ability.name+"</li>";
      }

      for(var i=0;i<pokeData1.moves.length;i++){
        console.log(pokeData1.moves[i].move.name);
        moves.push(pokeData1.moves[i].move.name);
      }
      
      for(var i=0;i<pokeData1.game_indices.length;i++){
        games.push(pokeData1.game_indices[i].version.name);
      }

      document.getElementById("pExp").innerHTML = "Base Experience: " +pokeData1.base_experience;
      document.getElementById("pHeight").innerHTML = "Height: " + pokeData1.height;
      document.getElementById("pWeight").innerHTML = "Weight: " + pokeData1.weight;
      document.getElementById("pOrder").innerHTML =  "Order: " + pokeData1.order;
      document.getElementById("pDef").innerHTML =    "Is Default: " + pokeData1.is_default;
      
    }
    else{
      if(this.status == 404){
      document.getElementById("cancer").innerHTML =  "<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">"+info+" does not exist as a Pokemon<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
      }
    }
    };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+info);
  xhttp.send();
}

function searchPokedexInfo(info){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var pokeData1 = JSON.parse(this.response);
     
      document.getElementById("pokeName").innerHTML = pokeData1.name.replace(pokeData1.name[0],pokeData1.name[0].toUpperCase());
      document.getElementById("pokeDescription").innerHTML = pokeData1.flavor_text_entries[1].flavor_text.replace("\f"," ");
    }
    };
    
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon-species/"+info);
  xhttp.send();
}


function searchFruit(fruit){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var pokeData1 = JSON.parse(this.response);
     
      document.getElementById("pokeName").innerHTML = pokeData1.name.replace(pokeData1.name[0],pokeData1.name[0].toUpperCase());
      document.getElementById("pokeDescription").innerHTML = pokeData1.flavor_text_entries[1].flavor_text.replace("\f"," ");
    }
    };
    
  xhttp.open("GET", "https://pokeapi.co/api/v2/fruit/"+fruit);
  xhttp.send();
}