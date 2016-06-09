var hostaddr = "http://" + window.location.hostname + ":" + window.location.port;
var stage = null;
var layer = null;
var objstage = null;
var objlayer = null;
var libselector = null;
var designgroup = {
    name: "none",
    type: "Group"
};
var activeobject = null;
var objwh = 64;
var libw = 800;
var libh = 500;
var activebutton = "select";
var activelibobj = null;
var ctrlkey = false;
var tgroupindicator = null;
var tempgroup = new Array();
var changeCallback = null;
var defcolour = "#aaaacc";
var defstroke = "#000000";
var defstrokewidth = 2;
var dashdef = [10, 5];
var usedefaults = true;
var objdefaults = {};

function UniqueId() {
    var b = Math.floor((1 + Math.random()) * 65536);
    var a = b.toString(16);
    return a
}

function uniqueNameonLayer(f) {
    var e = layer;
    var a = e.getChildren().toArray();
    var b = f.getAttr("state");
    var o = new Array();
    for (var g = 0; g < a.length; g++) {
        var k = a[g];
        if (k.name() != "Selector" && k.name() != "groupindicator") {
            var j = k.getAttr("state");
            o.push(j.name)
        }
    }
    if (b.name == "none" || b.name == "") {
        var d = b.type.toLowerCase()
    } else {
        var d = b.name
    }
    var m = o.indexOf(d);
    if (m == -1) {
        h = d
    } else {
        var c = a[m].id();
        if (c == f.id()) {
            h = d
        } else {
            var n = 0;
            var l = true;
            while (n < 1000 && l) {
                var h = d + n.toString();
                if (o.indexOf(h) == -1) {
                    l = false
                } else {
                    n = n + 1
                }
            }
        }
    }
    return h
}

function clearActiveObject() {
    if (activeobject != null) {
        if (objSelector != null) {
            objSelector.deleteOldSelector()
        }
        activeobject = null;
        $("#proptable").empty()
    }
}

function makelistobj(b, g, j, c) {
    var l = 10;
    var q = g;
    var i = null;
    var o = new Kinetic.Rect({
        draggable: false,
        x: j,
        y: c,
        width: objwh,
        height: objwh - l,
        fillAlpha: 1
    });
    if (q.type == "Group") {
        i = newgroupobj(false, false, q)
    } else {
        i = newobj(false, q)
    }
    o.setAttr("id", b);
    o.setAttr("state", g);
    var m = getobjextents(i);
    var n = m.maxx - m.minx;
    var k = m.maxy - m.miny;
    if (n > k) {
        var d = objwh / n
    } else {
        var d = (objwh - l) / k
    }
    i.scale({
        x: d,
        y: d
    });
    var e = j + d * i.x();
    var a = c + d * i.y();
    i.x(e);
    i.y(a);
    var f = (i.getAttr("name")).slice(0, 10);
    var p = new Kinetic.Text({
        name: "objname",
        draggable: false,
        x: j + 5,
        y: c + objwh - l,
        text: f,
        fontSize: 12,
        fill: "black"
    });
    objlayer.add(o);
    objlayer.add(i);
    objlayer.add(p);
    p.moveToTop();
    o.moveToTop();
    objlayer.draw();
    o.on("mouseover", function() {
        document.body.style.cursor = "pointer";
        cursorstate = "onobj"
    });
    o.on("mouseout", function() {
        document.body.style.cursor = "default";
        cursorstate = "free"
    });
    o.on("mousedown", function() {
        libselector.x(j);
        libselector.y(c);
        libselector.setAttr("visible", true);
        objlayer.draw();
        activelibobj = this
    })
}

function clearObjects() {
    var b = (objlayer.getChildren()).toArray();
    for (var a = 0; a < b.length; a++) {
        var c = b[a];
        if (c.getAttr("name") != "libselector") {
            c.destroy()
        }
    }
    libselector.setAttr("visible", false);
    objlayer.clear({
        x: 0,
        y: 0,
        width: libw,
        height: libh
    })
}

function loadObjects(c) {
    var d = 10;
    var a = d;
    var f = d;
    var e = 0;
    var b = 0;
    $.getJSON(hostaddr + "/getobjects", {
        filter: c
    }, function(g) {
        $.each(g, function(h, j) {
            var k = (j.id).toFixed();
            var i = JSON.parse(j.jsonstate);
            if (((b + 1) * (objwh + d)) > objstage.getWidth()) {
                e = e + 1;
                b = 0;
                if (((e + 1) * (objwh + d) + d) > objstage.height()) {
                    objstage.height((e + 1) * (objwh + d) + d)
                }
            }
            a = b * (objwh + d) + d;
            f = e * (objwh + d) + d;
            makelistobj(k, i, a, f);
            b = b + 1
        })
    })
}

function getobjextents(b) {
    var H = (b.getAttr("rotation")) * Math.PI / 180;
    var Q = b.getAttr("state");
    switch (Q.type) {
        case "Ring":
            var I = b.getAttr("outerRadius");
            var N = b.x() - I;
            var M = b.y() - I;
            var d = b.x() + I;
            var c = b.y() - I;
            var x = b.x() - I;
            var u = b.y() + I;
            var q = b.x() + I;
            var o = b.y() + I;
            break;
        case "Star":
            var I = b.getAttr("outerRadius");
            var N = b.x() - I;
            var M = b.y() - I;
            var d = b.x() + I;
            var c = b.y() - I;
            var x = b.x() - I;
            var u = b.y() + I;
            var q = b.x() + I;
            var o = b.y() + I;
            break;
        case "RegularPolygon":
            var I = b.getAttr("radius");
            var N = b.x() - I;
            var M = b.y() - I;
            var d = b.x() + I;
            var c = b.y() - I;
            var x = b.x() - I;
            var u = b.y() + I;
            var q = b.x() + I;
            var o = b.y() + I;
            break;
        case "Ellipse":
            var P = b.height();
            var F = b.width();
            var K = Math.sqrt((P * P) / 4 + (F * F) / 4);
            var L = Math.atan2(P, F);
            var N = Math.round(b.x() + (K * Math.cos(Math.PI - L - H)));
            var M = Math.round(b.y() - (K * Math.sin(Math.PI - L - H)));
            var d = Math.round(b.x() + (K * Math.cos(L - H)));
            var c = Math.round(b.y() - (K * Math.sin(L - H)));
            var x = Math.round(b.x() + (K * Math.cos(Math.PI - L + H)));
            var u = Math.round(b.y() + (K * Math.sin(Math.PI - L + H)));
            var q = Math.round(b.x() + (K * Math.cos(L + H)));
            var o = Math.round(b.y() + (K * Math.sin(L + H)));
            break;
        case "Line":
            var D = b.points();
            var y = D[2];
            var C = Math.cos(H);
            var s = Math.sin(H);
            var N = b.x();
            var M = b.y();
            var d = N + Math.round(y * C / 2);
            var c = M + Math.round(y * s / 2);
            var x = N - Math.round(y * s / 2);
            var u = M + Math.round(y * C / 2);
            var q = N + Math.round(y * C);
            var o = M + Math.round(y * s);
            break;
        case "PolyLine":
            var D = b.points();
            var j = 10000;
            var z = 10000;
            var E = -10000;
            var f = -10000;
            var C = Math.cos(H);
            var s = Math.sin(H);
            var m = D[0];
            var a = D[1];
            for (var O = 1; O < D.length / 2; O++) {
                var v = D[2 * O];
                var k = D[2 * O + 1];
                var P = k - a;
                var F = v - m;
                var y = Math.sqrt(P * P + F * F);
                var G = Math.atan2(P, F);
                var A = b.x() + Math.round(y * Math.cos(H + G));
                var n = b.y() + Math.round(y * Math.sin(H + G));
                if (j > A) {
                    j = A
                }
                if (z > n) {
                    z = n
                }
                if (E < A) {
                    E = A
                }
                if (f < n) {
                    f = n
                }
            }
            var N = j;
            var M = z;
            var d = E;
            var c = z;
            var x = j;
            var u = f;
            var q = E;
            var o = f;
            break;
        case "CurvedArrow":
            var J = b.getAttr("state");
            var D = [J.x, J.y, J.midX + J.x, J.midY + J.y, J.endX + J.x, J.endY + J.y];
            var j = 10000;
            var z = 10000;
            var E = -10000;
            var f = -10000;
            for (var O = 0; O < D.length / 2; O++) {
                var v = D[2 * O];
                var k = D[2 * O + 1];
                if (j > v) {
                    j = v
                }
                if (z > k) {
                    z = k
                }
                if (E < v) {
                    E = v
                }
                if (f < k) {
                    f = k
                }
            }
            var P = f - z;
            var F = E - j;
            var C = Math.cos(H);
            var s = Math.sin(H);
            var N = b.x();
            var M = b.y();
            var d = b.x() + Math.round(F * C);
            var c = b.y() + Math.round(F * s);
            var x = b.x() - Math.round(P * s);
            var u = b.y() + Math.round(P * C);
            var q = x + Math.round(F * C);
            var o = u + Math.round(F * s);
            break;
        case "Figure":
            var D = b.points();
            var j = 10000;
            var z = 10000;
            var E = -10000;
            var f = -10000;
            for (var O = 0; O < D.length / 2; O++) {
                var v = D[2 * O];
                var k = D[2 * O + 1];
                if (j > v) {
                    j = v
                }
                if (z > k) {
                    z = k
                }
                if (E < v) {
                    E = v
                }
                if (f < k) {
                    f = k
                }
            }
            var P = f - z;
            var F = E - j;
            var C = Math.cos(H);
            var s = Math.sin(H);
            var N = b.x() - Math.round((F / 2) * C);
            var M = b.y() - Math.round((F / 2) * s);
            var d = b.x() + Math.round((F / 2) * C);
            var c = b.y() + Math.round((F / 2) * s);
            var x = b.x() - Math.round(P * s) - Math.round((F / 2) * C);
            var u = b.y() + Math.round(P * C) - Math.round((F / 2) * s);
            var q = b.x() - Math.round(P * s) + Math.round((F / 2) * C);
            var o = b.y() + Math.round(P * C) + Math.round((F / 2) * s);
            break;
        default:
            var P = b.height();
            var F = b.width();
            var C = Math.cos(H);
            var s = Math.sin(H);
            var N = b.x();
            var M = b.y();
            var d = b.x() + Math.round(F * C);
            var c = b.y() + Math.round(F * s);
            var x = b.x() - Math.round(P * s);
            var u = b.y() + Math.round(P * C);
            var q = x + Math.round(F * C);
            var o = u + Math.round(F * s);
            break
    }
    var g = Math.min(N, d, x, q);
    var l = Math.max(N, d, x, q);
    var t = Math.min(M, c, u, o);
    var B = Math.max(M, c, u, o);
    var e = {
        minx: g,
        maxx: l,
        miny: t,
        maxy: B
    };
    return e
}

