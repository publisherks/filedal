function nav () {
    const NAV     = $("#nav");
    const MAINNAV = $("#mainNav");
    const SUBNAV  = $("#subNav");

    MAINNAV.find("li").off("mouseenter").on("mouseenter", function() {
        let $this   = $(this),
            index   = $this.index(),
            target  = $this.children("a"),
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
    const selectText = $(".select-text");

    selectText.off("click.select").on("click.select", function () {

        let ul     = $(this).next("ul"),
            method = "slideUp";

        if(ul.is(":hidden")) {
            method = "slideDown";
        }

        ul[method](300);
    })
}

$(document).ready(function () {
    nav();
    select();
});