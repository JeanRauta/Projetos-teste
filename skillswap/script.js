window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () =>{
        document.body.removeChild("loader");
    });
})


  function clickMenu(){
    if(nav3.style.display == 'block' ){
      nav3.style.display = 'none'
    } else{
      nav3.style.display = 'block'
    }
  }

