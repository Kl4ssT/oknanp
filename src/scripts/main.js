$(document).ready(function () {
  $('.menu__item_has-dropdown .menu__link').unbind('click').click(function(e) {
    e.preventDefault();
    var $parent = $(this).parent();


    if($parent.hasClass('active'))
      $('.menu__item_has-dropdown').removeClass('active');
    else {
      $('.menu__item_has-dropdown').removeClass('active');
      $parent.addClass('active');
    }

  });

  $('.carousel').owlCarousel({
    items: 2,
    loop: true,
    margin: 30,
    nav: true,
    navContainer: $('.slider__nav'),
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
  });
});
