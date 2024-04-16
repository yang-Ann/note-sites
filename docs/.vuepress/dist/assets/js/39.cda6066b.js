(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{619:function(_,t,v){"use strict";v.r(t);var i=v(2),a=Object(i.a)({},(function(){var _=this,t=_._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("h1",{attrs:{id:"浏览器和图形引擎渲染对比"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器和图形引擎渲染对比"}},[_._v("#")]),_._v(" 浏览器和图形引擎渲染对比")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLWicjWiaRdIaBW3dGNdo1vwnKqmDGGYMBKyx52kIeH6hL0eQm26RVzfjw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("h1",{attrs:{id:"浏览器引擎"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器引擎"}},[_._v("#")]),_._v(" 浏览器引擎")]),_._v(" "),t("p",[_._v("浏览器引擎是浏览器的核心部分，负责解析网页内容（如 HTML、CSS 和 JavaScript）并呈现给用户。各种浏览器可能使用不同的引擎，这导致了不同浏览器之间在渲染页面时可能会有细微的差异。以下是一些主要的浏览器引擎及与其关联的浏览器：")]),_._v(" "),t("ul",[t("li",[_._v("IE: Trident")]),_._v(" "),t("li",[_._v("WebKit: Safari")]),_._v(" "),t("li",[_._v("Blink: Chrome、Edge")])]),_._v(" "),t("h2",{attrs:{id:"webkit"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#webkit"}},[_._v("#")]),_._v(" WebKit")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLbf48BicpuZibvBRsCvKfTJ7ibekLiau1l6V4IB8uzTrUSOGlO69w2rlniaw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}}),_._v("webkit")]),_._v(" "),t("p",[_._v("以 WebKit 为例，WebKit 是一个开源的 Web 浏览器引擎，它为多种浏览器提供支持，如 Apple 的 Safari 浏览器。它起源于 KDE 项目的 KHTML 和 KJS 库，但后来由 Apple 进一步发展并开源，从而产生了 WebKit。WebKit 代码库主要是用 C++ 编写的，其中包含一些 C 和汇编代码。")]),_._v(" "),t("p",[_._v("主要特点和组件：")]),_._v(" "),t("ul",[t("li",[t("strong",[_._v("WebCore：")]),_._v(" 这是 WebKit 的主要部分，负责渲染 HTML 和 CSS。这基于原先的 KHTML。")]),_._v(" "),t("li",[t("strong",[_._v("JavaScriptCore：")]),_._v(" 负责执行 JavaScript，基于原先的 KJS。\n"),t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLy3AUAstSHNpuvicMxq1ZLNRqFCrzL7p3aH3BwsRu3LPSeSHiaMTMEGEQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})])]),_._v(" "),t("p",[_._v("在 WebKit 的成功之后，Google 最初使用 WebKit 为其 Chrome 浏览器提供支持，但后来 Google 选择分叉并创建了自己的引擎，名为 Blink。")]),_._v(" "),t("h2",{attrs:{id:"时间线"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#时间线"}},[_._v("#")]),_._v(" 时间线")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLjica0kp1spNfCoUyod2libgUFur18gKfbvn9OeLWfC1yvJwiaaRN52B0Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("h1",{attrs:{id:"webcore"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#webcore"}},[_._v("#")]),_._v(" WebCore")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLJFnuFhdZoRmsw522yu1ibTfbicZCP04xKo4GlRKr3PvEDQhic7k9geF1w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("p",[_._v("WebCore 是 WebKit 浏览器引擎的核心部分，将网页内容转化为用户可以看到和与之互动的视觉表示。")]),_._v(" "),t("p",[_._v("WebCore 是 WebKit 最大的组件，该层实现了大部分 Web API ，最重要的是负责解析 HTML 和 CSS，计算布局，并渲染页面。它处理页面中的所有元素，包括文本、图像、视频、SVG、Canvas、WebGL、动画、音频等。它还实现了 CSS JIT，这是现有的唯一 CSS 即时编译器。")]),_._v(" "),t("h2",{attrs:{id:"渲染过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#渲染过程"}},[_._v("#")]),_._v(" 渲染过程")]),_._v(" "),t("p",[_._v("WebCore 的渲染过程涉及多个步骤，从接收原始的 HTML、CSS 和 JavaScript 资源开始，到生成用户在屏幕上看到的最终像素结束。以下是基本的渲染步骤：")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLPibo0v9kibROB7Sicb3EKL3ib2HejQsdmAicOBS1icBeb0pC2YTQaYfcdGJg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("ol",[t("li",[t("strong",[_._v("解析（CPU）：")])])]),_._v(" "),t("ul",[t("li",[_._v("WebCore 开始通过解析 HTML 生成一个 DOM（Document Object Model）树。")]),_._v(" "),t("li",[_._v("CSS 也会被解析，生成一个叫做 CSSOM（CSS Object Model）的结构。CSS 是告诉引擎如何在屏幕上呈现 DOM 树的语言。每个 Web 引擎都使用复杂的机制来遍历 DOM 中的所有内容并应用 CSS 定义的规则。")])]),_._v(" "),t("ol",[t("li",[t("strong",[_._v("合并 DOM 和 CSSOM（CPU）：")]),_._v(" DOM 和 CSSOM 被结合，生成一个渲染树（Render Tree）。这个树只包含实际需要被渲染的元素，不包括例如 "),t("code",[_._v("display: none")]),_._v(" 的元素。")]),_._v(" "),t("li",[t("strong",[_._v("布局（CPU）：")]),_._v(" 布局阶段开始，浏览器确定所有有可视表现的元素在屏幕上的确切位置和大小。每个元素将获得一个确定的屏幕坐标。")]),_._v(" "),t("li",[t("strong",[_._v("划分图层（CPU）：")]),_._v(" 图层是独立于其他内容进行合成的渲染单位，它的决策是基于布局完成后的信息。图层的创造是为了优化性能。一些特定的 CSS 属性和操作，如动画、3D 变换、视频播放等，如果能在它们自己的图层上运行，通常可以更高效地渲染。")]),_._v(" "),t("li",[t("strong",[_._v("绘制（CPU + GPU）：")]),_._v(" 绘制阶段开始时，WebCore 会遍历渲染树，并使用 UI 后端层来绘制每个元素的具体像素。")]),_._v(" "),t("li",[t("strong",[_._v("合成（GPU）：")]),_._v(" 对页面上的元素进行分层，并在合成阶段将它们按正确的顺序合并为一个图层，然后呈现给用户。合成通常是渲染流程的最后一个阶段。在这个阶段，浏览器会处理那些可以被 GPU 直接处理的工作，例如页面的滚动、元素的移动和透明度的变化。因为这些操作不需要重新计算布局或重绘整个页面，所以它们通常会比其他操作更加高效。")])]),_._v(" "),t("h2",{attrs:{id:"绘制和合成"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#绘制和合成"}},[_._v("#")]),_._v(" 绘制和合成")]),_._v(" "),t("p",[t("strong",[_._v("绘制和合成大部分是在 GPU 中进行的，对于我们图形开发者来说，进入到了我们熟悉的语境。")])]),_._v(" "),t("h3",{attrs:{id:"绘制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#绘制"}},[_._v("#")]),_._v(" 绘制")]),_._v(" "),t("p",[_._v("绘制（Painting）过程可以涉及到调用 GPU API，但这取决于具体的渲染场景和浏览器的优化策略。")]),_._v(" "),t("p",[_._v('在浏览器的渲染流程中，"绘制" 通常指的是将渲染树中的每个元素转换为像素数据的过程。这个过程可能首先在 CPU 上完成，并产生一个位图。然后，这个位图可以被上传到 GPU 并存储为纹理，随后在合成阶段由 GPU 处理。')]),_._v(" "),t("p",[_._v("但是，随着硬件加速绘图技术的普及，越来越多的绘图任务直接在 GPU 上进行，特别是当涉及到复杂的图形效果（如 CSS 滤镜、渐变等）时。在这种情况下，浏览器会直接调用 GPU API（例如 OpenGL 或 DirectX）来进行绘图。")]),_._v(" "),t("p",[_._v("所以，有时浏览器的绘制过程是通过调用 GPU API 来完成的，但并不总是这样。具体情况取决于浏览器的实现、页面的内容以及用户设备的硬件和驱动支持。")]),_._v(" "),t("p",[_._v("UI 后端层则负责与特定平台的图形和 UI 系统进行交互。这样，渲染引擎可以“写一次，到处运行”，而不必为每个平台编写特定的绘图代码。UI 后端层为浏览器提供了一个平台无关的方法来绘制其内容，使得浏览器可以跨多个操作系统平台工作，而无需担心每个平台的绘图特定细节。")]),_._v(" "),t("ul",[t("li",[_._v("Windows：UI 后端层可能使用 DirectX 进行绘图")]),_._v(" "),t("li",[_._v("macOS: Core Graphics、Metal")]),_._v(" "),t("li",[_._v("Linux：它可能使用 X11 或 Wayland 等")]),_._v(" "),t("li",[_._v("iOS ：Core Graphics 和 Metal")]),_._v(" "),t("li",[_._v("Android：OpenGL ES 或 Vulkan")])]),_._v(" "),t("h4",{attrs:{id:"绘制过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#绘制过程"}},[_._v("#")]),_._v(" 绘制过程")]),_._v(" "),t("p",[_._v("当 WebCore 进入绘制阶段并开始遍历渲染树时，其主要目的是将每个可见的渲染对象绘制到屏幕上。以下是在这个阶段中的主要步骤和发生的活动：")]),_._v(" "),t("ol",[t("li",[t("strong",[_._v("确定绘制顺序：")]),_._v(" WebCore 会根据渲染树中的层次结构确定绘制的顺序。基本的原则是，先绘制在底部的元素，再绘制在其上方的元素。这确保了层叠上下文和 z-index 的正确处理。")]),_._v(" "),t("li",[t("strong",[_._v("裁剪和隐藏：")]),_._v(" 不是渲染树上的所有元素都需要绘制。有些元素可能位于视口之外，或者被其他元素完全遮盖。通过裁剪和优化，WebCore 可以跳过这些元素，从而提高绘制的性能。")]),_._v(" "),t("li",[t("strong",[_._v("调用平台相关的绘图 API：")]),_._v(" WebCore 本身不直接处理低级的图形操作。相反，它依赖于底层的图形 API（例如 macOS 上的 Core Graphics 或 Windows 上的 Direct2D）来执行实际的绘制。")]),_._v(" "),t("li",[t("strong",[_._v("背景和边框：")]),_._v(" 对于每个需要绘制的渲染对象，WebCore 首先绘制背景颜色和背景图片（如果有的话），然后绘制边框。")]),_._v(" "),t("li",[t("strong",[_._v("文字和图像：")]),_._v(" 接下来，WebCore 会绘制文本、图像和其他内容。对于文本，它会处理字体、大小、颜色和其他样式。对于图像，它可能还会进行缩放或其他转换。")]),_._v(" "),t("li",[t("strong",[_._v("子元素绘制：")]),_._v(" 对于容器元素（例如一个具有子元素的 "),t("code",[_._v("<div>")]),_._v("），WebCore 会递归地遍历其子渲染对象，并对每个子对象重复上述的绘制过程。")]),_._v(" "),t("li",[t("strong",[_._v("处理透明度和复合效果：")]),_._v(" 如果渲染对象有透明度、阴影或其他复合效果，WebCore 在绘制时会应用它们。")]),_._v(" "),t("li",[t("strong",[_._v("处理交互状态：")]),_._v(" 某些元素可能具有交互状态，如：hover 或 :active。WebCore 会确保这些状态下的样式得到正确的反映。")])]),_._v(" "),t("p",[_._v("一旦遍历完成并且所有可见的渲染对象都被绘制到了屏幕上，绘制阶段就结束了。")]),_._v(" "),t("h3",{attrs:{id:"合成"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#合成"}},[_._v("#")]),_._v(" 合成")]),_._v(" "),t("p",[_._v("为了提高性能，现代浏览器会尽可能地利用合成。例如，当你使用像"),t("code",[_._v("transform")]),_._v("或"),t("code",[_._v("opacity")]),_._v("这样的 CSS 属性时，浏览器可能会为该元素创建一个新的合成层。这样，当该元素发生变化时，浏览器只需要更新那个合成层，而不是整个页面。这大大提高了性能，特别是在移动设备和低功耗设备上。")]),_._v(" "),t("p",[_._v("合成（Compositing）主要是在 GPU 中进行的。现代浏览器为了提高渲染性能，尤其是动画和页面的平滑滚动，会尽量将合成任务交给 GPU 处理。这是因为 GPU 在处理像素和图层操作上特别高效，特别是涉及大量并行计算时。")]),_._v(" "),t("p",[_._v("当浏览器决定为某个元素创建一个新的合成层时（例如，使用了"),t("code",[_._v("transform")]),_._v("、"),t("code",[_._v("opacity")]),_._v("、"),t("code",[_._v("filters")]),_._v("或其他会触发合成的 CSS 属性时），该元素的渲染内容会被发送到 GPU，存在一个称为纹理（texture）的结构中。随后，当这个元素需要移动或进行其他视觉变化时，GPU 只需简单地操作这个纹理，而无需重新计算或重绘整个页面。这样可以大大提高性能。")]),_._v(" "),t("p",[_._v("简而言之，合成是在 GPU 中进行的，利用了 GPU 的并行处理能力和专门的图形处理技术来实现高效渲染。")]),_._v(" "),t("p",[_._v("合成主要是在 GPU 中将不同的图层组合到一起以形成最终的页面视图。在这个过程中，各个图层可以独立地进行移动、缩放或调整透明度等操作，而不需要重新绘制整个页面。利用 GPU 进行合成可以提高渲染速度和效率。")]),_._v(" "),t("h1",{attrs:{id:"对比图形引擎"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#对比图形引擎"}},[_._v("#")]),_._v(" 对比图形引擎")]),_._v(" "),t("p",[_._v("3D 图形引擎是专门用于创建、渲染和操作 3D 内容的软件框架。它通常包括物理模拟、光照计算、动画、模型加载等功能。")]),_._v(" "),t("p",[_._v("以 three.js 为例，它使用 WebGL API 在浏览器中进行 3D 渲染。而浏览器中的常规页面渲染，例如 WebCore 的渲染，是基于浏览器的标准渲染流程，主要处理 2D 内容。")]),_._v(" "),t("p",[_._v("three.js 旨在创建 3D 世界和效果，而浏览器的 2D 渲染更关心内容的结构和样式。")]),_._v(" "),t("h2",{attrs:{id:"核心概念对比"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#核心概念对比"}},[_._v("#")]),_._v(" 核心概念对比")]),_._v(" "),t("p",[_._v("当我们试图类比浏览器的 2D 页面渲染和 three.js 的 3D 渲染时，可以发现一些相似的核心概念，尽管这些概念在每个上下文中可能有所不同。以下是一些相似性：")]),_._v(" "),t("h3",{attrs:{id:"元素-物体"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#元素-物体"}},[_._v("#")]),_._v(" 元素/物体")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLpewPS85nibZGia9oFRwknqbwYEcoiatCMqFsyFFWE09E00UC71H1LvyuA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}}),_._v("CCS 盒模型")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLlJCneSrSpgu2YJ3XIWuVOxphoPFHI1iajxBRUlCLwwoLqPCZrKxiaaLg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}}),_._v("3D中简单物体")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mL1UzjQCsQ4E1jmhFCRXUGyUiaZmWt8jmJvibnsMpaIzcrZ7BjwEzQldWw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}}),_._v("复杂人物")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLCzEu8TlqocDib3gQW5ImRCwWrXNItof1yno4sK9ANvSeRqQS17EXM4w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}}),_._v("CG渲染")]),_._v(" "),t("ul",[t("li",[_._v("2D 页面渲染：页面上的每个 HTML 元素，如"),t("code",[_._v("<div>")]),_._v("， "),t("code",[_._v("<img>")]),_._v("， "),t("code",[_._v("<p>")]),_._v("等。")]),_._v(" "),t("li",[_._v("three.js/3D 渲染：场景中的每个 3D 物体，如"),t("code",[_._v("THREE.Mesh")]),_._v("， "),t("code",[_._v("THREE.Group")]),_._v("等。")])]),_._v(" "),t("h3",{attrs:{id:"样式-材质"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#样式-材质"}},[_._v("#")]),_._v(" 样式/材质")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLAd9CNtia89hVniblk92x4ebYL9lJ3F7kcDOaibibelHGIdzmGL4pDZWSCw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLhJv2r6lvlyeC0AkzEdwJM4ic0DdvARjvtkEAR7vrg8p7ibULPibFhH6ZA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("ul",[t("li",[_._v("2D 页面渲染：CSS 样式决定了元素的外观，如背景色、字体、边框等。")]),_._v(" "),t("li",[_._v("three.js/3D 渲染：材质决定了 3D 物体的表面外观，如颜色、光泽、纹理等。")])]),_._v(" "),t("h3",{attrs:{id:"层次结构-场景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#层次结构-场景"}},[_._v("#")]),_._v(" 层次结构/场景")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLiaIS8qXmicIYwiaKESGrZVUibe4iaXf7oNJ32y4NnsjXKepfULZnYTS6ZFQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLV9ACuvkGXGicfhlzvCVpZZ6egabkUy50CFyjf7Q6BopzQA0uzWERjWg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("ul",[t("li",[_._v("2D 页面渲染：DOM 树表示了元素之间的层次关系。")]),_._v(" "),t("li",[_._v("three.js/3D 渲染：场景（"),t("code",[_._v("THREE.Scene")]),_._v("）包含了所有 3D 物体，并定义了它们在 3D 空间中的关系。")])]),_._v(" "),t("h3",{attrs:{id:"视图-摄像机"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#视图-摄像机"}},[_._v("#")]),_._v(" 视图/摄像机")]),_._v(" "),t("ul",[t("li",[_._v("2D 页面渲染：视口定义了用户当前可以看到的页面部分。")]),_._v(" "),t("li",[_._v("three.js/3D 渲染：摄像机定义了用户从哪个角度和位置看到 3D 场景。")])]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLyXoKOYwV0wnoyH3Umk95eMeyz1mOhTwJYdedhicicDicTgVdLHDOrJCYg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLeZsE2M1LAaib5HbJnZFdABibVArpWIFnicajq3wrVF7ABKoP9TfQdNuEg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("h3",{attrs:{id:"光照-颜色"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#光照-颜色"}},[_._v("#")]),_._v(" 光照/颜色")]),_._v(" "),t("ul",[t("li",[_._v("2D 页面渲染：颜色定义了元素的背景、文本和边框颜色。")]),_._v(" "),t("li",[_._v("three.js/3D 渲染：光源影响了物体的颜色和明暗，与物体的材质和纹理结合，决定了其最终的外观。")])]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLYVnaX1V62opQyPfgPEMxNXXqoRkFD2AaMlHT4HPbs08lt1hp4u1MFg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLsapgS1XcE91W3cnkT8yYAKwQiaqNMj9MpvesoctqAkQFus3SfhfsibIw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("h3",{attrs:{id:"动画-变换"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#动画-变换"}},[_._v("#")]),_._v(" 动画/变换")]),_._v(" "),t("ul",[t("li",[_._v("2D 页面渲染：CSS 动画和转换可以改变元素的位置、大小、颜色等。")]),_._v(" "),t("li",[_._v("three.js/3D 渲染：动画库和变换方法可以改变物体的位置、大小、旋转等。")])]),_._v(" "),t("h3",{attrs:{id:"交互-事件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#交互-事件"}},[_._v("#")]),_._v(" 交互/事件")]),_._v(" "),t("ul",[t("li",[_._v("2D 页面渲染：可以使用事件监听器捕捉元素的点击、鼠标悬停、焦点等事件。")]),_._v(" "),t("li",[_._v("three.js/3D 渲染：通过光线投射，可以监听物体的点击、交叉、拖放等事件。")])]),_._v(" "),t("h2",{attrs:{id:"渲染过程对比"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#渲染过程对比"}},[_._v("#")]),_._v(" 渲染过程对比")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zics78ChKYvDdQj5UpxIl0mLdpnXjM8KVEyLl4HTVhhWvIiaEgJWxP7WQm1ECjbt0bib8W9pTqtoGLZQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),_._v(" "),t("h1",{attrs:{id:"进化中的变和不变"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#进化中的变和不变"}},[_._v("#")]),_._v(" 进化中的变和不变")]),_._v(" "),t("h2",{attrs:{id:"图形引擎的演变"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#图形引擎的演变"}},[_._v("#")]),_._v(" 图形引擎的演变")]),_._v(" "),t("p",[_._v("从 2005 年 Unity 的亮相，到 2010 年 Three.js 的出现，再到 2013 年 Babylon.js 的发布，不断演进出新的图形引擎并在各自领域发挥作用。")]),_._v(" "),t("ul",[t("li",[t("strong",[_._v("变的是底层技术和上层框架")]),_._v("：在时间的长河中，上层的应用框架持续调整、优化，底层的渲染技术也衍生出从前向渲染、后向渲染、全局光、基于物理的渲染等技术，再到到 WebGL1、WebGL2、WebGPU 等底层的进化。")]),_._v(" "),t("li",[t("strong",[_._v("不变的是概念模型")]),_._v("：即使技术在进步，某些核心元素如网格、材质、纹理和灯光等概念始终保持不变。")])]),_._v(" "),t("h2",{attrs:{id:"浏览器的演进"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的演进"}},[_._v("#")]),_._v(" 浏览器的演进")]),_._v(" "),t("p",[_._v("浏览器的历史自 1995 年 IE 的诞生开始，经历了 2003 年 Safari 的发布，再到 2008 年 Chrome 的出现。")]),_._v(" "),t("ul",[t("li",[t("strong",[_._v("变的是底层技术和上层框架")]),_._v("：在各种应用框架如 jQuery、Angular、React 的推出与退场中，底层的渲染技术也在不断的升级与优化。")]),_._v(" "),t("li",[t("strong",[_._v("不变的是概念模型")]),_._v("：尽管浏览器技术在飞速进化，但盒模型、结构树、样式树和渲染树这些核心概念始终保持其原始的形态。")])]),_._v(" "),t("p",[_._v("所以，无论是图形引擎还是浏览器，面对各种创新与挑战，都需要有一个稳固的基础。这就像建筑，无论外部如何装修，基石始终不变。当我们面对不同的领域，构建系统的解决方案时，构建模型是首先要思考的问题。在应用层面，需要不断为特定的细分领域找到最佳的解决方案；而在底层，持续优化效率是确保长远发展的关键。")])])}),[],!1,null,null,null);t.default=a.exports}}]);