function checknumObjects() {
    var c = layer.getChildren();
    var b = c.length;
    var a = layer.find(".Selector")[0];
    if (a != null) {
        b = b - 1
    }
    return b
}

function updateGroupState(m, a) {
    if (m != null) {
        var b = m.getAttr("state");
        var f = m.getChildren().toArray();
        for (var o in a) {
            var s = a[o];
            var l = false;
            for (var n = 0; n < f.length; n++) {
                var d = f[n].getAttr("state").type;
                if (d == "RegularPolygon" || d == "Star" || d == "Ring" || d == "Figure") {
                    l = true
                }
            }
            b[o] = s;
            if (o != "type") {
                for (var n = 0; n < f.length; n++) {
                    var e = f[n];
                    var p = e.getAttr("state");
                    if (o == "width") {
                        var h = s / m.width();
                        p.x = h * p.x;
                        e.x(h * e.x());
                        if (l) {
                            p.y = h * p.y;
                            e.y(h * e.y())
                        }
                        switch (p.type) {
                            case "Group":
                                updateGroupState(e, {
                                    x: e.x(),
                                    y: e.y(),
                                    width: h * e.width()
                                });
                                break;
                            case "RegularPolygon":
                                e.radius(h * e.radius());
                                p.radius = e.radius();
                                break;
                            case "Star":
                                e.outerRadius(h * e.outerRadius());
                                e.innerRadius(h * e.innerRadius());
                                p.outerRadius = e.outerRadius();
                                p.innerRadius = e.innerRadius();
                                break;
                            case "Ring":
                                e.outerRadius(h * e.outerRadius());
                                e.innerRadius(h * e.innerRadius());
                                p.outerRadius = e.outerRadius();
                                p.innerRadius = e.innerRadius();
                                break;
                            case "Line":
                                var q = e.points();
                                var c = p.lineLength * Math.cos(Math.PI * p.rotation / 180);
                                var g = p.lineLength * Math.sin(Math.PI * p.rotation / 180);
                                if (l) {
                                    g = g * h
                                }
                                p.lineLength = Math.sqrt(g * g + h * h * c * c);
                                p.rotation = 180 * Math.atan2(g, c * h) / Math.PI;
                                q[2] = Math.round(p.lineLength);
                                e.rotation(p.rotation);
                                e.points(q);
                                break;
                            case "Figure":
                                var q = e.points();
                                p.scaleSize = p.scaleSize * h;
                                for (var j = 0; j < q.length; j++) {
                                    q[j] = q[j] * h
                                }
                                p.points = q;
                                e.points(q);
                                break;
                            default:
                                e.width(h * e.width());
                                p.width = e.width();
                                if (l) {
                                    e.height(h * e.height());
                                    p.height = e.height()
                                }
                                break
                        }
                    } else {
                        if (o == "height") {
                            var r = s / m.height();
                            p.y = r * p.y;
                            e.y(r * e.y());
                            if (l) {
                                p.x = r * p.x;
                                e.x(r * e.x())
                            }
                            switch (p.type) {
                                case "Group":
                                    updateGroupState(e, {
                                        x: e.x(),
                                        y: e.y(),
                                        height: r * e.height()
                                    });
                                    break;
                                case "RegularPolygon":
                                    e.radius(r * e.radius());
                                    p.radius = e.radius();
                                    break;
                                case "Star":
                                    e.outerRadius(r * e.outerRadius());
                                    e.innerRadius(r * e.innerRadius());
                                    p.outerRadius = e.outerRadius();
                                    p.innerRadius = e.innerRadius();
                                    break;
                                case "Ring":
                                    e.outerRadius(r * e.outerRadius());
                                    e.innerRadius(r * e.innerRadius());
                                    p.outerRadius = e.outerRadius();
                                    p.innerRadius = e.innerRadius();
                                    break;
                                case "Line":
                                    var q = e.points();
                                    var c = p.lineLength * Math.cos(Math.PI * p.rotation / 180);
                                    var g = p.lineLength * Math.sin(Math.PI * p.rotation / 180);
                                    if (l) {
                                        c = c * r
                                    }
                                    p.lineLength = Math.sqrt(r * r * g * g + c * c);
                                    p.rotation = 180 * Math.atan2(r * g, c) / Math.PI;
                                    q[2] = Math.round(p.lineLength);
                                    e.rotation(p.rotation);
                                    e.points(q);
                                    break;
                                case "Figure":
                                    var q = e.points();
                                    p.scaleSize = p.scaleSize * r;
                                    for (var j = 0; j < q.length; j++) {
                                        q[j] = q[j] * r
                                    }
                                    e.points(q);
                                    p.points = q;
                                    break;
                                default:
                                    e.height(r * e.height());
                                    p.height = e.height();
                                    if (l) {
                                        e.width(r * e.width());
                                        p.width = e.width()
                                    }
                                    break
                            }
                        }
                    }
                    e.setAttr("state", p)
                }
                if (o == "width" && l) {
                    var h = s / m.width();
                    m.height(h * m.height());
                    b.height = m.height()
                }
                if (o == "height" && l) {
                    var r = s / m.height();
                    m.width(r * m.width());
                    b.width = m.width()
                }
                m.setAttr(o, s);
                m.setAttr("state", b)
            }
        }
        if (b.type != "Stage" && b.type != "Layer" && objSelector != null) {
            objSelector.deleteOldSelector();
            objSelector.drawSelector(m)
        }
    }
}

function updateState(e, b) {
    if (e != null) {
        var c = e.getAttr("state");
        for (var j in b) {
            var n = b[j];
            if (c.type == "Line") {
                if (j == "strokeWidth") {
                    if (n < 2) {
                        n = 2
                    }
                }
                if (j == "lineLength") {
                    var m = e.points();
                    m[2] = Math.round(n);
                    e.points(m)
                }
            }
            if (j != "type") {
                if (j == "scaleSize") {
                    var g = new Array();
                    for (var f = 0; f < c.points.length; f++) {
                        g.push(Math.round(c.points[f] * n))
                    }
                    e.points(g)
                } else {
                    if (j == "vertices") {
                        var m = c.points;
                        var l = m.length / 2;
                        var d = l;
                        while (d < n) {
                            m.push(m[d - 2] + 10 * Math.random());
                            m.push(m[d - 2] + 10 * Math.random());
                            d++
                        }
                        while (d > n) {
                            m.pop();
                            m.pop();
                            d--
                        }
                        c.points = m;
                        var g = new Array();
                        for (var f = 0; f < c.points.length; f++) {
                            g.push(Math.round(c.points[f] * c.scaleSize))
                        }
                        e.points(g)
                    } else {
                        if (j == "width" && c.lockaspect != null) {
                            if (c.lockaspect == true) {
                                var a = c.width / c.height;
                                var k = Math.round(n / a);
                                c.height = k;
                                e.height(k)
                            }
                            e.setAttr(j, n)
                        } else {
                            if (j == "height" && c.lockaspect != null) {
                                if (c.lockaspect == true) {
                                    var a = c.width / c.height;
                                    var h = Math.round(n * a);
                                    c.width = h;
                                    e.width(h)
                                }
                                e.setAttr(j, n)
                            } else {
                                e.setAttr(j, n)
                            }
                        }
                    }
                }
            }
            c[j] = n
        }
        e.setAttr("state", c);
        if (c.type != "Stage" && c.type != "Layer" && objSelector != null) {
            objSelector.deleteOldSelector();
            objSelector.drawSelector(e)
        }
        if (usedefaults == true) {
            objdefaults[c.type] = JSON.stringify(e.getAttr("state"))
        }
    } else {
        for (var j in b) {
            var n = b[j];
            console.log(j, n);
            designgroup[j] = n
        }
    }
}

function clearTempGroup() {
    if (tgroupindicator != null) {
        tgroupindicator.destroy();
        tgroupindicator = null;
        while (tempgroup.length > 0) {
            tempgroup.pop()
        }
        layer.draw()
    }
}

