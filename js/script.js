const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".navbar-hamburger");
const storyFiller = document.querySelector(".story-line__filler");
const seeMoreButs = document.querySelectorAll(".slider__see-button");

let hamburgerShown = false;

let sliderMoved = 0;
let currentSlide = 0;
const slidersAmount = document.querySelector(".images-set").children.length - 1;
const fillerStep = 100 / (slidersAmount + 1);
const slideShowTime = 4000;

let feelTodo;

class ToDoSlider{

    slidesAmount;
    currentSlideNum;
    currentSlideNode;
    allSlideNodes;

    buttonsSet;
    buttonLeft;
    buttonRight;

    constructor(nodeId){
        this.allSlideNodes = document.getElementById(nodeId).children;
        this.slidesAmount = document.getElementById(nodeId).children.length - 1;
        this.currentSlideNum = 0;
        this.currentSlideNode = this.allSlideNodes[this.currentSlideNum];

        this.allSlideNodes[this.currentSlideNum].classList.toggle("to-do-active-slide");

        this.buttonsSet = document.getElementById(nodeId).
        parentElement.querySelectorAll(".to-do__slide-button-wrapper");

        if(this.buttonsSet[0].children[0].classList.contains("to-do__button-right")){
            this.buttonRight = this.buttonsSet[0].children[0];
            this.buttonLeft = this.buttonsSet[1].children[0];
        }

        if(this.buttonsSet[1].children[0].classList.contains("to-do__button-right")){
            this.buttonRight = this.buttonsSet[1].children[0];
            this.buttonLeft = this.buttonsSet[0].children[0];
        }

        this.buttonLeft.addEventListener("click", this.changeToDoSlideLeft);
        this.buttonRight.addEventListener("click", this.changeToDoSlideRight);
    }

    changeToDoSlideLeft = () => {
        this.currentSlideNode.classList.toggle("to-do-active-slide");
        if(this.currentSlideNum === 0){
            this.currentSlideNum = this.slidesAmount;
            this.currentSlideNode = this.allSlideNodes[this.currentSlideNum];
            this.currentSlideNode.classList.toggle("to-do-active-slide");
            return;
        }
        else{
            this.currentSlideNum--;
            this.currentSlideNode = this.allSlideNodes[this.currentSlideNum];
            this.currentSlideNode.classList.toggle("to-do-active-slide");
            return;
        }
    }

    changeToDoSlideRight = () => {
        this.currentSlideNode.classList.toggle("to-do-active-slide");
        if(this.currentSlideNum === this.slidesAmount){
            this.currentSlideNum = 0;
            this.currentSlideNode = this.allSlideNodes[this.currentSlideNum];
            this.currentSlideNode.classList.toggle("to-do-active-slide");
            return;
        }
        else{
            this.currentSlideNum++;
            this.currentSlideNode = this.allSlideNodes[this.currentSlideNum];
            this.currentSlideNode.classList.toggle("to-do-active-slide");
            return;
        }
    }
}

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
    if(!e.target.classList.contains("slider-button-arrow")){
        return;
    }
    else{
        
        updateInterval();

        if(e.target.classList.contains("arrow-left")){
            changeSlide("left");
            return;
        }
        else{
            changeSlide("right");
            return;
        }
    }
}

const changeSlide = (direction) => {
    if(direction === "left"){
        if(currentSlide === 0){
            currentSlide = slidersAmount;
            document.getElementById("images-set").style.transform =  `translate(${sliderMoved -= 100 * slidersAmount}%)`;
            updateStoryline();
            return;
        }
        currentSlide--;
        document.getElementById("images-set").style.transform = `translate(${sliderMoved += 100}%)`;
        updateStoryline();
    }

    if(direction === "right"){
        if(currentSlide === slidersAmount){
            currentSlide = 0;
            document.getElementById("images-set").style.transform =  `translate(${sliderMoved += 100 * slidersAmount}%)`;
            updateStoryline();
            return;
        }
        currentSlide++;
        document.getElementById("images-set").style.transform =  `translate(${sliderMoved -= 100}%)`;
        updateStoryline();
    }
}

const updateStoryline = () => {
    storyFiller.style.width = (currentSlide + 1) * fillerStep + "%";
}

const init = () => {
    updateStoryline();
    feelTodo = new ToDoSlider("to-do-feel");
}

document.addEventListener('scroll', changeNavBar);
hamburger.addEventListener("click", onHamburgerClick);
document.querySelector(".slider-buttons-set").addEventListener("click", onSliderButtonClick);


let initInterval = setInterval(()=>{
    changeSlide("right");
}, slideShowTime);

let hoverTimeout = null;
let hoverLastTime = null;

const updateInterval = () => {
    clearInterval(initInterval);
    initInterval = setInterval(()=>{
        changeSlide("right");
    }, slideShowTime);
}

for(node of seeMoreButs){
    node.addEventListener("mouseover", () => {
        clearInterval(initInterval);
        clearTimeout(hoverTimeout);
        hoverLastTime = Date.now();
    });

    node.addEventListener("mouseout", () => {
        
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout( () => {
            changeSlide("right");
            updateInterval();
        }, 1000);
    } );
}

init();


