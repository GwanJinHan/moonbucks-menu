//작동 O - 개선 필요
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


const paintMenu = (newMenu, cursor) => {
  const li = createElement("li",`menu-list-item d-flex items-center py-2 ${cursor}`);
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
}


function editMenu(event) {
  const newName = window.prompt('어떤 이름으로 변경하시겠어요?');
  event.target.previousSibling.previousSibling.innerText = newName;
}


function removeMenu(event) {
  const confirm = window.confirm('정말 삭제하시겠어요?');
  if (confirm) {
    const name = event.target.parentElement.firstChild.innerText;
    const section = event.target.parentElement.classList;
    menus = menus.filter((element) => {
      return element.name !== name || !section.contains(element.section)});
      saveLocalStorage(menus);
    menuList.removeChild(event.target.parentElement);
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

    menus.push({
      "name" : newMenu,
      "section" : defHidden(findCurrentMenuCursor())
    });
    saveLocalStorage(menus);
  }
}


const defHidden = (cursor) => {
  const def = cursor == "espresso" ? "espresso" : `${cursor} hidden`;
  return def;
}


inputForm.addEventListener("submit", handleSubmitMenu);
inputButton.addEventListener("click", handleSubmitMenu);


const savedMenus = localStorage.getItem(MENUS_KEY);

if (savedMenus !== null) {
    const parsedMenus = JSON.parse(savedMenus);
    parsedMenus.forEach((element) => paintMenu(element.name, element.section));
    menus = parsedMenus;
    countMenu();
}


function saveLocalStorage (menus) {  
    localStorage.setItem(MENUS_KEY, JSON.stringify(menus));
}


function findCurrentMenuCursor () {
  const ul = document.querySelector("ul");
  return ul.id.split('-')[0];
}


//20221116
//문제점 : 1. delete 할 때 id, section 이 모두 같을 때 로컬 스토리지에서 둘 다 지워짐
// 2. 메튜판 수정 시 로컬 스토리지에 반영 안 됨
// 3. 품절 클래스 로컬 스토리지에 저장 안 됨.