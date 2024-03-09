document.addEventListener('DOMContentLoaded', function () {
    slideInContent();
    showUp();
    setTimeout(function () {
        disappear();
    }, 2000);
    var widt = document.querySelector('.h1-1st').offsetWidth;
    var heit = document.querySelector('.h1-1st').offsetHeight;
    console.log(widt)
    document.querySelector('.handler').style.width = widt + 'px';
    document.querySelector('.handler').style.height = heit + 'px';
    var heit2 = document.querySelector('.navWrap').offsetHeight;
    document.querySelector('.navRes').style.top = heit2 + 'px';
});

window.addEventListener('scroll', slideInContent);

function slideInContent() {
    document.querySelectorAll('.fade').forEach(targetDiv => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    targetDiv.style.animation = 'fadeIn 2s forwards';
                    observer.disconnect();
                }
            });
        });

        observer.observe(targetDiv);
    });

    document.querySelectorAll('.fade2').forEach(targetDiv => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    targetDiv.style.animation = 'fadeIn 3s forwards';
                    observer.disconnect();
                }
            });
        });

        observer.observe(targetDiv);
    });
}

document.querySelector('.handler').addEventListener('mouseover', showUp);
document.querySelector('.handler').addEventListener('mouseout', disappear);
function showUp() {
    var c = 45;
    document.querySelector('.grnTxt').style.opacity = '0';
    document.querySelectorAll('.swap').forEach(el => {
        c = c + 10;
        el.style.top = c.toString() + "%";
        el.style.opacity = '1';
    })
}
function disappear() {
    var c = 45;
    document.querySelector('.grnTxt').style.opacity = '1';
    document.querySelectorAll('.swap').forEach(el => {
        el.style.top = c.toString() + "%";
        el.style.opacity = '0';
    })
}


function hideShow() {
    var state = document.querySelector('.navRes').style.display
    if (state == 'block') {
        document.querySelector('.navRes').style.display = 'none';
    }
    else {
        document.querySelector('.navRes').style.display = 'block';
    }
}

// Function to handle screen width change
function handleScreenWidthChange(mq) {
    if (mq.matches) {
        // Screen width is wider than 900px
        document.querySelector('.navRes').style.display = 'block';
        console.log("Screen width is wider than 900px");
    } else {
        document.querySelector('.navRes').style.display = 'none';
        // Perform another action or do nothing
        console.log("Screen width is not wider than 900px");
    }
}

// Media query for screen width wider than 900px
var mq = window.matchMedia("(min-width: 901px)");

// Call the function initially to check the screen width
handleScreenWidthChange(mq);

// Add a listener for screen width changes
mq.addListener(handleScreenWidthChange);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const topOffset = targetSection.offsetTop;
        const scrollDuration = 750; // Duration of the scroll animation in milliseconds

        smoothScrollTo(topOffset, scrollDuration);
    });
});

// Smooth scrolling function
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    function scroll() {
        const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        const timeElapsed = currentTime - startTime;
        const scrollProgress = Math.min(1, timeElapsed / duration);

        window.scrollTo(0, easeInOut(start, target, scrollProgress));

        if (timeElapsed < duration) {
            requestAnimationFrame(scroll);
        }
    }

    function easeInOut(start, target, progress) {
        return start + (target - start) * (progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress);
    }

    scroll();
}
