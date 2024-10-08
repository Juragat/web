document.addEventListener('DOMContentLoaded', function () {
    slideInContent();
    setTimeout(function () {
        showUp();
    }, 500);
    
    setTimeout(function () {
        disappear();
    }, 3500);
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
    var top = document.querySelector('.h1-1st').offsetTop;
    var height = document.querySelector('.h1-1st').offsetHeight;
    document.querySelector('.grnTxt').style.opacity = '0';
    document.querySelector('.txtBtn').style.opacity = '0';
    var tmp = 0;
    document.querySelectorAll('.swap').forEach(el => {
        if(tmp==0){
            top = top + height;
            el.style.top = top.toString() + "px";
            el.style.opacity = '1';
        };
        if(tmp==1){
            var height2 = document.querySelector('.h1-2nd').offsetHeight;
            top = top + height2;
            el.style.top = top.toString() + "px";
            el.style.opacity = '1';
        };
        tmp=1;
    })
}
function disappear() {
    var top = document.querySelector('.h1-1st').offsetTop;
    document.querySelector('.grnTxt').style.opacity = '1';
    document.querySelector('.txtBtn').style.opacity = '1';
    document.querySelectorAll('.swap').forEach(el => {
        el.style.top = top.toString() + "px";
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
var mq = window.matchMedia("(min-width: 1025px)");

// Call the function initially to check the screen width
handleScreenWidthChange(mq);

// Add a listener for screen width changes
mq.addListener(handleScreenWidthChange);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click',  func);
});
document.querySelector('.a').addEventListener('click',  func);
function func(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    const topOffset = targetSection.offsetTop;
    const scrollDuration = 750; // Duration of the scroll animation in milliseconds

    smoothScrollTo(topOffset, scrollDuration);
}
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

const form = document.getElementById("form");

form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    var body = "Email: " + email + "<br>Name: " + name + "<br>Subject: " + subject + "<br>Message: " + message;
    Email.send({
        SecureToken: "fe7792dd-9d1d-4ea5-ac7a-72e442ee465e",
        To: 'juragatarman@gmail.com',
        From: "business@juragat.com",
        Subject: "Client message from juragat.com",
        Body: body
    }).then(
        message => alert('Email is sent'),
    );
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
})
