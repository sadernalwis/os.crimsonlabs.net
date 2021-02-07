// let stack = document.querySelector(".stack");

// [...stack.children].reverse().forEach(i => stack.append(i));

// stack.addEventListener("click", swap);

// function swap(e) {
//   let card = document.querySelector(".card:last-child");
//   if (e.target !== card) return;
//   card.style.animation = "swap 700ms forwards";

//   setTimeout(() => {
//     card.style.animation = "";
//     stack.prepend(card);
//   }, 700);
// }
let brands = ["BLENDER","UBUNTU","LINUX","CRIMSON",]
function addPortrait(count)  {
  let drawer = document.getElementById("drawer");
  let feature = document.createElement("div");
  let featureInner = document.createElement("div");
  let logo = document.createElement("img");
  let featureName = document.createElement("div");

  feature.setAttribute("class","feature");              
  featureInner.setAttribute("class","feature-inner");
  logo.setAttribute("class","logo");
  featureName.setAttribute("class","feature-name");

  logo.setAttribute("src",`images/png/${brands[count]}.png`);
  featureName.innerHTML = brands[count];

  featureInner.append(logo);
  featureInner.append(featureName);
  feature.append(featureInner);
  drawer.append(feature);


  count--;
  console.log("portrait " + count); 

  if (count>=0) {
    setTimeout(addPortrait.bind(null,count), 700);}
}

function createDrawer(count) {

  setTimeout(addPortrait.bind(null,count), 700);
    
}

createDrawer(brands.length-1);
  