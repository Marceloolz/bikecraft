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
   
})