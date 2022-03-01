"use strict";
function fetchdata() {
    fetch("https://onlinemanufacturing.in//common/public/getAllVerifiedRequests")
        .then((t) => {
            if (!t.ok) throw Error("ERROR");
            return t.json();
        })
        .then((t) => {
            t.length <= 4 && (document.getElementById("leads2").style.display = "none"), console.log(t);
            const e = t
                .map(
                    (t) =>
                        `
                            <tr>
                                <td scope="row" data-label="Title">${t.title}</td>
                                <td data-label="Status" >${t.status}</td>
                                <td data-label="Category" >${t.categoriesStr}</td>
                                <td data-label="Quantity" >${t.quantity}</td>
                                <td><a href="https://onlinemanufacturing.in/IndustryRequest" class="site-btn sb-c4" style="background-color: #3781da; color: #fff; border-radius: 0; padding: 8px; height: auto; font-size: 13px">Send Quotation</a></td>
                            </tr>
                            `
                )
                .join("");
            console.log(e),
            document.querySelector("#app2").insertAdjacentHTML("afterbegin", e);
            document.querySelector("#app3").insertAdjacentHTML("afterbegin", t.length);
            getPagination('#table-id');
            console.log(t.length);
        })
        .catch((t) => {
            console.log(t);

        });
}
$(document).ready(function () {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#app2 tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
// getPagination('#table-id');
//getPagination('.table-class');
//getPagination('table');

/*					PAGINATION
- on change max rows select options fade out all rows gt option value mx = 5
- append pagination list as per numbers of rows / max rows option (20row/5= 4pages )
- each pagination li on click -> fade out all tr gt max rows * li num and (5*pagenum 2 = 10 rows)
- fade out all tr lt max rows * li num - max rows ((5*pagenum 2 = 10) - 5)
- fade in all tr between (maxRows*PageNum) and (maxRows*pageNum)- MaxRows
*/


function getPagination(table) {
    var lastPage = 1;
    $('table tr:eq(0)').prepend('<th> ID </th>');

    var id = 0;

    $('table tr:gt(0)').each(function () {
        id++;
        $(this).prepend('<td data-label="ID">' + id + '</td>');
    });
    $('#maxRows')
        .on('change', function (evt) {
            //$('.paginationprev').html('');			// reset pagination

            lastPage = 1;
            $('.pagination')
                .find('li')
                .slice(1, -1)
                .remove();
            var trnum = 0;
            var maxRows = parseInt($(this).val());

            if (maxRows == 100000) {
                $('.pagination').hide();
            } else {
                $('.pagination').show();
            }

            var totalRows = $(table + ' tbody tr').length;
            $(table + ' tr:gt(0)').each(function () {

                trnum++;
                if (trnum > maxRows) {


                    $(this).hide();
                }
                if (trnum <= maxRows) {
                    $(this).show();
                }
            });
            if (totalRows > maxRows) {

                var pagenum = Math.ceil(totalRows / maxRows);
                for (var i = 1; i <= pagenum;) {
                    // for each page append pagination li
                    $('.pagination #prev')
                        .before(
                            '<li data-page="' +
                            i +
                            '">\
                <span>' +
                            i++ +
                            '<span class="sr-only">(current)</span></span>\
              </li>'
                        )
                        .show();
                } // end for i
            } // end if row count > max rows
            $('.pagination [data-page="1"]').addClass('active'); // add active class to the first li
            $('.pagination li').on('click', function (evt) {
                // on click each page
                evt.stopImmediatePropagation();
                evt.preventDefault();
                var pageNum = $(this).attr('data-page'); // get it's number

                var maxRows = parseInt($('#maxRows').val()); // get Max Rows from select option

                if (pageNum == 'prev') {
                    if (lastPage == 1) {
                        return;
                    }
                    pageNum = --lastPage;
                }
                if (pageNum == 'next') {
                    if (lastPage == $('.pagination li').length - 2) {
                        return;
                    }
                    pageNum = ++lastPage;
                }

                lastPage = pageNum;
                var trIndex = 0; // reset tr counter
                $('.pagination li').removeClass('active'); // remove active class from all li
                $('.pagination [data-page="' + lastPage + '"]').addClass('active'); // add active class to the clicked
                // $(this).addClass('active');					// add active class to the clicked
                limitPagging();

                $(table + ' tr:gt(0)').each(function () {
                    // each tr in table not the header
                    trIndex++; // tr index counter
                    // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
                    if (
                        trIndex > maxRows * pageNum ||
                        trIndex <= maxRows * pageNum - maxRows
                    ) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    } //else fade in
                }); // end of for each tr in table
            }); // end of on click pagination list

            limitPagging();
          })
          .val(30)
          .change();

    // end of on select change
    // END OF PAGINATION
}


function limitPagging() {
    // alert($('.pagination li').length)

    if ($('.pagination li').length > 7) {
        if ($('.pagination li.active').attr('data-page') <= 3) {
            $('.pagination li:gt(5)').hide();
            $('.pagination li:lt(5)').show();
            $('.pagination [data-page="next"]').show();
        } if ($('.pagination li.active').attr('data-page') > 3) {
            $('.pagination li:gt(0)').hide();
            $('.pagination [data-page="next"]').show();
            for (let i = (parseInt($('.pagination li.active').attr('data-page')) - 2); i <= (parseInt($('.pagination li.active').attr('data-page')) + 2); i++) {
                $('.pagination [data-page="' + i + '"]').show();

            }

        }

    }

}



//  Developed By Yasser Mas
// yasser.mas2@gmail.com

$(window).on("load", function () {
    $(".loader").fadeOut(), $("#preloder").delay(400).fadeOut("slow");
}),
    (function (t) {
        t(".nav-switch").on("click", function (e) {
            t(this).toggleClass("active"), t(".header-right").toggleClass("active"), e.preventDefault();
        }),
            t(".set-bg").each(function () {
                var e = t(this).data("setbg");
                t(this).css("background-image", "url(" + e + ")");
            }),
            t(".hero-slider").owlCarousel({ loop: !0, nav: !1, dots: !0, mouseDrag: !1, animateOut: "fadeOut", animateIn: "fadeIn", items: 1, autoplay: !0 }),
            t(".hero-slider .owl-dot").each(function () {
                var e = t(this).index() + 1;
                e < 10 ? (t(this).html("0").append(e), t(this).append("<span>.</span>")) : (t(this).html(e), t(this).append("<span>.</span>"));
            }),
            t(".video-popup").magnificPopup({ type: "iframe" }),
            t(".testimonials-slider").owlCarousel({ loop: !0, nav: !0, navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'], dots: !0, margin: 128, center: !0, items: 1 }),
            t(".testimonials-slider .owl-dot").each(function () {
                var e = t(this).index() + 1;
                e < 10 ? (t(this).html("0").append(e), t(this).append("<span>.</span>")) : (t(this).html(e), t(this).append("<span>.</span>"));
            }),
            t(".panel-link").on("click", function (e) {
                t(".panel-link").removeClass("active");
                var o = t(this);
                o.hasClass("active") || o.addClass("active"), e.preventDefault();
            }),
            t(".circle-progress").each(function () {
                var e = t(this).data("cpvalue"),
                    o = t(this).data("cpcolor"),
                    i = t(this).data("cptitle"),
                    a = t(this).data("cpid");
                t(this).append('<div class="' + a + '"></div><div class="progress-info"><h2>' + e + "%</h2><p>" + i + "</p></div>"),
                    e < 100
                        ? t("." + a).circleProgress({ value: "0." + e, size: 180, thickness: 7, fill: o, emptyFill: "rgba(0, 0, 0, 0)" })
                        : t("." + a).circleProgress({ value: 1, size: 180, thickness: 7, fill: o, emptyFill: "rgba(0, 0, 0, 0)" });
            });
    })(jQuery),
    $(window).scroll(function () {
        $(window).scrollTop() > 100 ? $("#back2Top").fadeIn() : $("#back2Top").fadeOut();
    }),
    $(document).ready(function () {
        $("#back2Top").click(function (t) {
            return t.preventDefault(), $("html, body").animate({ scrollTop: 0 }, "slow"), !1;
        });
    });
var frm = $("#consultancy");
frm.submit(function (t) {
    t.preventDefault(),
        $.ajax({
            type: "POST",
            url: "https://onlinemanufacturing.in/common/public/conusultancy",
            data: frm.serialize(),
            success: function (t) {
                alert(t), $("#consultancy").trigger("reset");
            },
            error: function (t) {
                alert(t);
            },
        });
});
var $boxes = $(".boxlink"),
    $productLinks = $(".productlist .product-link").mouseover(function () {
        $boxes
            .hide()
            .filter("#box" + this.id)
            .show();
    }),
    $boxes1 = $(".boxlink1"),
    $productLinks1 = $(".productlist1 .product-link1").mouseover(function () {
        $boxes1
            .hide()
            .filter("#box1" + this.id)
            .show();
    });
$(".nav-link2:not(active)").on("mouseover", function () {
    $(".nav-link2.active").removeClass("active"), $(this).addClass("active");
}),
    $(".nav-link1:not(active)").on("mouseover", function () {
        $(".nav-link1.active").removeClass("active"), $(this).addClass("active");
    }),
    $(".dp1:not(active)").on("mouseover", function () {
        $(".dp1.active").removeClass("active"), $(this).addClass("active");
    }),
    fetchdata(),
    $(document).ready(function () {
        var t = $(".first_depth p");
        $(".second_depth"),
            t.on("click", function () {
                t.closest(".first_depth").removeClass("on"), $(this).closest(".first_depth").addClass("on");
            });
    }),
    $(function () {
        $(".material-card > .mc-btn-action").click(function () {
            var t = $(this).parent(".material-card"),
                e = $(this).children("i");
            e.addClass("fa-spin-fast"),
                t.hasClass("mc-active")
                    ? (t.removeClass("mc-active"),
                        window.setTimeout(function () {
                            e.removeClass("fa-arrow-left").removeClass("fa-spin-fast").addClass("fa-bars");
                        }, 800))
                    : (t.addClass("mc-active"),
                        window.setTimeout(function () {
                            e.removeClass("fa-bars").removeClass("fa-spin-fast").addClass("fa-arrow-left");
                        }, 800));
        });
    }),
    $(window).on("load", function () {
        $(".portfolio-container .filter-card").css("display", "none"), $(".portfolio-container .filter-web").css("display", "none");
        var t = $(".portfolio-container").isotope({ itemSelector: ".portfolio-item", layoutMode: "fitRows" });
        $("#portfolio-flters .filter-card1").on("mouseover", function () {
            $(".portfolio-container .filter-card").css("display", "block");
        }),
            $("#portfolio-flters .filter-web1").on("mouseover", function () {
                $(".portfolio-container .filter-web").css("display", "block");
            }),
            $("#portfolio-flters .filter-app1").on("mouseover", function () {
                $(".portfolio-container .filter-app").css("display", "block");
            }),
            $("#portfolio-flters li").on("mouseover", function () {
                $("#portfolio-flters li").removeClass("filter-active"), $(this).addClass("filter-active"), t.isotope({ filter: $(this).data("filter") });
            }),
            $(document).ready(function () {
                $(".venobox").venobox();
            });
    });
