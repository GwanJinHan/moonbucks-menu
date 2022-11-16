//작동 O - 개선 필요
const inputForm = document.querySelector("#espresso-menu-form");
const inputValue = document.querySelector("#espresso-menu-name");
const inputButton = document.querySelector("#espresso-menu-submit-button");
const menuList = document.querySelector(`#${findCurrentMenuCursor()}-menu-list`);

const MENUS_KEY = "menus" ;

let menus = [];

const saveLocalStorage = (menus) => {  
  localStorage.setItem(MENUS_KEY, JSON.stringify(menus));
}


function findCurrentMenuCursor () {
  const ul = document.querySelector("ul");
  return ul.id.split('-')[0];
}


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


function soldOutMenu() {
  this.parentElement.classList.toggle("sold-out");
}

function editMenu() {
  const newName = window.prompt('어떤 이름으로 변경하시겠어요?');
  this.previousSibling.previousSibling.innerText = newName;
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
//20221109
// 1. 함수를 많이 써서 반복되는 내용을 줄이자
// 2. 함수는 모두 밖으로 -> 어떻게 맵핑할지
// 3. 딕셔너리로 DB 생성
// 4. let <-> const
// 5. 화살표 함수?
// 6. 파일 나누기

/* <기능 세분회>
1. 입력 (이벤트)
2. 태그 생성
3. 버튼 - 삭제, 수정
4. 카운트 */