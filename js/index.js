import {
    getFooter,
    init,
    deletContent,
    createAddBtn
} from "./util.js";


window.addEventListener("load", () => {
    const footer = getFooter();
    // 删除页脚
    if (footer) footer.remove();
    init();
})

// 页面显示隐藏时同样删除
document.addEventListener("visibilitychange", () => {
    const footer = getFooter();
    if (!document.hidden && footer) footer.remove();
})


const splitPath = str => {
    const pathArr = str.split("note-sites");
    let ret;
    if (pathArr[1].indexOf("guide")) {
        ret = pathArr[1].split(".")[0]; 
    } else {
        ret = pathArr[1];
    }
    return ret;
}

// 清空目录
const clearContent = () => {
    const delBtn = document.querySelector(".An-del-btn");
    if (delBtn) {
        delBtn.parentNode.removeChild(delBtn);
    }
    deletContent(false);
    const addBtn = document.querySelector(".An-add-btn");
    if (!addBtn) {
        const [newAddBtn, btnWrap] = createAddBtn();
        btnWrap.appendChild(newAddBtn);
    }
}


// 监听路径清空目录
// let oldLocation = splitPath(location.href);
// setInterval(() => {
//     let newLocation = splitPath(location.href);
//     console.log("oldLocation: ", oldLocation);
//     console.log("newLocation: ", newLocation);

//     if (newLocation === "/") {
//         console.log("主页");
//         // clearContent();
//     }

//     if (newLocation !== oldLocation) {
//         oldLocation = newLocation;
//         clearContent();
//     }
// }, 1000);