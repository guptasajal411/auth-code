document.getElementById("r").addEventListener("click", function(){
    if (document.getElementById("colourCombination").value.length < 4){
        document.getElementById("colourCombination").value = document.getElementById("colourCombination").value + "r";
    }
});
document.getElementById("g").addEventListener("click", function(){
    if (document.getElementById("colourCombination").value.length < 4){
        document.getElementById("colourCombination").value = document.getElementById("colourCombination").value + "g";
    }
});
document.getElementById("b").addEventListener("click", function(){
    if (document.getElementById("colourCombination").value.length < 4){
        document.getElementById("colourCombination").value = document.getElementById("colourCombination").value + "b";
    }
});
document.getElementById("y").addEventListener("click", function(){
    if (document.getElementById("colourCombination").value.length < 4){
        document.getElementById("colourCombination").value = document.getElementById("colourCombination").value + "y";
    }
});