const inputForm = document.querySelector("#espresso-menu-form");
const inputValue = document.querySelector("#espresso-menu-name");
const inputButton = document.querySelector("#espresso-menu-submit-button");
const menuList = document.querySelector("#espresso-menu-list");

const handleSubmitMenu = (event) => {
  event.preventDefault();
  const newMenu = inputValue.value;
  if (newMenu !== '') {
    inputValue.value = "";
    menuList.innerHTML +=  `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${newMenu}</span>
    <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
    <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
  </li>`;
    countMenu();
    const editButton = document.querySelector(".menu-edit-button:last-child");
    const removeButton = document.querySelector(".menu-remove-button:last-child");    
    console.log(editButton)
    console.dir(editButton)
    editButton.addEventListener("click", editMenu);
    removeButton.addEventListener("click", removeMenu);
  }
}

function editMenu() {
  const menuName = document.querySelector(".menu-name");
  const newName = window.prompt('어떤 이름으로 변경하시겠어요?');
  menuName.innerText = newName;
}


function removeMenu() {
  const confirm = window.confirm('정말 삭제하시겠어요?');
  if (confirm) menuList.removeChild(this.parentElement);
}

const countMenu = () => {
  const countDic = document.querySelector(".menu-count");
  let count = menuList.childElementCount;
  countDic.innerText = `총 ${count}개`;
}

inputForm.addEventListener("submit", handleSubmitMenu);
inputButton.addEventListener("click", handleSubmitMenu);
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