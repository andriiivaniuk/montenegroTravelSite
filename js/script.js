const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".navbar-hamburger");
const storyFiller = document.querySelector(".story-line__filler");

let hamburgerShown = false;

let sliderMoved = 0;
let currentSlide = 0;
const slidersAmount = document.querySelector(".images-set").children.length - 1;
const fillerStep = 100 / (slidersAmount + 1);


const changeNavBar = () => {
    
    if(window.scrollY !== 0 && !navbar.classList.contains("navbar-scrolled")){
        navbar.classList.add("navbar-scrolled");
        return;
    }

    if(window.scrollY === 0 && navbar.classList.contains("navbar-scrolled")){
        navbar.classList.remove("navbar-scrolled");
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
            if(currentSlide === 0){
                currentSlide = slidersAmount;
                document.getElementById("images-set").style.transform =  `translate(${sliderMoved -= 100 * slidersAmount}%)`;
                updateStoryline();
                return;
            }
            currentSlide--;
            document.getElementById("images-set").style.transform = `translate(${sliderMoved += 100}%)`;
            updateStoryline();
            return;
            
        }
        else{
            if(currentSlide === slidersAmount){
                currentSlide = 0;
                document.getElementById("images-set").style.transform =  `translate(${sliderMoved += 100 * slidersAmount}%)`;
                updateStoryline();
                return;
            }
            currentSlide++;
            document.getElementById("images-set").style.transform =  `translate(${sliderMoved -= 100}%)`;
            updateStoryline();
            return;
        }
    }
}

const updateStoryline = () => {
    storyFiller.style.width = (currentSlide + 1) * fillerStep + "%";
}

const init = () => {
    updateStoryline();
}

document.addEventListener('scroll', changeNavBar);
hamburger.addEventListener("click", onHamburgerClick);
document.querySelector(".slider-buttons-set").addEventListener("click", onSliderButtonClick);


init();

