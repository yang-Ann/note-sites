const getFooter = () => document.querySelector("div#app div.theme-container div.footer-wrapper.footer");
const getContent = () => document.querySelector("div#app div.theme-container .table-of-contents");

// 添加目录
const createContents = () => {
  const contents = getContent();
  if (contents) {
    deletContent();
    const contentsCN = contents.cloneNode(true);
    const nav = document.createElement("nav");
    nav.setAttribute("id", "An-table-of-contents");
    const h2 = document.createElement("h2");
    h2.innerText = "目录";
    h2.setAttribute("id", "An-table-of-title");
    nav.appendChild(h2);
    nav.appendChild(contentsCN);
    document.body.appendChild(nav);

    const delBtnNode = document.querySelector(".An-del-btn");
    // 添加删除按钮
    if (!delBtnNode) {
      const delBtn = document.createElement("button");
      delBtn.classList.add("An-del-btn", "An-btn");
      delBtn.innerText = "删除左侧目录栏";
  
      // 删除按钮事件和dom
      delBtn.addEventListener("click", () => {
        deletContent();
        delBtn.parentNode.removeChild(delBtn);
      })
      document.getElementById("An-btn-wrap").appendChild(delBtn);
    }
  } else {
    alert("没有读取到目录");
  }
}

// 删除左侧目录栏
const deletContent = (flog = true) => {
  const contents = document.getElementById("An-table-of-contents");
  if (contents) {
    contents.parentNode.removeChild(contents);
  }
  if (!flog) return;
  // 切换添加目录按钮
  const addBtn = document.querySelector(".An-add-btn");
  if (addBtn) {
    addBtn.parentNode.removeChild(addBtn);
  } else {
    const [newAddBtn, btnWrap] = createAddBtn();
    btnWrap.appendChild(newAddBtn);
  }
}

// 按钮创建父容器
const createWrap = () => {
  const btnWrap = document.createElement("div");
  btnWrap.setAttribute("id", "An-btn-wrap");
  document.body.appendChild(btnWrap);
}

// 创建添加按钮
const createAddBtn = () => {
  const addBtn = document.createElement("button");
  addBtn.classList.add("An-add-btn", "An-btn");
  addBtn.innerText = "添加左侧目录栏";
  addBtn.addEventListener("click", () => {
    createContents();
  });
  const btnWrap = document.getElementById("An-btn-wrap");
  return [addBtn, btnWrap];
}


const init = () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    console.log("移动端不添加目录按钮 -> ", navigator.userAgent);
  } else {
    createWrap();
    const [addBtn, btnWrap] = createAddBtn();
    btnWrap.appendChild(addBtn);
  }
}


export {
  getFooter,
  init,
  deletContent,
  createAddBtn
}