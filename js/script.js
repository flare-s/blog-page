/* setting an IIFE to keep the data private */
(function init() {
    const banner = document.querySelector(".banner");
    const bannerOverlay = document.querySelector(".banner__overlay");
    const navLinks = document.querySelectorAll(".navbar__link");
    const sections = document.querySelectorAll('[data-section]');
    const navList = document.querySelector(".navbar__list");

    /* function that decrease the opacity when scrolling*/
    const bannerScroll = () => {
        let scrollTop = window.scrollY;
        let bannerHeight = banner.clientHeight;
        /* formula to determine the opacity when scrolling */
        let opacity = ((1 - (bannerHeight - scrollTop) / bannerHeight) * 0.7) + 0.3;
        bannerOverlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

    }

    /* function that scroll to the element when activated by a click on a link and add the active class to the active link  */
    const handleLinks = (event) => {
        if (event.target.classList.contains('navbar__link')) {
            event.preventDefault();
            /* getting the data name of the clicked link so we add the active class to it and remove the class from the previous one */
            let linkName = event.target.dataset.link;
            link = document.querySelector(`[data-link="${linkName}"]`);
            let previousLink = document.querySelector(".navbar__link.active");
            previousLink.classList.remove('active');
            link.classList.add('active');
            /* selecting the element that the link scroll to by the using  the link data name */
            let selectedSection = document.querySelector(`[data-section="${linkName}"]`);
            /* getting the position of the element we want to scroll to */
            let selectedSectionPosition = selectedSection.getBoundingClientRect().top + window.scrollY;
            /* finally scrolling to the element */
            window.scrollTo({
                top: selectedSectionPosition,
                left: 0,
                behavior: "smooth"
            });
        }
    }

    /* function that determines the active link by detecting which section is in the viewport */
    const handleSection = () => {
        sections.forEach(section => {
            let sectionPosition = section.getBoundingClientRect().top;
            /* detecting if one of the selected elements in the viewport to activate the appropriate link  */
            if (window.innerHeight - sectionPosition  > 150) {
                /* getting the data name of the section in the viewport so we add the active class to the appropriate link and remove the class from the previous one */
                let selectedSectionName = section.dataset.section;
                let link = document.querySelector(`[data-link="${selectedSectionName}"]`);
                let previousLink = document.querySelector(".navbar__link.active");
                previousLink.classList.remove('active');
                link.classList.add('active');
            }
        });
    }



    window.addEventListener("scroll", () => {
        bannerScroll();
        handleSection();
    });

    navList.addEventListener("click", (e) => handleLinks(e));
})();