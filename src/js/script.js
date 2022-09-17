
    $('a.list-parent, a.menu-link-parent, a.logo-parent, a.n-p-link, a.btn-parent-s, a.img-parent-link').click(function (e) {
      e.preventDefault();                   // prevent default anchor behavior
      var goTo = this.getAttribute("href"); // store anchor href

      setTimeout(function () {
        window.location = goTo;
      }, 1100);
    });
    (function (d) {
      var config = {
        kitId: 'vqw1kwc',
        scriptTimeout: 1100,
        async: true
      },
        h = d.documentElement, t = setTimeout(function () { h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive"; }, config.scriptTimeout), tk = d.createElement("script"), f = false, s = d.getElementsByTagName("script")[0], a; h.className += " wf-loading"; tk.src = 'https://use.typekit.net/' + config.kitId + '.js'; tk.async = true; tk.onload = tk.onreadystatechange = function () { a = this.readyState; if (f || a && a != "complete" && a != "loaded") return; f = true; clearTimeout(t); try { Typekit.load(config) } catch (e) { } }; s.parentNode.insertBefore(tk, s)
    })(document);  

    $('.open').on('tap', function () {
      $('body').toggleClass('no-scroll');
    });

    $(window).bind("pageshow", function (event) {
      if (event.originalEvent.persisted) {
        window.location.reload()
      }
    });

 
$('.heading-md').on('mouseenter', function() {
  $('.heading-md').addClass('fill');
});
 
$('.heading-md').on('mouseleave', function() {
  $('.heading-md').removeClass('fill');
});

$('.menu-link-parent').on('mouseenter', function() {
  $('.menu-text').find('.menu-text').addClass('hover');
});


let transitionTrigger = $(".transition-trigger");
let introDurationMS = 1500;
let exitDurationMS = 1300;
let excludedClass = "no-transition";
  
// On Page Load
if (transitionTrigger.length > 0) {
	transitionTrigger.click();
	$("body").addClass("no-scroll-transition");
	setTimeout(() => {$("body").removeClass("no-scroll-transition");}, introDurationMS);
}
// On Link Click
$("a").on("click", function (e) {
  if ($(this).prop("hostname") == window.location.host && $(this).attr("href").indexOf("#") === -1 &&
      !$(this).hasClass(excludedClass) && $(this).attr("target") !== "_blank" && transitionTrigger.length > 0) {
    e.preventDefault();
		$("body").addClass("no-scroll-transition");
    let transitionURL = $(this).attr("href");
    transitionTrigger.click();
    setTimeout(function () {window.location = transitionURL;}, exitDurationMS);
  }
});
// On Back Button Tap
window.onpageshow = function(event) {if (event.persisted) {window.location.reload()}};
// Hide Transition on Window Width Resize
setTimeout(() => {$(window).on("resize", function () {
setTimeout(() => {$(".transition").css("display", "none");}, 50);});
}, introDurationMS);


    Weglot.initialize({
        api_key: 'wg_67fb12f3cd219a797c89752e37c206e89'
    });

$('.burger-menu-parent').on('click', function() {
  $('.nav').toggleClass('remove-blur-mobile');
});


$('.heading-md').on('mouseenter', function() {
  $('.heading-md').addClass('fill');
});
 
$('.heading-md').on('mouseleave', function() {
  $('.heading-md').removeClass('fill');
});


  

let typeSplit;
// Split the text up
function runSplit() {
  typeSplit = new SplitType(".valueenglish", {
    types: "lines, words"
  });
  $(".line").append("<div class='line-mask'></div>");
  createAnimation();
}
runSplit();
// Update on window resize
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    typeSplit.revert();
    runSplit();
  }
});

gsap.registerPlugin(ScrollTrigger);

function createAnimation() {
  $(".line").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        // trigger element - viewport
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });
    tl.to($(this).find(".line-mask"), {
      width: "0%",
      duration: 1
    });
  });
}