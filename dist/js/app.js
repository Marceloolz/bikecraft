$(document).ready(function(){
    AOS.init();

    //Menu Mobile
     //Abre
     $('.Header_Container_MenuMobileIcone').click(function(){
        $('.Header_Container_Menu').addClass('__is-mobile');
        $('.Container_Menu_Close').addClass('__is-active');
    });

    //Fechar
    $('.Container_Menu_Close').click(function(){
        $('.Header_Container_Menu').removeClass('__is-mobile');
        $('.Container_Menu_Close').removeClass('__is-active');
    });


    //Abrir Modal
    $('.AtivaOrcamento').click(function(){
        $('.ModalOrcamento').addClass('__is-active');
    });

    //Fechar Modal
    $('.ModalOrcamento_Close').click(function(){
        $('.ModalOrcamento').removeClass('__is-active');
    });
   

    //Slide de Produtos da Home
    $('.Produtos_Container_Cards').slick({
        initialSlide: 0,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        // variableWidth: false,
        arrows: true,
        infinite: true,
        cssEase: 'linear',
        prevArrow: '<div class="slick-arrow slick-prev"><i class="fas fa-chevron-left"></i></div>',
        nextArrow: '<div class="slick-arrow slick-next"><i class="fas fa-chevron-right"></i></div>',
        dots: false,
        responsive: [
            {
                breakpoint: 30000,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 961,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
})