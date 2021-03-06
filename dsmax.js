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
var treecontainer = null;
var selectednode = null;
var selbotnodes = new Array();

function makeTree(a) {
    treecontainer.jstree("destroy");
    treecontainer.on("select_node.jstree", function(f, d) {
        selectednode = d.node;
        selbotnodes = treecontainer.jstree(true).get_bottom_selected();
        if (selbotnodes.length > 0) {
            var b = treecontainer.jstree(true).get_selected();
            for (var g = 0; g < b.length; g++) {
                var c = b[g];
                if (selbotnodes.indexOf(c) == -1) {
                    treecontainer.jstree(true).deselect_node(c)
                }
            }
        }
        selectObject("jstree")
    }).on("deselect_node.jstree", function(f, d) {
        selbotnodes = treecontainer.jstree(true).get_bottom_selected();
        if (selbotnodes.length > 0) {
            var b = treecontainer.jstree(true).get_selected();
            for (var g = 0; g < b.length; g++) {
                var c = b[g];
                if (selbotnodes.indexOf(c) == -1) {
                    treecontainer.jstree(true).deselect_node(c)
                }
            }
        }
        selectObject("jstree")
    }).on("create_node.jstree", function(f, d) {
        if (openedproject) {
            var c = fetchnextProjectNode();
            if (c != null) {
                addTreeNode(c.parentid, c.nodeid, c.nodestate)
            } else {
                treecontainer.jstree(true).open_node("#" + project.id)
            }
        } else {
            var b = d.parent;
            treecontainer.jstree(true).deselect_all(true);
            treecontainer.jstree(true).select_node(d.node);
            if (treecontainer.jstree(true).is_open(b) == false) {
                treecontainer.jstree(true).open_node(b)
            }
        }
    }).on("ready.jstree", function() {
        treecontainer.jstree(true).select_node("#" + project.id);
        if (openedproject) {
            var b = fetchnextProjectNode();
            if (b != null) {
                addTreeNode(b.parentid, b.nodeid, b.nodestate)
            }
        }
    }).on("move_node.jstree", function(c, b) {
        moveNode(b.node, b.parent, b.old_parent, b.position, b.old_position);
        treecontainer.jstree(true).deselect_all(true);
        treecontainer.jstree(true).select_node(b.node)
    }).jstree({
        core: {
            data: [{
                id: a.id,
                parent: "#",
                type: a.type,
                text: a.name
            }],
            themes: {
                variant: "small"
            },
            check_callback: function(b, c, e, d) {
                return true
            },
            multiple: true
        },
        types: {
            "#": {
                max_children: 1,
                max_depth: 10,
                valid_children: ["Project"]
            },
            Project: {
                icon: "images/proj.png",
                valid_children: ["Layer"]
            },
            "default": {
                valid_children: ["default"]
            },
            Layer: {
                icon: "images/layer.png",
                valid_children: ["Group", "Rect", "Ellipse", "Figure", "Ring", "Text", "Star", "RegularPolygon", "Image", "Line", "PolyLine", "CurvedArrow"]
            },
            Group: {
                icon: "images/group.png",
                valid_children: []
            },
            Star: {
                icon: "images/star.png",
                valid_children: []
            },
            Rect: {
                icon: "images/rect.png",
                valid_children: []
            },
            Ellipse: {
                icon: "images/circ.png",
                valid_children: []
            },
            Ring: {
                icon: "images/ring.png",
                valid_children: []
            },
            RegularPolygon: {
                icon: "images/poly.png",
                valid_children: []
            },
            Image: {
                icon: "images/image.png",
                valid_children: []
            },
            Figure: {
                icon: "images/figure.png",
                valid_children: []
            },
            Text: {
                icon: "images/text.png",
                valid_children: []
            },
            Line: {
                icon: "images/line.png",
                valid_children: []
            },
            PolyLine: {
                icon: "images/polyline.png",
                valid_children: []
            },
            CurvedArrow: {
                icon: "images/arrow.png",
                valid_children: []
            }
        },
        dnd: {
            is_draggable: function(c) {
                var b = false;
                var d = c[0].type;
                switch (d) {
                    case "Stage":
                        b = false;
                        break;
                    default:
                        b = true;
                        break
                }
                return b
            }
        },
        plugins: ["types", "dnd"]
    })
}

