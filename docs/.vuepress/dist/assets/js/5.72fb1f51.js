(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{314:function(t,e,o){},315:function(t,e,o){},316:function(t,e,o){},319:function(t,e,o){},320:function(t,e,o){"use strict";o(16);var a=o(0),r=o(312),n=o(311),s=Object(a.c)({components:{RecoIcon:r.b},props:{pageInfo:{type:Object,default:()=>({})},currentTag:{type:String,default:""},showAccessNumber:{type:Boolean,default:!1}},setup(t,e){const o=Object(n.a)();return{numStyle:{fontSize:".9rem",fontWeight:"normal",color:"#999"},goTags:t=>{o.$route.path!==`/tag/${t}/`&&o.$router.push({path:`/tag/${t}/`})},formatDateValue:t=>new Intl.DateTimeFormat(o.$lang).format(new Date(t))}}}),i=(o(321),o(2)),c=Object(i.a)(s,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",[t.pageInfo.frontmatter.author||t.$themeConfig.author?e("reco-icon",{attrs:{icon:"reco-account"}},[e("span",[t._v(t._s(t.pageInfo.frontmatter.author||t.$themeConfig.author))])]):t._e(),t._v(" "),t.pageInfo.frontmatter.date?e("reco-icon",{attrs:{icon:"reco-date"}},[e("span",[t._v(t._s(t.formatDateValue(t.pageInfo.frontmatter.date)))])]):t._e(),t._v(" "),!0===t.showAccessNumber?e("reco-icon",{attrs:{icon:"reco-eye"}},[e("AccessNumber",{attrs:{idVal:t.pageInfo.path,numStyle:t.numStyle}})],1):t._e(),t._v(" "),t.pageInfo.frontmatter.tags?e("reco-icon",{staticClass:"tags",attrs:{icon:"reco-tag"}},t._l(t.pageInfo.frontmatter.tags,(function(o,a){return e("span",{key:a,staticClass:"tag-item",class:{active:t.currentTag==o},on:{click:function(e){return e.stopPropagation(),t.goTags(o)}}},[t._v(t._s(o))])})),0):t._e()],1)}),[],!1,null,"7b22c628",null);e.a=c.exports},321:function(t,e,o){"use strict";o(314)},322:function(t,e,o){"use strict";o(315)},323:function(t,e,o){"use strict";o(316)},324:function(t,e,o){"use strict";var a=o(0),r={methods:{_getStoragePage(){const t=window.location.pathname,e=JSON.parse(sessionStorage.getItem("currentPage"));return null===e||t!==e.path?(sessionStorage.setItem("currentPage",JSON.stringify({page:1,path:""})),1):parseInt(e.page)},_setStoragePage(t){const e=window.location.pathname;sessionStorage.setItem("currentPage",JSON.stringify({page:t,path:e}))}}},n=(o(16),o(312)),s=o(320),i=Object(a.c)({components:{PageInfo:s.a,RecoIcon:n.b},props:["item","currentPage","currentTag"]}),c=(o(322),o(2)),l=Object(c.a)(i,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"abstract-item",on:{click:function(e){return t.$router.push(t.item.path)}}},[t.item.frontmatter.sticky?e("reco-icon",{attrs:{icon:"reco-sticky"}}):t._e(),t._v(" "),e("div",{staticClass:"title"},[t.item.frontmatter.keys?e("reco-icon",{attrs:{icon:"reco-lock"}}):t._e(),t._v(" "),e("router-link",{attrs:{to:t.item.path}},[t._v(t._s(t.item.title))])],1),t._v(" "),e("div",{staticClass:"abstract",domProps:{innerHTML:t._s(t.item.excerpt)}}),t._v(" "),e("PageInfo",{attrs:{pageInfo:t.item,currentTag:t.currentTag}})],1)}),[],!1,null,"f3fcda40",null).exports,u=o(311),p=Object(a.c)({mixins:[r],components:{NoteAbstractItem:l},props:["data","currentTag"],setup(t,e){const o=Object(u.a)(),{data:r}=Object(a.i)(t),n=Object(a.h)(1),s=Object(a.a)(()=>{const t=(n.value-1)*o.$perPage,e=n.value*o.$perPage;return r.value.slice(t,e)});return Object(a.e)(()=>{n.value=o._getStoragePage()||1}),{currentPage:n,currentPageData:s,getCurrentPage:t=>{n.value=t,o._setStoragePage(t),e.emit("paginationChange",t)}}},watch:{$route(){this.currentPage=this._getStoragePage()||1}}}),g=(o(323),Object(c.a)(p,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"abstract-wrapper"},[t._l(t.currentPageData,(function(o){return e("NoteAbstractItem",{key:o.path,attrs:{item:o,currentPage:t.currentPage,currentTag:t.currentTag}})})),t._v(" "),e("pagation",{staticClass:"pagation",attrs:{total:t.data.length,currentPage:t.currentPage},on:{getCurrentPage:t.getCurrentPage}})],2)}),[],!1,null,"3d8eb659",null));e.a=g.exports},326:function(t,e,o){"use strict";o(319)},328:function(t,e,o){"use strict";var a=o(0),r=o(33),n=o(311),s=Object(a.c)({props:{currentTag:{type:String,default:""}},setup(t,e){const o=Object(n.a)();return{tags:Object(a.a)(()=>[{name:o.$recoLocales.all,path:"/tag/"},...o.$tagesList]),tagClick:t=>{e.emit("getCurrentTag",t)},getOneColor:r.b}}}),i=(o(326),o(2)),c=Object(i.a)(s,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"tags"},t._l(t.tags,(function(o,a){return e("span",{directives:[{name:"show",rawName:"v-show",value:!o.pages||o.pages&&o.pages.length>0,expression:"!item.pages || (item.pages && item.pages.length > 0)"}],key:a,class:{active:o.name==t.currentTag},style:{backgroundColor:t.getOneColor()},on:{click:function(e){return t.tagClick(o)}}},[t._v(t._s(o.name))])})),0)}),[],!1,null,"fa4e7684",null);e.a=c.exports},351:function(t,e,o){},352:function(t,e,o){},353:function(t,e,o){},354:function(t,e,o){},355:function(t,e,o){},356:function(t,e,o){},357:function(t,e,o){},389:function(t,e,o){"use strict";o(351)},390:function(t,e,o){"use strict";o(352)},391:function(t,e,o){t.exports=o.p+"assets/img/bg.2cfdbb33.svg"},392:function(t,e,o){"use strict";o(353)},393:function(t,e,o){"use strict";o(354)},394:function(t){t.exports=JSON.parse('{"a":"1.6.16"}')},395:function(t,e,o){"use strict";o(355)},396:function(t,e,o){"use strict";o(356)},397:function(t,e,o){"use strict";o(357)},583:function(t,e,o){"use strict";o.r(e);var a=o(0),r=o(330),n=o(312),s=o(311),i=Object(a.c)({components:{NavLink:r.a,ModuleTransition:n.a},setup(t,e){const o=Object(s.a)();return{recoShowModule:Object(s.b)(),actionLink:Object(a.a)(()=>o&&{link:o.$frontmatter.actionLink,text:o.$frontmatter.actionText}),heroImageStyle:Object(a.a)(()=>o.$frontmatter.heroImageStyle||{maxHeight:"200px",margin:"6rem auto 1.5rem"})}}}),c=(o(389),o(2)),l=Object(c.a)(i,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"home"},[e("div",{staticClass:"hero"},[e("ModuleTransition",[t.recoShowModule&&t.$frontmatter.heroImage?e("img",{style:t.heroImageStyle||{},attrs:{src:t.$withBase(t.$frontmatter.heroImage),alt:"hero"}}):t._e()]),t._v(" "),e("ModuleTransition",{attrs:{delay:"0.04"}},[t.recoShowModule&&null!==t.$frontmatter.heroText?e("h1",{style:{marginTop:t.$frontmatter.heroImage?"0px":"140px"}},[t._v("\n        "+t._s(t.$frontmatter.heroText||t.$title||"vuePress-theme-reco")+"\n      ")]):t._e()]),t._v(" "),e("ModuleTransition",{attrs:{delay:"0.08"}},[t.recoShowModule&&null!==t.$frontmatter.tagline?e("p",{staticClass:"description"},[t._v("\n        "+t._s(t.$frontmatter.tagline||t.$description||"Welcome to your vuePress-theme-reco site")+"\n      ")]):t._e()]),t._v(" "),e("ModuleTransition",{attrs:{delay:"0.16"}},[t.recoShowModule&&t.$frontmatter.actionText&&t.$frontmatter.actionLink?e("p",{staticClass:"action"},[e("NavLink",{staticClass:"action-button",attrs:{item:t.actionLink}})],1):t._e()])],1),t._v(" "),e("ModuleTransition",{attrs:{delay:"0.24"}},[t.recoShowModule&&t.$frontmatter.features&&t.$frontmatter.features.length?e("div",{staticClass:"features"},t._l(t.$frontmatter.features,(function(o,a){return e("div",{key:a,staticClass:"feature"},[e("h2",[t._v(t._s(o.title))]),t._v(" "),e("p",[t._v(t._s(o.details))])])})),0):t._e()]),t._v(" "),e("ModuleTransition",{attrs:{delay:"0.32"}},[e("Content",{directives:[{name:"show",rawName:"v-show",value:t.recoShowModule,expression:"recoShowModule"}],staticClass:"home-center",attrs:{custom:""}})],1)],1)}),[],!1,null,null,null).exports,u=(o(16),o(328)),p=o(345),g=o.n(p),m=o(33);const h=()=>{const t=Object(s.a)(),e=Object(a.h)(!0),o=Object(a.g)({left:0,top:0});return Object(a.e)(()=>{e.value=!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)}),{popupWindowStyle:o,showDetail:a=>{const r=a.target;r.querySelector(".popup-window-wrapper").style.display="block";const n=r.querySelector(".popup-window"),s=document.querySelector(".info-wrapper"),{clientWidth:i}=r,{clientWidth:c,clientHeight:l}=n;if(e)o.left=(i-c)/2+"px",o.top=-l+"px",s.style.overflow="visible",t.$nextTick(()=>{(t=>{const{offsetWidth:e}=document.body,{x:a,width:r}=t.getBoundingClientRect(),n=e-(a+r);if(n<0){const{offsetLeft:e}=t;o.left=e+n+"px"}})(n)});else{const t=function(t){const e=document,o=t.getBoundingClientRect();let a=o.left,r=o.top;return a+=e.documentElement.scrollLeft||e.body.scrollLeft,r+=e.documentElement.scrollTop||e.body.scrollTop,{left:a,top:r}};s.style.overflow="hidden";const e=t(r).left-t(s).left;o.left=-e+(s.clientWidth-n.clientWidth)/2+"px",o.top=-l+"px"}},hideDetail:t=>{t.target.querySelector(".popup-window-wrapper").style.display="none"}}};var d=Object(a.c)({setup(t,e){const o=Object(s.a)(),{popupWindowStyle:r,showDetail:n,hideDetail:i}=h();return{dataAddColor:Object(a.a)(()=>{const{friendLink:t=[]}=o&&o.$themeConfig;return t.map(t=>(t.color=Object(m.b)(),t))}),popupWindowStyle:r,showDetail:n,hideDetail:i,getImgUrl:t=>{const{logo:e="",email:a=""}=t;return e&&/^http/.test(e)?e:e&&!/^http/.test(e)?o.$withBase(e):`//1.gravatar.com/avatar/${g()(a||"")}?s=50&amp;d=mm&amp;r=x`}}}}),f=(o(390),Object(c.a)(d,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"friend-link-wrapper"},t._l(t.dataAddColor,(function(o,a){return e("div",{key:a,staticClass:"friend-link-item",attrs:{target:"_blank"},on:{mouseenter:function(e){return t.showDetail(e)},mouseleave:function(e){return t.hideDetail(e)}}},[e("span",{staticClass:"list-style",style:{backgroundColor:o.color}}),t._v("\n    "+t._s(o.title)+"\n    "),e("transition",{attrs:{name:"fade"}},[e("div",{staticClass:"popup-window-wrapper"},[e("div",{ref:"popupWindow",refInFor:!0,staticClass:"popup-window",style:t.popupWindowStyle},[e("div",{staticClass:"logo"},[e("img",{attrs:{src:t.getImgUrl(o)}})]),t._v(" "),e("div",{staticClass:"info"},[e("div",{staticClass:"title"},[e("h4",[t._v(t._s(o.title))]),t._v(" "),e("a",{staticClass:"btn-go",style:{backgroundColor:o.color},attrs:{href:o.link,target:"_blank"}},[t._v("GO")])]),t._v(" "),o.desc?e("p",[t._v(t._s(o.desc))]):t._e()])])])])],1)})),0)}),[],!1,null,"2ce06ff8",null).exports),v=o(324),_=o(363),b=Object(a.c)({components:{NoteAbstract:v.a,TagList:u.a,FriendLink:f,ModuleTransition:n.a,PersonalInfo:_.a,RecoIcon:n.b},setup(t,e){const r=Object(s.a)(),n=Object(a.g)({recoShow:!1,heroHeight:0}),i=Object(s.b)(),c=Object(a.a)(()=>r.$frontmatter.heroImageStyle||{}),l=Object(a.a)(()=>{const t={textAlign:"center",overflow:"hidden",background:`url(${r.$frontmatter.bgImage?r.$withBase(r.$frontmatter.bgImage):o(391)}) center/cover no-repeat`},{bgImageStyle:e}=r.$frontmatter;return e?{...t,...e}:t});return Object(a.e)(()=>{n.heroHeight=document.querySelector(".hero").clientHeight,n.recoShow=!0}),{recoShowModule:i,heroImageStyle:c,bgImageStyle:l,...Object(a.i)(n),getOneColor:m.b}},methods:{paginationChange(t){setTimeout(()=>{window.scrollTo(0,this.heroHeight)},100)},getPagesByTags(t){this.$router.push({path:t.path})}}}),C=(o(392),Object(c.a)(b,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"home-blog"},[e("div",{staticClass:"hero",style:{...t.bgImageStyle}},[e("div",[e("ModuleTransition",[t.recoShowModule&&t.$frontmatter.heroImage?e("img",{staticClass:"hero-img",style:t.heroImageStyle||{},attrs:{src:t.$withBase(t.$frontmatter.heroImage),alt:"hero"}}):t._e()]),t._v(" "),e("ModuleTransition",{attrs:{delay:"0.04"}},[t.recoShowModule&&null!==t.$frontmatter.heroText?e("h1",[t._v("\n          "+t._s(t.$frontmatter.heroText||t.$title||"vuePress-theme-reco")+"\n        ")]):t._e()]),t._v(" "),e("ModuleTransition",{attrs:{delay:"0.08"}},[t.recoShowModule&&null!==t.$frontmatter.tagline?e("p",{staticClass:"description"},[t._v("\n          "+t._s(t.$frontmatter.tagline||t.$description||"Welcome to your vuePress-theme-reco site")+"\n        ")]):t._e()])],1)]),t._v(" "),e("ModuleTransition",{attrs:{delay:"0.16"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.recoShowModule,expression:"recoShowModule"}],staticClass:"home-blog-wrapper"},[e("div",{staticClass:"blog-list"},[e("note-abstract",{attrs:{data:t.$recoPosts},on:{paginationChange:t.paginationChange}})],1),t._v(" "),e("div",{staticClass:"info-wrapper"},[e("PersonalInfo"),t._v(" "),e("h4",[e("reco-icon",{attrs:{icon:"reco-category"}}),t._v(" "+t._s(t.$recoLocales.category))],1),t._v(" "),e("ul",{staticClass:"category-wrapper"},t._l(this.$categories.list,(function(o,a){return e("li",{key:a,staticClass:"category-item"},[e("router-link",{attrs:{to:o.path}},[e("span",{staticClass:"category-name"},[t._v(t._s(o.name))]),t._v(" "),e("span",{staticClass:"post-num",style:{backgroundColor:t.getOneColor()}},[t._v(t._s(o.pages.length))])])],1)})),0),t._v(" "),e("hr"),t._v(" "),0!==t.$tags.list.length?e("h4",[e("reco-icon",{attrs:{icon:"reco-tag"}}),t._v(" "+t._s(t.$recoLocales.tag))],1):t._e(),t._v(" "),e("TagList",{on:{getCurrentTag:t.getPagesByTags}}),t._v(" "),t.$themeConfig.friendLink&&0!==t.$themeConfig.friendLink.length?e("h4",[e("reco-icon",{attrs:{icon:"reco-friend"}}),t._v(" "+t._s(t.$recoLocales.friendLink))],1):t._e(),t._v(" "),e("FriendLink")],1)])]),t._v(" "),e("ModuleTransition",{attrs:{delay:"0.24"}},[e("Content",{directives:[{name:"show",rawName:"v-show",value:t.recoShowModule,expression:"recoShowModule"}],staticClass:"home-center",attrs:{custom:""}})],1)],1)}),[],!1,null,null,null).exports),w=o(320),$=o(17);function y(t,e,o){const a=[];!function t(e,o){for(let a=0,r=e.length;a<r;a++)"group"===e[a].type?t(e[a].children||[],o):o.push(e[a])}(e,a);for(let e=0;e<a.length;e++){const r=a[e];if("page"===r.type&&r.path===decodeURIComponent(t.path))return a[e+o]}}var O=Object(a.c)({components:{PageInfo:w.a},props:["sidebarItems"],setup(t,e){const o=Object(s.a)(),{sidebarItems:r}=Object(a.i)(t),n=Object(s.b)(),i=Object(a.a)(()=>{const{isShowComments:t}=o.$frontmatter,{showComment:e}=o.$themeConfig.valineConfig||{showComment:!0};return!1!==e&&!1!==t||!1===e&&!0===t}),c=Object(a.a)(()=>{const{$themeConfig:{valineConfig:t},$themeLocaleConfig:{valineConfig:e}}=o||{},a=e||t;return a&&0!=a.visitor}),l=Object(a.a)(()=>!1!==o.$themeConfig.lastUpdated&&o.$page.lastUpdated),u=Object(a.a)(()=>"string"==typeof o.$themeLocaleConfig.lastUpdated?o.$themeLocaleConfig.lastUpdated:"string"==typeof o.$themeConfig.lastUpdated?o.$themeConfig.lastUpdated:"Last Updated"),p=Object(a.a)(()=>{const t=o.$frontmatter.prev;return!1===t?void 0:t?Object($.k)(o.$site.pages,t,o.$route.path):(e=o.$page,a=r.value,y(e,a,-1));var e,a}),g=Object(a.a)(()=>{const t=o.$frontmatter.next;return!1===g?void 0:t?Object($.k)(o.$site.pages,t,o.$route.path):(e=o.$page,a=r.value,y(e,a,1));var e,a}),m=Object(a.a)(()=>{if(!1===o.$frontmatter.editLink)return!1;const{repo:t,editLinks:e,docsDir:a="",docsBranch:r="master",docsRepo:n=t}=o.$themeConfig;return n&&e&&o.$page.relativePath?function(t,e,o,a,r){if(/bitbucket.org/.test(t)){return($.i.test(e)?e:t).replace($.c,"")+"/src"+`/${a}/`+(o?o.replace($.c,"")+"/":"")+r+`?mode=edit&spa=0&at=${a}&fileviewer=file-view-default`}return($.i.test(e)?e:"https://github.com/"+e).replace($.c,"")+"/edit"+`/${a}/`+(o?o.replace($.c,"")+"/":"")+r}(t,n,a,r,o.$page.relativePath):""}),h=Object(a.a)(()=>o.$themeLocaleConfig.editLinkText||o.$themeConfig.editLinkText||"Edit this page"),d=Object(a.a)(()=>o.$showSubSideBar?{}:{paddingRight:"0"});return{recoShowModule:n,shouldShowComments:i,showAccessNumber:c,lastUpdated:l,lastUpdatedText:u,prev:p,next:g,editLink:m,editLinkText:h,pageStyle:d}}}),S=(o(393),Object(c.a)(O,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("main",{staticClass:"page",style:t.pageStyle},[e("section",{directives:[{name:"show",rawName:"v-show",value:t.recoShowModule,expression:"recoShowModule"}]},[e("div",{staticClass:"page-title"},[e("h1",{staticClass:"title"},[t._v(t._s(t.$page.title))]),t._v(" "),e("PageInfo",{attrs:{pageInfo:t.$page,showAccessNumber:t.showAccessNumber}})],1),t._v(" "),e("Content",{staticClass:"theme-reco-content"})],1),t._v(" "),t.recoShowModule?e("footer",{staticClass:"page-edit"},[t.editLink?e("div",{staticClass:"edit-link"},[e("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))]),t._v(" "),e("OutboundLink")],1):t._e(),t._v(" "),t.lastUpdated?e("div",{staticClass:"last-updated"},[e("span",{staticClass:"prefix"},[t._v(t._s(t.lastUpdatedText)+": ")]),t._v(" "),e("span",{staticClass:"time"},[t._v(t._s(t.lastUpdated))])]):t._e()]):t._e(),t._v(" "),t.recoShowModule&&(t.prev||t.next)?e("div",{staticClass:"page-nav"},[e("p",{staticClass:"inner"},[t.prev?e("span",{staticClass:"prev"},[t.prev?e("router-link",{staticClass:"prev",attrs:{to:t.prev.path}},[t._v("\n          "+t._s(t.prev.title||t.prev.path)+"\n        ")]):t._e()],1):t._e(),t._v(" "),t.next?e("span",{staticClass:"next"},[t.next?e("router-link",{attrs:{to:t.next.path}},[t._v("\n          "+t._s(t.next.title||t.next.path)+"\n        ")]):t._e()],1):t._e()])]):t._e(),t._v(" "),t.recoShowModule?e("Comments",{attrs:{isShowComments:t.shouldShowComments}}):t._e()],1)}),[],!1,null,null,null).exports),j=o(394),k=Object(a.c)({components:{RecoIcon:n.b},setup(t,e){const o=Object(s.a)(),r=Object(a.a)(()=>{var t,e;const a=null==o||null===(t=o.$themeConfig)||void 0===t?void 0:t.valineConfig,r=(null==o||null===(e=o.$themeLocaleConfig)||void 0===e?void 0:e.valineConfig)||a;return r&&0!=r.visitor});return{version:j.a,showAccessNumber:r}}}),x=(o(395),Object(c.a)(k,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"footer-wrapper"},[e("span",[e("reco-icon",{attrs:{icon:"reco-theme"}}),t._v(" "),e("a",{attrs:{target:"blank",href:"https://vuepress-theme-reco.recoluan.com"}},[t._v(t._s("vuepress-theme-reco@"+t.version))])],1),t._v(" "),t.$themeConfig.record?e("span",[e("reco-icon",{attrs:{icon:"reco-beian"}}),t._v(" "),e("a",{attrs:{href:t.$themeConfig.recordLink||"#"}},[t._v(t._s(t.$themeConfig.record))])],1):t._e(),t._v(" "),e("span",[e("reco-icon",{attrs:{icon:"reco-copyright"}}),t._v(" "),e("a",[t.$themeConfig.author?e("span",[t._v(t._s(t.$themeConfig.author))]):t._e(),t._v("\n        \n      "),t.$themeConfig.startYear&&t.$themeConfig.startYear!=(new Date).getFullYear()?e("span",[t._v(t._s(t.$themeConfig.startYear)+" - ")]):t._e(),t._v("\n      "+t._s((new Date).getFullYear())+"\n    ")])],1),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:t.showAccessNumber,expression:"showAccessNumber"}]},[e("reco-icon",{attrs:{icon:"reco-eye"}}),t._v(" "),e("AccessNumber",{attrs:{idVal:"/"}})],1),t._v(" "),t.$themeConfig.cyberSecurityRecord?e("p",{staticClass:"cyber-security"},[e("img",{attrs:{src:"https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png",alt:""}}),t._v(" "),e("a",{attrs:{href:t.$themeConfig.cyberSecurityLink||"#"}},[t._v(t._s(t.$themeConfig.cyberSecurityRecord))])]):t._e(),t._v(" "),e("Comments",{attrs:{isShowComments:!1}})],1)}),[],!1,null,"a7b81668",null).exports),P=o(327),I=Object(a.c)({components:{HomeBlog:C,Home:l,Page:S,Common:P.a,Footer:x,ModuleTransition:n.a},setup(t,e){const o=Object(s.a)(),r=Object(a.a)(()=>{const{$page:t,$site:e,$localePath:a}=o;return t?Object($.l)(t,t.regularPath,e,a):[]}),n=Object(a.a)(()=>{const{type:t}=o.$themeConfig||{};return t?"blog"==t?"HomeBlog":t:"Home"}),i=Object(a.h)(!1);Object(a.e)(()=>{i.value=!0});const c=Object(a.a)(()=>null==o?void 0:o.$page.path);return{sidebarItems:r,homeCom:n,show:i,path:c}}}),T=(o(396),o(397),Object(c.a)(I,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("Common",{attrs:{sidebarItems:t.sidebarItems,showModule:t.show}},[t.$frontmatter.home?e(t.homeCom,{tag:"component"}):e("div",[t.sidebarItems.length>0?e("ModuleTransition",[e("Page",{key:t.path,attrs:{"sidebar-items":t.sidebarItems}})],1):e("Page",{key:t.path,attrs:{"sidebar-items":t.sidebarItems}})],1),t._v(" "),t.$frontmatter.home?e("Footer",{staticClass:"footer"}):t._e()],1)}),[],!1,null,null,null));e.default=T.exports}}]);