
var objSelector = null;
var cursorstate = "free";
var scsz = 1;

function getCentroid(j) {
    var h = (j.length / 2);
    var d = new Array();
    var a = new Array();
    for (var f = 0; f < h; f++) {
        d.push(j[2 * f]);
        a.push(j[2 * f + 1])
    }
    d.push(j[0]);
    a.push(j[1]);
    var b = 0;
    for (var c = 0; c < h; c++) {
        b = b + (d[c] * a[c + 1] - d[c + 1] * a[c])
    }
    b = 0.5 * b;
    var g = 0;
    var e = 0;
    for (var c = 0; c < h; c++) {
        g = g + (d[c] + d[c + 1]) * (d[c] * a[c + 1] - d[c + 1] * a[c]);
        e = e + (a[c] + a[c + 1]) * (d[c] * a[c + 1] - d[c + 1] * a[c])
    }
    g = g / (6 * b);
    e = e / (6 * b);
    return {
        Area: b,
        CentroidX: g,
        CentroidY: e
    }
}

function updateAnchor(r, g) {
    var p = r.getParent();
    var x = r.x();
    var v = r.y();
    var n = p.getChildren().toArray();
    for (var K = 0; K < n.length; K++) {
        n[K].fill("#ddd");
        n[K].stroke("#666")
    }
    r.fill("#00ff55");
    r.stroke("#00ff55");
    var e = p.find(".anchor0")[0];
    var c = p.find(".anchor1")[0];
    if (g != null) {
        var P = g.getAttr("state");
        switch (P.type) {
            case "Ring":
                var s = g.getAttr("innerRadius");
                var l = g.getAttr("outerRadius");
                var J = g.x();
                var m = g.y();
                switch (r.name()) {
                    case "anchor0":
                        var B = x - J;
                        var L = v - m;
                        s = Math.round(Math.sqrt(B * B + L * L));
                        break;
                    case "anchor1":
                        var B = x - J;
                        var L = v - m;
                        l = Math.round(Math.sqrt(B * B + L * L));
                        break
                }
                updateState(g, {
                    innerRadius: s,
                    outerRadius: l
                });
                updatePropDisp();
                break;
            case "Star":
                var s = g.getAttr("innerRadius");
                var l = g.getAttr("outerRadius");
                var J = g.x();
                var m = g.y();
                switch (r.name()) {
                    case "anchor0":
                        var B = x - J;
                        var L = v - m;
                        s = Math.round(Math.sqrt(B * B + L * L));
                        updateState(g, {
                            innerRadius: s
                        });
                        break;
                    case "anchor1":
                        var B = x - J;
                        var L = v - m;
                        l = Math.round(Math.sqrt(B * B + L * L));
                        var u = (180 / Math.PI) * Math.atan2(B, -L);
                        updateState(g, {
                            rotation: u,
                            outerRadius: l
                        });
                        break
                }
                updatePropDisp();
                break;
            case "RegularPolygon":
                var D = g.getAttr("radius");
                switch (r.name()) {
                    case "anchor0":
                        g.x(x);
                        g.y(v);
                        var J = g.x();
                        var m = g.y();
                        updateState(g, {
                            x: J,
                            y: m
                        });
                        break;
                    case "anchor1":
                        var B = x - e.x();
                        var L = v - e.y();
                        D = Math.round(Math.sqrt(B * B + L * L));
                        var u = (180 / Math.PI) * Math.atan2(B, -L);
                        updateState(g, {
                            radius: D,
                            rotation: u
                        });
                        break
                }
                updatePropDisp();
                break;
            case "Text":
                switch (r.name()) {
                    case "anchor0":
                        g.setPosition(e.getPosition());
                        var J = g.x();
                        var m = g.y();
                        updateState(g, {
                            x: J,
                            y: m
                        });
                        break;
                    case "anchor1":
                        var B = x - e.x();
                        var L = v - e.y();
                        var N = Math.atan2(g.height(), g.width());
                        var I = (180 / Math.PI) * (Math.atan2(L, B) - N);
                        updateState(g, {
                            rotation: I
                        });
                        break
                }
                updatePropDisp();
                break;
            case "Line":
                switch (r.name()) {
                    case "anchor0":
                        var B = c.x() - x;
                        var L = c.y() - v;
                        break;
                    case "anchor1":
                        var B = x - e.x();
                        var L = v - e.y();
                        break
                }
                g.setPosition(e.getPosition());
                var J = g.x();
                var m = g.y();
                var t = Math.round(Math.sqrt(B * B + L * L));
                var u = (180 / Math.PI) * Math.atan2(L, B);
                updateState(g, {
                    x: J,
                    y: m,
                    lineLength: t,
                    rotation: u
                });
                updatePropDisp();
                break;
            case "PolyLine":
                if (r != e) {
                    var B = x - e.x();
                    var L = v - e.y();
                    var t = (Math.round(Math.sqrt(B * B + L * L))) / P.scaleSize;
                    var C = (Math.PI / 180) * g.rotation();
                    var j = Math.atan2(L, B);
                    var O = P.points;
                    O[r.id() * 2] = t * Math.cos(j - C);
                    O[r.id() * 2 + 1] = t * Math.sin(j - C);
                    g.points(O);
                    updateState(g, {
                        points: O,
                        scaleSize: P.scaleSize
                    });
                    updatePropDisp()
                } else {
                    g.setPosition(r.getPosition());
                    var J = g.x();
                    var m = g.y();
                    updateState(g, {
                        x: J,
                        y: m
                    });
                    updatePropDisp()
                }
                break;
            case "Figure":
                switch (r.name()) {
                    case "anchor0":
                        g.setPosition(e.getPosition());
                        var J = g.x();
                        var m = g.y();
                        updateState(g, {
                            x: J,
                            y: m
                        });
                        break;
                    case "anchor1":
                        var B = x - e.x();
                        var L = v - e.y();
                        var t = Math.round(Math.sqrt(B * B + L * L));
                        var u = (180 / Math.PI) * Math.atan2(-B, L);
                        var b = t / scsz;
                        updateState(g, {
                            scaleSize: b,
                            rotation: u
                        });
                        break
                }
                updatePropDisp();
                break;
            case "CurvedArrow":
                var J = g.x();
                var m = g.y();
                var C = (g.getAttr("rotation")) * Math.PI / 180;
                switch (r.name()) {
                    case "anchor0":
                        var G = Math.sqrt((x - J) * (x - J) + (v - m) * (v - m));
                        var q = Math.atan2((v - m), (x - J));
                        var z = G * Math.cos(q - C);
                        var y = G * Math.sin(q - C);
                        updateState(g, {
                            midX: z,
                            midY: y
                        });
                        updatePropDisp();
                        break;
                    case "anchor1":
                        var k = Math.sqrt((x - J) * (x - J) + (v - m) * (v - m));
                        var j = Math.atan2((v - m), (x - J));
                        var F = k * Math.cos(j - C);
                        var E = k * Math.sin(j - C);
                        updateState(g, {
                            endX: F,
                            endY: E
                        });
                        updatePropDisp();
                        break
                }
                break;
            case "Group":
                switch (r.name()) {
                    case "anchor0":
                        var B = x - c.x();
                        var L = v - c.y();
                        g.setPosition(e.getPosition());
                        var f = Math.atan2(L, B);
                        var C = (g.getAttr("rotation")) * Math.PI / 180;
                        var M = Math.abs(Math.round(Math.sqrt(B * B + L * L) * Math.cos(f - C)));
                        var H = Math.abs(Math.round(Math.sqrt(B * B + L * L) * Math.sin(f - C)));
                        var J = g.x();
                        var m = g.y();
                        updateGroupState(g, {
                            x: J,
                            y: m,
                            width: M,
                            height: H
                        });
                        break;
                    case "anchor1":
                        var B = x - e.x();
                        var L = v - e.y();
                        var N = Math.atan2(g.height(), g.width());
                        var I = (180 / Math.PI) * (Math.atan2(L, B) - N);
                        updateState(g, {
                            rotation: I
                        });
                        break
                }
                updatePropDisp();
                break;
            default:
                switch (r.name()) {
                    case "anchor0":
                        var B = x - c.x();
                        var L = v - c.y();
                        if (P.type == "Ellipse") {
                            var o = Math.round((e.x() + c.x()) / 2);
                            var A = Math.round((e.y() + c.y()) / 2);
                            g.x(o);
                            g.y(A)
                        } else {
                            g.setPosition(e.getPosition())
                        }
                        var f = Math.atan2(L, B);
                        var C = (g.getAttr("rotation")) * Math.PI / 180;
                        var a = Math.abs(Math.round(Math.sqrt(B * B + L * L) * Math.cos(f - C)));
                        var d = Math.abs(Math.round(Math.sqrt(B * B + L * L) * Math.sin(f - C)));
                        var J = g.x();
                        var m = g.y();
                        updateState(g, {
                            x: J,
                            y: m,
                            width: a,
                            height: d
                        });
                        break;
                    case "anchor1":
                        var B = x - e.x();
                        var L = v - e.y();
                        var N = Math.atan2(g.height(), g.width());
                        var I = (180 / Math.PI) * (Math.atan2(L, B) - N);
                        updateState(g, {
                            rotation: I
                        });
                        break
                }
                updatePropDisp();
                break
        }
    }
}

