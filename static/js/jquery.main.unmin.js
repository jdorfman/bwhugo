function initBackgroundResize() {
    jQuery(".bg-stretch").each(function() {
        ImageStretcher.add({
            container: this,
            image: "img"
        })
    })
}

function scrollToDiv(e) {
    e = e.replace("link", ""), $("html,body").unbind().animate({
        scrollTop: $(e).offset().top - 500
    }, "slow")
}

function sticky_relocate() {
    var e = $(window).scrollTop(),
        t = $("#sticky-subnav").offset().top;
    e > t - $(".subnav").height() ? ($(".subnav").addClass("sticky"), $("#file").css("padding-top", "110px")) : ($(".subnav").removeClass("sticky"), $("#file").css("padding-top", "60px"))
}

function onScroll() {
    var e = $(document).scrollTop();
    $(".navbar a").each(function() {
        var t = $(this),
            i = $(t.attr("href"));
        i.position().top <= e && i.position().top + i.height() > e ? ($(".navbar ul li a").removeClass("active"), t.addClass("active")) : t.removeClass("active"), $(this).parent().addClass("active").siblings().removeClass("active")
    })
}! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(e) {
    var t, i, n, o, r, a, s = "Close",
        l = "BeforeClose",
        c = "AfterClose",
        u = "BeforeAppend",
        d = "MarkupParse",
        p = "Open",
        f = "Change",
        m = "mfp",
        h = "." + m,
        g = "mfp-ready",
        v = "mfp-removing",
        y = "mfp-prevent-close",
        w = function() {},
        b = !!window.jQuery,
        C = e(window),
        x = function(e, i) {
            t.ev.on(m + e + h, i)
        },
        k = function(t, i, n, o) {
            var r = document.createElement("div");
            return r.className = "mfp-" + t, n && (r.innerHTML = n), o ? i && i.appendChild(r) : (r = e(r), i && r.appendTo(i)), r
        },
        I = function(i, n) {
            t.ev.triggerHandler(m + i, n), t.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), t.st.callbacks[i] && t.st.callbacks[i].apply(t, e.isArray(n) ? n : [n]))
        },
        T = function(i) {
            return i === a && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), a = i), t.currTemplate.closeBtn
        },
        S = function() {
            e.magnificPopup.instance || (t = new w, t.init(), e.magnificPopup.instance = t)
        },
        E = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    w.prototype = {
        constructor: w,
        init: function() {
            var i = navigator.appVersion;
            t.isIE7 = -1 !== i.indexOf("MSIE 7."), t.isIE8 = -1 !== i.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(i), t.isIOS = /iphone|ipad|ipod/gi.test(i), t.supportsTransition = E(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = e(document), t.popupsCache = {}
        },
        open: function(i) {
            var o;
            if (i.isObj === !1) {
                t.items = i.items.toArray(), t.index = 0;
                var a, s = i.items;
                for (o = 0; o < s.length; o++)
                    if (a = s[o], a.parsed && (a = a.el[0]), a === i.el[0]) {
                        t.index = o;
                        break
                    }
            } else t.items = e.isArray(i.items) ? i.items : [i.items], t.index = i.index || 0;
            if (t.isOpen) return void t.updateItemHTML();
            t.types = [], r = "", t.ev = i.mainEl && i.mainEl.length ? i.mainEl.eq(0) : n, i.key ? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}), t.currTemplate = t.popupsCache[i.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, i), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = k("bg").on("click" + h, function() {
                t.close()
            }), t.wrap = k("wrap").attr("tabindex", -1).on("click" + h, function(e) {
                t._checkIfClose(e.target) && t.close()
            }), t.container = k("container", t.wrap)), t.contentContainer = k("content"), t.st.preloader && (t.preloader = k("preloader", t.container, t.st.tLoading));
            var l = e.magnificPopup.modules;
            for (o = 0; o < l.length; o++) {
                var c = l[o];
                c = c.charAt(0).toUpperCase() + c.slice(1), t["init" + c].call(t)
            }
            I("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (x(d, function(e, t, i, n) {
                i.close_replaceWith = T(n.type)
            }), r += " mfp-close-btn-in") : t.wrap.append(T())), t.st.alignTop && (r += " mfp-align-top"), t.wrap.css(t.fixedContentPos ? {
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            } : {
                top: C.scrollTop(),
                position: "absolute"
            }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                height: n.height(),
                position: "absolute"
            }), t.st.enableEscapeKey && n.on("keyup" + h, function(e) {
                27 === e.keyCode && t.close()
            }), C.on("resize" + h, function() {
                t.updateSize()
            }), t.st.closeOnContentClick || (r += " mfp-auto-cursor"), r && t.wrap.addClass(r);
            var u = t.wH = C.height(),
                f = {};
            if (t.fixedContentPos && t._hasScrollBar(u)) {
                var m = t._getScrollbarSize();
                m && (f.marginRight = m)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : f.overflow = "hidden");
            var v = t.st.mainClass;
            return t.isIE7 && (v += " mfp-ie7"), v && t._addClassToMFP(v), t.updateItemHTML(), I("BuildControls"), e("html").css(f), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                t.content ? (t._addClassToMFP(g), t._setFocus()) : t.bgOverlay.addClass(g), n.on("focusin" + h, t._onFocusIn)
            }, 16), t.isOpen = !0, t.updateSize(u), I(p), i
        },
        close: function() {
            t.isOpen && (I(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(v), setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            I(s);
            var i = v + " " + g + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (i += t.st.mainClass + " "), t._removeClassFromMFP(i), t.fixedContentPos) {
                var o = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : o.overflow = "", e("html").css(o)
            }
            n.off("keyup" + h + " focusin" + h), t.ev.off(h), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, I(c)
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth,
                    n = window.innerHeight * i;
                t.wrap.css("height", n), t.wH = n
            } else t.wH = e || C.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), I("Resize")
        },
        updateItemHTML: function() {
            var i = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), i.parsed || (i = t.parseEl(t.index));
            var n = i.type;
            if (I("BeforeChange", [t.currItem ? t.currItem.type : "", n]), t.currItem = i, !t.currTemplate[n]) {
                var r = t.st[n] ? t.st[n].markup : !1;
                I("FirstMarkupParse", r), t.currTemplate[n] = r ? e(r) : !0
            }
            o && o !== i.type && t.container.removeClass("mfp-" + o + "-holder");
            var a = t["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, t.currTemplate[n]);
            t.appendContent(a, n), i.preloaded = !0, I(f, i), o = i.type, t.container.prepend(t.contentContainer), I("AfterChange")
        },
        appendContent: function(e, i) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[i] === !0 ? t.content.find(".mfp-close").length || t.content.append(T()) : t.content = e : t.content = "", I(u), t.container.addClass("mfp-" + i + "-holder"), t.contentContainer.append(t.content)
        },
        parseEl: function(i) {
            var n, o = t.items[i];
            if (o.tagName ? o = {
                    el: e(o)
                } : (n = o.type, o = {
                    data: o,
                    src: o.src
                }), o.el) {
                for (var r = t.types, a = 0; a < r.length; a++)
                    if (o.el.hasClass("mfp-" + r[a])) {
                        n = r[a];
                        break
                    }
                o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = n || t.st.type || "inline", o.index = i, o.parsed = !0, t.items[i] = o, I("ElementParse", o), t.items[i]
        },
        addGroup: function(e, i) {
            var n = function(n) {
                n.mfpEl = this, t._openClick(n, e, i)
            };
            i || (i = {});
            var o = "click.magnificPopup";
            i.mainEl = e, i.items ? (i.isObj = !0, e.off(o).on(o, n)) : (i.isObj = !1, i.delegate ? e.off(o).on(o, i.delegate, n) : (i.items = e, e.off(o).on(o, n)))
        },
        _openClick: function(i, n, o) {
            var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
            if (r || 2 !== i.which && !i.ctrlKey && !i.metaKey) {
                var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                if (a)
                    if (e.isFunction(a)) {
                        if (!a.call(t)) return !0
                    } else if (C.width() < a) return !0;
                i.type && (i.preventDefault(), t.isOpen && i.stopPropagation()), o.el = e(i.mfpEl), o.delegate && (o.items = n.find(o.delegate)), t.open(o)
            }
        },
        updateStatus: function(e, n) {
            if (t.preloader) {
                i !== e && t.container.removeClass("mfp-s-" + i), n || "loading" !== e || (n = t.st.tLoading);
                var o = {
                    status: e,
                    text: n
                };
                I("UpdateStatus", o), e = o.status, n = o.text, t.preloader.html(n), t.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("mfp-s-" + e), i = e
            }
        },
        _checkIfClose: function(i) {
            if (!e(i).hasClass(y)) {
                var n = t.st.closeOnContentClick,
                    o = t.st.closeOnBgClick;
                if (n && o) return !0;
                if (!t.content || e(i).hasClass("mfp-close") || t.preloader && i === t.preloader[0]) return !0;
                if (i === t.content[0] || e.contains(t.content[0], i)) {
                    if (n) return !0
                } else if (o && e.contains(document, i)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? n.height() : document.body.scrollHeight) > (e || C.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(i) {
            return i.target === t.wrap[0] || e.contains(t.wrap[0], i.target) ? void 0 : (t._setFocus(), !1)
        },
        _parseMarkup: function(t, i, n) {
            var o;
            n.data && (i = e.extend(n.data, i)), I(d, [t, i, n]), e.each(i, function(e, i) {
                if (void 0 === i || i === !1) return !0;
                if (o = e.split("_"), o.length > 1) {
                    var n = t.find(h + "-" + o[0]);
                    if (n.length > 0) {
                        var r = o[1];
                        "replaceWith" === r ? n[0] !== i[0] && n.replaceWith(i) : "img" === r ? n.is("img") ? n.attr("src", i) : n.replaceWith('<img src="' + i + '" class="' + n.attr("class") + '" />') : n.attr(o[1], i)
                    }
                } else t.find(h + "-" + e).html(i)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: w.prototype,
        modules: [],
        open: function(t, i) {
            return S(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = i || 0, this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, i) {
            i.options && (e.magnificPopup.defaults[t] = i.options), e.extend(this.proto, i.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, e.fn.magnificPopup = function(i) {
        S();
        var n = e(this);
        if ("string" == typeof i)
            if ("open" === i) {
                var o, r = b ? n.data("magnificPopup") : n[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[a] : (o = n, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({
                    mfpEl: o
                }, n, r)
            } else t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1));
        else i = e.extend(!0, {}, i), b ? n.data("magnificPopup", i) : n[0].magnificPopup = i, t.addGroup(n, i);
        return n
    };
    var z, P, A, _ = "inline",
        O = function() {
            A && (P.after(A.addClass(z)).detach(), A = null)
        };
    e.magnificPopup.registerModule(_, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(_), x(s + "." + _, function() {
                    O()
                })
            },
            getInline: function(i, n) {
                if (O(), i.src) {
                    var o = t.st.inline,
                        r = e(i.src);
                    if (r.length) {
                        var a = r[0].parentNode;
                        a && a.tagName && (P || (z = o.hiddenClass, P = k(z), z = "mfp-" + z), A = r.after(P).detach().removeClass(z)), t.updateStatus("ready")
                    } else t.updateStatus("error", o.tNotFound), r = e("<div>");
                    return i.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(n, {}, i), n
            }
        }
    });
    var $, H = "ajax",
        M = function() {
            $ && e(document.body).removeClass($)
        },
        B = function() {
            M(), t.req && t.req.abort()
        };
    e.magnificPopup.registerModule(H, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(H), $ = t.st.ajax.cursor, x(s + "." + H, B), x("BeforeChange." + H, B)
            },
            getAjax: function(i) {
                $ && e(document.body).addClass($), t.updateStatus("loading");
                var n = e.extend({
                    url: i.src,
                    success: function(n, o, r) {
                        var a = {
                            data: n,
                            xhr: r
                        };
                        I("ParseAjax", a), t.appendContent(e(a.data), H), i.finished = !0, M(), t._setFocus(), setTimeout(function() {
                            t.wrap.addClass(g)
                        }, 16), t.updateStatus("ready"), I("AjaxContentAdded")
                    },
                    error: function() {
                        M(), i.finished = i.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", i.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(n), ""
            }
        }
    });
    var W, L = function(i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var n = t.st.image.titleSrc;
        if (n) {
            if (e.isFunction(n)) return n.call(t, i);
            if (i.el) return i.el.attr(n) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = t.st.image,
                    n = ".image";
                t.types.push("image"), x(p + n, function() {
                    "image" === t.currItem.type && i.cursor && e(document.body).addClass(i.cursor)
                }), x(s + n, function() {
                    i.cursor && e(document.body).removeClass(i.cursor), C.off("resize" + h)
                }), x("Resize" + n, t.resizeImage), t.isLowIE && x("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var i = 0;
                    t.isLowIE && (i = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - i)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, W && clearInterval(W), e.isCheckingImgSize = !1, I("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var i = 0,
                    n = e.img[0],
                    o = function(r) {
                        W && clearInterval(W), W = setInterval(function() {
                            return n.naturalWidth > 0 ? void t._onImageHasSize(e) : (i > 200 && clearInterval(W), i++, void(3 === i ? o(10) : 40 === i ? o(50) : 100 === i && o(500)))
                        }, r)
                    };
                o(1)
            },
            getImage: function(i, n) {
                var o = 0,
                    r = function() {
                        i && (i.img[0].complete ? (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, I("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : a()))
                    },
                    a = function() {
                        i && (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("error", s.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                    },
                    s = t.st.image,
                    l = n.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")), i.img = e(c).on("load.mfploader", r).on("error.mfploader", a), c.src = i.src, l.is("img") && (i.img = i.img.clone()), c = i.img[0], c.naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1)
                }
                return t._parseMarkup(n, {
                    title: L(i),
                    img_replaceWith: i.img
                }, i), t.resizeImage(), i.hasSize ? (W && clearInterval(W), i.loadError ? (n.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), t.updateStatus("ready")), n) : (t.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), t.findImageSize(i)), n)
            }
        }
    });
    var F, j = function() {
        return void 0 === F && (F = void 0 !== document.createElement("p").style.MozTransform), F
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, i = t.st.zoom,
                    n = ".zoom";
                if (i.enabled && t.supportsTransition) {
                    var o, r, a = i.duration,
                        c = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                n = "all " + i.duration / 1e3 + "s " + i.easing,
                                o = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = n, t.css(o), t
                        },
                        u = function() {
                            t.content.css("visibility", "visible")
                        };
                    x("BuildControls" + n, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return void u();
                            r = c(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function() {
                                r.css(t._getOffset(!0)), o = setTimeout(function() {
                                    u(), setTimeout(function() {
                                        r.remove(), e = r = null, I("ZoomAnimationEnded")
                                    }, 16)
                                }, a)
                            }, 16)
                        }
                    }), x(l + n, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.st.removalDelay = a, !e) {
                                if (e = t._getItemToZoom(), !e) return;
                                r = c(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function() {
                                r.css(t._getOffset())
                            }, 16)
                        }
                    }), x(s + n, function() {
                        t._allowZoom() && (u(), r && r.remove(), e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return t.currItem.hasSize ? t.currItem.img : !1
            },
            _getOffset: function(i) {
                var n;
                n = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var o = n.offset(),
                    r = parseInt(n.css("padding-top"), 10),
                    a = parseInt(n.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - r;
                var s = {
                    width: n.width(),
                    height: (b ? n.innerHeight() : n[0].offsetHeight) - a - r
                };
                return j() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
            }
        }
    });
    var R = "iframe",
        q = "//about:blank",
        N = function(e) {
            if (t.currTemplate[R]) {
                var i = t.currTemplate[R].find("iframe");
                i.length && (e || (i[0].src = q), t.isIE8 && i.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(R, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(R), x("BeforeChange", function(e, t, i) {
                    t !== i && (t === R ? N() : i === R && N(!0))
                }), x(s + "." + R, function() {
                    N()
                })
            },
            getIframe: function(i, n) {
                var o = i.src,
                    r = t.st.iframe;
                e.each(r.patterns, function() {
                    return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
                });
                var a = {};
                return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(n, a, i), t.updateStatus("ready"), n
            }
        }
    });
    var Q = function(e) {
            var i = t.items.length;
            return e > i - 1 ? e - i : 0 > e ? i + e : e
        },
        D = function(e, t, i) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var i = t.st.gallery,
                    o = ".mfp-gallery",
                    a = Boolean(e.fn.mfpFastClick);
                return t.direction = !0, i && i.enabled ? (r += " mfp-gallery", x(p + o, function() {
                    i.navigateByImgClick && t.wrap.on("click" + o, ".mfp-img", function() {
                        return t.items.length > 1 ? (t.next(), !1) : void 0
                    }), n.on("keydown" + o, function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }), x("UpdateStatus" + o, function(e, i) {
                    i.text && (i.text = D(i.text, t.currItem.index, t.items.length))
                }), x(d + o, function(e, n, o, r) {
                    var a = t.items.length;
                    o.counter = a > 1 ? D(i.tCounter, r.index, a) : ""
                }), x("BuildControls" + o, function() {
                    if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
                        var n = i.arrowMarkup,
                            o = t.arrowLeft = e(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                            r = t.arrowRight = e(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(y),
                            s = a ? "mfpFastClick" : "click";
                        o[s](function() {
                            t.prev()
                        }), r[s](function() {
                            t.next()
                        }), t.isIE7 && (k("b", o[0], !1, !0), k("a", o[0], !1, !0), k("b", r[0], !1, !0), k("a", r[0], !1, !0)), t.container.append(o.add(r))
                    }
                }), x(f + o, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }, 16)
                }), void x(s + o, function() {
                    n.off(o), t.wrap.off("click" + o), t.arrowLeft && a && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(), t.arrowRight = t.arrowLeft = null
                })) : !1
            },
            next: function() {
                t.direction = !0, t.index = Q(t.index + 1), t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1, t.index = Q(t.index - 1), t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, i = t.st.gallery.preload,
                    n = Math.min(i[0], t.items.length),
                    o = Math.min(i[1], t.items.length);
                for (e = 1; e <= (t.direction ? o : n); e++) t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? n : o); e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function(i) {
                if (i = Q(i), !t.items[i].preloaded) {
                    var n = t.items[i];
                    n.parsed || (n = t.parseEl(i)), I("LazyLoad", n), "image" === n.type && (n.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
                        n.hasSize = !0
                    }).on("error.mfploader", function() {
                        n.hasSize = !0, n.loadError = !0, I("LazyLoadError", n)
                    }).attr("src", n.src)), n.preloaded = !0
                }
            }
        }
    });
    var Z = "retina";
    e.magnificPopup.registerModule(Z, {
            options: {
                replaceSrc: function(e) {
                    return e.src.replace(/\.\w+$/, function(e) {
                        return "@2x" + e
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var e = t.st.retina,
                            i = e.ratio;
                        i = isNaN(i) ? i() : i, i > 1 && (x("ImageHasSize." + Z, function(e, t) {
                            t.img.css({
                                "max-width": t.img[0].naturalWidth / i,
                                width: "100%"
                            })
                        }), x("ElementParse." + Z, function(t, n) {
                            n.src = e.replaceSrc(n, i)
                        }))
                    }
                }
            }
        }),
        function() {
            var t = 1e3,
                i = "ontouchstart" in window,
                n = function() {
                    C.off("touchmove" + r + " touchend" + r)
                },
                o = "mfpFastClick",
                r = "." + o;
            e.fn.mfpFastClick = function(o) {
                return e(this).each(function() {
                    var a, s = e(this);
                    if (i) {
                        var l, c, u, d, p, f;
                        s.on("touchstart" + r, function(e) {
                            d = !1, f = 1, p = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], c = p.clientX, u = p.clientY, C.on("touchmove" + r, function(e) {
                                p = e.originalEvent ? e.originalEvent.touches : e.touches, f = p.length, p = p[0], (Math.abs(p.clientX - c) > 10 || Math.abs(p.clientY - u) > 10) && (d = !0, n())
                            }).on("touchend" + r, function(e) {
                                n(), d || f > 1 || (a = !0, e.preventDefault(), clearTimeout(l), l = setTimeout(function() {
                                    a = !1
                                }, t), o())
                            })
                        })
                    }
                    s.on("click" + r, function() {
                        a || o()
                    })
                })
            }, e.fn.destroyMfpFastClick = function() {
                e(this).off("touchstart" + r + " click" + r), i && C.off("touchmove" + r + " touchend" + r)
            }
        }(), S()
}), ! function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : e.ouibounce = t()
}(this, function() {
    return function(e, t) {
        "use strict";

        function i(e, t) {
            return "undefined" == typeof e ? t : e
        }

        function n(e) {
            var t = 24 * e * 60 * 60 * 1e3,
                i = new Date;
            return i.setTime(i.getTime() + t), "; expires=" + i.toUTCString()
        }

        function o() {
            u() || (I.addEventListener("mouseleave", r), I.addEventListener("mouseenter", a), I.addEventListener("keydown", s))
        }

        function r(e) {
            e.clientY > h || (k = setTimeout(d, v))
        }

        function a() {
            k && (clearTimeout(k), k = null)
        }

        function s(e) {
            T || e.metaKey && 76 === e.keyCode && (T = !0, k = setTimeout(d, v))
        }

        function l(e, t) {
            return c()[e] === t
        }

        function c() {
            for (var e = document.cookie.split("; "), t = {}, i = e.length - 1; i >= 0; i--) {
                var n = e[i].split("=");
                t[n[0]] = n[1]
            }
            return t
        }

        function u() {
            return l(C, "true") && !m
        }

        function d() {
            u() || (e && (e.style.display = "block"), y(), p())
        }

        function p(e) {
            var t = e || {};
            "undefined" != typeof t.cookieExpire && (w = n(t.cookieExpire)), t.sitewide === !0 && (x = ";path=/"), "undefined" != typeof t.cookieDomain && (b = ";domain=" + t.cookieDomain), "undefined" != typeof t.cookieName && (C = t.cookieName), document.cookie = C + "=true" + w + b + x, I.removeEventListener("mouseleave", r), I.removeEventListener("mouseenter", a), I.removeEventListener("keydown", s)
        }
        var f = t || {},
            m = f.aggressive || !1,
            h = i(f.sensitivity, 20),
            g = i(f.timer, 1e3),
            v = i(f.delay, 0),
            y = f.callback || function() {},
            w = n(f.cookieExpire) || "",
            b = f.cookieDomain ? ";domain=" + f.cookieDomain : "",
            C = f.cookieName ? f.cookieName : "viewedOuibounceModal",
            x = f.sitewide === !0 ? ";path=/" : "",
            k = null,
            I = document.documentElement;
        setTimeout(o, g);
        var T = !1;
        return {
            fire: d,
            disable: p,
            isDisabled: u
        }
    }
}), ! function() {
    "use strict";

    function e(n) {
        if (!n) throw new Error("No options passed to Waypoint constructor");
        if (!n.element) throw new Error("No element option passed to Waypoint constructor");
        if (!n.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + t, this.options = e.Adapter.extend({}, e.defaults, n), this.element = this.options.element, this.adapter = new e.Adapter(this.element), this.callback = n.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = e.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = e.Context.findOrCreateByElement(this.options.context), e.offsetAliases[this.options.offset] && (this.options.offset = e.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, t += 1
    }
    var t = 0,
        i = {};
    e.prototype.queueTrigger = function(e) {
        this.group.queueTrigger(this, e)
    }, e.prototype.trigger = function(e) {
        this.enabled && this.callback && this.callback.apply(this, e)
    }, e.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, e.prototype.disable = function() {
        return this.enabled = !1, this
    }, e.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, e.prototype.next = function() {
        return this.group.next(this)
    }, e.prototype.previous = function() {
        return this.group.previous(this)
    }, e.invokeAll = function(e) {
        var t = [];
        for (var n in i) t.push(i[n]);
        for (var o = 0, r = t.length; r > o; o++) t[o][e]()
    }, e.destroyAll = function() {
        e.invokeAll("destroy")
    }, e.disableAll = function() {
        e.invokeAll("disable")
    }, e.enableAll = function() {
        e.invokeAll("enable")
    }, e.refreshAll = function() {
        e.Context.refreshAll()
    }, e.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, e.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, e.adapters = [], e.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, e.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = e
}(),
function() {
    "use strict";

    function e(e) {
        window.setTimeout(e, 1e3 / 60)
    }

    function t(e) {
        this.element = e, this.Adapter = o.Adapter, this.adapter = new this.Adapter(e), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, e.waypointContextKey = this.key, n[e.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var i = 0,
        n = {},
        o = window.Waypoint,
        r = window.onload;
    t.prototype.add = function(e) {
        var t = e.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[t][e.key] = e, this.refresh()
    }, t.prototype.checkEmpty = function() {
        var e = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            t = this.Adapter.isEmptyObject(this.waypoints.vertical);
        e && t && (this.adapter.off(".waypoints"), delete n[this.key])
    }, t.prototype.createThrottledResizeHandler = function() {
        function e() {
            t.handleResize(), t.didResize = !1
        }
        var t = this;
        this.adapter.on("resize.waypoints", function() {
            t.didResize || (t.didResize = !0, o.requestAnimationFrame(e))
        })
    }, t.prototype.createThrottledScrollHandler = function() {
        function e() {
            t.handleScroll(), t.didScroll = !1
        }
        var t = this;
        this.adapter.on("scroll.waypoints", function() {
            (!t.didScroll || o.isTouch) && (t.didScroll = !0, o.requestAnimationFrame(e))
        })
    }, t.prototype.handleResize = function() {
        o.Context.refreshAll()
    }, t.prototype.handleScroll = function() {
        var e = {},
            t = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var i in t) {
            var n = t[i],
                o = n.newScroll > n.oldScroll,
                r = o ? n.forward : n.backward;
            for (var a in this.waypoints[i]) {
                var s = this.waypoints[i][a],
                    l = n.oldScroll < s.triggerPoint,
                    c = n.newScroll >= s.triggerPoint,
                    u = l && c,
                    d = !l && !c;
                (u || d) && (s.queueTrigger(r), e[s.group.id] = s.group)
            }
        }
        for (var p in e) e[p].flushTriggers();
        this.oldScroll = {
            x: t.horizontal.newScroll,
            y: t.vertical.newScroll
        }
    }, t.prototype.innerHeight = function() {
        return this.element == this.element.window ? o.viewportHeight() : this.adapter.innerHeight()
    }, t.prototype.remove = function(e) {
        delete this.waypoints[e.axis][e.key], this.checkEmpty()
    }, t.prototype.innerWidth = function() {
        return this.element == this.element.window ? o.viewportWidth() : this.adapter.innerWidth()
    }, t.prototype.destroy = function() {
        var e = [];
        for (var t in this.waypoints)
            for (var i in this.waypoints[t]) e.push(this.waypoints[t][i]);
        for (var n = 0, o = e.length; o > n; n++) e[n].destroy()
    }, t.prototype.refresh = function() {
        var e, t = this.element == this.element.window,
            i = t ? void 0 : this.adapter.offset(),
            n = {};
        this.handleScroll(), e = {
            horizontal: {
                contextOffset: t ? 0 : i.left,
                contextScroll: t ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: t ? 0 : i.top,
                contextScroll: t ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var r in e) {
            var a = e[r];
            for (var s in this.waypoints[r]) {
                var l, c, u, d, p, f = this.waypoints[r][s],
                    m = f.options.offset,
                    h = f.triggerPoint,
                    g = 0,
                    v = null == h;
                f.element !== f.element.window && (g = f.adapter.offset()[a.offsetProp]), "function" == typeof m ? m = m.apply(f) : "string" == typeof m && (m = parseFloat(m), f.options.offset.indexOf("%") > -1 && (m = Math.ceil(a.contextDimension * m / 100))), l = a.contextScroll - a.contextOffset, f.triggerPoint = g + l - m, c = h < a.oldScroll, u = f.triggerPoint >= a.oldScroll, d = c && u, p = !c && !u, !v && d ? (f.queueTrigger(a.backward), n[f.group.id] = f.group) : !v && p ? (f.queueTrigger(a.forward), n[f.group.id] = f.group) : v && a.oldScroll >= f.triggerPoint && (f.queueTrigger(a.forward), n[f.group.id] = f.group)
            }
        }
        return o.requestAnimationFrame(function() {
            for (var e in n) n[e].flushTriggers()
        }), this
    }, t.findOrCreateByElement = function(e) {
        return t.findByElement(e) || new t(e)
    }, t.refreshAll = function() {
        for (var e in n) n[e].refresh()
    }, t.findByElement = function(e) {
        return n[e.waypointContextKey]
    }, window.onload = function() {
        r && r(), t.refreshAll()
    }, o.requestAnimationFrame = function(t) {
        var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || e;
        i.call(window, t)
    }, o.Context = t
}(),
function() {
    "use strict";

    function e(e, t) {
        return e.triggerPoint - t.triggerPoint
    }

    function t(e, t) {
        return t.triggerPoint - e.triggerPoint
    }

    function i(e) {
        this.name = e.name, this.axis = e.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), n[this.axis][this.name] = this
    }
    var n = {
            vertical: {},
            horizontal: {}
        },
        o = window.Waypoint;
    i.prototype.add = function(e) {
        this.waypoints.push(e)
    }, i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var n = this.triggerQueues[i],
                o = "up" === i || "left" === i;
            n.sort(o ? t : e);
            for (var r = 0, a = n.length; a > r; r += 1) {
                var s = n[r];
                (s.options.continuous || r === n.length - 1) && s.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function(t) {
        this.waypoints.sort(e);
        var i = o.Adapter.inArray(t, this.waypoints),
            n = i === this.waypoints.length - 1;
        return n ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function(t) {
        this.waypoints.sort(e);
        var i = o.Adapter.inArray(t, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function(e, t) {
        this.triggerQueues[t].push(e)
    }, i.prototype.remove = function(e) {
        var t = o.Adapter.inArray(e, this.waypoints);
        t > -1 && this.waypoints.splice(t, 1)
    }, i.prototype.first = function() {
        return this.waypoints[0]
    }, i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function(e) {
        return n[e.axis][e.name] || new i(e)
    }, o.Group = i
}(),
function() {
    "use strict";

    function e(e) {
        this.$element = t(e)
    }
    var t = window.jQuery,
        i = window.Waypoint;
    t.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(t, i) {
        e.prototype[i] = function() {
            var e = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, e)
        }
    }), t.each(["extend", "inArray", "isEmptyObject"], function(i, n) {
        e[n] = t[n]
    }), i.adapters.push({
        name: "jquery",
        Adapter: e
    }), i.Adapter = e
}(),
function() {
    "use strict";

    function e(e) {
        return function() {
            var i = [],
                n = arguments[0];
            return e.isFunction(arguments[0]) && (n = e.extend({}, arguments[1]), n.handler = arguments[0]), this.each(function() {
                var o = e.extend({}, n, {
                    element: this
                });
                "string" == typeof o.context && (o.context = e(this).closest(o.context)[0]), i.push(new t(o))
            }), i
        }
    }
    var t = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = e(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = e(window.Zepto))
}(), jQuery(function() {
    initBackgroundResize()
}), $(window).load(function() {
    $("#myonoffswitch").change(function() {
        $(".annual").css("display", this.checked ? "block" : "none"), $(".monthly").css("display", this.checked ? "none" : "block")
    })
});
var ImageStretcher = {
        getDimensions: function(e) {
            var t = e.imageRatio || e.imageWidth / e.imageHeight,
                i = e.maskWidth,
                n = i / t;
            return n < e.maskHeight && (n = e.maskHeight, i = n * t), {
                width: i,
                height: n,
                top: (e.maskHeight - n) / 2,
                left: (e.maskWidth - i) / 2
            }
        },
        getRatio: function(e) {
            if (e.prop("naturalWidth")) return e.prop("naturalWidth") / e.prop("naturalHeight");
            var t = new Image;
            return t.src = e.prop("src"), t.width / t.height
        },
        imageLoaded: function(e, t) {
            var i = this,
                n = function() {
                    t.call(i)
                };
            e.prop("complete") ? n() : e.one("load", n)
        },
        resizeHandler: function() {
            var e = this;
            jQuery.each(this.imgList, function(t, i) {
                i.image.prop("complete") && e.resizeImage(i.image, i.container)
            })
        },
        resizeImage: function(e, t) {
            this.imageLoaded(e, function() {
                var i = this.getDimensions({
                    imageRatio: this.getRatio(e),
                    maskWidth: t.width(),
                    maskHeight: t.height()
                });
                e.css({
                    width: i.width,
                    height: i.height,
                    marginTop: i.top,
                    marginLeft: i.left
                })
            })
        },
        add: function(e) {
            var t = jQuery(e.container ? e.container : window),
                i = "string" == typeof e.image ? t.find(e.image) : jQuery(e.image);
            this.resizeImage(i, t), this.win || (this.resizeHandler = jQuery.proxy(this.resizeHandler, this), this.imgList = [], this.win = jQuery(window), this.win.on("resize orientationchange", this.resizeHandler)), this.imgList.push({
                container: t,
                image: i
            })
        }
    },
    goTop = function() {
        return $("html, body").animate({
            scrollTop: 250
        }, 600), !1
    };
$("body").hasClass("home") && ($(function() {
    $(window).scroll(sticky_relocate), sticky_relocate()
}), $(document).ready(function() {
    $(document).on("scroll", onScroll), $('a[href^="#"]').on("click", function(e) {
        e.preventDefault(), $(document).off("scroll");
        var t = this.hash;
        $target = $(t), $("html, body").stop().animate({
            scrollTop: $target.offset().top + 2
        }, 500, "swing", function() {
            window.location.hash = t, $(document).on("scroll", onScroll)
        })
    })
})), $(document).ready(function() {
    $(".open-popup-link").magnificPopup({
        type: "inline"
    }), $("body").hasClass("home") && (new Waypoint({
        element: document.getElementById("file-top"),
        handler: function(e) {
            "up" == e ? $(".subnav a").removeClass("active") : ($(".subnav a").removeClass("active"), $('.subnav a[href="#file"]').addClass("active"))
        },
        offset: 125
    }), new Waypoint({
        element: document.getElementById("software-top"),
        handler: function(e) {
            "up" == e ? ($(".subnav a").removeClass("active"), $('.subnav a[href="#file"]').addClass("active")) : ($(".subnav a").removeClass("active"), $('.subnav a[href="#software"]').addClass("active"))
        },
        offset: 125
    }), new Waypoint({
        element: document.getElementById("multi-top"),
        handler: function(e) {
            "up" == e ? ($(".subnav a").removeClass("active"), $('.subnav a[href="#software"]').addClass("active")) : ($(".subnav a").removeClass("active"), $('.subnav a[href="#multi"]').addClass("active"))
        },
        offset: 125
    }), new Waypoint({
        element: document.getElementById("powered-top"),
        handler: function(e) {
            "up" == e ? ($(".subnav a").removeClass("active"), $('.subnav a[href="#multi"]').addClass("active")) : ($(".subnav a").removeClass("active"), $('.subnav a[href="#powered"]').addClass("active"))
        },
        offset: 125
    }), new Waypoint({
        element: document.getElementById("powered-bottom"),
        handler: function(e) {
            "up" == e ? ($(".subnav a").removeClass("active"), $('.subnav a[href="#powered"]').addClass("active")) : $(".subnav a").removeClass("active")
        },
        offset: 125
    })), $("#go-top-link").on("click", goTop)
});
