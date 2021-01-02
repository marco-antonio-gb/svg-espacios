<template>
<div class="container" style="width:600px">
    <strong> {{settings.area_tipo}} {{settings.area_nombre}} ({{settings.area}}) </strong>
    <p class="m-0"> <small>Credenciales: {{settings.credenciales}} - Precios Stand: {{settings.precio_stand}} - Precios Semiprivado: {{settings.precio_sp}} </small></p>
    <div class="p-4">
        <div id="espacioSVG" class="card-2"></div>
    </div>
</div>
</template>
<script>
import {
    SVG
} from "@svgdotjs/svg.js";
export default {
    data() {
        return {
            settings: {
                area: '',
                area_nombre: '',
                area_tipo: '',
                precios: 0,
                credenciales: 0,
                codigo_from: 0,
                codigo_to: 0,
                stand_w: 0,
                stand_h: 0,
                columns: 0,
                rows: 0,
                padding: 0,
                radius: 0,
                stroke: 0,
                strokecolor: '',
                firstClass: '',
                standClass: '',
                textClass: '',
                visibility: ''
            },
        }
    },
    methods: {
        initEspacio() {
            var server = JSON.parse(localStorage.getItem("espaciosSVG"));
            // console.log(server.espaciosGenerados[0]);
            // this.disableSpace(server.espaciosHabilitados)
            this.settings = server.configuracion
            // let espacios = server.espacios;
            // let vacios = server.disablesArr;
            let ocultos = server.espaciosOcultos;
            let config = server.configuracion;
            var counter = 0;
            // var d = new Date();
            // var n = d.getFullYear();
            const svgWidth =
                config.stand_w * config.columns +
                (config.columns + 1) * config.padding;
            const svgHeight =
                config.stand_h * config.rows +
                (config.rows + 1) * config.padding;
            var draw = SVG()
                .addTo("#espacioSVG")
                .size(svgWidth, svgHeight)
                .viewbox(0, 0, svgWidth, svgHeight)
                .attr({
                    x: 0,
                    y: 0
                });
            this.drawSemiprivados(
                config.stand_w,
                config.stand_h,
                config.padding,
                config.columns,
                config.rows,
                draw
            );
            for (let j = 0; j < config.rows; j++) {
                for (let i = 0; i < config.columns; i++) {
                    counter++;
                    var group = draw.group().addClass("stand");
                    let newX =
                        (config.stand_w + config.padding) * i +
                        config.padding;
                    let newY =
                        (config.stand_h + config.padding) * j +
                        config.padding;
                    var rect = draw
                        .rect(config.stand_w, config.stand_h)
                        .fill("none")
                        .move(newX, newY)
                        .radius(config.radius)
                        .stroke({
                            width: config.stroke,
                            color: config.strokecolor
                        })
                        .addClass("cuadro");
                    var habilitados = this.generarEspacios(counter);
                    if (!habilitados === false) {
                        var text = draw
                            .plain(habilitados.number)
                            // .plain("*")
                            .attr({
                                x: newX +
                                    config.stand_w / config.stroke,
                                y: newY +
                                    config.stand_h / config.stroke
                            })
                            .addClass("number");
                        rect.attr(
                            "id",
                            habilitados.rectId
                        );
                        text.attr(
                            "id",
                            habilitados.textId
                        );
                        group.attr("id", habilitados.id);
                        group.data("numero", habilitados.number);
                    }
                    group.add(rect);
                    group.add(text);
                    var resespace = this.buscarAttrDisable(counter);
                    if (!resespace === false) {
                        if (resespace.hidden) {
                            group.remove();
                        }
                    }
                    if (ocultos.indexOf(counter) === -1) {
                        //
                    } else {
                        group.remove();
                    }
                }
            }
            server.espaciosHabilitados.forEach(element => {
                this.generarDisponibles(element.number);
            });
            console.clear()
        },
        buscarAttrDisable(numero) {
            var __POSTS = JSON.parse(localStorage.getItem("espaciosSVG"));
            var __FOUND = __POSTS.espaciosDeshabilitados.find(o => o.number === numero.toString());
            if (__FOUND) {
                return __FOUND;
            }
        },
        generarDisponibles(counter) {
            var __POSTS = JSON.parse(localStorage.getItem("espaciosSVG"));
            var __FOUND = __POSTS.espaciosHabilitados.find(o => o.number === counter.toString());
            if (__FOUND) {
                var espacio = document.getElementById(__FOUND.id);
                
                var re = espacio.getElementsByTagName("rect")[0];
                var te = espacio.getElementsByTagName('text')[0];
                re.setAttribute('id', __FOUND.rectId);
                te.setAttribute('id', __FOUND.textId);
                te.textContent = __FOUND.number;
            } else {
                console.log("error generarDisponibles(counter)")
            }
        },
        generarEspacios(counter) {
            //    var numero=1
            var __POSTS = JSON.parse(localStorage.getItem("espaciosSVG"));
            var __FOUND = __POSTS.espaciosGenerados.find(o => o.number === counter);
            if (__FOUND) {
                return __FOUND;
            }
        },
        drawSemiprivados(width, height, fakePadding, columns, rows, draw) {
            var loadSP = JSON.parse(localStorage.getItem('espaciosSVG'));
            console.log(loadSP.semiprivados)
            var groupsp1 = draw.group().addClass("stand");
            var xsp1 = fakePadding;
            var ysp1 = fakePadding;
            var rectsp1 = draw
                .rect(width * 2 + fakePadding, height * 2 + fakePadding)
                .fill("none")
                .move(fakePadding, fakePadding)
                .radius(8)
                .stroke({
                    width: 2,
                    color: "#c5cbd4"
                })
                .addClass("cuadro");
            rectsp1.attr("id", "SP1-A");
            var txtsp1 = draw
                .plain("SP1")
                .attr({
                    x: xsp1 + width * 2 / 2,
                    y: ysp1 + height * 2 / 2
                })
                .addClass("number");
            groupsp1.add(rectsp1);
            groupsp1.add(txtsp1);
            groupsp1.attr("id", "SP1-" + this.settings.area);
            groupsp1.data("numero", "SP1-" + this.settings.area);
            var insertSP1 = {
                id: "SP1" + "-" + this.settings.area,
                number: "SP1",
                code: "SP1" + "-" + this.settings.area,
                hidden: false,
                type: "SP"
            };
            console.log(insertSP1)
            /* ------*****------------------*/
            var xsp = columns * width - 2 * fakePadding + 1;
            var ysp = fakePadding;
            draw
                .rect(width * 2 + fakePadding, height * 2 + fakePadding)
                .fill("none")
                .move(columns * width - 2 * fakePadding + 1, fakePadding)
                .radius(8)
                .stroke({
                    width: 2,
                    color: "#c5cbd4"
                })
                .addClass("cuadro");
            draw
                .plain("Baños")
                .attr({
                    x: xsp + width * 2 / 2,
                    y: ysp + height * 2 / 2
                })
                .addClass("number");
            var insertSP = {
                id: "SP0" + "-" + this.settings.area,
                number: "Baños",
                code: "SP0" + "-" + this.settings.area,
                hidden: false,
                type: "servicio"
            };
            console.log(insertSP)
            /* ------*****------------------*/
            var groupsp2 = draw.group().addClass("stand");
            var xsp2 = fakePadding;
            var ysp2 = rows * height + fakePadding + 1;
            var rectsp2 = draw
                .rect(width * 2 + fakePadding, height * 2 + fakePadding)
                .fill("none")
                .move(fakePadding, rows * height + fakePadding + 1)
                .radius(8)
                .stroke({
                    width: 2,
                    color: "#c5cbd4"
                })
                .addClass("cuadro");
            rectsp2.attr("id", "SP2-A");
            var txtsp2 = draw
                .plain("SP2")
                .attr({
                    x: xsp2 + width * 2 / 2,
                    y: ysp2 + height * 2 / 2
                })
                .addClass("number");
            groupsp2.add(rectsp2);
            groupsp2.add(txtsp2);
            groupsp2.attr("id", "SP2-A");
            groupsp2.data("numero", "SP2-A");
            var insertSP2 = {
                id: "SP2" + "-" + this.settings.area,
                number: "SP2",
                code: "SP2" + "-" + this.settings.area,
                hidden: false,
                type: "SP"
            };
            console.log(insertSP2)
            /* ------*****------------------*/
            var groupsp3 = draw.group().addClass("stand");
            var xsp3 = columns * width - 2 * fakePadding + 1;
            var ysp3 = rows * height + fakePadding + 1;
            var rectsp3 = draw
                .rect(width * 2 + fakePadding, height * 2 + fakePadding)
                .fill("none")
                .move(
                    columns * width - 2 * fakePadding + 1,
                    rows * height + fakePadding + 1
                )
                .radius(8)
                .stroke({
                    width: 2,
                    color: "#c5cbd4"
                })
                .addClass("cuadro");
            rectsp3.attr("id", "SP3-A");
            var txtsp3 = draw
                .plain("SP3")
                .attr({
                    x: xsp3 + width * 2 / 2,
                    y: ysp3 + height * 2 / 2
                })
                .addClass("number");
            groupsp3.add(rectsp3);
            groupsp3.add(txtsp3);
            groupsp3.attr("id", "SP3-A");
            groupsp3.data("numero", "SP3-A");
            var insertSP3 = {
                id: "SP3" + "-" + this.settings.area,
                number: "SP3",
                code: "SP3" + "-" + this.settings.area,
                hidden: false,
                type: "SP"
            };
            console.log(insertSP3)
        }
    },
    mounted() {
        this.initEspacio()
    }
}
</script>
<style>
</style>
