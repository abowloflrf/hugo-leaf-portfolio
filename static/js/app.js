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
var lightboxCloseBtn = document.querySelector(".lightbox-close")
lightboxCloseBtn.addEventListener("click", e => {
    var lightboxWrap = document.querySelector(".lightbox-wrap")
    lightboxWrap.style.display = "none"
})

// 回到顶部按钮实现
window.onscroll = function() {
    if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
        document.getElementById("to-top").style.opacity = 1
    } else {
        document.getElementById("to-top").style.opacity = 0
    }
}
document.getElementById("to-top").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
