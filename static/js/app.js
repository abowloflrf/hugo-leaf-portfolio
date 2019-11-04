// 过滤卡片
function filterCard() {
    var selected = $(".site-tab-selected")
    if (selected.length < 1)
        return
    selectedTag = selected.text()
    console.log(selectedTag)
    var cards = $("article.post-card")
    for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        var tags = $(card).find("li")
        var hide = true
        for (let j = 0; j < tags.length; j++) {
            const tag = tags[j];
            if (tag.innerText == selectedTag) {
                hide = false
                break
            }
        }
        if (hide) {
            $(card).hide()
        } else {
            $(card).show()
        }
    }
}

$(function () {
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

    // 首页tab实现
    $(".site-tab").on("click", event => {
        var tab = $(event.target)
        // tab样式的变更
        if (!tab.hasClass("site-tab-selected")) {
            $(".site-tab").removeClass("site-tab-selected")
            tab.addClass("site-tab-selected")
            // 卡片的过滤和筛选
            filterCard()
        }
    })
});