function addtoTempGroup(c, f) {
    if (f.name() != "Selector") {
        if (tgroupindicator == null) {
            tgroupindicator = new Kinetic.Rect({
                name: "groupindicator",
                fill: "rgb(200,250,200)",
                stroke: "rgb(0,250,250)",
                opacity: 0.5,
                strokeWidth: 4,
                dashEnabled: true,
                dash: [10, 5]
            });
            var g = 10000;
            var d = 1;
            var e = 10000;
            var b = 1;
            layer.add(tgroupindicator);
            tgroupindicator.moveToBottom()
        } else {
            var g = tgroupindicator.x();
            var d = g + tgroupindicator.width();
            var e = tgroupindicator.y();
            var b = e + tgroupindicator.height()
        }
        var a = getobjextents(f);
        if (a.maxx > d) {
            d = a.maxx
        }
        if (a.maxy > b) {
            b = a.maxy
        }
        if (a.minx < g) {
            g = a.minx
        }
        if (a.miny < e) {
            e = a.miny
        }
        tempgroup.push(f);
        tgroupindicator.x(g);
        tgroupindicator.y(e);
        tgroupindicator.width(d - g);
        tgroupindicator.height(b - e);
        layer.draw()
    }
}

function groupobjects() {
    var a = 100000;
    var g = 1;
    var o = 100000;
    var c = 1;
    var k = tempgroup.length;
    clearActiveObject();
    if (k > 1) {
        var b = new Array();
        for (var e = 0; e < k; e++) {
            var d = tempgroup[e];
            var m = getobjextents(d);
            if (m.maxx > g) {
                g = m.maxx
            }
            if (m.maxy > c) {
                c = m.maxy
            }
            if (m.minx < a) {
                a = m.minx
            }
            if (m.miny < o) {
                o = m.miny
            }
        }
        var n = g - a;
        var f = c - o;
        var l = {
            name: "none",
            type: "Group",
            id: "none",
            x: a,
            y: o,
            width: n,
            height: f,
            visible: true,
            opacity: 1,
            children: []
        };
        var j = newgroupobj(true, false, l);
        while (tempgroup.length > 0) {
            var d = tempgroup.pop();
            d.draggable(false);
            d.x(d.x() - a);
            d.y(d.y() - o);
            var p = d.getAttr("state");
            p.x = p.x - a;
            p.y = p.y - o;
            d.setAttr("state", p);
            b.push(p);
            d.off("mousedown");
            d.off("dragmove");
            d.off("dragend");
            d.off("mouseover");
            d.off("mouseout");
            j.add(d)
        }
        l.children = b;
        j.setAttr("state", l);
        layer.add(j);
        clearTempGroup();
        return j
    } else {
        return null
    }
}

function ungroupobjects() {
    var e = new Array();
    if (activeobject != null) {
        layer = activeobject.getLayer();
        var b = activeobject.getAttr("state");
        if (b.type == "Group") {
            var h = (activeobject.getChildren()).toArray();
            var f = activeobject.x();
            var j = activeobject.y();
            var c = activeobject.rotation();
            for (var g = 0; g < h.length; g++) {
                var d = h[g];
                var l = d.getAttr("state");
                var a = Math.atan2(l.y, l.x);
                var k = Math.sqrt(l.x * l.x + l.y * l.y);
                l.x = f + Math.round(k * Math.cos(a + Math.PI * c / 180));
                l.y = j + Math.round(k * Math.sin(a + Math.PI * c / 180));
                if (l.rotation != null) {
                    l.rotation = l.rotation + c
                } else {
                    l.rotation = c
                }
                d.draggable(true);
                objEvents(d);
                d.moveTo(layer);
                d.x(l.x);
                d.y(l.y);
                d.rotation(l.rotation);
                e.push(d)
            }
            if (objSelector != null) {
                objSelector.deleteOldSelector()
            }
            activeobject.destroy();
            layer.draw();
            $("#proptable").empty()
        }
    }
    return e
}

function objEvents(a) {
    a.on("mouseover", function() {
        document.body.style.cursor = "pointer";
        cursorstate = "onobj"
    });
    a.on("mouseout", function() {
        document.body.style.cursor = "default";
        cursorstate = "free"
    });
    a.on("mousedown", function() {
        clearActiveObject();
        if (ctrlkey == true) {
            if (tempgroup.indexOf(this) == -1) {
                $("#proptable").empty();
                addtoTempGroup(true, this);
                selectObject("grouping")
            }
        } else {
            if (tgroupindicator != null) {
                clearTempGroup()
            }
            activeobject = a;
            updatePropDisp();
            if (objSelector == null) {
                objSelector = new objectSelector()
            }
            objSelector.drawSelector(this);
            selectObject("kineticjs")
        }
    });
    a.on("dragmove", function() {
        objSelector.drawSelector(this)
    });
    a.on("dragend", function() {
        activeobject = a;
        updateState(activeobject, {
            x: this.x(),
            y: this.y()
        });
        updatePropDisp()
    })
}

function cleardesign() {
    var a = checknumObjects();
    if (a > 0) {
        var b = confirm("Are you sure you want to delete the design?");
        if (b == true) {
            layer.destroyChildren();
            objSelector = new objectSelector();
            layer.add(objSelector.objSelGroup);
            layer.draw();
            activeobject = null;
            $("#proptable").empty()
        }
    }
}

function delobj() {
    objSelector.deleteOldSelector();
    activeobject.destroy();
    layer.draw();
    $("#proptable").empty()
}

function copyobj() {
    if (activeobject != null) {
        var c = JSON.stringify(activeobject.getAttr("state"));
        var a = JSON.parse(c);
        a.name = "none";
        a.id = "none";
        a.x = a.x + 10;
        a.y = a.y + 10;
        var b = newobj(true, a);
        layer.add(b);
        objSelector.deleteOldSelector();
        activeobject = b;
        updatePropDisp();
        objSelector.drawSelector(b);
        return b
    }
}

function moveup() {
    if (activeobject != null) {
        activeobject.moveUp();
        layer.draw()
    }
}

function movedown() {
    if (activeobject != null) {
        activeobject.moveDown();
        layer.draw()
    }
}

function newgroupobj(g, b, a) {
    if (a.id == "none") {
        a.id = UniqueId()
    }
    var c = new Kinetic.Group({
        name: a.name,
        id: a.id,
        x: a.x,
        y: a.y,
        width: a.width,
        height: a.height,
        draggable: g
    });
    var h = a.children;
    for (var e = 0; e < h.length; e++) {
        childstate = h[e];
        if (childstate.type == "Group") {
            var d = newgroupobj(b, b, childstate)
        } else {
            var d = newobj(b, childstate)
        }
        c.add(d)
    }
    for (var f in a) {
        var j = a[f];
        c.setAttr(f, j)
    }
    if (g) {
        objEvents(c)
    }
    c.setAttr("state", a);
    return c
}

function newobj(b, d) {
    var a = d.type;
    if (d.id == "none") {
        d.id = UniqueId()
    }
    switch (a) {
        case "Image":
            var f = new Image();
            var e = new Kinetic.Image({
                id: d.id,
                image: f,
                draggable: b
            });
            f.onload = function() {
                var h = e.getLayer();
                if (h != null) {
                    h.draw()
                }
            };
            f.src = d.path;
            break;
        case "Rect":
            var e = new Kinetic.Rect({
                id: d.id,
                draggable: b
            });
            break;
        case "Ellipse":
            var e = new Kinetic.Ellipse({
                id: d.id,
                draggable: b
            });
            break;
        case "RegularPolygon":
            var e = new Kinetic.RegularPolygon({
                id: d.id,
                draggable: b
            });
            break;
        case "Star":
            var e = new Kinetic.Star({
                id: d.id,
                draggable: b
            });
            break;
        case "Ring":
            var e = new Kinetic.Ring({
                id: d.id,
                draggable: b
            });
            break;
        case "Text":
            var e = new Kinetic.Text({
                id: d.id,
                draggable: b
            });
            break;
        case "Line":
            var e = new Kinetic.Line({
                id: d.id,
                points: [0, 0, d.lineLength, 0],
                draggable: b
            });
            break;
        case "PolyLine":
            var e = new Kinetic.Line({
                id: d.id,
                draggable: b
            });
            break;
        case "CurvedArrow":
            var e = CurvedArrow(b, d);
            break;
        case "Figure":
            var e = new Kinetic.Line({
                id: d.id,
                closed: true,
                draggable: b
            });
            break;
        case "Path":
            var e = new Kinetic.Path({
                id: d.id,
                draggable: b
            });
            break
    }
    if (d.dashEnabled == null) {
        d.dashEnabled = false
    }
    e.dash(dashdef);
    for (var g in d) {
        var c = d[g];
        e.setAttr(g, c)
    }
    if (b) {
        objEvents(e)
    }
    e.setAttr("state", d);
    return e
}

