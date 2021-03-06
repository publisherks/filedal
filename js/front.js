$(document).ready(function () {
    nav();
    select();
    listTypeChange();
    modal('a[data-modal]');
    tab();
    subtab();
    accordion();
    listView();
    upload();
});

function modal (target) {
    $(target).on('click', function () {
        let commonOption = {
            fadeDuration: 200,
            fadeDelay: .5,
            closeText: '',
        }

        $($(this).data('modal')).modal(commonOption);
        return false;
    });
}

function nav () {
    const NAV     = $("#nav");
    const MAINNAV = $("#mainNav");
    const SUBNAV  = $("#subNav");

    MAINNAV.find("li").off("mouseenter").on("mouseenter", function() {
        let $this   = $(this),
            index   = $this.index(),
            subNav  = SUBNAV.find("ul"),
            sel     = subNav.eq(`${index - 1}`),
            unsel   = subNav.not(`:eq(${index - 1})`);

        MAINNAV.find("li").eq(index).addClass("on")
        MAINNAV.find("li").not(`:eq(${index})`).removeClass("on")

        let value = $this.offset().left - NAV.offset().left - 30;

        if (index === 0) {
            SUBNAV.removeAttr("style");
            unsel.removeClass("on")
            return;
        }

        if (sel.length === 0) {
            value = 0;
        }

        if (value + sel.outerWidth() > NAV.width()) {
            value = NAV.width() - sel.outerWidth();
        }


        sel.addClass("on");
        unsel.removeClass("on")
        SUBNAV.removeAttr("style").css("left", value);
    })
}

function select () {
    const SELECTTEXT = $(".select-text");

    SELECTTEXT.off("click.select").on("click.select", function () {

        let ul     = $(this).next("ul"),
            method = "slideUp";

        if(ul.is(":hidden")) {
            method = "slideDown";
        }

        ul[method](300);
    })
}

function listTypeChange () {
    const LISTS     = $(".lists-box"),
          RADIOBTNS = $("input[name='listType']:radio");
    
    RADIOBTNS.each(function (index, item) {
        if(RADIOBTNS[index].checked === true) {
            LISTS[(RADIOBTNS[index].value === "galleryType") ? "addClass" : "removeClass"]("gallery-type");
        }
    })

    RADIOBTNS.change(function () {
        let value  = this.value,
            method = "removeClass";
        
        if(value === "galleryType") {
            method = "addClass";
        }

        LISTS[method]("gallery-type");
    })
    
}

function tab () {
    const TABMENU = $("[data-tabMenu]").find(">ul>li");
    const TABBTN  = TABMENU.find("a");
    const TABCON  = $("[data-tabMenu]").siblings("[data-tabCon]");

    TABMENU.each(function (index, tabmenus) {
        if ($(tabmenus).find("a").hasClass("on")) {
            TABCON.each(function (idx, tabs) {
                $(tabs).data("tabcon") === $(tabmenus).find("a").data("tab") ? $(tabs).addClass("on") : $(tabs).removeClass("on")
            })
        }
    })

    TABBTN.off("click.tabmenu").on("click.tabmenu", function (e) {
        e.preventDefault()
        let tabNum = $(this).data("tab");
        if (tabNum === undefined) {
            return false;
        }
        $(this).closest("[data-tabMenu]").find("a").removeClass("on");
        $(this).addClass("on");
        $(this).closest("[data-tabMenu]").siblings("[data-tabCon]").each(function (index, item) {
            $(item).data("tabcon") === tabNum ? $(item).addClass("on") : $(item).removeClass("on");
        })
    })
}

function subtab () {
    const TABMENU = $("[data-subTab]").find(">li");
    const TABBTN  = TABMENU.find("a");
    const TABCON  = $("[data-subTab]").siblings("[data-tabCon]");

    TABMENU.each(function (index, tabmenus) {
        if ($(tabmenus).find("a").hasClass("on")) {
            TABCON.each(function (idx, tabs) {
                $(tabs).data("tabcon") === $(tabmenus).find("a").data("tab") ? $(tabs).addClass("on") : $(tabs).removeClass("on")
            })
        }
    })

    TABBTN.off("click.tabmenu").on("click.tabmenu", function (e) {
        e.preventDefault()
        let tabNum = $(this).data("tab");
        if (tabNum === undefined) {
            return false;
        }
        $(this).closest("[data-subTab]").find("a").removeClass("on");
        $(this).addClass("on");
        $(this).closest("[data-subTab]").siblings("[data-tabCon]").each(function (index, item) {
            $(item).data("tabcon") === tabNum ? $(item).addClass("on") : $(item).removeClass("on");
        })
    })
}

function accordion () {
    const ITME = $(".accordion-btn");

    ITME.off("click.accordion").on("click.accordion", function(e) {
        let target = $(e.currentTarget);
        let parent = target.closest(".accordion-item");
        let accCon = $(".accordion-contents");

        if (target.siblings(accCon).length === 0) {
            return false;
        }

        if (parent.hasClass("active")) {
            parent.removeClass("active").find(accCon).slideUp("fast");
        } else {
            parent.addClass("active").siblings().removeClass("active");
            accCon.slideUp("fast");
            parent.find(accCon).slideDown("fast");
        }
    })
}

function listView () {
    let target = $(".view-link");

    target.off("click.listview").on("click.listview", function(e) {
        e.preventDefault();
        let href = $(this).attr('href');
        window.open(href, "View", "width=1060, height=975, location=no, toolbar=no");
    })
}

function upload () {
    let target = $(".upload-link"),
        area   = $(".upload-area");

    $(".upload-btn").off("click.uploadArea").on("click.uploadArea", function (e) {
        e.preventDefault();
        area.show();
    })

    area.find(".upload-close").off("click.uploadClose").on("click.uploadClose", function (e) {
        e.preventDefault();
        area.hide();
    })

    target.off("click.uploadLink").on("click.uploadLink", function(e) {
        e.preventDefault();
        let href = $(this).attr('href');
        window.open(href, "Upload", "width=980, height=915, location=no, toolbar=no");
    })
}