function addTreeNode(d, a, c) {
    var b = treecontainer.jstree(true);
    sel = b.create_node(d, {
        id: a,
        parent: d,
        text: c.name,
        type: c.type,
        li_attr: {
            "data-obj": c
        }
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
var project = {
    id: "project",
    name: "Project",
    creator: "unknown",
    type: "Project",
    createdate: "ddmmyyyy",
    lastdate: "ddmmyyyy",
    screenheight: 1080,
    screenwidth: 1920,
    layers: [],
    presentevents: [],
    starteventviews: []
};
var fullscreen = false;
var openedproject = false;
var projectopened = false;
var nodelist = [];
var selectedObjlist = [];
var listcounter = 0;
var showall = false;
var sw, sh;
var USEIO = true;
var socket;
var serverurl = "http://" + window.location.hostname + ":" + window.location.port;
var txscale = 1;

function makeCurvedArrow() {
    if (layer != null) {
        var b = addobj("CurvedArrow");
        var a = b.getAttr("state");
        a.name = uniqueNameonLayer(b);
        b.name(a.name);
        b.setAttr("state", a);
        addTreeNode(layer.id(), b.id(), a)
    } else {
        alert("no layer is defined")
    }
}

function updateprojState(c) {
    var b = Object.keys(c)[0];
    var a = c[b];
    project[b] = a;
    if (b == "name") {
        treecontainer.jstree(true).rename_node(selectednode, a)
    }
    if (b == "screenwidth" || b == "screenheight") {
        stageDims()
    }
}

function updateprojPropDisp() {
    var e = project;
    $("#proptable").empty();
    for (var c in e) {
        if (c != "layers" && c != "actions" && c != "library" && c != "id" && c != "presentevents" && c != "starteventviews") {
            var b = e[c];
            if (c == "type" || c == "createdate" || c == "lastdate") {
                $("#proptable").append('<tr><td class="tablekey">' + c + '</td><td class="tableval" style="text-align:left">' + b + "</td></tr>")
            } else {
                if (isNaN(b)) {
                    $("#proptable").append('<tr><td class="tablekey">' + c + '</td><td class="tableval"><input id="prop' + c + '" type="text" style="text-align:left" size="10" onchange="updateprojState({' + c + ':this.value})"></td></tr>')
                } else {
                    $("#proptable").append('<tr><td class="tablekey">' + c + '</td><td class="tableval"><input id="prop' + c + '" type="text" style="text-align:right" size="10" onchange="updateprojState({' + c + ':checkInput(this.value)})"></td></tr>')
                }
                var d = document.getElementById("prop" + c);
                if (isNaN(b)) {
                    $("#prop" + c).val(b)
                } else {
                    var a = parseFloat(b);
                    if ((a % 1) == 0) {
                        $("#prop" + c).val(b.toFixed(0))
                    } else {
                        $("#prop" + c).val(b.toFixed(2))
                    }
                }
            }
        }
    }
}

function updateObjStateandTree(f) {
    if (selectedObjlist.length > 1) {
        for (var d = 0; d < selectedObjlist.length; d++) {
            var c = selectedObjlist[d];
            var b = c.getAttr("state");
            if (b.type == "Group") {
                updateGroupState(c, f)
            } else {
                updateState(c, f)
            }
        }
        activeobject = c
    } else {
        if (activeobject != null) {
            var b = activeobject.getAttr("state");
            if (b.type == "Group") {
                updateGroupState(activeobject, f)
            } else {
                updateState(activeobject, f)
            }
            var e = Object.keys(f)[0];
            var a = f[e];
            if (treecontainer && e == "name") {
                treecontainer.jstree(true).rename_node(selectednode, a)
            }
        }
    }
}

function libuse() {
    if (layer != null) {
        if (activelibobj != null) {
            var a = $("#designspace").width();
            var c = $("#designspace").height();
            var e = JSON.stringify(activelibobj.getAttr("state"));
            var b = JSON.parse(e);
            b.x = b.x + Math.floor(a / 2);
            b.y = b.y + Math.floor(c / 2);
            if (b.type == "Group") {
                var d = newgroupobj(true, false, b);
                b.name = uniqueNameonLayer(d);
                b.id = UniqueId();
                d.setAttr("state", b);
                layer.add(d)
            } else {
                var d = newobj(true, b);
                b.name = uniqueNameonLayer(d);
                b.id = UniqueId();
                d.setAttr("state", b);
                layer.add(d)
            }
            d.id(b.id);
            layer.draw();
            addTreeNode(layer.id(), d.id(), b)
        }
    } else {
        alert("no layer is defined")
    }
}

function delObject() {
    if (activeobject != null) {
        var a = confirm("Are you sure you want to delete this object?");
        if (a == true) {
            var c = getNodeActions(activeobject);
            actlayer = layer.getAttr("actionlayer");
            for (var b = 0; b < c.length; b++) {
                c[b].destroy()
            }
            actlayer.draw();
            delobj();
            treecontainer.jstree(true).delete_node(selectednode)
        }
    }
}

function createObject() {
    var a = $("#objecttypeselect").val();
    if (usedefaults == true && objdefaults[a] != null) {
        var b = JSON.parse(objdefaults[a]);
        b.id = "none";
        b.name = "none";
        var c = newobj(true, b);
        layer.add(c);
        if (objSelector != null) {
            objSelector.deleteOldSelector();
            objSelector.drawSelector(c)
        }
        activeobject = c;
        updatePropDisp()
    } else {
        var c = addobj(a);
        var b = c.getAttr("state")
    }
    b.name = uniqueNameonLayer(c);
    c.name(b.name);
    c.setAttr("state", b);
    layer.draw();
    addTreeNode(layer.id(), c.id(), b)
}

function copyObject() {
    if (activeobject != null) {
        var d = JSON.stringify(activeobject.getAttr("state"));
        var b = JSON.parse(d);
        b.name = "none";
        b.id = "none";
        b.x = b.x + 100;
        b.y = b.y + 100;
        if (b.type == "Group") {
            var c = newgroupobj(true, false, b)
        } else {
            var c = newobj(true, b)
        }
        var a = c.getAttr("state");
        a.name = uniqueNameonLayer(c);
        c.name(a.name);
        c.setAttr("state", a);
        layer.add(c);
        layer.draw();
        objSelector.deleteOldSelector();
        activeobject = c;
        updatePropDisp();
        objSelector.drawSelector(c);
        addTreeNode(layer.id(), c.id(), a)
    }
}

function groupObjects() {
    for (var a = 0; a < tempgroup.length; a++) {
        var c = tempgroup[a];
        treecontainer.jstree("delete_node", c.id())
    }
    var d = groupobjects();
    var b = d.getAttr("state");
    b.name = uniqueNameonLayer(d);
    d.name(b.name);
    d.setAttr("state", b);
    addTreeNode(layer.id(), d.id(), b);
    ctrlkey = true;
    togMultiselect()
}

function ungroupObjects() {
    var f = getNodeActions(activeobject);
    actlayer = layer.getAttr("actionlayer");
    for (var c = 0; c < f.length; c++) {
        f[c].destroy()
    }
    actlayer.draw();
    var b = ungroupobjects();
    if (b != null) {
        treecontainer.jstree(true).delete_node(selectednode);
        for (var a = 0; a < b.length; a++) {
            var e = b[a];
            var d = e.getAttr("state");
            d.name = uniqueNameonLayer(e);
            e.name(d.name);
            e.setAttr("state", d);
            addTreeNode(layer.id(), e.id(), d)
        }
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

function moveNode(d, g, i, f, a) {
    var b = d.type;
    switch (b) {
        case "Layer":
            layer.setZIndex(f);
            break;
        default:
            var k = treecontainer.jstree(true).get_node(g);
            var h = treecontainer.jstree(true).get_node(i);
            var j = stage.find("#" + i)[0];
            layer = stage.find("#" + g)[0];
            obj = j.find("#" + d.id)[0];
            if (obj == null) {
                activeobject = null
            } else {
                if (i == g) {
                    obj.setZIndex(f)
                } else {
                    var e = getNodeActions(obj);
                    actlayer = layer.getAttr("actionlayer");
                    for (var c = 0; c < e.length; c++) {
                        e[c].moveTo(actlayer)
                    }
                    obj.moveTo(layer);
                    obj.moveToTop();
                    obj.setZIndex(f);
                    treecontainer.jstree("select_node", g)
                }
            }
            break
    }
}

function selectObject(b) {
    var f = null;
    switch (b) {
        case "jstree":
            var d = selectednode.id;
            var c = selectednode.type;
            switch (c) {
                case "Project":
                    disableDesignButtons();
                    clearActiveObject();
                    clearTempGroup();
                    updateprojPropDisp();
                    break;
                case "Layer":
                    disableDesignButtons();
                    clearActiveObject();
                    clearTempGroup();
                    if (stage != null) {
                        stage.clear();
                        layer = stage.find("#" + d)[0];
                        if (layer != null) {
                            activeobject = layer;
                            actlayer = layer.getAttr("actionlayer");
                            updatePropDisp();
                            layer.draw();
                            actstage.clear();
                            actlayer.draw()
                        }
                    }
                    break;
                default:
                    selectedObjlist.length = 0;
                    for (var i = 0; i < selbotnodes.length; i++) {
                        var e = selbotnodes[i];
                        var j = 0;
                        var g = stage.getLayers().toArray();
                        var h = g[0];
                        f = null;
                        while (f == null && j < g.length) {
                            f = g[j].find("#" + e)[0];
                            j = j + 1
                        }
                        if (f != null) {
                            selectedObjlist.push(f)
                        }
                    }
                    if (selectedObjlist.length > 0) {
                        f = selectedObjlist[0]
                    } else {
                        f = null
                    }
                    if (f == null) {
                        activeobject = null
                    } else {
                        if (selectedObjlist.length > 1) {
                            updateMultiplePropDisp()
                        } else {
                            activeobject = f;
                            var l = layer;
                            layer = activeobject.getLayer();
                            if (layer != l) {
                                stage.clear();
                                layer.draw()
                            }
                            actlayer = layer.getAttr("actionlayer");
                            updatePropDisp();
                            actstage.clear();
                            actlayer.draw();
                            if (objSelector == null) {
                                objSelector = new objectSelector()
                            }
                            objSelector.drawSelector(f);
                            enableDesignButtons();
                            $("#actiontypeselect").empty();
                            $("#actiontypeselect").append(makeActionTypeOptions(activeobject));
                            var a = $("#actiontypeselect option");
                            var k = $.map(a, function(m) {
                                return ($(m).val())
                            });
                            if ($.inArray(activeactiontype, k) != -1) {
                                $("#actiontypeselect").val(activeactiontype)
                            }
                        }
                    }
                    break
            }
            break;
        case "grouping":
            enableDesignButtons();
            break;
        case "kineticjs":
            if (activeobject != null) {
                layer = activeobject.getLayer();
                actlayer = layer.getAttr("actionlayer");
                enableDesignButtons();
                treecontainer.jstree("deselect_all");
                var d = activeobject.id();
                treecontainer.jstree("select_node", d);
                $("#actiontypeselect").empty();
                $("#actiontypeselect").append(makeActionTypeOptions(activeobject));
                var a = $("#actiontypeselect option");
                var k = $.map(a, function(m) {
                    return ($(m).val())
                });
                if ($.inArray(activeactiontype, k) != -1) {
                    $("#actiontypeselect").val(activeactiontype)
                }
            }
            break
    }
}

function createStage(a) {
    var e = a.screenheight / a.screenwidth;
    var h = sh - 4;
    var d = sw - 4;
    var c = h / d;
    if (c > e) {
        var b = d;
        var f = Math.round(d * e)
    } else {
        var f = h;
        var b = Math.round(h / e)
    }
    $("#" + a.container).height(f);
    $("#" + a.container).width(b);
    if (a.id == "none") {
        a.id = UniqueId()
    }
    var g = new Kinetic.Stage({
        container: a.container,
        id: a.id,
        name: a.name,
        width: b,
        height: f
    });
    a.txscale = a.screenwidth / b;
    g.setAttr("state", a);
    return g
}

function createLayer(a) {
    if (layer != null) {
        layer.clear()
    }
    if (a.id == "none") {
        a.id = UniqueId()
    }
    var c = new Kinetic.Layer({
        name: a.name,
        id: a.id
    });
    c.setAttr("state", a);
    stage.add(c);
    var b = new Kinetic.Layer({
        name: "act_" + a.name,
        id: UniqueId()
    });
    actstage.add(b);
    b.setAttr("parentlayer", c);
    c.setAttr("actionlayer", b);
    if (openedproject == false) {
        makeActionBox(b)
    }
    makeLayerAnimation(b);
    return c
}

function newProject() {
    var a = (new Date()).toLocaleDateString();
    project = {
        id: "project",
        name: "Project",
        creator: "unknown",
        type: "Project",
        createdate: a,
        lastdate: a,
        screenheight: 1080,
        screenwidth: 1920,
        layers: [],
        presentevents: [],
        starteventviews: []
    };
    clearActiveObject();
    stage.clear();
    stage.destroyChildren();
    layer = null;
    actstage.clear();
    actstage.destroyChildren();
    projectopened = false;
    eventliststates = [];
    makeTree(project);
    disableDesignButtons()
}

function populateProject(f) {
    var n = f.layers;
    for (var i = 0; i < n.length; i++) {
        var g = n[i];
        var b = createLayer(g);
        stage.add(b);
        layer = b;
        nodelist.push({
            parentid: f.id,
            nodeid: b.id(),
            nodestate: g
        });
        var r = g.children;
        for (var h = 0; h < r.length; h++) {
            var s = r[h];
            if (s.type == "Group") {
                var l = newgroupobj(true, false, s);
                layer.add(l)
            } else {
                var l = newobj(true, s);
                layer.add(l)
            }
            layer.draw();
            nodelist.push({
                parentid: b.id(),
                nodeid: l.id(),
                nodestate: s
            })
        }
        actlayer = layer.getAttr("actionlayer");
        var o = g.eventlists;
        for (var d = 0; d < o.length; d++) {
            var c = o[d];
            var q = makeEventList(c);
            actlayer.add(q);
            if (q.getAttr("state").name == "actionbox") {
                actlayer.setAttr("actionbox", q)
            }
            for (var p = 0; p < c.actions.length; p++) {
                var a = c.actions[p];
                var e = actionobj(a, q)
            }
        }
    }
    eventliststates = [];
    Array.prototype.push.apply(eventliststates, f.presentevents);
    stage.clear();
    layer.draw();
    updateEventSwimList()
}

function fetchnextProjectNode() {
    if (listcounter < nodelist.length) {
        var a = nodelist[listcounter];
        listcounter += 1;
        return a
    } else {
        openedproject = false;
        listcounter = 0;
        return null
    }
}

function openProject(b) {
    $("#projects").empty();
    var a = b.getAttribute("data-projid");
    var c = b.getAttribute("data-project");
    openedproject = true;
    projectopened = true;
    clearActiveObject();
    stage.clear();
    stage.destroyChildren();
    actstage.clear();
    actstage.destroyChildren();
    project = JSON.parse(c);
    project.id = a;
    eventliststates = [];
    Array.prototype.push.apply(eventliststates, project.presentevents);
    nodelist = [];
    populateProject(project);
    listcounter = 0;
    makeTree(project);
    stageDims();
    setTimeout(function() {
        if (layer == null) {
            layer = stage.getLayers()[0]
        }
        layer.draw();
        var d = layer.id();
        treecontainer.jstree("select_node", d)
    }, 500)
}

function packageProject() {
    var k = (new Date()).toLocaleDateString();
    var b = new Array();
    var m = new Array();
    var d = new Array();
    var r = new Array();
    var c = stage.getLayers().toArray();
    b = [];
    for (var o = 0; o < c.length; o++) {
        var j = c[o];
        var u = j.getAttr("state");
        var n = j.getChildren().toArray();
        r = [];
        for (var f = 0; f < n.length; f++) {
            var l = n[f];
            if (l.name() != "Selector") {
                var i = l.getAttr("state");
                r.push(i)
            }
        }
        u.children = r;
        var h = j.getAttr("actionlayer");
        var g = h.find(".eventgroup");
        m = [];
        for (var q = 0; q < g.length; q++) {
            var t = g[q].find(".action");
            d = [];
            for (var p = 0; p < t.length; p++) {
                var a = t[p].getAttr("state");
                d.push(a)
            }
            var e = g[q].getAttr("state");
            e.actions = d;
            m.push(e)
        }
        u.eventlists = m;
        b.push(u)
    }
    var s = {
        id: project.id,
        name: project.name,
        creator: project.creator,
        type: "Project",
        createdate: project.createdate,
        lastdate: k,
        screenwidth: project.screenwidth,
        screenheight: project.screenheight,
        layers: b,
        presentevents: eventliststates,
        starteventviews: project.starteventviews
    };
    return s
}

function saveProject() {
    var a = (new Date()).toLocaleDateString();
    var c = packageProject();
    var b = JSON.stringify(c);
    $.ajax({
        url: hostaddr + "/addproject",
        type: "GET",
        data: {
            id: project.id,
            name: project.name,
            cdate: project.createdate,
            ldate: a,
            creator: project.creator,
            state: b
        }
    }).done(function(d) {
        project.id = d
    }).fail(function() {
        alert("error")
    }).always(function() {})
}

function saveasnewProject() {
    project.id = "project";
    var a = (new Date()).toLocaleDateString();
    project.createdate = a;
    saveProject()
}

function showProjDetails(c) {
    var b = c.getAttribute("data-projid");
    var d = c.getAttribute("data-project");
    var a = JSON.parse(d);
    $("#proptable").empty();
    $("#proptable").append('<tr><td class="tablekey">id</td><td class="tableval" style="text-align:left">' + b + "</td></tr>");
    $("#proptable").append('<tr><td class="tablekey">name</td><td class="tableval" style="text-align:left">' + a.name + "</td></tr>");
    $("#proptable").append('<tr><td class="tablekey">creator</td><td class="tableval" style="text-align:left">' + a.creator + "</td></tr>");
    $("#proptable").append('<tr><td class="tablekey">created</td><td class="tableval" style="text-align:left">' + a.createdate + "</td></tr>");
    $("#proptable").append('<tr><td class="tablekey">saved</td><td class="tableval" style="text-align:left">' + a.lastdate + "</td></tr>")
}

function clearProps() {
    $("#proptable").empty()
}

function loadProjects() {
    $("#tree").empty();
    $.getJSON(hostaddr + "/getprojects", function(a) {
        $.each(a, function(c, d) {
            var b = d.id.toString();
            var e = d.name;
            var f = d.json;
            $("<div class='projecticon' data-projid='" + b + "' data-project='" + f + "' onclick='openProject(this)' onmouseover='showProjDetails(this)' onmouseout='clearProps()'><img src='images/proj.png' />" + e + "</div>").appendTo("#projects")
        })
    })
}

function addLayer() {
    if (selectednode != null && selectednode.type == "Project") {
        var d = stage.getLayers().toArray();
        var a = 1;
        var e = true;
        while (e == true) {
            e = false;
            for (var b = 0; b < d.length; b++) {
                child = d[b];
                if (child.name() == "layer" + a.toString()) {
                    e = true
                }
            }
            if (e == true) {
                a++
            }
        }
        var c = "layer" + a.toString();
        layerstate = {
            name: c,
            type: "Layer",
            id: "none"
        };
        layer = createLayer(layerstate);
        actlayer = layer.getAttr("actionlayer");
        if (objSelector == null) {
            objSelector = new objectSelector()
        } else {
            clearActiveObject()
        }
        layer.add(objSelector.objSelGroup);
        addTreeNode(project.id, layer.id(), layerstate);
        txLayers()
    }
}

function deleteLayer() {
    if (activeobject != null && selectednode.type == "Layer") {
        var c = confirm("Are you sure you want to delete this layer and its contents?");
        if (c == true) {
            var d = layer;
            var b = d.getChildren().toArray();
            for (var e = 0; e < b.length; e++) {
                var a = b[e];
                var g = a.id();
                treecontainer.jstree("delete_node", g);
                a.destroy()
            }
            var f = d.getAttr("actionlayer");
            f.destroyChildren();
            f.destroy();
            if (stage.getChildren().toArray().length > 1) {
                treecontainer.jstree("select_node", selectednode.parent);
                treecontainer.jstree("delete_node", d.id());
                d.destroy();
                layer = stage.getChildren().toArray()[0]
            }
            if (objSelector == null) {
                objSelector = new objectSelector()
            } else {
                clearActiveObject()
            }
            txLayers()
        }
    }
}

function makeObjectListOptions() {
    var d = ["Rect", "Ellipse", "RegularPolygon", "Star", "Ring", "Text", "Line", "PolyLine", "CurvedArrow"];
    var b = "";
    for (var c = 0; c < d.length; c++) {
        var a = d[c];
        b = b + '<option value="' + a + '">' + a + "</option>"
    }
    return b
}

function enableDesignButtons() {
    if (activeobject != null) {
        var a = activeobject.getAttr("state");
        if (a.type == "Group" && tgroupindicator == null) {
            $("#ungroupbutton").prop("disabled", false)
        } else {
            $("#ungroupbutton").prop("disabled", true)
        }
    }
    if (tempgroup.length > 1) {
        $("#groupbutton").prop("disabled", false)
    } else {
        $("#groupbutton").prop("disabled", true)
    }
    if (tgroupindicator == null) {
        $("#copybutton").prop("disabled", false);
        $("#deletebutton").prop("disabled", false)
    } else {
        $("#copybutton").prop("disabled", true);
        $("#deletebutton").prop("disabled", true)
    }
    $("#createbutton").prop("disabled", false);
    $("#objecttypeselect").prop("disabled", false);
    $("#multiselectbutton").prop("disabled", false);
    $("#txscrbutton").prop("disabled", false);
    $("#showallbutton").prop("disabled", false);
    $("#playlist").show()
}

function disableDesignButtons() {
    $("#copybutton").prop("disabled", true);
    $("#deletebutton").prop("disabled", true);
    $("#groupbutton").prop("disabled", true);
    $("#ungroupbutton").prop("disabled", true);
    $("#multiselectbutton").prop("disabled", true);
    if (layer == null) {
        $("#showallbutton").prop("disabled", true);
        $("#txscrbutton").prop("disabled", true);
        $("#createbutton").prop("disabled", true);
        $("#objecttypeselect").prop("disabled", true);
        $("#playlist").hide()
    } else {
        $("#showallbutton").prop("disabled", false);
        $("#txscrbutton").prop("disabled", false);
        $("#createbutton").prop("disabled", false);
        $("#objecttypeselect").prop("disabled", false);
        $("#playlist").show()
    }
}

function togMultiselect() {
    if (ctrlkey == false) {
        $("#multiselectbutton").css("background-color", "#bbeebb");
        ctrlkey = true
    } else {
        $("#multiselectbutton").css("background-color", "#eeaa88");
        ctrlkey = false;
        clearTempGroup()
    }
}

function togShowall() {
    if (showall == false) {
        if (layer != null) {
            var d = layer.getChildren().toArray();
            for (var a = 0; a < d.length; a++) {
                var b = d[a];
                if (b.name() != "Selector") {
                    b.visible(true);
                    b.opacity(0.5)
                }
            }
            layer.draw();
            showall = true;
            $("#showallbutton").text("restore")
        }
    } else {
        if (layer != null) {
            var d = layer.getChildren().toArray();
            for (var a = 0; a < d.length; a++) {
                var b = d[a];
                if (b.name() != "Selector") {
                    var c = b.getAttr("state");
                    b.visible(c.visible);
                    b.opacity(c.opacity)
                }
            }
            layer.draw();
            showall = false;
            $("#showallbutton").text("show all")
        }
    }
}

function togFullscreen() {
    var a = document.documentElement;
    if (fullscreen == false) {
        if (a.RequestFullScreen) {
            a.RequestFullScreen();
            fullscreen = true
        } else {
            if (a.mozRequestFullScreen) {
                a.mozRequestFullScreen();
                fullscreen = true
            } else {
                if (a.webkitRequestFullScreen) {
                    a.webkitRequestFullScreen();
                    fullscreen = true
                }
            }
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
            fullscreen = false
        } else {
            if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                fullscreen = false
            } else {
                if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                    fullscreen = false
                }
            }
        }
    }
}

function setCastmode() {
    castmode = $("#castaction").prop("checked")
}

function stageDims() {
    var d = project.screenheight / project.screenwidth;
    var f = sh - 4;
    var c = sw - 4;
    var b = f / c;
    if (b > d) {
        var a = c;
        var e = Math.round(c * d)
    } else {
        var e = f;
        var a = Math.round(f / d)
    }
    $("#designstage").height(e);
    $("#designstage").width(a);
    stage.width(a);
    stage.height(e);
    txscale = project.screenwidth / a
}

function screenSetup() {
    var c = $(window).width();
    var a = $(window).height();
    $("#page").css({
        height: Math.round(0.98 * a).toString() + "px"
    });
    $("#page").css({
        width: Math.round(0.98 * c).toString() + "px"
    });
    var d = $("#page").height();
    var b = $("#page").width();
    $("#leftcolumn").css({
        height: Math.round(1 * d).toString() + "px"
    });
    $("#leftcolumn").css({
        width: Math.round(0.3 * b).toString() + "px"
    });
    $("#rightcolumn").css({
        left: Math.round(0.3 * b).toString() + "px"
    });
    $("#rightcolumn").css({
        height: Math.round(1 * d).toString() + "px"
    });
    $("#rightcolumn").css({
        width: Math.round(0.7 * b).toString() + "px"
    });
    $("#treespace").css({
        height: Math.round(0.5 * d).toString() + "px"
    });
    $("#designspace").css({
        height: Math.round(0.7 * d - 10).toString() + "px"
    });
    $("#libpane").css({
        height: Math.round(0.3 * d - 110).toString() + "px"
    });
    $("#actionpane").css({
        height: Math.round(0.3 * d - 110).toString() + "px"
    });
    $("#actionpane").css({
        width: Math.round(0.7 * b - 2).toString() + "px"
    });
    $("#propedit").css({
        height: Math.round(0.5 * d - 48).toString() + "px"
    });
    libw = $("#libpane").width();
    libh = $("#libpane").height();
    actw = $("#actionpane").width();
    acth = $("#actionpane").height();
    sh = $("#designspace").height();
    sw = $("#designspace").width()
}

function resizeStages() {
    objstage.clear();
    objlayer.draw();
    actstage.clear();
    if (actlayer != null) {
        actlayer.draw()
    }
}

function setLayerStartState() {
    if (layer != null) {
        var a = layer.getAttr("state");
        var b = getLayerObjects(layer);
        a.startstate = JSON.stringify(b);
        layer.setAttr("state", a)
    }
}

function getLayerObjects(c) {
    var b = c.getAttr("state");
    var e = c.getChildren().toArray();
    objstatearr = [];
    for (var a = 0; a < e.length; a++) {
        var d = e[a];
        if (d.name() != "Selector") {
            var f = d.getAttr("state");
            objstatearr.push(f)
        }
    }
    return objstatearr
}

function txStartViews(g) {
    var d = [];
    if (stage != null && layer != null) {
        for (var j = 0; j < g.length; j++) {
            var e = g[j];
            var l = e.viewstate.name;
            var c = e.layerid;
            if (c != "none") {
                var i = stage.find("#" + c)[0];
                if (i != null) {
                    d.push(i);
                    var f = i.getAttr("state");
                    var h = JSON.parse(f.startstate);
                    var b = {
                        screenwidth: project.screenwidth,
                        screenheight: project.screenheight,
                        txscale: txscale,
                        viewstate: e.viewstate,
                        layerchildren: h,
                        layeractions: []
                    };
                    var a = {
                        view: l,
                        scrtxmsg: {
                            command: "update",
                            info: b
                        }
                    };
                    var k = JSON.stringify(a);
                    socket.emit("screenmsg", k)
                }
            }
        }
        setTimeout(function() {
            for (var m = 0; m < d.length; m++) {
                var o = d[m];
                var p = JSON.parse(o.getAttr("state").startstate);
                if (p != null) {
                    for (var n = 0; n < p.length; n++) {
                        var q = p[n];
                        var r = o.find("#" + q.id)[0];
                        if (r != null) {
                            if (q.type == "Group") {
                                updateGroupState(r, q)
                            } else {
                                updateState(r, q)
                            }
                        }
                    }
                    o.draw()
                }
            }
        }, 500)
    }
}

function txViews(o) {
    if (stage != null && layer != null) {
        var n = eventliststates[o];
        var k = n.peviews;
        for (var c = 0; c < n.peviews.length; c++) {
            var m = k[c];
            var l = m.viewstate.name;
            var e = m.layerid;
            if (e != "none") {
                var h = stage.find("#" + e)[0];
                var f = h.getAttr("actionlayer");
                var g = m.actions;
                actionstatearr = [];
                for (var q = 0; q < g.length; q++) {
                    var j = g[q].id;
                    var r = f.find("#" + j)[0];
                    var b = r.getAttr("state");
                    actionstatearr.push(b)
                }
                var d = getLayerObjects(h);
                var a = {
                    screenwidth: project.screenwidth,
                    screenheight: project.screenheight,
                    txscale: txscale,
                    viewstate: m.viewstate,
                    layerchildren: d,
                    layeractions: actionstatearr
                };
                var p = {
                    view: l,
                    scrtxmsg: {
                        command: "update",
                        info: a
                    }
                };
                var i = JSON.stringify(p);
                socket.emit("screenmsg", i)
            }
        }
    }
}

function findPELayer(e, c) {
    var d = false;
    var b = 0;
    var a = -1;
    while (d == false && b < c.length) {
        if (e == c[b].layerid) {
            d = true;
            a = b
        }
        b = b + 1
    }
    return a
}

function findobjinPELayer(a, c) {
    var e = false;
    var d = 0;
    var b = -1;
    while (e == false && d < c.length) {
        if (a == c[d].id) {
            e = true;
            b = d
        }
        d = d + 1
    }
    return b
}

function findLayerImages(a) {
    imgobjs = [];
    for (var b = 0; b < a.length; b++) {
        var d = a[b];
        if (d.type == "Group") {
            var c = d.children;
            findLayerImages(c)
        } else {
            if (d.type == "Image") {
                imgobjs.push(d)
            }
        }
    }
    return imgobjs
}

function compileViews() {
    var e = [];
    var l = [];
    if (stage != null && layer != null) {
        var F = stage.getLayers().toArray();
        var G = [];
        for (var y = 0; y < F.length; y++) {
            var k = F[y];
            var o = k.getAttr("state").startstate;
            if (o == null) {
                alert("layer startstates are not defined");
                return
            }
            var n = JSON.parse(o);
            var x = findLayerImages(n);
            for (var c = 0; c < x.length; c++) {
                var A = x[c];
                var a = (A.path).substring((A.path).lastIndexOf("/") + 1, (A.path).length);
                A.path = "playlists/" + project.name + "/images/" + a;
                l.push(a)
            }
            var E = {
                layerid: k.id(),
                objstates: n,
                layeractions: []
            };
            G.push(E)
        }
        e.push(G);
        for (var w = 0; w < eventliststates.length; w++) {
            if (w < eventliststates.length - 1) {
                var r = JSON.stringify(e[w]);
                var m = JSON.parse(r)
            }
            var G = [];
            var J = eventliststates[w];
            var v = J.peviews;
            for (var L = 0; L < J.peviews.length; L++) {
                var g = v[L];
                var u = g.viewstate.name;
                var d = g.layerid;
                if (d != "none") {
                    var I = stage.find("#" + d)[0];
                    var B = I.getAttr("actionlayer");
                    var j = g.actions;
                    actionstatearr = [];
                    for (var i = 0; i < j.length; i++) {
                        var q = j[i].id;
                        var h = B.find("#" + q)[0];
                        var C = h.getAttr("state");
                        actionstatearr.push(C)
                    }
                    var f = findPELayer(d, e[w]);
                    (e[w][f]).layeractions = actionstatearr;
                    if (w < eventliststates.length - 1) {
                        var p = m[f].objstates;
                        for (var D = 0; D < actionstatearr.length; D++) {
                            var b = actionstatearr[D];
                            var H = findobjinPELayer(b.parentobjectid, p);
                            if (H != -1) {
                                var z = p[H];
                                var s = actiontypes[b.actiontype];
                                if (s == "position") {
                                    z.x = b.endstate.x;
                                    z.y = b.endstate.y
                                } else {
                                    z[s] = b.endstate
                                }
                            }
                        }
                    }
                }
            }
            if (w < eventliststates.length - 1) {
                e.push(m)
            }
        }
        var K = {
            screenwidth: project.screenwidth,
            screenheight: project.screenheight,
            txscale: txscale,
            layersnapshots: e,
            pestates: eventliststates,
            playimages: l
        };
        var t = JSON.stringify(K);
        $.ajax({
            url: hostaddr + "/saveplaylist",
            type: "GET",
            data: {
                projectname: project.name,
                playlist: t
            }
        }).done(function(M) {}).fail(function() {
            alert("error")
        }).always(function() {})
    }
}

function txReady(a) {
    var b = JSON.stringify({
        command: "designready",
        info: a
    });
    socket.emit("designmsg", b)
}

function txLayers() {
    var a = [];
    var d = stage.getLayers().toArray();
    for (var b = 0; b < d.length; b++) {
        var f = d[b].id();
        var c = d[b].name();
        a.push({
            layerid: d[b].id(),
            layername: d[b].name()
        })
    }
    var e = JSON.stringify({
        command: "layerinfo",
        info: a
    });
    socket.emit("designmsg", e)
}

function txPEinfo() {
    var a = JSON.stringify({
        command: "peinfo",
        info: {
            evl: eventliststates,
            sev: project.starteventviews
        }
    });
    socket.emit("designmsg", a)
}

function txupdateAllEventListActions(a) {
    var b = JSON.stringify({
        command: "updateAllPEventActions",
        info: a
    });
    socket.emit("designmsg", b)
}

function ioUpdate(b) {
    var e = JSON.parse(b);
    var d = e.command;
    switch (d) {
        case "updateEventArr":
            eventliststates = e.info.pel;
            project.starteventviews = e.info.sev;
            updateEventSwimList();
            break;
        case "deleteEventList":
            var c = e.info;
            deleteEventList(c);
            break;
        case "checkDesignScreen":
            if (projectopened == true && layer != null) {
                txReady("openready")
            } else {
                if (projectopened == false && layer != null) {
                    deleteAllEventLists();
                    txReady("newready")
                } else {
                    deleteAllEventLists();
                    txReady("notready")
                }
            }
            break;
        case "getLayerinfo":
            txLayers();
            break;
        case "playPE":
            var c = e.info;
            playPEEvents(c);
            break;
        case "startPE":
            var c = e.info;
            startPEEvents(c);
            break;
        case "getPEinfo":
            txPEinfo();
            break;
        case "castPEinfo":
            var c = e.info;
            txViews(c);
            break;
        case "castStartinfo":
            var a = e.info;
            txStartViews(a);
            break
    }
}

function setup() {
    if (USEIO) {
        socket = io(serverurl);
        socket.on("updateEvents", function(g) {
            ioUpdate(g)
        })
    }
    coreSetup();
    $(".tabs .tab-links a").on("click", function(g) {
        var h = $(this).attr("href");
        $(".tabs " + h).show().siblings().hide();
        $(this).parent("li").addClass("active").siblings().removeClass("active");
        g.preventDefault();
        screenSetup();
        resizeStages()
    });
    screenSetup();
    var d = project.screenheight / project.screenwidth;
    var f = sh - 4;
    var c = sw - 4;
    var b = f / c;
    if (b > d) {
        var a = c;
        var e = Math.round(c * d)
    } else {
        var e = f;
        var a = Math.round(f / d)
    }
    $("#designstage").height(e);
    $("#designstage").width(a);
    stage = new Kinetic.Stage({
        container: designstage,
        id: "stage0",
        name: "designstage",
        width: a,
        height: e
    });
    objstage = new Kinetic.Stage({
        container: libpane,
        name: "objscreen",
        width: libw - 10,
        height: libh - 10
    });
    objlayer = new Kinetic.Layer({
        name: "objlayer"
    });
    objstage.add(objlayer);
    objlayer.add(libselector);
    loadObjects("all");
    objlayer.draw();
    actstage = new Kinetic.Stage({
        container: actionpane,
        name: "actscreen",
        width: actw - 10,
        height: acth - 10
    });
    $("#castaction").prop("checked", castmode);
    $(function() {
        $("#treemenu").smartmenus({
            subMenusMinWidth: "80px",
            subMenusMaxWidth: "150px"
        });
        $("#treemenu").bind("click.smapi", function(h, g) {
            $("#treemenu").smartmenus("menuHideAll");
            return false
        })
    });
    treecontainer = $("#tree");
    $(function() {
        treecontainer.jstree()
    });
    changeCallback = updateObjStateandTree;
    $("#objecttypeselect").empty();
    $("#objecttypeselect").append(makeObjectListOptions());
    disableDesignButtons();
    $("#multiselectbutton").css("background-color", "#eeaa88");
    togShowall();
    document.addEventListener("fullscreenchange", function() {
        screenSetup();
        resizeStages();
        stageDims()
    }, false);
    document.addEventListener("mozfullscreenchange", function() {
        screenSetup();
        resizeStages();
        stageDims()
    }, false);
    document.addEventListener("webkitfullscreenchange", function() {
        screenSetup();
        resizeStages();
        stageDims()
    }, false);
    screenSetup();
    resizeStages();
    stageDims();
    $("#treespace").resizable({
        handles: "s",
        minHeight: 50,
        maxHeight: 600,
        resize: function(g, i) {
            var k = i.size.height;
            var j = 12;
            $(this).height(k);
            var h = $("#leftcolumn").height();
            var l = $("#treemenu").height();
            $("#propedit").height(h - l - k - j)
        }
    });
    $("#designspace").resizable({
        handles: "s",
        minHeight: 50,
        maxHeight: 650,
        resize: function(h, j) {
            var l = j.size.height;
            var k = 1;
            $(this).height(l);
            var i = $("#rightcolumn").height();
            var n = $("#menu").height();
            var g = i - n - l - k;
            $(".tabs").height(g);
            $("#libpane").height(g - 80);
            $("#actionpane").height(g - 80);
            libh = $("#libpane").height();
            acth = $("#actionpane").height();
            sh = $("#designspace").height();
            stageDims();
            if (stage != null) {
                stage.clear();
                if (layer == null) {
                    layer = stage.getLayers()[0]
                }
                layer.draw();
                var m = layer.id();
                treecontainer.jstree("select_node", m)
            }
        }
    });
    $(window).focus(function() {
        if (stage != null) {
            stage.clear();
            if (layer != null) {
                layer.draw()
            }
        }
    })
};