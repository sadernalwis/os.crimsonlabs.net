let stack = document.querySelector(".stack");

[...stack.children].reverse().forEach(i => stack.append(i));

stack.addEventListener("click", swap);

function swap(e) {
  let card = document.querySelector(".card:last-child");
  if (e.target !== card) return;
  card.style.animation = "swap 700ms forwards";

  setTimeout(() => {
    card.style.animation = "";
    stack.prepend(card);
  }, 700);
}

function addChild(count)  {
  let stack = document.getElementById("stack");
  let child = document.createElement("div");

  child.setAttribute("class","card");
  child.innerHTML = "text" + count;
  stack.prepend(child);

  count--;
  console.log("count is " + count); 

  if (count>0) {
    setTimeout(addChild.bind(null,count--), 700);}
}

function addChildren(count) {

  setTimeout(addChild.bind(null,count), 700);
    
  }

  addChildren(10);
  