function addobj(a) {
    var b = Math.round(100 * Math.random());
    var d = Math.round(100 * Math.random());
    var c = null;
    switch (a) {
        case "Image":
            activebutton = "image";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "Image",
                path: "/images/image.png",
                x: b,
                y: d,
                width: 100,
                height: 100,
                lockaspect: false,
                rotation: 0,
                visible: true,
                opacity: 1
            });
            break;
        case "Rect":
            activebutton = "rect";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "Rect",
                x: b,
                y: d,
                width: 50,
                height: 100,
                lockaspect: false,
                rotation: 0,
                fill: defcolour,
                stroke: defstroke,
                strokeWidth: defstrokewidth,
                dashEnabled: false,
                cornerRadius: 0,
                visible: true,
                opacity: 1
            });
            break;
        case "Ellipse":
            activebutton = "ellipse";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "Ellipse",
                x: b + 30,
                y: d + 30,
                width: 50,
                height: 80,
                lockaspect: false,
                rotation: 0,
                fill: defcolour,
                stroke: defstroke,
                strokeWidth: defstrokewidth,
                dashEnabled: false,
                visible: true,
                opacity: 1
            });
            break;
        case "RegularPolygon":
            activebutton = "polygon";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "RegularPolygon",
                x: b + 30,
                y: d + 30,
                rotation: 0,
                sides: 5,
                radius: 30,
                fill: defcolour,
                stroke: defstroke,
                strokeWidth: defstrokewidth,
                dashEnabled: false,
                visible: true,
                opacity: 1
            });
            break;
        case "Star":
            activebutton = "star";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "Star",
                x: b + 30,
                y: d + 30,
                rotation: 0,
                numPoints: 5,
                innerRadius: 15,
                outerRadius: 30,
                fill: defcolour,
                stroke: defstroke,
                strokeWidth: defstrokewidth,
                dashEnabled: false,
                visible: true,
                opacity: 1
            });
            break;
        case "Ring":
            activebutton = "ring";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "Ring",
                x: b + 30,
                y: d + 30,
                innerRadius: 15,
                outerRadius: 30,
                fill: defcolour,
                stroke: defstroke,
                strokeWidth: defstrokewidth,
                dashEnabled: false,
                visible: true,
                opacity: 1
            });
            break;
        case "Text":
            activebutton = "text";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "Text",
                x: b + 30,
                y: d + 30,
                rotation: 0,
                text: "text",
                fontSize: 24,
                fontFamily: "Arial",
                fill: defcolour,
                stroke: defstroke,
                strokeWidth: 1,
                dashEnabled: false,
                visible: true,
                opacity: 1
            });
            break;
        case "Line":
            activebutton = "line";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "Line",
                x: b + 30,
                y: d + 30,
                lineLength: 100,
                rotation: 0,
                stroke: defstroke,
                strokeWidth: defstrokewidth,
                dashEnabled: false,
                visible: true,
                opacity: 1
            });
            break;
        case "PolyLine":
            activebutton = "polyline";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "PolyLine",
                x: b + 30,
                y: d + 30,
                fill: defcolour,
                rotation: 0,
                stroke: defstroke,
                strokeWidth: defstrokewidth,
                dashEnabled: false,
                vertices: 3,
                tension: 0,
                points: [0, 0, -30, 100, 100, 100],
                closed: true,
                scaleSize: 1,
                visible: true,
                opacity: 1
            });
            break;
        case "CurvedArrow":
            activebutton = "curvedarrow";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "CurvedArrow",
                x: b + 30,
                y: d + 30,
                rotation: 0,
                fill: defcolour,
                stroke: defstroke,
                strokeWidth: defstrokewidth,
                dashEnabled: false,
                visible: true,
                opacity: 1,
                portion: 1,
                midX: 100,
                midY: 50,
                endX: 100,
                endY: 100,
                arrowWidth: ar_width,
                arrowheadLength: ar_headlength,
                arrowheadWidth: ar_headwidth
            });
            break;
        case "Mfigure":
            activebutton = "mfig";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "Figure",
                x: b + 30,
                y: d + 30,
                fill: defcolour,
                rotation: 0,
                stroke: defstroke,
                strokeWidth: defstrokewidth,
                dashEnabled: false,
                tension: 0,
                points: [0, 0, -3.5, 1, -7, 5, -9, 10, -7, 16, -2, 19, -3, 22, -9, 22, -22, 54, -21, 55, -20, 57, -16, 57, -10, 40, -10, 90, -8, 92, -5, 93, -3, 90, -2, 60, 2, 60, 3, 90, 5, 93, 8, 92, 10, 90, 10, 40, 16, 57, 20, 57, 21, 55, 22, 54, 9, 22, 3, 22, 2, 19, 7, 16, 9, 10, 7, 5, 3.5, 1],
                scaleSize: 1,
                visible: true,
                opacity: 1
            });
            break;
        case "Ffigure":
            activebutton = "ffig";
            c = newobj(true, {
                name: "none",
                id: "none",
                type: "Figure",
                x: b + 30,
                y: d + 30,
                fill: defcolour,
                rotation: 0,
                stroke: defstroke,
                strokeWidth: defstrokewidth,
                dashEnabled: false,
                tension: 0,
                points: [0, 0, -3.5, 1, -7.5, 5, -9, 10, -6.7, 16, -2, 19, -3, 22, -9, 22, -23, 54, -21, 55, -19, 57, -16, 56, -10, 40, -15, 70, -10, 70, -10, 90, -8, 93, -4.5, 93, -3, 90, -3, 70, 3, 70, 3, 90, 4.5, 93, 8, 93, 10, 90, 10, 70, 15, 70, 10, 40, 16, 56, 19, 57, 21, 55, 23, 54, 9, 22, 3, 22, 2, 19, 6.7, 16, 9, 10, 7.5, 5, 3.5, 1, 0, 0],
                scaleSize: 1,
                visible: true,
                opacity: 1
            });
            break
    }
    layer.add(c);
    if (objSelector != null) {
        objSelector.deleteOldSelector();
        objSelector.drawSelector(c)
    }
    activeobject = c;
    updatePropDisp();
    return c
}

function coreSetup() {
    $(document).keydown(function(b) {
        var a = (b.keyCode ? b.keyCode : b.which)
    });
    $(document).keyup(function(b) {
        var a = (b.keyCode ? b.keyCode : b.which)
    });
    libselector = new Kinetic.Rect({
        name: "libselector",
        visible: false,
        width: objwh,
        height: objwh,
        fill: "#ccccee",
        stroke: "#ccccee",
        strokeWidth: 1
    })
}
var ar_width = 10;
var ar_headlength = 10;
var ar_headwidth = 20;
var ar_points = 50;

function drawArrow(b, d) {
    var c = 0;
    var k = Math.round(b.portion * ar_points);
    if (k == 0) {
        k = 1
    }
    if (k > ar_points) {
        k = ar_points
    }
    var j = new Array();
    for (var g = 0; g < ar_points; g++) {
        var l = g * 1 / (ar_points - 1);
        j.push({
            x: 2 * (1 - l) * l * (b.midX) + l * l * (b.endX),
            y: 2 * (1 - l) * l * (b.midY) + l * l * (b.endY)
        })
    }
    var e = Math.sqrt((j[k - 1].x - j[0].x) * (j[k - 1].x - j[0].x) + (j[k - 1].y - j[0].y) * (j[k - 1].y - j[0].y));
    if (e > b.arrowheadLength) {
        var a = new Array();
        var h = new Array();
        while (e > b.arrowheadLength && c < ar_points - 1) {
            var f = Math.atan2(j[c + 1].y - j[c].y, j[c + 1].x - j[c].x);
            a.push({
                x: j[c].x + b.arrowWidth * Math.sin(f) / 2,
                y: j[c].y - b.arrowWidth * Math.cos(f) / 2
            });
            h.push({
                x: j[c].x - b.arrowWidth * Math.sin(f) / 2,
                y: j[c].y + b.arrowWidth * Math.cos(f) / 2
            });
            c = c + 1;
            e = Math.sqrt((j[k - 1].x - j[c].x) * (j[k - 1].x - j[c].x) + (j[k - 1].y - j[c].y) * (j[k - 1].y - j[c].y))
        }
        var f = Math.atan2(j[k - 1].y - j[c - 1].y, j[k - 1].x - j[c - 1].x);
        a.push({
            x: j[c - 1].x + b.arrowheadWidth * Math.sin(f) / 2,
            y: j[c - 1].y - b.arrowheadWidth * Math.cos(f) / 2
        });
        h.push({
            x: j[c - 1].x - b.arrowheadWidth * Math.sin(f) / 2,
            y: j[c - 1].y + b.arrowheadWidth * Math.cos(f) / 2
        });
        d.beginPath();
        d.moveTo(0, 0);
        for (var g = 0; g < a.length; g++) {
            d.lineTo(a[g].x, a[g].y)
        }
        d.lineTo(j[k - 1].x, j[k - 1].y);
        for (var g = h.length - 1; g > -1; g--) {
            d.lineTo(h[g].x, h[g].y)
        }
        d.closePath()
    }
}

function CurvedArrow(b, c) {
    var a = new Kinetic.Shape({
        name: c.name,
        id: UniqueId(),
        x: c.x,
        y: c.y,
        fill: "#6688aa",
        stroke: "#000000",
        draggable: b
    });
    a.setAttr("state", c);
    a.setAttr("portion", 1);
    a.sceneFunc(function(d) {
        var e = this.getAttr("state");
        e.portion = this.getAttr("portion");
        drawArrow(e, d);
        d.fillStrokeShape(this)
    });
    return a
}
var actionlistgap = 3;
var actionlistXoffset = 10;
var actionlistYoffset = 10;
var ineventactionXoffset = 5;
var ineventactionYoffset = 30;
var actobjw = 100;
var actobjh = 30;
var evobjw = 110;
var evobjh = 200;
var eventslots = 15;
var activeactobj = null;
var mousedown_action = false;
var actstage = null;
var actlayer = null;
var actw = 800;
var acth = 500;
var timespan = 3600;
var actiontypes = {
    appear: "visible",
    disappear: "visible",
    fadein: "opacity",
    fadeout: "opacity",
    move: "position",
    arrowflow: "portion"
};
var actselectcol = "#ffffaa";
var actnonselcol = "#aaaadd";
var evselectcol = "#aaffaa";
var evnonselcol = "#aaccaa";
var castmode = false;
var activeactiontype = "";
var eventliststates = [];
var eventlistgap = 5;
var eventlistXoffset = 150;

