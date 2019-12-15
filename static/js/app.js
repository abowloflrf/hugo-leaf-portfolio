// 过滤卡片
function filterCard() {
    var selected = $(".site-tab-selected")
    selectedTag = selected.text().trim() // trim 用于删除目标字符串前后的空格等空白字符
    var cards = $("article.post-card")
    var transitionTime = 400 // 卡片变化的过渡时间，单位ms
    // 遍历所有的cards
    for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        // 若一个tag都没有被选中则显示所有tab，跳过筛选card的逻辑，直接将所有的card设置为可见
        if (selected.length == 0) {
            $(card).show({
                duration: transitionTime
            })
            continue
        }
        // 找到此card下的所有keywords，在card下有一个li列表
        var tags = $(card).find("li")
        var hide = true
        for (let j = 0; j < tags.length; j++) {
            const tag = tags[j];
            // 至少有一个匹配则将这个card设置为可见，即hide=false
            if (tag.innerText.trim() == selectedTag) {
                hide = false
                break
            }
        }
        // 设置card的可见属性
        if (hide) {
            $(card).hide({
                duration: transitionTime
            })
        } else {
            $(card).show({
                duration: transitionTime
            })
        }
    }
}

// 判断元素是否在浏览器可视范围内
function isInViewport(elem) {
    var top_of_element = elem.offset().top;
    var bottom_of_element = elem.offset().top + elem.outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $(window).scrollTop();

    if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
        return true
    }
    return false
};

// 将指定selector匹配的元素加上或删除class
function toggleClassForShow(selector, className) {
    $(selector).each(function (i, elem) {
        var e = $(elem);
        if (isInViewport(e)) {
            e.addClass(className);
        } else {
            e.removeClass(className)
        }
    });
}

$(function () {
    toggleClassForShow("img.show-animation", "animated fadeIn");
    toggleClassForShow("span.markpen", "markpen-show");

    $(window).on("scroll",function () {
        toggleClassForShow("img.show-animation", "animated fadeIn");
        toggleClassForShow("span.markpen", "markpen-show");
    });

    // 点击横向滚动实现
    var scrollBtns = document.querySelectorAll(".horizontal-scroll-btn")
    scrollBtns.forEach(btn => {
        btn.addEventListener("click", e => {
            var scrollBase = 200
            var bigImgDiv
            var direction = -1
            if (e.target.className.indexOf("fa-angle-right") >= 0 || e.target.className.indexOf("toleft") >= 0)
                direction = 1
            if (e.target.nodeName === "I") bigImgDiv = e.target.parentElement.parentElement.firstElementChild
            else if (e.target.nodeName === "DIV") bigImgDiv = e.target.parentElement.firstElementChild
            bigImgDiv.scrollBy({
                left: direction * scrollBase,
                behavior: "smooth"
            })
        })
    })

    // 点击全屏查看图片实现
    var lightboxImgs = document.querySelectorAll("img.lightbox")
    lightboxImgs.forEach(img => {
        img.addEventListener("click", e => {
            var lightboxWrap = document.querySelector(".lightbox-wrap")
            var lightboxImg = document.querySelector(".lightbox-img")
            var lightboxCaption = document.querySelector(".lightbox-caption")
            lightboxImg.src = e.target.src
            lightboxCaption.textContent = e.target.dataset.caption
            lightboxWrap.style.display = "block"
        })
    })
    $(".lightbox-close").on("click", e => {
        var lightboxWrap = document.querySelector(".lightbox-wrap")
        lightboxWrap.style.display = "none"
    })

    // 回到顶部按钮实现
    window.onscroll = function () {
        if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
            $("#to-top").css("opacity", 1)
        } else {
            $("#to-top").css("opacity", 0)
        }
    }

    $("#to-top").on("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })

    // 监听tab点击事件
    $(".site-tab").on("click", event => {
        var tab = $(event.target)
        // tab样式的变更
        if (!tab.hasClass("site-tab-selected")) {
            // 若tab本身未被选中则先移除所有tab的selected class，再给点击的目标tab加上class
            $(".site-tab").removeClass("site-tab-selected")
            tab.addClass("site-tab-selected")
        } else {
            // 若tab本身已经被选中了则移除其selected class
            tab.removeClass("site-tab-selected")
        }
        // 卡片的过滤和筛选
        filterCard()
    })
});