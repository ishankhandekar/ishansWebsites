const observes = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }; 
        //else {
        //     entry.target.classList.remove('show');
        // };
    });
});

const hiddenElements = document.querySelectorAll('.hiddenRight, .hiddenLeft');
hiddenElements.forEach((el) => observes.observe(el));


// Get reference to the section
const backgroundSection = document.getElementById('background-section');

// Add a scroll event listener
window.addEventListener('scroll', () => {
  // Get the scroll position (between 0 and 1 based on viewport height)
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / scrollHeight;

  // Calculate border radius based on scroll fraction (0px to 100px, adjust as needed)
  const borderRadius = Math.min(scrollFraction * 400); 

  // Apply the border radius
  backgroundSection.style.borderRadius = `${borderRadius}px`;
});

const line = document.querySelector(".timeline-innerline");

let i = 0;
let i2 = 1;
let target1 = document.querySelector(".timelineUnorderedList");
let target2 = document.querySelectorAll(".timeline ul li");

const timeline_events = document.querySelectorAll(".timelineUnorderedList li");

function showTime(e) {
  e.setAttribute("done", "true");
  e.querySelector(".timeline-point").style.background = "#8A2BE2";
  e.querySelector(".date").style.opacity = "100%";
  e.querySelector("p").style.opacity = "100%";
  e.querySelector("p").style.transform = "translateY(0px)";
}

function hideTime(e) {
  e.removeAttribute("done");
  e.querySelector(".timeline-point").style.background = "rgb(228, 228, 228)";
  e.querySelector(".date").style.opacity = "0%";
  e.querySelector("p").style.opacity = "0%";
  e.querySelector("p").style.transform = "translateY(-10px)";
}

function slowLoop() {
  setTimeout(function () {
    showTime(timeline_events[i]);
    timelineProgress(i + 1);
    i++;
    if (i < timeline_events.length) {
      slowLoop();
    }
  }, 800);
}


function timelineProgress(value) {
  let progress = `${(value / timeline_events.length) * 100}%`;
  if (window.matchMedia("(min-width: 728px)").matches) {
    line.style.width = progress;
    line.style.height = "4px";
  } else {
    line.style.height = progress;
    line.style.width = "4px";
  }
}

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.9) {
        if (window.matchMedia("(min-width: 728px)").matches) {
          slowLoop();
        } else {
          showTime(entry.target);
          timelineProgress(i2);
          i2++;
        }
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 1, rootMargin: "0px 0px -50px 0px" }
);

if (window.matchMedia("(min-width: 728px)").matches) {
  observer.observe(target1);
} else {
  target2.forEach((t) => {
    observer.observe(t);
  });
}


timeline_events.forEach((li, index) => {
  li.addEventListener("click", () => {
    if (li.getAttribute("done")) {
      timelineProgress(index);

      // hide all timeline events from last upto the point clicked
      timeline_events.forEach((ev, idx) => {
        if (idx >= index) {
          hideTime(ev);
        }
      });
    } else {
      timelineProgress(index + 1);
      // show all timeline events from first upto the point clicked
      timeline_events.forEach((ev, idx) => {
        if (idx <= index) {
          showTime(ev);
        }
      });
    }
  });
});

var doit;
window.addEventListener("resize", () => {
  clearTimeout(doit);
  doit = setTimeout(resizeEnd, 1200);
});

function resizeEnd() {
  i = 0;
  slowLoop();
}



document.addEventListener("DOMContentLoaded", function () {
  // Get all the letters in the hero-text container
  const heroText = document.querySelector('.hero-text');
  const letters = Array.from(heroText.children);

  // Shuffle the letters randomly
  const shuffledLetters = letters.slice().sort(() => Math.random() - 0.5);

  // Apply sequential delays for each letter based on the shuffled order
  shuffledLetters.forEach((span, index) => {
    const delay = index * 0.09; // 0.2 seconds apart
    span.style.animationDelay = `${delay}s`;
    span.style.animation = `randomAppear 0.5s forwards ${delay}s`;
  });
});

// Fade-in trigger for the hero-text container (optional)
document.addEventListener("DOMContentLoaded", function () {
  const fadeInElement = document.querySelector('.hero-text');

  // Trigger the fade-in at the right time
  setTimeout(() => {
    fadeInElement.classList.add('visible');
  }, 100); // Adjust this delay (100ms = 0.1 seconds) as needed
});



const updateTextContent = (element, defaultText, newText, breakpoint) => {
  console.log("Window Width:", window.innerWidth);

  if (window.innerWidth < breakpoint) {
    console.log("Applying new text");
    element.innerHTML = newText; // Use innerHTML to preserve HTML tags
  } else {
    console.log("Applying default text");
    element.innerHTML = defaultText;
  }
};