function actionselect() {
    activeactiontype = $("#actiontypeselect").val()
}

function makeLayerAnimation(c) {
    var b = c.getAttr("parentlayer");
    var a = new Kinetic.Animation(function(e) {
        var f = true;
        var j = this.getLayers()[0];
        var g = j.getAttr("actionlayer");
        var m = g.getAttr("playlist");
        for (var l = 0; l < m.length; l++) {
            var h = m[l];
            var d = h.interpolateProp(e);
            var k = h.parentobject;
            var n = k.getAttr("state");
            k.setAttr(h.property, d);
            if (h.property == "position") {
                n.x = d.x;
                n.y = d.y
            } else {
                n[h.property] = d
            }
            if ((e.time - h.starttime * 1000) > h.animDuration * 1000) {
                f = f && true
            } else {
                f = f && false
            }
        }
        if (f == true) {
            this.stop();
            e.time = 0
        }
    }, b);
    c.setAttr("animation", a)
}

function makeActionTypeOptions(e) {
    var c = "";
    if (e != null) {
        var a = e.getAttr("state").type;
        var b = Object.keys(actiontypes);
        for (var d = 0; d < b.length; d++) {
            var f = b[d];
            if (f != "arrowflow") {
                c = c + '<option value="' + f + '">' + f + "</option>"
            } else {
                if (a == "CurvedArrow") {
                    c = c + '<option value="' + f + '">' + f + "</option>"
                }
            }
        }
    }
    return c
}

function getNodeActions(d) {
    var e = d.getLayer().getAttr("actionlayer");
    var c = new Array();
    var a = e.find(".action");
    for (var b = 0; b < a.length; b++) {
        if (a[b].getAttr("action").parentobject == d) {
            c.push(a[b])
        }
    }
    return c
}

function Action(f, g, c, b, a, e, d) {
    this.parentobject = f;
    this.id = g;
    this.starttime = e;
    this.animDuration = d;
    this.actiontype = c;
    this.property = actiontypes[c];
    this.startstate = b;
    this.endstate = a;
    this.interpolateProp = function(j) {
        var i = 0;
        if ((j.time - this.starttime * 1000) > this.animDuration * 1000) {
            i = 1
        } else {
            i = (j.time - this.starttime * 1000) / (this.animDuration * 1000)
        }
        var l = this.parentobject.getAttr(this.property);
        if (i > 0) {
            switch (this.actiontype) {
                case "move":
                    var h = i * (this.endstate.x - this.startstate.x) + this.startstate.x;
                    var k = i * (this.endstate.y - this.startstate.y) + this.startstate.y;
                    l = {
                        x: h,
                        y: k
                    };
                    break;
                case "fadein":
                    l = i * (this.endstate - this.startstate) + this.startstate;
                    if (l < 0) {
                        l = 0
                    }
                    break;
                case "fadeout":
                    l = i * (this.endstate - this.startstate) + this.startstate;
                    if (l < 0) {
                        l = 0
                    }
                    break;
                case "appear":
                    if (i < 1) {
                        l = this.startstate
                    } else {
                        l = this.endstate
                    }
                    break;
                case "disappear":
                    if (i < 1) {
                        l = this.startstate
                    } else {
                        l = this.endstate
                    }
                    break;
                case "arrowflow":
                    l = this.startstate + i * (this.endstate - this.startstate);
                    break
            }
        }
        return l
    }
}
Action.prototype.setStart = function() {
    var a = this.parentobject;
    var b = a.getAttr(this.property);
    this.startstate = b
};
Action.prototype.setEnd = function() {
    var a = this.parentobject;
    var b = a.getAttr(this.property);
    this.endstate = b
};
Action.prototype.settoStartstate = function() {
    var b = this.parentobject;
    var c = this.property;
    b.setAttr(this.property, this.startstate);
    var a = b.getAttr("state");
    if (c == "position") {
        a.x = this.startstate.x;
        a.y = this.startstate.y
    } else {
        a[this.property] = this.startstate
    }
};
Action.prototype.settoEndstate = function() {
    var b = this.parentobject;
    var c = this.property;
    b.setAttr(this.property, this.endstate);
    var a = b.getAttr("state");
    if (c == "position") {
        a.x = this.endstate.x;
        a.y = this.endstate.y
    } else {
        a[this.property] = this.endstate
    }
};

function startActionEvent() {
    if (activeactobj != null) {
        if (activeactobj.name() == "eventgroup") {
            var c = activeactobj.find(".action");
            for (var a = 0; a < c.length; a++) {
                var b = c[a].getAttr("action");
                b.settoStartstate()
            }
        } else {
            if (activeactobj.name() == "action") {
                var b = activeactobj.getAttr("action");
                b.settoStartstate()
            }
        }
        layer.draw()
    }
}

function endActionEvent() {
    if (activeactobj != null) {
        if (activeactobj.name() == "eventgroup") {
            var c = activeactobj.find(".action");
            for (var a = 0; a < c.length; a++) {
                var b = c[a].getAttr("action");
                b.settoEndstate()
            }
        } else {
            if (activeactobj.name() == "action") {
                var b = activeactobj.getAttr("action");
                b.settoEndstate()
            }
        }
        layer.draw()
    }
}

function playActionEvent() {
    if (activeactobj != null) {
        var g = new Array();
        if (activeactobj.name() == "eventgroup") {
            var f = activeactobj.find(".action");
            for (var b = 0; b < f.length; b++) {
                var d = f[b].getAttr("action");
                g.push(d)
            }
        } else {
            if (activeactobj.name() == "action") {
                var d = activeactobj.getAttr("action");
                g.push(d)
            }
        }
        var e = activeactobj.getLayer();
        e.setAttr("playlist", g);
        var a = e.getAttr("parentlayer");
        var c = e.getAttr("animation");
        c.start()
    }
}

function playPEEvents(d) {
    if (d > -1) {
        var c = eventliststates[d];
        var f = c.peviews;
        for (var a = 0; a < f.length; a++) {
            var b = f[a];
            var e = actstage.find("#" + b.id)[0];
            if (e != null) {
                activeactobj = e;
                playActionEvent()
            }
        }
    }
}

function startPEEvents(d) {
    if (d > -1) {
        var c = eventliststates[d];
        var f = c.peviews;
        for (var a = 0; a < f.length; a++) {
            var b = f[a];
            var e = actstage.find("#" + b.id)[0];
            if (e != null) {
                activeactobj = e;
                startActionEvent()
            }
        }
    }
}

function actionobj(a, i) {
    var h = 10;
    var g = null;
    if (a.id == "none") {
        a.id = UniqueId()
    }
    var d = new Kinetic.Group({
        name: "action",
        draggable: true,
        id: a.id,
        x: a.x,
        y: a.y,
        width: actobjw,
        height: actobjh - h
    });
    var c = new Kinetic.Rect({
        name: "actblock",
        draggable: false,
        x: 0,
        y: 0,
        width: actobjw,
        height: actobjh - h,
        cornerRadius: 5,
        fill: actnonselcol,
        stroke: "black",
        strokeWidth: 1
    });
    var j = layer.find("#" + a.parentobjectid)[0];
    d.setAttr("action", new Action(j, a.id, a.actiontype, a.startstate, a.endstate, a.starttime, a.duration));
    var e = j.name();
    if (a.descriptor == "") {
        a.descriptor = a.actiontype + "_" + e
    }
    var b = a.descriptor;
    var f = (b).slice(0, 15);
    var k = new Kinetic.Text({
        name: "actname",
        draggable: false,
        x: 5,
        y: actobjh / 2 - h,
        text: f,
        fontSize: 12,
        fill: "black"
    });
    d.add(c);
    d.add(k);
    i.add(d);
    d.setAttr("state", a);
    d.find(".actblock").stroke(evnonselcol);
    d.moveToTop();
    k.moveToTop();
    d.on("mouseover", function() {
        document.body.style.cursor = "pointer";
        cursorstate = "onact"
    });
    d.on("mouseout", function() {
        document.body.style.cursor = "default";
        cursorstate = "free"
    });
    d.on("mousedown", function() {
        activeactobj = this;
        mousedown_action = true;
        showActionPropDisp();
        var n = actlayer.find(".action");
        for (var m = 0; m < n.length; m++) {
            var l = n[m];
            if (activeactobj == l) {
                l.find(".actblock").fill(actselectcol)
            } else {
                l.find(".actblock").fill(actnonselcol)
            }
        }
        actlayer.draw();
        if (castmode == true) {
            playActionEvent()
        }
    });
    d.on("dragstart", function(n) {
        var l = n.target;
        l.find(".actblock").stroke("#000000");
        var m = l.getParent();
        m.moveToTop();
        l.moveToTop()
    });
    d.on("dragmove", function(l) {
        l.target.moveToTop()
    });
    d.on("dragend", function(p) {
        var t = false;
        var m = p.target;
        var q = m.getParent();
        var u = m.x() + q.x();
        var r = m.y() + q.y();
        var l = actlayer.find(".eventgroup");
        for (var n = 0; n < l.length; n++) {
            var w = l[n];
            var o = w.height();
            var y = w.width();
            var v = w.x();
            var s = w.y();
            if ((u < (v + y)) && (u > v) && (r < (s + o)) && (r > s)) {
                this.moveTo(w);
                this.find(".actblock").stroke(evnonselcol);
                this.moveToTop();
                t = true;
                updateActionList(w);
                updateEventactions()
            }
        }
        var x = this.getAttr("state");
        x.x = this.x();
        x.y = this.y();
        this.setAttr("state", x);
        showActionPropDisp();
        actlayer.draw()
    });
    updateActionList(i);
    return d
}

