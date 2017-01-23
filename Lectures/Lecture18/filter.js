var numberArray = [1,2,3,4,5,6,7,8,9,10];
console.log("Number Array: ", numberArray);

function above5Filter(value){
  return value > 5;
}
var filterNumberArray = numberArray.filter(above5Filter);
console.log("Filtered Array: ",filterNumberArray);

var shoppingList = ["Milk","Donuts","Cookies","Pepto Bismol (Cookie flavour)"];

var searchValue = "Bismol";

function containsFilter(value){
  return value.indexOf(searchValue) !== -1;
};

var searchedShoppingList = shoppingList.filter(containsFilter);
console.log("searchedShoppingList is: ",searchedShoppingList);
