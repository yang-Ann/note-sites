module.exports = {
    title: "An的个人笔记",
    description: "记录学习笔记",
    // 监听指定文件变化会重新编译
    extraWatchFiles: [
        "/js/index.js",
        "/.vuepress/config.js",
    ],
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        // 增加一个自定义的 favicon(网页标签的图标)
        ["link", { rel: "icon", href: "/favicon.ico" }],
        // 移动端搜索框获取焦点优化
        ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }],
        // 自定义脚本
        ["script", { type: "text/javascript", src: "/js/index.js", type: "module" }],
    ],
    base: "/note-sites/", // 部署站点的基础路径
    markdown: {
        lineNumbers: true, // 代码块显示行号
        toc: {
            includeLevel: [2, 3, 4, 5, 6]
        }
    },
    locales: { // 多语言配置
        "/": {
            lang: "zh-CN", // 会被设置到 <html> 的 lang属性
        },
    },
    theme: "reco", // 引用下载的 vuepress-theme-reco 主题 
    // 主题配置
    themeConfig: {
        // logo: "/assets/img/logo.png", // 网站logo
        sidebar: "auto", // 自动生成左侧边栏
        subSidebar: "auto",
        sidebarDepth: 2,
        lastUpdated: "Last Updated", // 文档更新时间：每个文件git最后提交的时间
        // navbar: false, // 禁用导航栏


        // vuepress-theme-reco 主题 配置
        noFoundPageByTencent: false, // 关闭404腾讯公益页面
        type: "blog", // 主页类型
        authorAvatar: "/assets/img/logo.png", // 头像
        author: "An", // 全局作者名
        // friendLink: [ // 友情链接
        //     {
        //         title: "vuepress",
        //         desc: "Vue 驱动的静态网站生成器",
        //         logo: "/assets/img/hero.png",
        //         link: "https://vuepress.vuejs.org/zh"
        //     },
        //     {
        //         title: "vuepress-theme-reco",
        //         desc: "简洁的 vuepress 博客 & 文档 主题",
        //         logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        //         link: "https://vuepress-theme-reco.recoluan.com"
        //     }
        // ],
        // 博客信息栏配置
        blogConfig: {
            tag: {
                location: 2,     // 在导航栏菜单中所占的位置, 默认2
                text: "全部"      // 默认文案 "分类"
            },
            category: {
                location: 2,     // 在导航栏菜单中所占的位置, 默认2
                text: "分类" // 默认文案 "标签"
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: "reco-github", link: "https://github.com/yang-Ann" },
                { icon: "reco-mayun", link: "https://gitee.com/Ann-yang" },
                { icon: "reco-juejin", link: "https://juejin.cn/?utm_source=infinitynewtab.com" },
                { icon: "reco-npm", link: "https://www.npmjs.com/" },
                { icon: "reco-bilibili", link: "https://www.bilibili.com" },
            ]
        },
        nav: [
            { text: "Home", link: "/", icon: "reco-home" },
            {
                text: "前端",
                icon: "reco-document",
                items: [
                    { text: "HTML", link: "/guide/HTML/HTML" },
                    { text: "CSS", link: "/guide/CSS/CSS" },
                    { text: "JavaScript", link: "/guide/JavaScript/JavaScript" },
                    { text: "TypeScript", link: "/guide/TypeScript/TypeScript" },
                    {
                        text: "其他",
                        items: [
                            { text: "JQuery", link: "/guide/JQuery/JQuery" },
                            { text: "AJAX", link: "/guide/JavaScript/AJAX" },
                            { text: "Axios", link: "/guide/Axios/Axios" },
                            { text: "webpack", link: "/guide/webpack/webpack" },
                            { text: "Three", link: "/guide/Three/Three" },
                            { text: "electron", link: "/guide/Electron/Electron" },
                            { text: "VS Code", link: "/guide/Electron/VS Code" },
                        ]
                    },
                    { text: "设计模式", link: "/guide/设计模式" },
                    { text: "Node", link: "/guide/Node/Node" },
                    { text: "npm", link: "/guide/Node/Npm" },
                ]
            },
            {
                text: "框架",
                icon: "reco-api",
                items: [
                    { text: "Vue2", link: "/guide/Vue/Vue2" },
                    { text: "Vue3", link: "/guide/Vue/Vue3" },
                    { text: "React-16", link: "/guide/React/React-16" },
                    { text: "React-18", link: "/guide/React/React-18" },
                    { text: "微信小程序", link: "/guide/微信小程序/微信小程序" },
                ]
            },
            {
                text: "其他",
                icon: "reco-other",
                items: [
                    { text: "Git", link: "/guide/Git/Git" },
                    { text: "C语言", link: "/guide/C语言/C语言" },
                    { text: "Java", link: "/guide/Java/Java" },
                    { text: "ArcGIS", link: "/guide/ArcGIS/ArcGIS" },
                    { text: "Linux", link: "/guide/Linux/Linux" },
                    { text: "Shell", link: "/guide/Linux/Shell" },
                    { text: "Rust", link: "/guide/Rust/Rust" },
                ]
            },
            {
                text: "博客生成工具",
                items: [
                    { text: "vuepress", link: "https://vuepress.vuejs.org/zh" },
                    { text: "vuepress-theme-reco", link: "https://vuepress-theme-reco.recoluan.com" }
                ]
            }
        ]
    },
};