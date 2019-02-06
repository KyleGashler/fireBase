$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAZZwctAhwCFyVw8ELkhJJ1wNUMGmL4wck",
    authDomain: "recepeas.firebaseapp.com",
    databaseURL: "https://recepeas.firebaseio.com",
    projectId: "recepeas",
    storageBucket: "recepeas.appspot.com",
    messagingSenderId: "596522257216"
  };
  firebase.initializeApp(config);
  var firestore1 = firebase.firestore();
  const settings = {
      timestampsInSnapshots: true
  };
  firestore1.settings(settings);

  $("#add_button").click(function (){
    firestore1.collection("recipes").add({
        recipe_title: $("#recipe_title").val(),
        ingredient_one: $("ingredient_one").val(),
        ingredient_two: $("ingredient_two").val(),
        ingredient_three: $("ingredient_three").val(),
        ingredient_four: $("ingredient_four").val()
    })
    .then(function(docRef){
        console.log("Document written with ID ", doRef.ID);
        $("#add_recipes").reset();
    })
    .catch(function(error){
        console.log("Error addding Doc: ", error)
    });
  });


  $("#show_button").click(function (){
    var table = document.createElement('table');
    table.className="table table-bordered";
    var recipes = [];
    recipes.push(["Recipe title", "Ingredient 1", "Ingredient 2", "Ingredient 3", "Ingredient 4"]);
    firestore1.collection("recipes").get().then( function (querySnapshot){
        querySnapshot.forEach( function(doc){
            var data = doc.data();
            recipes.push([data.recipe_title], data.ingredient_one, data.ingredient_two, data.ingredient_three, data.ingredient_four);
        });
    }).then( function(){
        var columnCount = recipes[0].length;
        var row = table.insertRow(-1);
        for(var i = 0; i < columnCount; i++){
            var headerCell = document.createElement("th");
            headerCell.innerHTML = recipes[0][i];
            row.appendChild(headerCell);
        }
        for(var i = 0; i < recipes.length; i++){
            row = table.insertRow(-1);
            for(var j = 0; j < columnCount; j++){
                var cell = row.insertCell(-1);
                cell.innerHTML = recipes[i][j];
            }
        }
        var recipeDiv = document.getElementById("recipe_data");
        recipeDiv.innerHTML = "";
        recipeDiv.appendChild(table);
    });
  });
  
})