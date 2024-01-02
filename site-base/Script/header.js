var menuH = document.querySelector("#menuH")
var body = document.querySelectorAll('body')[0]

menuH.addEventListener("click" , function () {
    let l1 = document.querySelector("#l1")
    let l2 = document.querySelector("#l2")
    let l3 = document.querySelector("#l3")
    let l4 = document.querySelector("#l4")
    l1.classList.toggle('l1')
    l2.classList.toggle('l2')
    l3.classList.toggle('l3')
    l4.classList.toggle('l4')
    let nav = document.querySelectorAll('nav')[0]
    if (l1.classList[1] == 'l1') {
        nav.classList.remove('navc')
        nav.classList.add('navo')
        body.style.overflow = 'hidden'
        body.style.height = '100vh'
    }else{
        nav.classList.remove('navo')
        nav.classList.add('navc')
        body.style.overflow = 'visible'
        body.style.height = 'auto'
    }
})

