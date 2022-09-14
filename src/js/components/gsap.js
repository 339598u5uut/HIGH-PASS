import gsap from "gsap";

document.addEventListener('DOMContentLoaded', function() {

    let close = document.getElementById('close');
    let modal = document.querySelector('.section-contacts__modal-absolut');
    let closeTl = gsap.timeline({ paused: true });

    closeTl.to(modal, {
        duration: 1,
        opacity: 0,
    });

    close.addEventListener('click', () => {
        closeTl.play();
    })


    let searchOpen = document.querySelector('.header__form-open');
    let search = document.querySelector('.header__search');
    let logo = document.querySelector('.header__logo');
    let closeBtn = document.querySelector('.header__form-close');
    let headerNav = document.querySelector('.header__nav');
    let searchTl = gsap.timeline({ paused: true });

    searchTl.fromTo(headerNav, {
            opacity: 1,
        }, {
            opacity: 0,
        })
        .fromTo(search, {
            opacity: 1,
        }, {
            display: 'none',
            opacity: 0,
        })

    .fromTo(logo, {
            opacity: 1,
        }, {
            display: 'block',
            opacity: 0,
        })
        .fromTo(searchOpen, {
            opacity: 0,
        }, {
            display: 'flex',
            duration: 0.5,
            opacity: 1,
        });

    search.addEventListener('click', () => {
        searchTl.play();
    })
    closeBtn.addEventListener('click', () => {
        searchTl.reverse();
    });



    let burger = document.getElementById('burger');
    let navMenu = document.querySelector('.header__area-burger-nav');
    let closeNav = document.querySelector('.header__area-burger-close');
    let navList = document.querySelector('.header__area-burger-nav-list');
    let phone = document.querySelector('.header__area-burger-nav-phone');
    let burgerTl = gsap.timeline({ paused: true });

    burgerTl.fromTo(closeNav, {
        opacity: 0,
    }, {
        opacity: 1,
        duration: 0.5,
        ease: "slow"
    })

    .fromTo(navMenu, {
        display: 'none',
        opacity: 0,
    }, {
        display: 'block',
        opacity: 1,
    })

    .fromTo(navList, {
            opacity: 0,
            y: 0,
        }, {
            opacity: 1,
            duration: 1.0,
            y: 70,
            ease: "slow"
        })
        .fromTo(phone, {
            opacity: 0,

        }, {
            opacity: 1,
            duration: 1.0,
            ease: "slow"
        })

    burger.addEventListener('click', () => {
        burgerTl.play();
    })
    closeNav.addEventListener('click', () => {
        burgerTl.reverse();
    });
});