function addAnchor(d, a, f, c, e) {
    var b = new Kinetic.Circle({
        x: a,
        y: f,
        stroke: "#666",
        fill: "#ddd",
        strokeWidth: 2,
        radius: 3,
        name: c,
        id: e,
        draggable: true,
        dragOnTop: false
    });
    b.on("dragmove", function() {
        var g = this.getLayer();
        updateAnchor(this, d.selectedObj);
        g.draw()
    });
    b.on("mousedown touchstart", function() {
        d.objSelGroup.setDraggable(false);
        this.moveToTop()
    });
    b.on("dragend", function() {
        var g = this.getLayer();
        d.objSelGroup.setDraggable(true);
        g.draw()
    });
    b.on("mouseover", function() {
        var g = this.getLayer();
        document.body.style.cursor = "pointer";
        this.setStrokeWidth(4);
        g.draw();
        cursorstate = "onobj"
    });
    b.on("mouseout", function() {
        var g = this.getLayer();
        document.body.style.cursor = "default";
        this.strokeWidth(2);
        g.draw();
        cursorstate = "free"
    });
    d.objSelGroup.add(b)
}

function objectSelector() {
    this.selectedObj = null;
    this.objSelGroup = new Kinetic.Group({
        name: "Selector",
        draggable: true,
        visible: false
    });
    this.objSelGroup.on("dragstart", function() {
        this.moveToTop()
    });
    this.drawSelector = b;
    this.deleteOldSelector = a;

    function a() {
        var c = this.objSelGroup;
        c.remove();
        if (this.selectedObj != null) {
            c.visible(false);
            this.selectedObj.getLayer().draw();
            this.selectedObj = null
        }
    }

    function b(c) {
        var m = this.objSelGroup;
        var L = c.getLayer();
        var g = c.getAttr("state");
        var G = m.getChildren().toArray().length;
        switch (g.type) {
            case "PolyLine":
                var z = g.points;
                var D = G;
                while (D < z.length / 2) {
                    addAnchor(this, A * 10, A * 10, "anchor" + D.toString(), D);
                    D++
                }
                while (D > z.length / 2) {
                    var N = m.find(".anchor" + (D - 1).toString())[0];
                    N.destroy();
                    D--
                }
                break;
            default:
                if (G == 0) {
                    addAnchor(this, 0, 0, "anchor0", 0);
                    addAnchor(this, 50, 50, "anchor1", 1)
                }
                if (G > 2) {
                    for (var A = 2; A < G; A++) {
                        var N = m.find(".anchor" + A.toString())[0];
                        N.destroy()
                    }
                }
                break
        }
        var M = m.find(".anchor0")[0];
        var K = m.find(".anchor1")[0];
        var J = (c.getAttr("rotation")) * Math.PI / 180;
        switch (g.type) {
            case "Ring":
                var H = c.getAttr("innerRadius");
                var f = c.getAttr("outerRadius");
                var F = Math.PI / 2;
                M.x(c.x());
                M.y(c.y() - H);
                K.x(c.x());
                K.y(c.y() - f);
                break;
            case "Star":
                var H = c.getAttr("innerRadius");
                var f = c.getAttr("outerRadius");
                var F = Math.PI / 2;
                M.x(Math.round(c.x() + (H * Math.cos(F - J))));
                M.y(Math.round(c.y() - (H * Math.sin(F - J))));
                K.x(Math.round(c.x() + (f * Math.cos(F - J))));
                K.y(Math.round(c.y() - (f * Math.sin(F - J))));
                break;
            case "RegularPolygon":
                var s = c.getAttr("radius");
                var F = Math.PI / 2;
                M.x(c.x());
                M.y(c.y());
                K.x(Math.round(c.x() + (s * Math.cos(F - J))));
                K.y(Math.round(c.y() - (s * Math.sin(F - J))));
                break;
            case "Line":
                var p = g.lineLength;
                M.x(c.x());
                M.y(c.y());
                K.x(Math.round(c.x() + (p * Math.cos(J))));
                K.y(Math.round(c.y() + (p * Math.sin(J))));
                break;
            case "PolyLine":
                var z = c.points();
                var d = z.length;
                var x = z[0];
                var v = z[1];
                M.x(c.x() + x);
                M.y(c.y() + v);
                for (var A = 1; A < d / 2; A++) {
                    var j = m.find("#" + A.toString())[0];
                    var r = z[A * 2];
                    var o = z[A * 2 + 1];
                    var e = Math.atan2((o - v), (r - x));
                    var t = Math.sqrt((r - x) * (r - x) + (o - v) * (o - v));
                    j.x(Math.round(c.x() + (t * Math.cos(e + J))));
                    j.y(Math.round(c.y() + (t * Math.sin(e + J))))
                }
                break;
            case "CurvedArrow":
                var u = Math.sqrt((g.midX) * (g.midX) + (g.midY) * (g.midY));
                var I = Math.sqrt((g.endX) * (g.endX) + (g.endY) * (g.endY));
                var l = Math.atan2((g.midY), (g.midX));
                var e = Math.atan2((g.endY), (g.endX));
                M.x(Math.round(c.x() + (u * Math.cos(l + J))));
                M.y(Math.round(c.y() + (u * Math.sin(l + J))));
                K.x(Math.round(c.x() + (I * Math.cos(e + J))));
                K.y(Math.round(c.y() + (I * Math.sin(e + J))));
                break;
            case "Figure":
                var z = c.points();
                var E = (c.getAttr("state")).points;
                var q = getCentroid(z);
                var k = getCentroid(E);
                var y = Math.sqrt(q.CentroidX * q.CentroidX + q.CentroidY * q.CentroidY);
                scsz = Math.sqrt(k.CentroidX * k.CentroidX + k.CentroidY * k.CentroidY);
                M.x(c.x());
                M.y(c.y());
                K.x(c.x() - y * Math.sin(J));
                K.y(c.y() + y * Math.cos(J));
                break;
            case "Group":
                var B = c.scaleY() * c.height();
                var n = c.scaleX() * c.width();
                var C = Math.sqrt((B * B) + (n * n));
                var F = Math.atan2(B, n);
                M.x(c.x());
                M.y(c.y());
                K.x(Math.round(c.x() + (C * Math.cos(F + J))));
                K.y(Math.round(c.y() + (C * Math.sin(F + J))));
                break;
            default:
                var B = c.height();
                var n = c.width();
                if (c.getClassName() == "Ellipse") {
                    var s = Math.sqrt((B * B) / 4 + (n * n) / 4);
                    var F = Math.atan2(B, n);
                    M.x(Math.round(c.x() + (s * Math.cos(Math.PI - F - J))));
                    M.y(Math.round(c.y() - (s * Math.sin(Math.PI - F - J))));
                    K.x(Math.round(c.x() + (s * Math.cos(F + J))));
                    K.y(Math.round(c.y() + (s * Math.sin(F + J))))
                } else {
                    var C = Math.sqrt((B * B) + (n * n));
                    var F = Math.atan2(B, n);
                    M.x(c.x());
                    M.y(c.y());
                    K.x(Math.round(c.x() + (C * Math.cos(F + J))));
                    K.y(Math.round(c.y() + (C * Math.sin(F + J))))
                }
                break
        }
        m.moveTo(L);
        m.moveToTop();
        this.selectedObj = c;
        m.visible(true);
        L.draw()
    }
}
var tbltxtoverflow = 35;

