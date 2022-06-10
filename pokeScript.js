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

    
      document.getElementById("pokeAbilities").innerHTML = "";
      for(var i=0;i<pokeData1.abilities.length;i++){
        document.getElementById("pokeAbilities").innerHTML += "<li>"+pokeData1.abilities[i].ability.name+"</li>";
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