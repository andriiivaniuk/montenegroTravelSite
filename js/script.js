const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".navbar-hamburger");
let hamburgerShown = false;


const changeNavBar = () => {
    
    if(window.scrollY !== 0 && !navbar.classList.contains("navbar-scrolled")){
        navbar.classList.add("navbar-scrolled");
        console.log("scrolled added");
        return;
    }

    if(window.scrollY === 0 && navbar.classList.contains("navbar-scrolled")){
        navbar.classList.remove("navbar-scrolled");
        console.log("scrolled removed");
        return;
    }

}

const onHamburgerClick = () => {
    
    if(!hamburgerShown){
        document.querySelector(".navbar-set").classList.toggle("navbar-hamburger-clicked");
        const navBarItems = document.getElementsByClassName("navbar-item");
        for(let i = 0; i < navBarItems.length; i++){
            navBarItems[i].classList.add("navbar-item-shown");
        }   
        hamburgerShown = true;
    }
    else{
        document.querySelector(".navbar-set").classList.remove("navbar-hamburger-clicked");
        const navBarItems = document.getElementsByClassName("navbar-item");
        for(let i = 0; i < navBarItems.length; i++){
            navBarItems[i].classList.remove("navbar-item-shown");
        }   
        hamburgerShown = false;
    }
}

const onSliderButtonClick = (e) => {
    if(!e.target.classList.contains("button-arrow")){
        return;
    }
    else{
        if(e.target.classList.contains("arrow-left")){
            document.getElementById("images-set").style.transform = "translate(-100%)";
        }
        else{
            document.getElementById("images-set").style.transform =  "translate(+100%)";
        }
    }
}

document.addEventListener('scroll', changeNavBar);
hamburger.addEventListener("click", onHamburgerClick);
document.querySelector(".slider-buttons-set").addEventListener("click", onSliderButtonClick);