function newAction() {
    if (activeobject != null && selectednode.type != "Stage" && selectednode.type != "Layer") {
        var e = 10;
        var g = e;
        var b = e;
        var c = null;
        var a = actlayer.getAttr("actionbox");
        var f = $("#actiontypeselect").val();
        switch (f) {
            case "appear":
                var d = {
                    descriptor: "",
                    parentobjectid: activeobject.id(),
                    id: "none",
                    actiontype: f,
                    property: actiontypes[f],
                    x: b,
                    y: g,
                    startstate: false,
                    endstate: true,
                    starttime: 0,
                    duration: 1
                };
                c = actionobj(d, a);
                break;
            case "disappear":
                var d = {
                    descriptor: "",
                    parentobjectid: activeobject.id(),
                    id: "none",
                    actiontype: f,
                    property: actiontypes[f],
                    x: b,
                    y: g,
                    startstate: true,
                    endstate: false,
                    starttime: 0,
                    duration: 1
                };
                c = actionobj(d, a);
                break;
            case "fadein":
                var d = {
                    descriptor: "",
                    parentobjectid: activeobject.id(),
                    id: "none",
                    actiontype: f,
                    property: actiontypes[f],
                    x: b,
                    y: g,
                    startstate: 0,
                    endstate: 1,
                    starttime: 0,
                    duration: 1
                };
                c = actionobj(d, a);
                break;
            case "fadeout":
                var d = {
                    descriptor: "",
                    parentobjectid: activeobject.id(),
                    id: "none",
                    actiontype: f,
                    property: actiontypes[f],
                    x: b,
                    y: g,
                    startstate: 1,
                    endstate: 0,
                    starttime: 0,
                    duration: 1
                };
                c = actionobj(d, a);
                break;
            case "move":
                var d = {
                    descriptor: "",
                    parentobjectid: activeobject.id(),
                    id: "none",
                    actiontype: f,
                    property: actiontypes[f],
                    x: b,
                    y: g,
                    startstate: activeobject.getAttr(actiontypes[f]),
                    endstate: activeobject.getAttr(actiontypes[f]),
                    starttime: 0,
                    duration: 1
                };
                c = actionobj(d, a);
                break;
            case "arrowflow":
                var d = {
                    descriptor: "",
                    parentobjectid: activeobject.id(),
                    id: "none",
                    actiontype: f,
                    property: actiontypes[f],
                    x: b,
                    y: g,
                    startstate: 0.1,
                    endstate: 1,
                    starttime: 0,
                    duration: 1
                };
                c = actionobj(d, a);
                break
        }
    }
}

function deleteAction() {
    if (activeactobj != null && activeactobj.name() == "action") {
        var a = confirm("Are you sure you want to delete this action?");
        if (a == true) {
            var b = activeactobj.getParent();
            activeactobj.destroyChildren();
            activeactobj.destroy();
            actlayer.draw();
            $("#proptable").empty();
            updateActionList(b);
            updateEventactions()
        }
    }
}

function removeEventList(d) {
    var f = actstage.find("#" + d)[0];
    if (f != null) {
        var e = f.getLayer();
        var b = e.getAttr("actionbox");
        var c = f.getChildren().toArray();
        for (var a = 0; a < c.length; a++) {
            var g = c[a];
            if (g.name() == "action") {
                g.moveTo(b)
            }
        }
        updateActionList(b);
        f.destroyChildren();
        f.destroy();
        e.draw()
    }
}

function deleteAllEventLists() {
    for (var d = 0; d < eventliststates.length; d++) {
        var c = eventliststates[d];
        var e = c.peviews;
        for (var a = 0; a < e.length; a++) {
            var b = e[a];
            removeEventList(b.id)
        }
    }
    eventliststates = []
}

function deleteEventList(e) {
    if (e > -1) {
        var c = eventliststates[e];
        var f = c.peviews;
        for (var a = 0; a < f.length; a++) {
            var b = f[a];
            removeEventList(b.id)
        }
        eventliststates.splice(e, 1);
        for (var d = 0; d < eventliststates.length; d++) {
            eventliststates[d].index = d
        }
    }
    updateEventSwimList()
}

function updateEventactions() {
    for (var e = 0; e < eventliststates.length; e++) {
        var b = eventliststates[e];
        var g = b.peviews;
        for (var h = 0; h < g.length; h++) {
            var c = g[h];
            if (c.layerid != "none") {
                c.actions = [];
                var d = actstage.find("#" + c.id)[0];
                var k = d.find(".action");
                for (var j = 0; j < k.length; j++) {
                    var f = k[j];
                    var a = f.getAttr("state");
                    c.actions.push({
                        id: a.id,
                        name: a.descriptor
                    })
                }
                eventliststates[e].peviews[h] = c
            }
        }
    }
    txupdateAllEventListActions(eventliststates)
}

function updateActionList(f) {
    if (actlayer != null) {
        var k = f.find(".action");
        for (var e = 0; e < k.length; e++) {
            var g = k[e];
            var a = ineventactionYoffset;
            for (var c = 0; c < e; c++) {
                var b = g.find(".actblock")[0];
                a = a + b.height() + actionlistgap
            }
            g.x(ineventactionXoffset);
            g.y(a)
        }
        var d = a + actionlistgap + actobjh;
        if (d > evobjh) {
            f.height(d);
            f.find(".evblock").height(d)
        } else {
            f.height(evobjh);
            f.find(".evblock").height(evobjh)
        }
        var h = actionlistYoffset + a + actionlistgap + actobjh;
        if (h > actstage.height()) {
            actstage.height(h)
        }
        actlayer.draw()
    }
}

function makeActionBox(b) {
    actlayer = b;
    var a = makeEventList({
        x: actionlistXoffset,
        y: actionlistYoffset,
        parentid: b.id(),
        id: UniqueId(),
        name: "actionbox",
        actiontype: "Eventlist",
        viewstate: {
            name: ""
        },
        actions: []
    });
    b.add(a);
    a.moveToBottom();
    b.setAttr("actionbox", a);
    actstage.height(actionlistYoffset + evobjh + 10)
}

function findEventState(d) {
    var c = false;
    var b = 0;
    var a = null;
    while (c == false && b < eventliststates.length) {
        if (d == eventliststates[b].id) {
            c = true;
            a = eventliststates[b]
        }
        b = b + 1
    }
    return a
}

function findPEinEventState(a, c) {
    var f = false;
    var e = 0;
    var b = 0;
    var d = c.peviews;
    while (f == false && e < d.length) {
        if (a == d[e].id) {
            f = true;
            b = e
        }
        e = e + 1
    }
    return b
}

function updateEventSwimList() {
    for (var p = 0; p < eventliststates.length; p++) {
        var n = eventliststates[p];
        var j = n.peviews;
        for (var c = 0; c < j.length; c++) {
            var m = j[c];
            var t = actstage.find("#" + m.id)[0];
            if (m.layerid == "none") {
                if (t != null) {
                    removeEventList(m.id);
                    t = null
                }
            } else {
                var q = stage.find("#" + m.layerid)[0];
                var s = q.getAttr("actionlayer");
                if (t == null) {
                    t = makeEventList({
                        x: actionlistXoffset,
                        y: actionlistYoffset,
                        parentid: n.id,
                        id: m.id,
                        name: n.name,
                        actiontype: "Eventlist",
                        viewstate: m.viewstate,
                        actions: m.actions
                    });
                    s.add(t);
                    t.moveToBottom()
                } else {
                    if (s.id() != (t.getLayer()).id()) {
                        removeEventList(m.id);
                        t = makeEventList({
                            x: actionlistXoffset,
                            y: actionlistYoffset,
                            parentid: n.id,
                            id: m.id,
                            name: n.name,
                            actiontype: "Eventlist",
                            viewstate: m.viewstate,
                            actions: m.actions
                        });
                        s.add(t);
                        t.moveToBottom()
                    } else {
                        var e = m.actions.length;
                        var g = ineventactionXoffset + e * (actionlistgap + actobjh);
                        if (g < evobjh) {
                            t.find(".evblock")[0].height(evobjh)
                        } else {
                            t.find(".evblock")[0].height(g)
                        }(t.find(".evname")[0]).text(n.name);
                        (t.find(".scrname")[0]).text(m.viewstate.name)
                    }
                }
                s.draw()
            }
        }
    }
    var r = new Array();
    for (var p = 0; p < eventliststates.length; p++) {
        var n = eventliststates[p];
        var j = n.peviews;
        for (var c = 0; c < j.length; c++) {
            var m = j[c];
            if (m.layerid != "none") {
                r.push(m.id)
            }
        }
    }
    var f = actstage.getLayers().toArray();
    for (var k = 0; k < f.length; k++) {
        var s = f[k];
        var l = (s.find(".eventgroup")).toArray();
        for (var o = 0; o < l.length; o++) {
            var b = l[o];
            var u = b.getAttr("state");
            if (u.name != "actionbox") {
                blindex = r.indexOf(b.id());
                if (blindex == -1) {
                    removeEventList(b.id())
                }
            }
        }
    }
    for (var k = 0; k < f.length; k++) {
        var s = f[k];
        var l = (s.find(".eventgroup")).toArray();
        var v = l.findIndex(function(x, y, w) {
            var i = x.getAttr("state");
            if (i.name == "actionbox") {
                return true
            }
            return false
        });
        if (v > -1) {
            l.splice(v, 1)
        }
        l.sort(function(C, B) {
            var A = C.getAttr("state");
            var z = B.getAttr("state");
            var F = A.parentid;
            var G = findEventState(F);
            var x = G.index;
            var y = findPEinEventState(A.id, G);
            var E = z.parentid;
            var D = findEventState(E);
            var w = D.index;
            var i = findPEinEventState(z.id, D);
            if (x < w) {
                return -1
            }
            if (x > w) {
                return 1
            }
            if (x == w) {
                if (y < i) {
                    return -1
                }
                if (y > i) {
                    return 1
                }
            }
            return 0
        });
        for (var d = 0; d < l.length; d++) {
            var h = eventlistXoffset + d * (eventlistgap + evobjw);
            l[d].x(h);
            var a = h + eventlistgap + evobjw;
            if (a > actstage.width()) {
                actstage.width(a)
            }
        }
        s.draw()
    }
    actstage.clear();
    actlayer.draw()
}

