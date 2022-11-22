const menuList = document.querySelector(`#${findCurrentMenuCursor()}-menu-list`);
const MENUS_KEY = "menus" ;

const savedMenus = localStorage.getItem(MENUS_KEY);

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

 
const countMenu = () => {
    const menuList = document.querySelector(`#${findCurrentMenuCursor()}-menu-list`);
    const countDic = document.querySelector(".menu-count");
    let count = 0
    menuList.childNodes.forEach((element) => {
        if (!element.classList.contains("hidden")) count++;
    });
    countDic.innerText = `총 ${count}개`;
}
 
 
   

if (savedMenus !== null) {
    const parsedMenus = JSON.parse(savedMenus);
    parsedMenus.forEach((element) => paintMenu(element.name, element.section));
    menus = parsedMenus;
    countMenu();
}