function checkInput(b) {
    if (isNaN(b)) {
        return b
    } else {
        var a = parseFloat(b);
        if ((a % 1) == 0) {
            return parseInt(b)
        } else {
            return a
        }
    }
}

function propLimits(c) {
    var a = $("#designspace").width();
    var b = $("#designspace").height();
    switch (c) {
        case "x":
            return {
                min: 1,
                max: a,
                step: 5
            };
            break;
        case "y":
            return {
                min: 1,
                max: b,
                step: 5
            };
            break;
        case "screenwidth":
            return {
                min: 1,
                max: 4096,
                step: 1
            };
            break;
        case "screenheight":
            return {
                min: 1,
                max: 4096,
                step: 1
            };
            break;
        case "width":
            return {
                min: 1,
                max: a,
                step: 5
            };
            break;
        case "height":
            return {
                min: 1,
                max: b,
                step: 5
            };
            break;
        case "radius":
            return {
                min: 1,
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
                min: 1,
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
        case "numPoints":
            return {
                min: 3,
                max: 30,
                step: 1
            };
            break;
        case "vertices":
            return {
                min: 3,
                max: 30,
                step: 1
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
        default:
            return {
                min: 0,
                max: 1,
                step: 0.1
            };
            break
    }
}

function colorPropValue(c) {
    var b = Object.keys(c)[0];
    var a = c[b];
    $("#prop" + b).val(a);
    c[b] = checkInput(a);
    changeCallback(c)
}

function sliderPropValue(d) {
    var c = Object.keys(d)[0];
    var b = d[c];
    var a = parseFloat(b);
    if ((a % 1) == 0) {
        $("#prop" + c).val(a.toFixed(0))
    } else {
        $("#prop" + c).val(a.toFixed(2))
    }
    d[c] = checkInput(b);
    changeCallback(d)
}

function nudgePropValue(h) {
    var g = Object.keys(h)[0];
    var c = propLimits(g);
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
    changeCallback(h)
}

function editboxPropValue(g) {
    var f = Object.keys(g)[0];
    var e = g[f];
    var c = parseFloat(e);
    var b = propLimits(f);
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
    changeCallback(g)
}

function updatePropDisp() {
    if (activeobject != null) {
        var h = activeobject.getAttr("state")
    } else {
        var h = designgroup
    }
    $("#proptable").empty();
    for (var f in h) {
        if (f != "points" && f != "children" && f != "container" && f != "id" && f != "txscale" && f != "startstate") {
            var e = h[f];
            if (f == "path" || f == "type") {
                if (e.length < tbltxtoverflow) {
                    $("#proptable").append('<tr><td class="tablekey">' + f + '</td><td colspan="2" class="tableval" style="text-align:left">' + e + "</td></tr>")
                } else {
                    $("#proptable").append('<tr><td class="tablekey">' + f + '</td><td colspan="2" class="tableval" style="text-align:left">' + e.substr(0, tbltxtoverflow) + "</td></tr>");
                    $("#proptable").append('<tr><td class="tablekey"></td><td colspan="2" class="tableval" style="text-align:left">' + e.substr(tbltxtoverflow) + "</td></tr>")
                }
            } else {
                switch (typeof e) {
                    case "string":
                        if (f == "fill" || f == "stroke") {
                            if (e.length != 7 && e.slice(0, 1) != "#") {
                                e = "#000000"
                            }
                            $("#proptable").append('<tr><td class="tablekey">' + f + '</td><td class="tableval"><input id="prop' + f + '" type="text" style="text-align:left" size="7" onchange="changeCallback({' + f + ':this.value})"></td><td class="tablegui"><input class="tablegui" type="color" value="' + e + '" onchange="colorPropValue({' + f + ':this.value})"></td></tr>');
                            $("#prop" + f).val(e)
                        } else {
                            $("#proptable").append('<tr><td class="tablekey">' + f + '</td><td class="tableval"><input id="prop' + f + '" type="text" style="text-align:left" size="7" onchange="changeCallback({' + f + ':this.value})"></td><td class="tablegui"></td></tr>');
                            $("#prop" + f).val(e)
                        }
                        break;
                    case "boolean":
                        $("#proptable").append('<tr><td class="tablekey">' + f + '</td><td class="tableval"><input id="prop' + f + '" type="checkbox" onchange="changeCallback({' + f + ':this.checked})"></td></tr>');
                        $("#prop" + f).prop("checked", e);
                        break;
                    case "number":
                        var c = propLimits(f);
                        var d = c.min;
                        var b = c.max;
                        var g = c.step;
                        $("#proptable").append('<tr><td class="tablekey">' + f + '</td><td class="tableval"><input id="prop' + f + '" type="text" style="text-align:right" size="7" onchange="editboxPropValue({' + f + ':this.value})"></td><td class="guirow"><button class="tablenudge" onclick="nudgePropValue({' + f + ":-" + g.toString() + '})">-</button><input class="tablegui" type="range" min="' + d.toString() + '" max="' + b.toString() + '" step="' + g.toString() + '" value="' + e + '" onchange="sliderPropValue({' + f + ':this.value})"><button class="tablenudge" onclick="nudgePropValue({' + f + ":" + g.toString() + '})">+</button></td></tr>');
                        var a = parseFloat(e);
                        if ((a % 1) == 0) {
                            $("#prop" + f).val(a.toFixed(0))
                        } else {
                            $("#prop" + f).val(a.toFixed(2))
                        }
                        break
                }
            }
        }
    }
}

function updateMultiplePropDisp() {
    var h = {};
    var c = [];
    for (var p = 0; p < selectedObjlist.length; p++) {
        var m = selectedObjlist[p];
        var d = m.getAttr("state");
        var o = Object.keys(d);
        c.push(o)
    }
    if (c.length > 0) {
        var t = ["visible", "opacity", "stroke", "fill"];
        for (var r = 0; r < t.length; r++) {
            var b = t[r];
            var e = 1;
            var q = 1;
            while (q < c.length && e == 1) {
                objjkeys = c[q];
                var k = 0;
                var l = 0;
                while (k == false && l < objjkeys.length) {
                    if (b == objjkeys[l]) {
                        k = 1
                    }
                    l = l + 1
                }
                e = e * k;
                q = q + 1
            }
            if (e == 1) {
                h[b] = d[b]
            }
        }
        $("#proptable").empty();
        for (var v in h) {
            if (v != "points" && v != "children" && v != "container" && v != "id" && v != "txscale" && v != "name" && v != "x" && v != "y") {
                var u = h[v];
                if (v == "path" || v == "type") {
                    if (u.length < tbltxtoverflow) {
                        $("#proptable").append('<tr><td class="tablekey">' + v + '</td><td colspan="2" class="tableval" style="text-align:left">' + u + "</td></tr>")
                    } else {
                        $("#proptable").append('<tr><td class="tablekey">' + v + '</td><td colspan="2" class="tableval" style="text-align:left">' + u.substr(0, tbltxtoverflow) + "</td></tr>");
                        $("#proptable").append('<tr><td class="tablekey"></td><td colspan="2" class="tableval" style="text-align:left">' + u.substr(tbltxtoverflow) + "</td></tr>")
                    }
                } else {
                    switch (typeof u) {
                        case "string":
                            if (v == "fill" || v == "stroke") {
                                if (u.length != 7 && u.slice(0, 1) != "#") {
                                    u = "#000000"
                                }
                                $("#proptable").append('<tr><td class="tablekey">' + v + '</td><td class="tableval"><input id="prop' + v + '" type="text" style="text-align:left" size="7" onchange="changeCallback({' + v + ':this.value})"></td><td class="tablegui"><input class="tablegui" type="color" value="' + u + '" onchange="colorPropValue({' + v + ':this.value})"></td></tr>');
                                $("#prop" + v).val(u)
                            } else {
                                $("#proptable").append('<tr><td class="tablekey">' + v + '</td><td class="tableval"><input id="prop' + v + '" type="text" style="text-align:left" size="7" onchange="changeCallback({' + v + ':this.value})"></td><td class="tablegui"></td></tr>');
                                $("#prop" + v).val(u)
                            }
                            break;
                        case "boolean":
                            $("#proptable").append('<tr><td class="tablekey">' + v + '</td><td class="tableval"><input id="prop' + v + '" type="checkbox" onchange="changeCallback({' + v + ':this.checked})"></td></tr>');
                            $("#prop" + v).prop("checked", u);
                            break;
                        case "number":
                            var g = propLimits(v);
                            var n = g.min;
                            var a = g.max;
                            var s = g.step;
                            $("#proptable").append('<tr><td class="tablekey">' + v + '</td><td class="tableval"><input id="prop' + v + '" type="text" style="text-align:right" size="7" onchange="editboxPropValue({' + v + ':this.value})"></td><td class="guirow"><button class="tablenudge" onclick="nudgePropValue({' + v + ":-" + s.toString() + '})">-</button><input class="tablegui" type="range" min="' + n.toString() + '" max="' + a.toString() + '" step="' + s.toString() + '" value="' + u + '" onchange="sliderPropValue({' + v + ':this.value})"><button class="tablenudge" onclick="nudgePropValue({' + v + ":" + s.toString() + '})">+</button></td></tr>');
                            var f = parseFloat(u);
                            if ((f % 1) == 0) {
                                $("#prop" + v).val(f.toFixed(0))
                            } else {
                                $("#prop" + v).val(f.toFixed(2))
                            }
                            break
                    }
                }
            }
        }
    }
}
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

function uploadFile() {
    var a = new FormData();
    var e = document.getElementById("fimg");
    var c = e.files;
    for (var b = 0; b < c.length; b++) {
        var d = c[b];
        a.append("imgfiles", d)
    }
    $.ajax({
        url: hostaddr + "/uploadresource",
        type: "POST",
        data: a,
        processData: false,
        contentType: false
    }).done(function() {
        loadResources()
    }).fail(function() {
        alert("error")
    }).always(function() {})
}

function loadResources() {
    $("#iconlist").empty();
    $.getJSON(hostaddr + "/getresources", function(a) {
        $.each(a, function(b, c) {
            $("<div class='resourceicon' data-filename='resources/" + c + "' onclick='setToResource(this)'><img class='resourceimg' src='resources/" + c + "'/>" + c + "</div>").appendTo("#iconlist")
        })
    })
}

function libuse() {
    var c = activelibobj.getAttr("state");
    if (c.type == "Group") {
        var b = c.children;
        for (var a = 0; a < b.length; a++) {
            var e = b[a];
            var d = newobj(true, e);
            layer.add(d)
        }
    } else {
        var d = newobj(true, c);
        layer.add(d)
    }
    layer.draw()
}

function libremove() {
    clearObjects();
    var b = confirm("Are you sure you want to remove the object?");
    if (b == true) {
        var a = activelibobj.getAttr("id");
        $.ajax({
            url: hostaddr + "/removelibobj",
            type: "GET",
            data: {
                id: a
            }
        }).done(function() {
            loadObjects("all")
        }).fail(function() {
            alert("error")
        }).always(function() {})
    }
}

function filterlib() {
    var a = document.getElementById("filtername").value;
    clearObjects();
    loadObjects(a)
}

function resetlib() {
    clearObjects();
    loadObjects("all")
}

function setToResource(c) {
    if (activeobject != null) {
        selectedresource = c.getAttribute("data-filename");
        var b = activeobject.getAttr("state");
        switch (b.type) {
            case "Image":
                var a = new Image();
                a.onload = function() {
                    var e = this.height,
                        d = this.width;
                    b.path = selectedresource;
                    b.width = d;
                    b.height = e;
                    activeobject.setAttr("state", b);
                    activeobject.getImage().src = selectedresource;
                    activeobject.width(d);
                    activeobject.height(e);
                    updateState(activeobject, {
                        path: b.path,
                        width: b.width,
                        height: b.height
                    });
                    layer.draw();
                    document.getElementById("addlibbox").style.visibility = "hidden";
                    updatePropDisp(activeobject)
                };
                a.src = selectedresource;
                break
        }
    }
}

function prepareforlib() {
    activebutton = "prepareforlib";
    var a = checknumObjects();
    if (a > 0) {
        if (a > 1) {
            activeobject = null;
            updatePropDisp();
            document.getElementById("addlibbox").style.visibility = "visible"
        } else {
            if (activeobject != null) {
                updatePropDisp();
                document.getElementById("addlibbox").style.visibility = "visible"
            }
        }
    }
}

function addLibObj() {
    document.getElementById("addlibbox").style.visibility = "hidden";
    var o = layer.find(".Selector")[0];
    if (o != null) {
        o.remove()
    }
    var k = (layer.getChildren()).toArray();
    numobj = k.length;
    if (numobj > 0) {
        if (numobj == 1) {
            var l = k[0];
            var c = l.getAttr("state");
            var g = JSON.parse(JSON.stringify(c));
            var n = getobjextents(l);
            g.x = g.x - n.minx;
            g.y = g.y - n.miny;
            var m = {
                name: g.name,
                type: g.type,
                jsonstate: JSON.stringify(g)
            }
        } else {
            var t = new Array();
            var a = 100000;
            var b = 1;
            var d = 100000;
            var f = 1;
            for (var p = 0; p < numobj; p++) {
                var l = k[p];
                var e = l.getAttr("state");
                if (e.type != "Group") {
                    var g = JSON.parse(JSON.stringify(e));
                    t.push(g);
                    var n = getobjextents(l);
                    if (n.maxx > b) {
                        b = n.maxx
                    }
                    if (n.maxy > f) {
                        f = n.maxy
                    }
                    if (n.minx < a) {
                        a = n.minx
                    }
                    if (n.miny < d) {
                        d = n.miny
                    }
                }
            }
            var j = b - a;
            var q = f - d;
            for (var p = 0; p < t.length; p++) {
                childstate = t[p];
                childstate.x = childstate.x - a;
                childstate.y = childstate.y - d;
                t[p] = childstate
            }
            var s = {
                name: designgroup.name,
                id: "none",
                type: "Group",
                x: 0,
                y: 0,
                width: j,
                height: q,
                visible: true,
                opacity: 1,
                children: t
            };
            var r = JSON.stringify(s);
            var m = {
                name: designgroup.name,
                type: designgroup.type,
                jsonstate: r
            }
        }
        $.ajax({
            url: hostaddr + "/addlibobj",
            type: "GET",
            data: {
                name: m.name,
                type: m.type,
                jsonstate: m.jsonstate
            }
        }).done(function() {
            clearObjects();
            loadObjects("all");
            objlayer.draw()
        }).fail(function() {
            alert("error")
        }).always(function() {})
    }
}

function selectObject(a) {
    var b = null;
    if (activeobject != null) {
        layer = activeobject.getLayer();
        stage = layer.getStage();
        var c = activeobject.id()
    }
}

function delObject() {
    if (activeobject != null) {
        var a = confirm("Are you sure you want to delete this object?");
        if (a == true) {
            delobj()
        }
    }
}

function updateObjState(a) {
    updateState(activeobject, a)
}

function screenSetup() {
    var f = $(window).width();
    var a = $(window).height();
    $("#mainpanel").css({
        height: Math.round(1 * a).toString() + "px"
    });
    $("#mainpanel").css({
        width: Math.round(0.7 * f).toString() + "px"
    });
    $("#resourcepanel").css({
        height: Math.round(1 * a).toString() + "px"
    });
    $("#resourcepanel").css({
        width: Math.round(0.27 * f).toString() + "px"
    });
    var b = $("#resourcepanel").height();
    $("#iconlist").css({
        height: Math.round(1 * b - 100 - 5).toString() + "px"
    });
    var d = $("#mainpanel").height();
    var g = $("#mainpanel").width();
    $("#designpanel").css({
        height: Math.round(0.6 * d - 4).toString() + "px"
    });
    var e = $("#designpanel").height();
    var c = $("#designpanel").width();
    $("#designspace").css({
        height: Math.round(1 * e).toString() + "px"
    });
    $("#designspace").css({
        width: Math.round(0.6 * c - 4).toString() + "px"
    });
    $("#propertypanel").css({
        height: Math.round(1 * e - 15).toString() + "px"
    });
    $("#propertypanel").css({
        width: Math.round(0.4 * c - 15).toString() + "px"
    });
    $("#objectlist").css({
        height: Math.round(0.4 * d - 155).toString() + "px"
    });
    libw = $("#objectlist").width();
    libh = $("#objectlist").height()
}

function resizeStages() {
    objstage.width(libw - 10);
    objstage.height(libh - 10)
}

function setup() {
    screenSetup();
    var a = $("#designspace").width();
    var b = $("#designspace").height();
    loadResources();
    stage = new Kinetic.Stage({
        container: designspace,
        name: "designscreen",
        width: a,
        height: b
    });
    layer = new Kinetic.Layer({
        name: "designlayer"
    });
    stage.add(layer);
    objSelector = new objectSelector();
    layer.add(objSelector.objSelGroup);
    $(stage.getContent()).on("click", function() {
        if (cursorstate == "free") {
            if (activeobject != null) {
                objSelector.deleteOldSelector();
                activeobject = null;
                $("#proptable").empty()
            }
        }
    });
    objstage = new Kinetic.Stage({
        container: objectlist,
        name: "objscreen",
        width: libw,
        height: libh
    });
    objlayer = new Kinetic.Layer({
        name: "objlayer"
    });
    objstage.add(objlayer);
    coreSetup();
    objlayer.add(libselector);
    loadObjects("all");
    document.getElementById("addlibbox").style.visibility = "hidden";
    objlayer.draw();
    changeCallback = updateObjState;
    document.addEventListener("fullscreenchange", function() {
        screenSetup();
        resizeStages()
    }, false);
    document.addEventListener("mozfullscreenchange", function() {
        screenSetup();
        resizeStages()
    }, false);
    document.addEventListener("webkitfullscreenchange", function() {
        screenSetup();
        resizeStages()
    }, false);
    screenSetup()
};