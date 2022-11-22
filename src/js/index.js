const inputForm = document.querySelector("#espresso-menu-form");
const inputValue = document.querySelector("#espresso-menu-name");
const inputButton = document.querySelector("#espresso-menu-submit-button");
const menuList = document.querySelector(`#${findCurrentMenuCursor()}-menu-list`);

const MENUS_KEY = "menus" ;

let menus = [];

const createElement = (tag, className, innerText, type) => {
  const element = document.createElement(tag);
  element.className = className;
  element.innerText = innerText ?? ""; 
  element.type = type ?? "";
  return element;
}


const paintMenu = (newMenu, classList) => {
  const li = createElement("li",`menu-list-item d-flex items-center py-2 ${classList}`);
  const span = createElement("span", "w-100 pl-2 menu-name", newMenu);
  const soldOutButton = createElement("button", "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button", "품절", "button");
  const editButton = createElement("button", "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button", "수정", "button");
  const removeButton = createElement("button", "bg-gray-50 text-gray-500 text-sm menu-remove-button", "삭제", "button");
  
  menuList.appendChild(li);
  li.appendChild(span);
  li.appendChild(soldOutButton);
  li.appendChild(editButton);
  li.appendChild(removeButton);
  
  
  soldOutButton.addEventListener("click", soldOutMenu);
  editButton.addEventListener("click", editMenu);
  removeButton.addEventListener("click", removeMenu);
}


function soldOutMenu(event) {
  event.target.parentElement.classList.toggle("sold-out");
  saveLocalStorage(menus);
}


function editMenu(event) {
  const newName = window.prompt('어떤 이름으로 변경하시겠어요?');
  event.target.previousSibling.previousSibling.innerText = newName;
  saveLocalStorage(menus);
}


function removeMenu(event) {
  const confirm = window.confirm('정말 삭제하시겠어요?');
  if (confirm) {
    menuList.removeChild(event.target.parentElement);
    saveLocalStorage(menus);
    countMenu();
  } 
}


const countMenu = () => {
  const menuList = document.querySelector(`#${findCurrentMenuCursor()}-menu-list`);
  const countDic = document.querySelector(".menu-count");
  let count = 0
  menuList.childNodes.forEach((element) => {
    if (!element.classList.contains("hidden")) count++;
  });
  countDic.innerText = `총 ${count}개`;
}


const handleSubmitMenu = (event) => {
  event.preventDefault();
  const newMenu = inputValue.value;
  if (newMenu !== '') {
    inputValue.value = "";
    paintMenu(newMenu, findCurrentMenuCursor());
    countMenu();
    saveLocalStorage(menus);
  }
}


inputForm.addEventListener("submit", handleSubmitMenu);
inputButton.addEventListener("click", handleSubmitMenu);



function saveLocalStorage (menus) {
  const menuList = document.querySelectorAll(".menu-list-item");
  menus = [];
  menuList.forEach((element) => {
    const menuName = element.querySelector("span").innerText;
    let classList = [...element.classList][4];
    if (classList != "espresso") {
      classList += ' hidden';
    }
    if (element.classList.contains("sold-out")) {
      classList += ' sold-out';
    }
    menus.push({
      "name" : menuName,
      "classList" : classList
    })
  });
  localStorage.setItem(MENUS_KEY, JSON.stringify(menus));
}

function findCurrentMenuCursor () {
  const ul = document.querySelector("ul");
  return ul.id.split('-')[0];
}


const savedMenus = localStorage.getItem(MENUS_KEY);

if (savedMenus !== null) {
  const parsedMenus = JSON.parse(savedMenus);
  parsedMenus.forEach((element) => paintMenu(element.name, element.classList));
  countMenu();
}