// Update text on page load
document.addEventListener("DOMContentLoaded", () => {
  const ptag = document.getElementById("thePInHeadOfHeader");
  const evolutionPtag = document.getElementById("evolutionPTagReal");
  const evolutionHTag = document.getElementById("evolutionHTagReal");
  const thirdSectionPTag = document.getElementById("thirdSectionPTagReal");

  updateTextContent(
    ptag,
    "Despite it being overshadowed by more powerful activities like running and lifting weights, stretching is the cornerstone of a successful workout. Without properly flexing out all your different muscles and tendons, workouts can lack a proper warm-up, even leading you to injure yourself badly. More than that, however, stretching can harmonize the mind and soul. Especially in times of stress or pressure, having a moment to yourself could be beneficial to a healthier mind.",
    "Stretching, often overshadowed by activities like running or lifting weights, is vital for preventing injuries and ensuring a proper warm-up. Beyond physical benefits, it offers a moment of mental clarity, harmonizing the mind and soul during times of stress.",
    500 // Breakpoint for this element
  );

  updateTextContent(
    evolutionPtag,
    "Over the centuries, yoga culture and stretching in general has evolved from a sacred art to a widely practiced fitness phenomenon. Back in 3000 BCE, it was believed to have been performed as part of spiritual rituals in ancient India, with early depictions of meditative postures found in Indus Valley seals. These early practices gave way for later forms like Vedic Texts, which slowly trickled into Western culture, eventually culminating in an online boom in popularity. <b>Click each point to explore different eras and, if you want to learn more, click on any one of the headings!</b>",
    "Yoga and stretching began as sacred rituals in ancient India, dating back to 3000 BCE. Over time, they evolved into a global fitness trend, gaining popularity through Western influences and an online boom. <b>Tap each point to explore the eras or dive deeper into any heading!</b>",
    1000 // Breakpoint for this element
  );

  updateTextContent(
    evolutionHTag,
    "From Ancient Rituals to Modern Flow",
    "Yoga Through The Ages",
    1000 // Breakpoint for this element
  );

  updateTextContent(
    thirdSectionPTag,
    "Finding your perfect stretch is about understanding your body's unique needs. Different stretches target specific muscles, and what works for one person might not be as effective for another. Some may benefit from dynamic stretches before exercise, while others find static stretches more useful after. Experimenting and listening to your body will help you find what works best for you. <b>Hover over an image to reveal the stretch name; click the name to learn more!</b>",
    "Finding your perfect stretch depends on your body's needs. Experiment with different stretches to see what feels best while targeting the right muscle groups. <b>Tap an image to reveal the stretch name; click the name to learn more!</b>",
    1000
  );
});

// Update text on window resize
window.addEventListener("resize", () => {
  const ptag = document.getElementById("thePInHeadOfHeader");
  const evolutionPtag = document.getElementById("evolutionPTagReal");
  const evolutionHTag = document.getElementById("evolutionHTagReal");
  const thirdSectionPTag = document.getElementById("thirdSectionPTagReal");

  updateTextContent(
    ptag,
    "Despite it being overshadowed by more powerful activities like running and lifting weights, stretching is the cornerstone of a successful workout. Without properly flexing out all your different muscles and tendons, workouts can lack a proper warm-up, even leading you to injure yourself badly. More than that, however, stretching can harmonize the mind and soul. Especially in times of stress or pressure, having a moment to yourself could be beneficial to a healthier mind.",
    "Stretching, often overshadowed by activities like running or lifting weights, is vital for preventing injuries and ensuring a proper warm-up. Beyond physical benefits, it offers a moment of mental clarity, harmonizing the mind and soul during times of stress.",
    500 // Breakpoint for this element
  );

  updateTextContent(
    evolutionPtag,
    "Over the centuries, yoga culture and stretching in general has evolved from a sacred art to a widely practiced fitness phenomenon. Back in 3000 BCE, it was believed to have been performed as part of spiritual rituals in ancient India, with early depictions of meditative postures found in Indus Valley seals. These early practices gave way for later forms like Vedic Texts, which slowly trickled into Western culture, eventually culminating in an online boom in popularity. <b>Click each point to explore different eras and, if you want to learn more, click on any one of the headings!</b>",
    "Yoga and stretching began as sacred rituals in ancient India, dating back to 3000 BCE. Over time, they evolved into a global fitness trend, gaining popularity through Western influences and an online boom. <b>Tap each point to explore the eras or dive deeper into any heading!</b>",
    1000 // Breakpoint for this element
  );

  updateTextContent(
    evolutionHTag,
    "From Ancient Rituals to Modern Flow",
    "Yoga Through The Ages",
    1200 // Breakpoint for this element
  );

  updateTextContent(
    thirdSectionPTag,
    "Finding your perfect stretch is about understanding your body's unique needs. Different stretches target specific muscles, and what works for one person might not be as effective for another. Some may benefit from dynamic stretches before exercise, while others find static stretches more useful after. Experimenting and listening to your body will help you find what works best for you. <b>Hover over an image to reveal the stretch name; click the name to learn more!</b>",
    "Finding your perfect stretch depends on your body's needs. Experiment with different stretches to see what feels best while targeting the right muscle groups. <b>Tap an image to reveal the stretch name; click the name to learn more!</b>",
    1000
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".media-element-wrapper");

  wrappers.forEach(wrapper => {
    const image = wrapper.querySelector(".media-element");
    const text = wrapper.querySelector(".media-element-wrapper p");

    if (image && text) {
      text.style.width = `${image.offsetWidth}px`;
    }
  });
});

window.addEventListener("resize", () => {
  const wrappers = document.querySelectorAll(".media-element-wrapper");

  wrappers.forEach(wrapper => {
    const image = wrapper.querySelector(".media-element");
    const text = wrapper.querySelector(".media-element-wrapper p");

    if (image && text) {
      text.style.width = `${image.offsetWidth}px`;
    }
  });
});

document.querySelectorAll('.media-element-wrapper').forEach(wrapper => {
  wrapper.addEventListener('mouseenter', () => {
    wrapper.querySelectorAll('p').forEach(p => {
      p.classList.add('enlarged');
    });
  });

  wrapper.addEventListener('mouseleave', () => {
    wrapper.querySelectorAll('p').forEach(p => {
      p.classList.remove('enlarged');
    });
  });
});