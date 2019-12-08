// 过滤卡片
function filterCard() {
    var selected = $(".site-tab-selected")
    selectedTag = selected.text().trim()
    var cards = $("article.post-card")
    // 遍历所有的cards
    for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        // 若一个tag都没有被选中则显示所有tab，跳过筛选card的逻辑
        if (selected.length == 0) {
            $(card).show({
                duration: 600
            })
            continue
        }
        // 找到此card下的所有keywords，在card下有一个li列表
        var tags = $(card).find("li")
        var hide = true
        for (let j = 0; j < tags.length; j++) {
            const tag = tags[j];
            if (tag.innerText.trim() == selectedTag) {
                hide = false
                break
            }
        }
        if (hide) {
            $(card).hide({
                duration: 600,
            })
        } else {
            $(card).show({
                duration: 600,
            })
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