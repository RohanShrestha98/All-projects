window.onunload = function() {
    window.scrollTo(0, 0)
}, window.mobilecheck = function() {
    return check = !1,
        function(t) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (check = !0)
        }(navigator.userAgent || navigator.vendor || window.opera), check
}, $(function() {
    function t() {
        u = setInterval(n, i)
    }

    function e() {
        clearInterval(u), setTimeout(function() {
            $("#index").scrollTop(0), d.removeClass("is-loading"), T.titleChanger(0), S.start(), T.sidebar(0, .1), T.intro(), window.mobilecheck() && TweenMax.to(".background-title-container", .1, {
                opacity: 0
            })
        }, 800)
    }

    function i() {
        return v
    }

    function n() {
        o(b), 99 >= b ? b++ : 100 === b && e()
    }

    function o(t) {
        $(".upper-type, .lower-type").text(t), $(".divider").css({
            width: b + "%"
        })
    }

    function a() {
    }

    function c() {
        
    }

    function h() {
        return m
    }

    function l() {
        x = !1, T.sonicUnlock(), setTimeout(function() {
            T.sonicLock(), x = !0
        }, 4e3)
    }

    function p(t) {
        t = t || {}, this.waves = t.waves || [], this.phase = 0, this.run = !1, this._rotation = 0, this.auto = function() {
            "undefined" == typeof auto && (auto = !0)
        }, 
        this.ratio = t.ratio || window.devicePixelRatio || 1, 
        this.width = t.width || window.innerWidth || 1280, 
        this.width_2 = this.width / 2, 
        this.width_4 = this.width / 4, 
        this.height = t.height || window.innerHeight || 720, 
        this.height_2 = this.height / 2, 
        this.height_3 = this.height / 3, 
        this.MAX = this.height_2 - 4, 
        this.amplitude = t.amplitude || 0, 
        this.speed = t.speed || .02, 
        this.frequency = t.frequency || 2, 
        this.angle = 10, 
        this.circleProgress = 0, 
        this.radius = (t.ratio || 1) * this.height * .4, 
        this.canvas = document.getElementById("canvas"), 
        this.canvas.width = this.width, 
        this.canvas.height = this.height, 
        this.container = t.container || document.body, 
        this.container.appendChild(this.canvas), 
        this.ctx = this.canvas.getContext("2d"), 
        this.backingStoreRatio = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1, 
        this.gradient = this.ctx.createLinearGradient(0, 0, 0, 2 * this.radius), this.gradient.addColorStop(0, "#4aa3da"), this.gradient.addColorStop(1, "#ce3745"), 
        this.squareSide = Math.sqrt(Math.pow(2 * this.radius, 2) / 2)
    }

    function aplay() {
        var audio = document.getElementById("audio");
        audio.play();
    }

    var url = window.location.href; 
    var vl = url.split("/")[4];

    if (vl == 'about.php'){
        var pval = ["Ayata","Vision", "Cause", "Team", "Contact"]
    }else if (vl == 'services.php'){
        var pval = ["Ayata","Vision", "Cause", "Project", "Contact"]
    }else{
        var pval = ["Ayata", "Vision", "Cause", "Uses", "Client"]
    }

    var u, d = $("body"),
        m = window.innerHeight / 4,
        y = ($(".sidebar-item").length, 0),
        g = $(".lower-type"),
        w = $(".upper-type"),
        f = (parseInt($(".lower-type").css("font-size")), pval),
        x = (f.length, !1),
        b = 0,
        v = 500;
    t(), $(window).load(function() {
            v = 50
        }),
        function() {
            var t = new Date,
                e = t.getFullYear();
            $(".date").text(e)
        }(), $(".hamburger-menu").on("click", function() {
            d.hasClass("menu-open") ? (d.removeClass("menu-open"), T.closeMenu().play()) : (d.addClass("menu-open"), T.openMenu().play());
            aplay();
        }), $(".menu-item > a").on("click", function() {
            d.hasClass("menu-open") && (d.removeClass("menu-open"), T.closeMenu().play());
        });
    var k;
    if (a(), c(), $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var t = $(this.hash);
                if (t = t.length ? t : $("[name=" + this.hash.slice(1) + "]"), t.length) return $("html, body").animate({
                    scrollTop: t.offset().top
                }, 1e3), !1
            }
        }), !window.mobilecheck()) {
        new Waypoint({
            element: document.getElementById("intro"),
            handler: function(t) {
                "up" === t && ($("body").removeClass("menu-light"), T.backgroundChanger("#FFFFFF"), T.reIntro(), T.sidebar(0, .1), T.titleChanger(0), S.start())
            },
            offset: function() {
                return .1 * -this.element.clientHeight
            }
        }), new Waypoint({
            element: document.getElementById("problem"),
            handler: function(t) {
                "down" === t && ($("body").addClass("menu-light"), T.backgroundChanger("#000"), T.sidebar(1, .1), T.titleChanger(1), T.password(), S.stop())
            },
            offset: "80%"
        }), new Waypoint({
            element: document.getElementById("problem"),
            handler: function(t) {
                "up" === t && ($("body").addClass("menu-light"), T.passwordReset(), T.backgroundChanger("#000"), T.sidebar(1, -.1), T.titleChanger(1))
            },
            offset: function() {
                return -this.element.clientHeight + .5 * window.innerHeight
            }
        }), new Waypoint({
            element: document.getElementById("solution"),
            handler: function(t) {
                "down" === t && ($("body").removeClass("menu-light"), T.backgroundChanger("#FFFFFF"), T.sidebar(2, .1), T.titleChanger(2), T.solutionIn())
            },
            offset: "50%"
        }), new Waypoint({
            element: document.getElementById("solution-illustration"),
            handler: function(t) {
                "down" === t && T.solutionIllustration()
            },
            offset: "50%"
        }), new Waypoint({
            element: document.getElementById("solution"),
            handler: function(t) {
                "up" === t && (T.backgroundChanger("#FFFFFF"), T.titleChanger(2), T.sidebar(2, -.1))
            },
            offset: function() {
                return -this.element.clientHeight + .5 * window.innerHeight
            }
        }), new Waypoint({
            element: document.getElementById("usecases"),
            handler: function(t) {
                "down" === t && (T.backgroundChanger("#F2F2F2"), T.titleChanger(3), T.sidebar(3, .1), T.usecasesIn())
            },
            offset: "50%"
        }), new Waypoint({
            element: document.getElementById("usecases"),
            handler: function(t) {
                "up" === t && (T.backgroundChanger("#F2F2F2"), T.titleChanger(3), T.sidebar(3, -.1))
            },
            offset: function() {
                return -this.element.clientHeight + .5 * window.innerHeight
            }
        }), new Waypoint({
            element: document.getElementById("partner"),
            handler: function(t) {
                "down" === t && (T.backgroundChanger("#FFFFFF"), T.titleChanger(4), T.partnerIn(), T.sidebar(4, .1))
            },
            offset: "50%"
        }), new Waypoint({
            element: document.getElementById("partner"),
            handler: function(t) {
                "up" === t && T.sidebar(4, -.1)
            },
            offset: function() {
                return -this.element.clientHeight + 40
            }
        })
    }
    var T = {
        intro: function() {
            var t = new TimelineMax;
            t.to(".logo-illustration", .8, {
                opacity: 1
            }).to(".logo", .3, {
                opacity: 1,
                y: 0
            }).to(".request", .3, {
                opacity: 1,
                y: 0
            }).to(".hamburger-menu", .3, {
                opacity: 1,
                y: 0
            }, "-= 0.3").staggerTo("#intro .js-fadeIn", .6, {
                opacity: 1,
                y: 0
            }, .1, "sync").to($(".copyright"), .3, {
                opacity: 1,
                y: 0
            }, "sync").fromTo(".meter", .3, {
                x: "-8px"
            }, {
                opacity: 1,
                rotation: "-90deg",
                x: "0"
            }, "sync").staggerTo(".sidebar-item", .5, {
                opacity: 1,
                x: "0%"
            }, .1, "-= 0.3")
        },
        reIntro: function() {
            TweenMax.to("#intro", .3, {
                opacity: 1,
                y: "0px"
            })
        },
        backgroundChanger: function(t) {
            TweenMax.to(".global-background", .3, {
                backgroundColor: t
            })
        },
        titleChanger: function(t) {
            var e = this;
            TweenMax.to(w, .2, {
                x: "40px",
                opacity: 0
            }), TweenMax.to(g, .2, {
                x: "-40px",
                opacity: 0
            }), setTimeout(function() {
                e.changeCopy(t)
            }, 300), TweenMax.to(w, .3, {
                x: "0",
                opacity: 1,
                delay: .4
            }), TweenMax.to(g, .3, {
                x: "0",
                opacity: 1,
                delay: .4
            })
        },
        changeCopy: function(t) {
            w.text(f[t]), g.text(f[t])
        },
        sidebar: function(t, e) {
            var i = -16 * t + "px",
                n = $(".sidebar-item:eq(" + t + ") > .sidebar-line"),
                o = $(".sidebar-item:eq(" + y + ") > .sidebar-line");
            TweenMax.to(".sidebar", .4, {
                y: i
            }), TweenMax.to(o, .3, {
                width: "50%",
                backgroundPosition: "0%"
            }), TweenMax.to(n, .3, {
                width: "100%",
                backgroundPosition: "100%"
            }), y = t
        },
        openMenu: function() {
            var t = new TimelineMax({
                paused: !0
            });
            return t.to(".menu-container", .3, {
                opacity: 1,
                width: "100%",
                ease: Expo.easeIn
            }).staggerFromTo(".menu-item", .4, {
                opacity: 0
            }, {
                opacity: 1
            }, .1, "items").to(".menu-container .js-fadeIn", .3, {
                opacity: 1,
                y: 0
            }, "items")
        },
        closeMenu: function() {
            var t = new TimelineMax({
                paused: !0
            });
            return t.staggerFromTo(".menu-item", .3, {
                opacity: 1
            }, {
                opacity: 0
            }, .05).to(".menu-container", .3, {
                opacity: 0,
                width: "0%",
                ease: Expo.easeOut
            }).to(".menu-container .js-fadeIn", .3, {
                opacity: 0,
                y: "48px"
            })
        },
        password: function() {
            var t = new TimelineMax;
            return t.to("#intro", .3, {
                opacity: 0,
                y: "-40px"
            }, "sync").to("#solution", .2, {
                opacity: 0
            }, "sync").to("#problem", .3, {
                opacity: 1
            }, "sync").to($("#problem .circle"), .3, {
                strokeDashoffset: 0
            }, "-=0.3").to("#problem .section-num-label", .3, {
                opacity: 1
            }, "-=0.2").to($("#problem .headline"), .3, {
                opacity: 1,
                y: 0
            }, "-=0.2").staggerTo($("#problem .js-fadeIn"), .3, {
                opacity: 1,
                y: 0
            }, .1, "-=0.3")
        },
        passwordReset: function() {
            var t = new TimelineMax;
            return t.to("#solution", .2, {
                opacity: 0
            }).to("#problem", .3, {
                opacity: 1
            })
        },
        sonicUnlock: function() {
            var t = new TimelineMax;
            return t.staggerFromTo(".wave", 1.2, {
                scaleX: 1,
                scaleY: 1,
                opacity: 1
            }, {
                scaleX: 6,
                scaleY: 6,
                opacity: 0
            }, .1).to(".s_laptop-screen .icon-lock", .3, {
                opacity: 0,
                scaleX: .8,
                scaleY: .8
            }, "-= 1").to(".s_server-light", .3, {
                opacity: 1
            }, "-= 0.8").to(".s_laptop-screen .circle-big", .3, {
                strokeDashoffset: 0
            }, "-=0.8").to(".s_laptop-screen .icon-unlocked", .3, {
                opacity: 1
            }, "-=0.3")
        },
        sonicLock: function() {
            var t = new TimelineMax;
            return t.to(".s_server-light", .3, {
                opacity: 0
            }).to(".s_laptop-screen .icon-unlocked", .3, {
                opacity: 0
            }, "-=0.2").to(".s_laptop-screen .circle-big", .3, {
                strokeDashoffset: 302
            }, "-=0.3").to(".s_laptop-screen .icon-lock", .3, {
                opacity: 1,
                scaleX: 1,
                scaleY: 1
            })
        },
        solutionIn: function() {
            var t = new TimelineMax;
            return t.to("#problem", .2, {
                opacity: 0
            }, "sync").to("#solution", .3, {
                opacity: 1
            }, "sync").to($("#solution .circle"), .3, {
                strokeDashoffset: 0
            }, "-=0.3").to("#solution .section-num-label", .3, {
                opacity: 1
            }, "-=0.3").to("#solution .headline", .3, {
                opacity: 1,
                y: 0
            }, "-=0.3").staggerTo("#solution .js-fadeIn", .3, {
                opacity: 1,
                y: 0
            }, .2, "-=0.3")
        },
        solutionIllustration: function() {
            var t = new TimelineMax;
            t.to(".s_phone", 2, {
                opacity: 1,
                x: "-50%",
                y: "-50%",
                ease: Expo.easeOut
            }).to(".s_watch", 1, {
                opacity: 1,
                x: "6%",
                y: "-50%",
                ease: Expo.easeOut
            }, "-=2").to(".s_laptop", 1, {
                opacity: 1,
                x: "-116%",
                y: "-50%",
                ease: Expo.easeOut
            }, "-=1.8").to(".s_server", 1, {
                opacity: 1,
                x: "64%",
                y: "-50%",
                onComplete: function() {
                    x = !0
                },
                ease: Expo.easeOut
            }, "-=1.6").to(".s_phone .circle-container ", .3, {
                opacity: 1
            }, "-=1.4").to(".s_watch .circle-container", .3, {
                opacity: 1
            }, "-=1.2")
        },
        usecasesIn: function() {
            var t, e;
            window.innerWidth < 980 ? (t = "0", e = "0") : (t = "-50%", e = "-50%");
            var i = new TimelineMax;
            i.to("#usecases .case-illustration-container.js-fadeIn-center", .3, {
                opacity: 1,
                y: e,
                x: t
            }, "sync").to($("#usecases .circle"), .3, {
                strokeDashoffset: 0
            }, "sync").to("#usecases .section-num-label", .3, {
                opacity: 1
            }, "-=0.3").to("#usecases .headline", .3, {
                opacity: 1,
                y: 0
            }, "-=0.3").staggerTo("#usecases .js-fadeIn", .3, {
                opacity: 1,
                y: 0
            }, .1, "-=0.3")
        },
        partnerIn: function() {
            var t = new TimelineMax;
            return t.to("#partner .mail-illustration.js-fadeIn", .3, {
                opacity: 1,
                y: "0"
            }).to($("#partner .circle"), .6, {
                strokeDashoffset: 0
            }, "-=0.3").to("#partner .section-num-label", .3, {
                opacity: 1
            }, "-=0.3").staggerTo("#partner .js-fadeIn", .3, {
                opacity: 1,
                y: 0
            }, .1, "-=0.3")
        }
    };
    $("#solution-illustration").on("mouseover", function() {
        x && l()
    });
    var _ = new ScrollMagic.Controller,
        C = new TimelineMax;
    C.to(".logo-type", 1, {
        opacity: 0,
        x: "-16px"
    });

    
    var M = window.innerHeight / 2;
    new ScrollMagic.Scene({
        triggerElement: "#problem",
        duration: h
    }).offset(-M).setTween(C).addTo(_);
    p.prototype._getRadius = function() {
        window.mobilecheck() ? (this.radius = .6 * this.width, this.squareSide = Math.sqrt(Math.pow(2 * this.radius, 2) / 2)) : (this.radius = .4 * this.height, this.squareSide = Math.sqrt(Math.pow(2 * this.radius, 2) / 2))
    }, p.prototype._drawBase = function() {
        this.ctx.strokeStyle = this.gradient, this.ctx.beginPath(), this.ctx.arc(this.width_2, this.height_2, this.radius, 0, Math.PI / 180 * this.circleProgress), this.ctx.stroke()
    }, p.prototype._drawSquare = function() {
        this.ctx.save(), this.ctx.beginPath(), this.ctx.strokeStyle = "#D8D8D8", this.ctx.translate(this.width_2, this.height_2), this.ctx.rotate(this._rotation * Math.PI / 180), this.ctx.strokeRect(-this.squareSide / 2, -this.squareSide / 2, this.squareSide, this.squareSide), this.ctx.restore()
    }, p.prototype._updateBase = function() {
        this.circleProgress += 8
    }, p.prototype._GATF_cache = {}, p.prototype._globAttFunc = function(t) {
        return null == p.prototype._GATF_cache[t] && (p.prototype._GATF_cache[t] = Math.pow(4 / (4 + Math.pow(t, 4)), 4)), p.prototype._GATF_cache[t]
    }, p.prototype._color = function(t) {
        t = t || 1;
        var e = this.ctx.createLinearGradient(0, 0, this.width, 0);
        return e.addColorStop(0, "rgba(260,55,69," + t + ")"), e.addColorStop(1, "rgba(74,163,218," + t + ")"), e
    }, p.prototype._xpos = function(t, e, i, n) {
        return this.width_2 + this.radius * Math.sin(t)
    }, p.prototype._ypos = function(t, e, i, n) {
        var o = this.MAX * n / e;
        return this.height_2 + this.radius * Math.cos(t) + (this._globAttFunc(t) + o * Math.sin(i * t + this.phase))
    }, p.prototype._drawLine = function(t, e, i, n, o) {
        this.ctx.moveTo(0, 0), this.ctx.beginPath(), this.ctx.strokeStyle = e, this.ctx.lineWidth = o / this.ratio || 1;
        for (var s = 0;
            (s += .01) <= 2 * Math.PI;) {
            var a = this._ypos(s, t, i, n),
                r = this._xpos(s, t, i, n);
            this.ctx.lineTo(r, a)
        }
        this.ctx.closePath(), this.ctx.stroke()
    }, p.prototype._clear = function() {
        this.ctx.globalCompositeOperation = "destination-out", this.ctx.fillRect(0, 0, this.width, this.height), this.ctx.globalCompositeOperation = "source-over"
    }, p.prototype._draw = function() {
        if (this.run !== !1) {
            if (this.phase = (this.phase + Math.PI * this.speed) % (2 * Math.PI), this._clear(), this.circleProgress < 360) this._updateBase(), this._drawBase();
            else
                for (var t = 0, e = this.waves.length; e > t; t++) {
                    var i = this.waves[t];
                    i.startAmplitude < i.amplitude && (i.startAmplitude += .001), this._drawLine(i.attenuation, this._color(i.opacity), i.frequency, i.startAmplitude)
                }
            return window.requestAnimationFrame ? void requestAnimationFrame(this._draw.bind(this)) : void setTimeout(this._draw.bind(this), 20)
        }
    }, p.prototype.resize = function() {
        this.width = window.innerWidth, this.height = window.innerHeight, this.width_2 = this.width / 2, this.width_4 = this.width / 4, this.height_2 = this.height / 2, this.canvas.width = this.width, this.canvas.height = this.height, this._getRadius()
    }, p.prototype.start = function() {
        this.phase = 0, this.run = !0, this._getRadius(), this._draw()
    }, p.prototype.stop = function() {
        this.run = !1
    };
    var I = document.getElementById("intro"),
        S = new p({
            frequency: 4,
            container: I,
            waves: [{
                frequency: 4,
                startAmplitude: 0.2,
                amplitude: .04,
                opacity: .4,
                attenuation: -2
            }, {
                frequency: 3,
                startAmplitude: 0,
                amplitude: .04,
                opacity: 1,
                attenuation: -6
            }, {
                frequency: 4,
                startAmplitude: 0,
                amplitude: .04,
                opacity: .3,
                attenuation: .4
            }, {
                frequency: 4,
                startAmplitude: 0,
                amplitude: .04,
                opacity: .2,
                attenuation: 2
            }, {
                frequency: 4,
                startAmplitude: 0,
                amplitude: .04,
                opacity: 1,
                attenuation: .8
            }]
        });
    window.addEventListener("resize", function() {
        S.resize()
    }, !1)
});;






