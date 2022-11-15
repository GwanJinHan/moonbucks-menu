const menuSectionClass = ["espresso", "frappuccino", "blended", "teavana", "desert"];
const menuSectionKo = ["☕ 에스프레소", "🥤 프라푸치노", "🍹 블렌디드", "🫖 티바나", "🍰 디저트"];
const menuHeader = document.querySelector(".heading h2");
const menuInput = document.querySelector("#espresso-menu-name");
const btns = document.querySelectorAll(".cafe-category-name");

const menuList = document.querySelector(`#${findCurrentMenuCursor()}-menu-list`);


function findCurrentMenuCursor () {
    const ul = document.querySelector("ul");
    return ul.id.split('-')[0];
  }
  

const onMenuTabClick = (target) => {
    const menuIndex = menuSectionClass.indexOf(target.target.dataset.categoryName)
    menuHeader.innerText = `${menuSectionKo[menuIndex]} 메뉴 관리`;
    menuInput.placeholder = `${menuSectionKo[menuIndex].substr(2)} 메뉴 이름`;
    menuList.id = `${menuSectionClass[menuIndex]}-menu-list`;
    menuList.childNodes.forEach((element) => {
        if (element.classList[4] !== menuSectionClass[menuIndex]) {
            element.classList.add("hidden");
        } else {
            element.classList.remove("hidden");
        }
    });
    countMenu(target.target.dataset.categoryName);
}


const countMenu = (categoryName) => {
    const menuList = document.querySelector(`#${categoryName}-menu-list`);
    const countDic = document.querySelector(".menu-count");
    let count = 0
    if (menuList !== null) {
        menuList.childNodes.forEach((element) => {
        if (!element.classList.contains("hidden")) count++;
        });
    }
    countDic.innerText = `총 ${count}개`;
  }


btns.forEach((element) => element.addEventListener("click", onMenuTabClick));