function makeEventList(d) {
    var a = new Kinetic.Group({
        name: "eventgroup",
        draggable: false,
        id: d.id,
        x: d.x,
        y: d.y,
        width: evobjw,
        height: evobjh
    });
    a.setAttr("state", d);
    var c = new Kinetic.Rect({
        name: "evblock",
        draggable: false,
        x: 0,
        y: 0,
        width: evobjw,
        height: evobjh,
        cornerRadius: 0,
        fill: evnonselcol,
        stroke: "black",
        strokeWidth: 1
    });
    var f = (d.name).slice(0, 10);
    var b = new Kinetic.Text({
        name: "evname",
        draggable: false,
        x: 5,
        y: 5,
        text: f,
        fontSize: 12,
        fill: "black"
    });
    f = (d.viewstate.name).slice(0, 10);
    var e = new Kinetic.Text({
        name: "scrname",
        draggable: false,
        x: 5,
        y: 15,
        text: f,
        fontSize: 12,
        fill: "black"
    });
    a.add(c);
    a.add(b);
    a.add(e);
    a.on("mouseover", function() {
        document.body.style.cursor = "pointer";
        cursorstate = "onev"
    });
    a.on("mouseout", function() {
        document.body.style.cursor = "default";
        cursorstate = "free"
    });
    a.on("mousedown", function() {
        if (mousedown_action == false) {
            activeactobj = this;
            showActionPropDisp();
            var j = actlayer.getChildren().toArray();
            for (var h = 0; h < j.length; h++) {
                var g = j[h];
                if (activeactobj == g) {
                    g.find(".evblock").fill(evselectcol)
                } else {
                    g.find(".evblock").fill(evnonselcol)
                }
            }
            var j = actlayer.find(".action");
            for (var h = 0; h < j.length; h++) {
                var g = j[h];
                g.find(".actblock").fill(actnonselcol)
            }
            actlayer.draw()
        } else {
            mousedown_action = false
        }
        if (castmode == true) {
            playActionEvent()
        }
    });
    return a
}

function actpropLimits(c) {
    var a = $("#actionpane").width();
    var b = $("#actionpane").height();
    switch (c) {
        case "x":
            return {
                min: 0,
                max: a,
                step: 5
            };
            break;
        case "y":
            return {
                min: 0,
                max: b,
                step: 5
            };
            break;
        case "width":
            return {
                min: 0,
                max: a,
                step: 5
            };
            break;
        case "height":
            return {
                min: 0,
                max: b,
                step: 5
            };
            break;
        case "radius":
            return {
                min: 0,
                max: b / 2,
                step: 5
            };
            break;
        case "cornerRadius":
            return {
                min: 0,
                max: 100,
                step: 1
            };
            break;
        case "innerRadius":
            return {
                min: 0,
                max: b / 2,
                step: 5
            };
            break;
        case "outerRadius":
            return {
                min: 0,
                max: b / 2,
                step: 5
            };
            break;
        case "opacity":
            return {
                min: 0,
                max: 1,
                step: 0.1
            };
            break;
        case "lineLength":
            return {
                min: 1,
                max: Math.sqrt(a * a + b * b),
                step: 5
            };
            break;
        case "scaleSize":
            return {
                min: 0.1,
                max: 10,
                step: 0.1
            };
            break;
        case "strokeWidth":
            return {
                min: 0.1,
                max: 10,
                step: 0.1
            };
            break;
        case "sides":
            return {
                min: 3,
                max: 30,
                step: 1
            };
            break;
        case "arrowWidth":
            return {
                min: 1,
                max: 100,
                step: 2
            };
            break;
        case "arrowheadWidth":
            return {
                min: 1,
                max: 100,
                step: 2
            };
            break;
        case "arrowheadLength":
            return {
                min: 1,
                max: 100,
                step: 2
            };
            break;
        case "midX":
            return {
                min: -a,
                max: a,
                step: 5
            };
            break;
        case "midY":
            return {
                min: -b,
                max: b,
                step: 5
            };
            break;
        case "endX":
            return {
                min: -a,
                max: a,
                step: 5
            };
            break;
        case "endY":
            return {
                min: -b,
                max: b,
                step: 5
            };
            break;
        case "rotation":
            return {
                min: -180,
                max: 180,
                step: 1
            };
            break;
        case "fontSize":
            return {
                min: 6,
                max: 200,
                step: 2
            };
            break;
        case "duration":
            return {
                min: 0.1,
                max: 10,
                step: 0.1
            };
            break;
        case "starttime":
            return {
                min: 0.1,
                max: 10,
                step: 0.1
            };
            break;
        default:
            return {
                min: 0,
                max: 1,
                step: 0.1
            };
            break
    }
}

function actcolorPropValue(c) {
    var b = Object.keys(c)[0];
    var a = c[b];
    $("#prop" + b).val(a);
    c[b] = checkInput(a);
    updateAction(c)
}

function actsliderPropValue(d) {
    var c = Object.keys(d)[0];
    var b = d[c];
    var a = parseFloat(b);
    if ((a % 1) == 0) {
        $("#prop" + c).val(a.toFixed(0))
    } else {
        $("#prop" + c).val(a.toFixed(2))
    }
    d[c] = checkInput(b);
    updateAction(d)
}

function actnudgePropValue(h) {
    var g = Object.keys(h)[0];
    var c = actpropLimits(g);
    var e = c.min;
    var b = c.max;
    var f = h[g];
    var d = $("#prop" + g).val();
    var a = parseFloat(d) + parseFloat(f);
    if (a < e) {
        a = e
    }
    if (a > b) {
        a = b
    }
    if ((a % 1) == 0) {
        $("#prop" + g).val(a.toFixed(0))
    } else {
        $("#prop" + g).val(a.toFixed(2))
    }
    h[g] = checkInput(a);
    updateAction(h)
}

function acteditboxPropValue(g) {
    var f = Object.keys(g)[0];
    var e = g[f];
    var c = parseFloat(e);
    var b = actpropLimits(f);
    var d = b.min;
    var a = b.max;
    if (c < d) {
        c = d
    }
    if (c > a) {
        c = a
    }
    if ((c % 1) == 0) {
        $("#prop" + f).val(c.toFixed(0))
    } else {
        $("#prop" + f).val(c.toFixed(2))
    }
    e = c.toString();
    g[f] = checkInput(e);
    updateAction(g)
}

function updateAction(e) {
    var c = activeactobj.getAttr("state");
    for (var d in e) {
        var a = e[d];
        c[d] = a;
        if (d == "descriptor") {
            switch (activeactobj.name()) {
                case "action":
                    activeactobj.find(".actname").text(a);
                    break;
                case "eventgroup":
                    activeactobj.find(".evname").text(a);
                    break
            }
        }
        if (d == "x" || d == "y") {
            activeactobj.setAttr(d, a)
        }
    }
    if (activeactobj.name() == "action") {
        var b = activeactobj.getAttr("action");
        b.startstate = c.startstate;
        b.endstate = c.endstate;
        b.starttime = c.starttime;
        b.animDuration = c.duration
    }
    activeactobj.setAttr("state", c);
    actlayer.draw()
}

function setPropVal(d) {
    var a = Object.keys(d)[0];
    var c = activeactobj.getAttr("action");
    var b = activeactobj.getAttr("state");
    switch (a) {
        case "startstate":
            c.setStart();
            break;
        case "endstate":
            c.setEnd();
            break
    }
    b[a] = c[a];
    $("#prop" + a).text(JSON.stringify(b[a]))
}

