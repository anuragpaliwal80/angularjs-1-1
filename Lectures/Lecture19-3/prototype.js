//** Prototype inheritance
// var parent = {
//   value: "parentValue",
//   obj: {
//     objValue: "parentObjValue"
//   },
//   walk: function(){
//     console.log('Walking!!');
//   }
// };
//
// var child = Object.create(parent);
// // console.log("CHILD - child.value: ",child.value);
// // console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
// // console.log("PARENT - parent.value: ",parent.value);
// // console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
// // console.log("parent: ", parent);
// // console.log("child: ",child);
//
// child.value = "childValue";
// child.obj.objValue = "childObjValue";
// console.log("*** CHANGED: CHILD - child.value: 'childValue'");
// console.log("*** CHANGED: CHILD - child.obj.objValue: 'child.obj.objValue'");
// console.log("CHILD - child.value: ",child.value);
// console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
// console.log("PARENT - parent.value: ",parent.value);
// console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
// console.log("parent: ", parent);
// console.log("child: ",child);
//
// console.log("child.obj === parent.obj ? ",child.obj === parent.obj);
//
// var grandChild = Object.create(child);
// console.log("grandChild: ",grandChild);
// grandChild.walk();

// Function constructor
// Funcion name staring with capital letter to differentaite b/w normal n this one
function Dog(name){
  this.name = name;
  console.log("this is: ",this);
}

var myDog = new Dog("Max");
console.log("myDog: ",myDog);

// Not being used as function constructor, as there is no new keyword
Dog("Max2");
