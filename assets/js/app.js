$(document).ready(function(){
    AOS.init();

    
    $(".scroll").click(function(event) {
        var targetClick = $(this).attr('href');
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(targetClick).offset().top - 100
        }, 800);
        setTimeout(function(){
            if($(window).width() < 600){
                HideHeader();
            }
        }, 1000);
    });

    // Pegar o Sindicio Parceiro

    $('.Parceiros_Slider_Button').on('click', function() {
        var valorDaDiv = $(this).find('span').html() ;
        $("#nomeSindicoParceiro").val(valorDaDiv);
    });

    //Abre e fecha o modal de Ligação
    $('.OpenTelevenda').click(function(){
        $('.ModalLigacao').addClass('__IsActive');
    });

    
    $('.OpenModalCadastro').click(function(){
        $('.ModalCadastro').addClass('__IsActive');
    });

    $('.BtnClose').click(function(){
        $('.ModalLigacao, .ModalCadastro').removeClass('__IsActive');
    });


    //Abre e fecha o modal de cadastro
    $('.OpenCadastro').click(function(){
        $('.ModalCadastro').addClass('__IsActive');
    });

    $('.BtnClose').click(function(){
        $('.ModalCadastro').removeClass('__is-open');
        $('.ModalCadastro_StepTwo').addClass('EscondeDiv');
    });

    //Passa para o Step 2 do Modal Cadastro
    $('.BtnStepOne').click(function(){
        $('.ModalCadastro_StepOne').removeClass('__IsActive');
        $('.ModalCadastro_StepTwo').addClass('__IsActive');
        $('.StepOneContador').removeClass('__IsActive');
        $('.StepTwoContador').addClass('__IsActive');
        $('.StepThreeContador').removeClass('__IsActive');
    });

    $('.StepOneContador').click(function(){
        $('.ModalCadastro_StepOne').addClass('__IsActive');
        $('.ModalCadastro_StepTwo').removeClass('__IsActive');
        $('.ModalCadastro_StepThree').removeClass('__IsActive');
        $('.StepOneContador').addClass('__IsActive');
        $('.StepTwoContador').removeClass('__IsActive');
        $('.StepThreeContador').removeClass('__IsActive');
    });

    $('.StepTwoContador').click(function(){
        $('.ModalCadastro_StepOne').removeClass('__IsActive');
        $('.ModalCadastro_StepTwo').addClass('__IsActive');
        $('.ModalCadastro_StepThree').removeClass('__IsActive');
        $('.StepOneContador').removeClass('__IsActive');
        $('.StepTwoContador').addClass('__IsActive');
        $('.StepThreeContador').removeClass('__IsActive');
    });

    //Passa para o Step 3 do Modal Cadastro
    $('.BtnStepTwo').click(function(){
        $('.ModalCadastro_StepTwo').removeClass('__IsActive');
        $('.StepTwoContador').removeClass('__IsActive');
        $('.StepThreeContador').addClass('__IsActive');
        $('.ModalCadastro_StepThree').addClass('__IsActive');
    });

    $('.StepThreeContador').click(function(){
        $('.ModalCadastro_StepOne').removeClass('__IsActive');
        $('.ModalCadastro_StepTwo').removeClass('__IsActive');
        $('.ModalCadastro_StepThree').addClass('__IsActive');
        $('.StepOneContador').removeClass('__IsActive');
        $('.StepTwoContador').removeClass('__IsActive');
        $('.StepThreeContador').addClass('__IsActive');
    });

    //Adiciona e remove __IsActive
    $('.CidadeRioDeJaneiro').click(function(){
        $('.CidadeSalvador, .CidadeRecife').removeClass('__IsActive');
        $('.CidadeRioDeJaneiro').addClass('__IsActive');
    });

    //Adiciona e remove __IsActive
    $('.CidadeSalvador').click(function(){
        $('.CidadeRioDeJaneiro, .CidadeRecife').removeClass('__IsActive');
        $('.CidadeSalvador').addClass('__IsActive');
    });

    //Adiciona e remove __IsActive
    $('.CidadeRecife').click(function(){
        $('.CidadeRioDeJaneiro, .CidadeSalvador').removeClass('__IsActive');
        $('.CidadeRecife').addClass('__IsActive');
    });

    /*Modal Ligação */
    $("#Ligacao_BtnEnviarContato").click(function() {
        $(".BoxLead_Form_Erros").hide();

        var ELemail = $("#Modal_Ligacao_Email").val();
        var ELnome = $("#Modal_Ligacao_Nome").val();
        var ELtelefone = $("#Modal_Ligacao_Telefone").val();
        var ELestado = $("#Contato_Estado").val();
        var ELmensagem = $("#Contato_Mensagem").val();
        var ELtypeForm = $("#typeFormModalLigacao").val();
        var ELsindicoParceiro = $("#nomeSindicoParceiro").val();

        var contatoValidacao = {
            email: ELemail,
            nome: ELnome,
            telefone: ELtelefone,
            estado: ELestado,
            mensagem: ELmensagem,
            typeForm: ELtypeForm,
            nomeSindicoParceiro: ELsindicoParceiro
        };

        var erros = ValidarContatoModalLigacao(contatoValidacao);
        var contato = contatoValidacao;
        
        if (erros.length > 0) {
            erros.forEach(function(elemento, i) {            
                var grupo = elemento.parents(".BoxLead_Form_Group");            
                grupo.find(".BoxLead_Form_Erros").fadeIn();                            
            });
            return;
        }        

        CriaContatoModalLigacao(contato, function() {
            AtivarLightbox('.LightBox', '.MsgSucesso');
            $("#Modal_Ligacao_Email").val("");
            $("#Modal_Ligacao_Nome").val("");
            $("#Modal_Ligacao_Telefone").val("");
            $("#Contato_Estado").val();
            $("#Contato_Mensagem").val();
            $("#typeFormModalLigacao").val("");
            $("#nomeSindicoParceiro").val("");
        });
    });
    function ValidarContatoModalLigacao(contato) {
        //console.log(contato);
        
        if (typeof contato != "object") console.warn("Erro! Informe um objeto.");

        var elementosComErro = [];
        if (!(typeof contato.nome == "string" && contato.nome.length > 0)) {
            elementosComErro.push($("#Modal_Ligacao_Nome"));
        }

        if (!(typeof contato.mensagem == "string" && contato.mensagem.length > 0)) {
            elementosComErro.push($("#Contato_Mensagem"));
        }

        if (!(typeof contato.estado == "string" && contato.estado.length > 0)) {
            elementosComErro.push($("#Contato_Estado"));
        }

        var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(typeof contato.email == "string" && regexEmail.test(contato.email))) {
            elementosComErro.push($("#Modal_Ligacao_Email"));
        }

        var telefoneLimpo = contato.telefone.replace(/[() _-]/g, '');
        if (!(typeof contato.telefone == "string" && telefoneLimpo.length >= 10)) {
            elementosComErro.push($("#Modal_Ligacao_Telefone"));
        }

        return elementosComErro;
    }

    function CriaContatoModalLigacao(contato, callback) {    
        $('.Loading').fadeIn('fast');
        if (typeof contato != "object") console.warn("Erro! Informe um objeto.");
        if (typeof callback != "function") console.warn("Erro! Informe uma função de callback.");

        var host = window.location.host + "/" + window.location.pathname;
        event.preventDefault();
        $.ajax({
            "url": "//" + host + "/hubspot/create-contact.php",
            "method": "GET",
            "data": contato
        })
        $.ajax({
            url: "//" + host + "/email/envia_email/enviar_email_ModalLigacao.php",
            method: "POST",
            data: { nomeModalLigacao: jQuery("#Modal_Ligacao_Nome").val() , emailModalLigacao: jQuery("#Modal_Ligacao_Email").val() , telefoneModalLigacao: jQuery("#Modal_Ligacao_Telefone").val() , mensagemModalLigacao: jQuery("#Contato_Mensagem").val() , estadoModalLigacao: jQuery("#Contato_Estado").val(), sindicoParceiro: jQuery("#nomeSindicoParceiro").val() }				
        })

        .done(function(response) {
            $('.Loading').fadeOut('fast', function(){
                callback();
            });
            $('.ModalLigacao').each (function(){
                this.reset();
            });
        });
    }

    /*Formação GPU*/
    $(".StepOneContador").click(function() {
        $(".StepTwoContador").addClass("disabledbutton");
    });
    var dadosFormCadastro = {

    }

    $("#ModalCadastro_ButtonItemOne").click(function() {
        console.log("click button item");
        $(".BoxLead_Form_Erros").hide();

        dadosFormCadastro.ELemail = $("#ModalCadastro_Email").val();
        dadosFormCadastro.ELnome = $("#ModalCadastro_Nome").val();
        dadosFormCadastro.ELtelefone = $("#ModalCadastro_Telefone").val();
        dadosFormCadastro.ELtypeForm = $("#typeFormModalCadastro").val();

        var contatoValidacao = {
            email: dadosFormCadastro.ELemail,
            nome: dadosFormCadastro.ELnome,
            telefone: dadosFormCadastro.ELtelefone,
            typeForm: dadosFormCadastro.ELtypeForm
        };

        var erros = ValidarContatoCadastro(contatoValidacao);
        var contato = contatoValidacao;
        
        if (erros.length > 0) {
            erros.forEach(function(elemento, i) {            
                var grupo = elemento.parents(".BoxLead_Form_Group");            
                grupo.find(".BoxLead_Form_Erros").fadeIn();                            
            });
            return;
        }
        /*Indo para o form2 */

        $(".ModalCadastro_StepOne").removeClass("__IsActive");
        $(".StepOneContador").removeClass("__IsActive");
        $(".ModalCadastro_StepTwo").addClass("__IsActive");
        $(".StepTwoContador").addClass("__IsActive");
        $(".StepTwoContador").removeClass("disabledbutton");
        
       
        CriaContatoCadastro(contato, function() {
            AtivarLightbox('.LightBox', '.MsgSucesso');
            $("#ModalCadastro_Email").val("");
            $("#ModalCadastro_Nome").val("");
            $("#ModalCadastro_Telefone").val("");
            $("#typeFormModalCadastro").val("");
        });
    });


    function ValidarContatoCadastro(contato) {
        //console.log(contato);
        
        if (typeof contato != "object") console.warn("Erro! Informe um objeto.");

        var elementosComErro = [];
        if (!(typeof contato.nome == "string" && contato.nome.length > 0)) {
            elementosComErro.push($("#ModalCadastro_Nome"));
        }

        var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(typeof contato.email == "string" && regexEmail.test(contato.email))) {
            elementosComErro.push($("#ModalCadastro_Email"));
        }

        var telefoneLimpo = contato.telefone.replace(/[() _-]/g, '');
        if (!(typeof contato.telefone == "string" && telefoneLimpo.length >= 10)) {
            elementosComErro.push($("#ModalCadastro_Telefone"));
        }

        // if (!(typeof contato.cpf == "string" && contato.cpf.length > 0)) {
        //     elementosComErro.push($("#cpf"));
        // }

        // if (!(typeof contato.rg == "string" && contato.rg.length > 0)) {
        //     elementosComErro.push($("#rg"));
        // }

        return elementosComErro;
    }



    $("#ModalCadastro_ButtonItemTwo").click(function() {
        console.log("click button item dois");
        $(".BoxLead_Form_Erros").hide();

        dadosFormCadastro.ELcpf = $("#cpf").val();
        dadosFormCadastro.ELrg = $("#rg").val();
        dadosFormCadastro.ELlogradouro = $("#logradouro").val();
        dadosFormCadastro.ELnumero = $("#numero").val();
        dadosFormCadastro.ELcomplemento = $("#complemento").val();
        dadosFormCadastro.ELbairro = $("#bairro").val();
        dadosFormCadastro.ELcidade = $("#cidade").val();
        dadosFormCadastro.ELuf = $("#uf").val();

        var contatoValidacao = {
            email: dadosFormCadastro.ELemail,
            nome: dadosFormCadastro.ELnome,
            telefone: dadosFormCadastro.ELtelefone,
            typeForm: dadosFormCadastro.ELtypeForm,
            cpf: dadosFormCadastro.ELcpf,
            rg: dadosFormCadastro.ELrg,
            logradouro: dadosFormCadastro.ELlogradouro,
            numero: dadosFormCadastro.ELnumero,
            complemento: dadosFormCadastro.ELcomplemento,
            bairro: dadosFormCadastro.ELbairro,
            cidade: dadosFormCadastro.ELcidade,
            estado: dadosFormCadastro.ELuf
    
        };

        var erros = ValidarContatoCadastroForm2(contatoValidacao);
        var contato = contatoValidacao;
        
        if (erros.length > 0) {
            erros.forEach(function(elemento, i) {            
                var grupo = elemento.parents(".BoxLead_Form_Group");            
                grupo.find(".BoxLead_Form_Erros").fadeIn();                            
            });
            return;
        }
        
        /*Indo para o form3 */

        $('.ModalCadastro_StepOne').removeClass('__IsActive');
        $('.ModalCadastro_StepTwo').removeClass('__IsActive');
        $('.ModalCadastro_StepThree').addClass('__IsActive');

        $('.StepOneContador').removeClass('__IsActive');
        $('.StepTwoContador').removeClass('__IsActive');
        $('.StepThreeContador').addClass('__IsActive');
        $(".StepThreeContador").removeClass("disabledbutton");

        
       
        CriaContatoCadastro(contato, function() {
            AtivarLightbox('.LightBox', '.MsgSucesso');
                $("#cpf").val();
                $("#rg").val();
                $("#logradouro").val();
                $("#numero").val();
                $("#complemento").val();
                $("#bairro").val();
                $("#cidade").val();
                $("#uf").val();
        });
    });

    function ValidarContatoCadastroForm2(contato) {
        //console.log(contato);
        
        if (typeof contato != "object") console.warn("Erro! Informe um objeto.");

        var elementosComErro = [];
        if (!(typeof contato.estado == "string" && contato.estado.length > 0)) {
            elementosComErro.push($("#uf"));
        }

        if (!(typeof contato.cidade == "string" && contato.cidade.length > 0)) {
            elementosComErro.push($("#cidade"));
        }

        if (!(typeof contato.bairro == "string" && contato.bairro.length > 0)) {
            elementosComErro.push($("#bairro"));
        }

        if (!(typeof contato.complemento == "string" && contato.complemento.length > 0)) {
            elementosComErro.push($("#complemento"));
        }

        if (!(typeof contato.numero == "string" && contato.numero.length > 0)) {
            elementosComErro.push($("#numero"));
        }

        if (!(typeof contato.logradouro == "string" && contato.logradouro.length > 0)) {
            elementosComErro.push($("#logradouro"));
        }
        

        if (!(typeof contato.cpf == "string" && ValidaCpf(contato.cpf))) {
            elementosComErro.push($("#cpf"));
        }

        if (!(typeof contato.rg == "string" && contato.rg.length > 0)) {
            elementosComErro.push($("#rg"));
        }

        return elementosComErro;
    }


    function ValidaCpf(cpf) {
        if (ValidaRegexCPF(cpf)) {
            return _AlgoritmoReceitaFederalCPF(LimpaCaracteresELetras(cpf));
        }
        return false;
    }
    function ValidaRegexCPF(cpf) {
        var re = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;
        return re.test(cpf);
    }
    function _AlgoritmoReceitaFederalCPF(cpf) {
        var add, rev, i;
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '') return false;
        // Elimina CPFs invalidos conhecidos
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;
        // Valida 1o digito
        var add = 0;
        for (var i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;
        // Valida 2o digito
        add = 0;
        for (var i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;
    };

    function LimpaCaracteresELetras(value) {
        return value.replace(/[^0-9]+/g, '');
    }


    $("#ModalCadastro_ButtonItemThree").click(function() {
        console.log("click button item tres");
        $(".BoxLead_Form_Erros").hide();

        dadosFormCadastro.ELconcluFormacao = $("input[name='concluFormacao']:checked").val();
        dadosFormCadastro.ELmodeFormacao = $("input[name='modalidadeFormacao']:checked").val();
        dadosFormCadastro.ELcidadeAvaliacao = $("input[name='cidadeAvaliacao']:checked").val();

        var contatoValidacao = {
            email: dadosFormCadastro.ELemail,
            nome: dadosFormCadastro.ELnome,
            telefone: dadosFormCadastro.ELtelefone,
            typeForm: dadosFormCadastro.ELtypeForm,
            cpf: dadosFormCadastro.ELcpf,
            rg: dadosFormCadastro.ELrg,
            logradouro: dadosFormCadastro.ELlogradouro,
            numero: dadosFormCadastro.ELnumero,
            complemento: dadosFormCadastro.ELcomplemento,
            bairro: dadosFormCadastro.ELbairro,
            cidade: dadosFormCadastro.ELcidade,
            estado: dadosFormCadastro.ELuf,
            concluFormacao: dadosFormCadastro.ELconcluFormacao,
            modeFormacao: dadosFormCadastro.ELmodeFormacao,
            cidadeAvaliacao: dadosFormCadastro.ELcidadeAvaliacao
    
        };

        var erros = ValidarContatoCadastroForm3(contatoValidacao);
        var contato = contatoValidacao;
        
        if (erros.length > 0) {
            erros.forEach(function(elemento, i) {            
                var grupo = elemento.parents(".BoxLead_Form_Group");            
                grupo.find(".BoxLead_Form_Erros").fadeIn();                            
            });
            return;
        }
        
       
        CriaContatoCadastro(contato, function() {
            $('.ModalLigacao, .ModalCadastro').removeClass('__IsActive');
            AtivarLightbox('.LightBox', '.MsgSucesso');
                $("input[name='concluFormacao']:checked").val();
                $("input[name='modalidadeFormacao']:checked").val();
                $("input[name='cidadeAvaliacao']:checked").val();
        });
    });



    function ValidarContatoCadastroForm3(contato) {
        //console.log(contato);
        
        if (typeof contato != "object") console.warn("Erro! Informe um objeto.");

        var elementosComErro = [];

            if (!(typeof contato.concluFormacao == "string" && contato.concluFormacao.length > 0)) {
             elementosComErro.push($(".concluFormacao"));
            }

            if (!(typeof contato.modeFormacao == "string" && contato.modeFormacao.length > 0)) {
             elementosComErro.push($(".modalidadeFormacao"));
            }

            if (!(typeof contato.cidadeAvaliacao == "string" && contato.cidadeAvaliacao.length > 0)) {
                elementosComErro.push($(".cidadeAvaliacao"));
            }

        return elementosComErro;
    }

    function CriaContatoCadastro(contato, callback) {    
        console.log('TESTE CHAMADA FUNCAO');
         
        $('.Loading').fadeIn('fast');
        if (typeof contato != "object") console.warn("Erro! Informe um objeto.");
        if (typeof callback != "function") console.warn("Erro! Informe uma função de callback.");

        var host = window.location.host + "/" + window.location.pathname;
        event.preventDefault();
        $.ajax({
            "url": "//" + host + "/hubspot/create-contact.php",
            "method": "GET",
            "data": contato
        })

        console.log("Quero ser parceiro envia email");
        $.ajax({
            url: "//" + host + "/email/envia_email/enviar_email_QueroSerParceiro.php",
            method: "POST",
            data: contato				
        })
        .done(function(response) {
            $('.Loading').fadeOut('fast', function(){
                callback();
            });
             $('.ModalCadastro').each (function(){
                this.reset();
             });
            
        });
        
    }

    /*Inscrição Gestor */
    $("#Inscricao_BtnEnviarContato").click(function() {
        $(".BoxLead_Form_Erros").hide();

        var ELemail = $("#Inscricao_Email").val();
        var ELnome = $("#Inscricao_Nome").val();
        var ELtelefone = $("#Inscricao_Telefone").val();
        var ELtypeForm = $("#typeForm").val();

        var contatoValidacao = {
            email: ELemail,
            nome: ELnome,
            telefone: ELtelefone,
            typeForm: ELtypeForm
        };

        var erros = ValidarContato(contatoValidacao);
        var contato = contatoValidacao;
        
        if (erros.length > 0) {
            erros.forEach(function(elemento, i) {            
                var grupo = elemento.parents(".BoxLead_Form_Group");            
                grupo.find(".BoxLead_Form_Erros").fadeIn();                            
            });
            return;
        }        

        CriaContato(contato, function() {
            AtivarLightbox('.LightBox', '.MsgSucesso');
            $("#Inscricao_Email").val("");
            $("#Inscricao_Nome").val("");
            $("#Inscricao_Telefone").val("");
            $("#typeForm").val("");
        });
    });

    function ValidarContato(contato) {
        //console.log(contato);
        
        if (typeof contato != "object") console.warn("Erro! Informe um objeto.");

        var elementosComErro = [];
        if (!(typeof contato.nome == "string" && contato.nome.length > 0)) {
            elementosComErro.push($("#Inscricao_Nome"));
        }

        var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(typeof contato.email == "string" && regexEmail.test(contato.email))) {
            elementosComErro.push($("#Inscricao_Email"));
        }

        var telefoneLimpo = contato.telefone.replace(/[() _-]/g, '');
        if (!(typeof contato.telefone == "string" && telefoneLimpo.length >= 10)) {
            elementosComErro.push($("#Inscricao_Telefone"));
        }

        return elementosComErro;
    }

    function CriaContato(contato, callback) {    
        $('.Loading').fadeIn('fast');
        if (typeof contato != "object") console.warn("Erro! Informe um objeto.");
        if (typeof callback != "function") console.warn("Erro! Informe uma função de callback.");

        var host = window.location.host + "/" + window.location.pathname;
        event.preventDefault();
        $.ajax({
            "url": "//" + host + "/hubspot/create-contact.php",
            "method": "GET",
            "data": contato
        })
        $.ajax({
            url: "//" + host + "/email/envia_email/enviar_email_inscricaoGestor.php",
            method: "POST",
            data: { nomeInscricao: jQuery("#Inscricao_Nome").val() , emailInscricao: jQuery("#Inscricao_Email").val() , telefoneInscricao: jQuery("#Inscricao_Telefone").val() }				
            })
        .done(function(response) {
            $('.Loading').fadeOut('fast', function(){
                callback();
            });
            $('.Inscricao_FormBox').each (function(){
                this.reset();
            });
        });
    }

    function AtivarLightbox(context, target){
        $(context).fadeIn('fast');
        $(context).find(target).fadeIn('fast');
    }

    window.DesativarLightbox = function(){
        $('.LightBox').fadeOut('fast');
        $('.LightBox_Content').children().hide();
    }

    var panel = document.getElementsByClassName("Box_Collapse_Title");
    var i;

    for (i = 0; i < panel.length; i++) {
        panel[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
        });
    }
    
    $('.BeneficiosGPU_Slider_Full').slick({
        initialSlide: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        swipe: false,
        arrows: false,
        dots: true,
        customPaging : function(slider, i) {
            var title = $(slider.$slides[i]).data('title');
            return '<a class="pager__item"> '+title+' </a>';
        },
    });

    $('.BoxSindicos_Parceiros_Slider').slick({
        initialSlide: 0,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        // variableWidth: false,
        arrows: true,
        infinite: true,
        swipe: true,
        prevArrow: '<div class="slick-arrow slick-prev"><i class="fas fa-chevron-left"></i></div>',
        nextArrow: '<div class="slick-arrow slick-next"><i class="fas fa-chevron-right"></i></div>',
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1320,
                settings: {
                    initialSlide: 1,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    swipeToSlide: true,
                }
            },
            {
                breakpoint: 960,
                settings: {
                    initialSlide: 1,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    swipeToSlide: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    initialSlide: 1,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    swipeToSlide: true,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    initialSlide: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipeToSlide: false,
                }
            }
        ]
    });

    $('.Depoimentos_Slide').slick({
        initialSlide: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        // variableWidth: false,
        arrows: false,
        infinite: true,
        cssEase: 'linear',
        dots: true,
        responsive: [
            {
                breakpoint: 30000,
                settings: {
                    vertical: true,
                    verticalSwiping: true,
                }
            },
            {
                breakpoint: 960,
                settings: {
                    vertical: true,
                    verticalSwiping: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    vertical: true,
                    verticalSwiping: true,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    verticalSwiping: false,
                }
            }
        ]
    });

    $('.BeneficiosGPU_Slider').slick({
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
                breakpoint: 960,
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
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    $('.BannersGPU').slick({
        initialSlide: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        // variableWidth: false,
        arrows: false,
        infinite: true,
        cssEase: 'linear',
        dots: true,
        customPaging : function(slider, i) {
            var title = $(slider.$slides[i]).data('title');
            return '<a class="pager__item"> '+title+' </a>';
        },
    });

    // var cards = $(".Parceiros_Slider_Item");
    // for(var i = 0; i < cards.length; i++){
    //     var target = Math.floor(Math.random() * cards.length -1) + 1;
    //     var target2 = Math.floor(Math.random() * cards.length -1) +1;
    //     cards.eq(target).before(cards.eq(target2));
    // }

    // var cards = $(".Parceiros_Slider_Item");
    // for(var i = 0; i < cards.length; i++){
    //     var target = Math.floor(Math.random() * cards.length -1) + 1;
    //     var target2 = Math.floor(Math.random() * cards.length -2) +1;
    //     cards.eq(target).before(cards.eq(target2));
    // }

    /*Mascara*/
    $('#Inscricao_Telefone').mask('(99) 9999-99999');
    $('#Modal_Ligacao_Telefone').mask('(99) 9999-99999');
    $('#ModalCadastro_Telefone').mask('(99) 9999-99999');
    $('#cpf').mask('999.999.999-99');
    $('#rg').mask('999999999999999');
})