function showActionPropDisp() {
    $("#proptable").empty();
    var b = activeactobj.getAttr("state");
    for (var h in b) {
        var j = b[h];
        if (h == "actiontype" || h == "property" || h == "parentobjectid") {
            if (h == "parentobjectid") {
                var f = layer.find("#" + j)[0];
                $("#proptable").append('<tr><td class="tablekey">parentobject</td><td colspan="2" class="tableval" style="text-align:left">' + f.name() + "</td></tr>")
            } else {
                if (j.length < tbltxtoverflow) {
                    $("#proptable").append('<tr><td class="tablekey">' + h + '</td><td colspan="2" class="tableval" style="text-align:left">' + j + "</td></tr>")
                } else {
                    $("#proptable").append('<tr><td class="tablekey">' + h + '</td><td colspan="2" class="tableval" style="text-align:left">' + j.substr(0, tbltxtoverflow) + "</td></tr>");
                    $("#proptable").append('<tr><td class="tablekey"></td><td colspan="2" class="tableval" style="text-align:left">' + j.substr(tbltxtoverflow) + "</td></tr>")
                }
            }
        } else {
            if (h != "id" && h != "index" && h != "x" && h != "y" && h != "parentid" && h != "name") {
                switch (typeof j) {
                    case "string":
                        if (h == "fill" || h == "stroke") {
                            if (j.length != 7 && j.slice(0, 1) != "#") {
                                j = "#000000"
                            }
                            $("#proptable").append('<tr><td class="tablekey">' + h + '</td><td class="tableval"><input id="prop' + h + '" type="text" style="text-align:left" size="7" onchange="updateAction({' + h + ':this.value})"></td><td class="tablegui"><input class="tablegui" type="color" value="' + j + '" onchange="actcolorPropValue({' + h + ':this.value})"></td></tr>');
                            $("#prop" + h).val(j)
                        } else {
                            $("#proptable").append('<tr><td class="tablekey">' + h + '</td><td class="tableval"><input id="prop' + h + '" type="text" style="text-align:left" size="12" onchange="updateAction({' + h + ':this.value})"></td><td class="tablegui"></td></tr>');
                            $("#prop" + h).val(j)
                        }
                        break;
                    case "boolean":
                        $("#proptable").append('<tr><td class="tablekey">' + h + '</td><td class="tableval"><input id="prop' + h + '" type="checkbox" onchange="updateAction({' + h + ':this.checked})"></td></tr>');
                        $("#prop" + h).prop("checked", j);
                        break;
                    case "number":
                        var a = actpropLimits(h);
                        var g = a.min;
                        var i = a.max;
                        var d = a.step;
                        $("#proptable").append('<tr><td class="tablekey">' + h + '</td><td class="tableval"><input id="prop' + h + '" type="text" style="text-align:right" size="7" onchange="acteditboxPropValue({' + h + ':this.value})"></td><td class="guirow"><button class="tablenudge" onclick="actnudgePropValue({' + h + ":-" + d.toString() + '})">-</button><input class="tablegui" type="range" min="' + g.toString() + '" max="' + i.toString() + '" step="' + d.toString() + '" value="' + j + '" onchange="actsliderPropValue({' + h + ':this.value})"><button class="tablenudge" onclick="actnudgePropValue({' + h + ":" + d.toString() + '})">+</button></td></tr>');
                        var e = parseFloat(j);
                        if ((e % 1) == 0) {
                            $("#prop" + h).val(e.toFixed(0))
                        } else {
                            $("#prop" + h).val(e.toFixed(2))
                        }
                        break;
                    case "object":
                        if (h == "startstate" || h == "endstate") {
                            $("#proptable").append('<tr><td class="tablekey">' + h + '</td><td class="tableval" style="text-align:left" id="prop' + h + '"></td><td><button class="tablebutton" onclick="setPropVal({' + h + ':0})">set value</button></td></tr>');
                            var c = JSON.stringify(j);
                            $("#prop" + h).text(c)
                        }
                        break
                }
            }
        }
    }
}
var USEIO = true;
var screenstage = null;
var screenlayer = null;
var sw, sh;
var ioqueue = [];
var serverurl = "http://" + window.location.hostname + ":" + window.location.port;
var screenanimlist = new Array();
var screenscaling = 1;

function initScreen() {
    var a = $(window).width();
    var b = $(window).height();
    $("#container").css({
        height: Math.round(1 * b).toString() + "px"
    });
    $("#container").css({
        width: Math.round(1 * a).toString() + "px"
    });
    sw = $("#container").width();
    sh = $("#container").height();
    screenstage = new Kinetic.Stage({
        container: "container",
        width: sw,
        height: sh
    });
    screenlayer = new Kinetic.Layer({
        name: "screenlayer"
    });
    screenstage.on("setupdone", function() {
        processNextio("setupdone")
    });
    screenstage.on("startdone", function() {
        processNextio("startdone")
    });
    screenstage.on("playdone", function() {
        processNextio("playdone")
    });
    addLayerAnimation(screenlayer);
    screenstage.add(screenlayer)
}

function addLayerAnimation(b) {
    var a = new Kinetic.Animation(function(g) {
        var c = true;
        for (var d = 0; d < screenanimlist.length; d++) {
            var e = screenanimlist[d];
            var h = e.interpolateProp(g);
            var f = e.parentobject;
            f.setAttr(e.property, h);
            if ((g.time - e.starttime * 1000) > e.animDuration * 1000) {
                c = c && true
            } else {
                c = c && false
            }
        }
        if (c == true) {
            this.stop();
            g.time = 0;
            screenstage.fire("playdone")
        }
    }, b);
    b.setAttr("animation", a)
}

function makeScreen(a) {
    screenstage.clear();
    screenlayer.destroyChildren();
    a.container = "container";
    var q = a.screenheight / a.screenwidth;
    var u = sh;
    var i = sw;
    var j = u / i;
    if (j > q) {
        var g = i;
        var s = Math.round(i * q);
        screenscaling = a.txscale * i / a.screenwidth
    } else {
        var s = u;
        var g = Math.round(u / q);
        screenscaling = u / a.screenheight;
        screenscaling = a.txscale * u / a.screenheight
    }
    var b = a.layerchildren;
    for (var p = 0; p < b.length; p++) {
        var c = b[p];
        if (c.type == "Group") {
            var e = newgroupobj(false, false, c);
            e.x(c.x * screenscaling);
            e.y(c.y * screenscaling);
            e.scale({
                x: screenscaling,
                y: screenscaling
            });
            screenlayer.add(e)
        } else {
            var e = newobj(false, c);
            e.x(c.x * screenscaling);
            e.y(c.y * screenscaling);
            e.scale({
                x: screenscaling,
                y: screenscaling
            });
            screenlayer.add(e)
        }
    }
    var d = a.layeractions;
    var r = new Array();
    for (var l = 0; l < d.length; l++) {
        var f = d[l];
        var h = screenlayer.find("#" + f.parentobjectid)[0];
        f.parentobject = h;
        if (f.actiontype == "move") {
            var n = f.startstate;
            var t = f.endstate;
            f.startstate = {
                x: n.x * screenscaling,
                y: n.y * screenscaling
            };
            f.endstate = {
                x: t.x * screenscaling,
                y: t.y * screenscaling
            }
        }
        var o = new Action(f.parentobject, f.id, f.actiontype, f.startstate, f.endstate, f.starttime, f.duration);
        r.push(o)
    }
    screenlayer.setAttr("actionlist", r);
    screenlayer.draw();
    screenstage.fire("setupdone")
}

function findObjActions(d) {
    var c = [];
    var e = screenlayer.getAttr("actionlist");
    for (var a = 0; a < e.length; a++) {
        var b = e[a];
        if (d.id() == b.parentobject.id()) {
            c.push(b)
        }
    }
    return c
}

function setObjstoStartstate() {
    var h = screenlayer.getChildren();
    for (var a = 0; a < h.length; a++) {
        var g = h[a];
        var o = findObjActions(g);
        var q = {};
        for (var l = 0; l < o.length; l++) {
            var k = o[l].actiontype;
            var d = q[k];
            if (d == null) {
                q[k] = [o[l]]
            } else {
                d.push(o[l])
            }
        }
        var p = [];
        for (var n in q) {
            var m = q[n];
            var f = 10000;
            for (var e = 0; e < m.length; e++) {
                if (m[e].starttime < f) {
                    f = m[e].starttime;
                    var b = e
                }
            }(m[b]).settoStartstate();
            p.push(m[b])
        }
        if (p.length > 0) {
            var f = 10000;
            for (var c = 0; c < p.length; c++) {
                if (p[c].starttime < f) {
                    f = p[c].starttime;
                    var b = c
                }
            }(p[b]).settoStartstate();
            screenlayer.draw()
        }
    }
    screenstage.fire("startdone")
}

function play() {
    screenanimlist = screenlayer.getAttr("actionlist");
    var a = screenlayer.getAttr("animation");
    screenlayer.draw();
    a.start()
}

function selectLayer(a) {
    screenstage.clear();
    screenlayer = screenstage.find("." + a)[0];
    screenlayer.draw()
}

function ioUpdate(b) {
    var d = JSON.parse(b);
    var c = d.command;
    switch (c) {
        case "update":
            var a = d.info;
            makeScreen(a);
            break;
        case "start":
            setObjstoStartstate();
            break;
        case "play":
            play();
            break
    }
}

function processNextio(a) {
    if (ioqueue.length > 0) {
        var b = ioqueue.shift();
        ioUpdate(b)
    }
}
$(document).ready(function() {
    initScreen();
    if (USEIO) {
        var a = io(serverurl);
        a.on(socketmessage, function(b) {
            if (ioqueue.length == 0) {
                ioqueue.push(b);
                processNextio("incoming")
            } else {
                ioqueue.push(b)
            }
        })
    }
});