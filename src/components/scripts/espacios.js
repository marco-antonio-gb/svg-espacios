import { SVG } from "@svgdotjs/svg.js";
// import * as d3 from "d3";
export default {
	methods: {
		generarEspacios() {
			var counter = 0;
			var d = new Date();
			var n = d.getFullYear();
			const svgWidth =
				this.settings.stand_w * this.settings.columns +
				(this.settings.columns + 1) * this.settings.padding;
			const svgHeight =
				this.settings.stand_h * this.settings.rows +
				(this.settings.rows + 1) * this.settings.padding;
			var draw = SVG()
				.addTo("#espacioSVG")
				.size(svgWidth, svgHeight)
				.viewbox(0, 0, svgWidth, svgHeight)
				.attr({
					x: 0,
					y: 0
				});

			this.drawSemiprivados(
				this.settings.stand_w,
				this.settings.stand_h,
				this.settings.padding,
				this.settings.columns,
				this.settings.rows,
				draw
			);
			// var path = draw.path(
			// 	"M412.167,615.273v12l21-21l-21-21v12.301c-15,0-25.5-4.801-33-15.301 C382.167,597.273,391.167,612.273,412.167,615.273z"
			// );
			// path.fill("#30d158").move(63, 613);
			// path.stroke({
			// 	color: "#30d158",
			// 	width: 1,
			// 	linecap: "round",
			// 	linejoin: "round"
			// });
			// path.attr("id", "pathEntrada");

			// var path2 = draw.path(
			// 	"M413.64,164.905h8l-14,14l-14-14h8.201c0-10-3.201-17-10.201-22 C401.64,144.905,411.64,150.905,413.64,164.905z"
			// );
			// path2.fill("none").move(63, 613);
			// path2.stroke({
			// 	color: "#dadfe6",
			// 	width: 2,
			// 	linecap: "round",
			// 	linejoin: "round"
			// });

			for (let j = 0; j < this.settings.rows; j++) {
				for (let i = 0; i < this.settings.columns; i++) {
					counter++;
					var group = draw.group().addClass("stand");
					let newX =
						(this.settings.stand_w + this.settings.padding) * i +
						this.settings.padding;
					let newY =
						(this.settings.stand_h + this.settings.padding) * j +
						this.settings.padding;
					var rect = draw
						.rect(this.settings.stand_w, this.settings.stand_h)
						.fill("none")
						.move(newX, newY)
						.radius(this.settings.radius)
						.stroke({
							width: this.settings.stroke,
							color: this.settings.strokecolor
						})
						.addClass("cuadro");
					var text = draw
						// .plain(`${counter}`)
						.plain("*")
						.attr({
							x:
								newX +
								this.settings.stand_w / this.settings.stroke,
							y:
								newY +
								this.settings.stand_h / this.settings.stroke
						})
						.addClass("number");
					group.add(rect);
					group.add(text);
					group.on("myevent", function() {
						alert("ta-da!");
					});
					let getItems = this.hiddenSP;

					var id = this.uuidv4();
					var remove = "";
					// console.log(id);
					group.attr("id", n + this.settings.area + id);
					group.data("numero", counter);
					if (getItems.indexOf(counter) === -1) {
						remove = false;
					} else {
						group.remove();
						remove = true;
					}
					var esp = {
						id: n + this.settings.area + id,
						number: counter,
						code: "G" + this.settings.area + counter,
						hidden: remove,
						type: "stand"
					};
					this.saveEspacios.espaciosGenerados.push(esp);
				}
			}
		},
		rotarEntrada() {
			var grad = 30;
			// var elemment = document.getElementById("pathEntrada");
			var rect = SVG("#pathEntrada");
			rect.rotate(grad + grad);
		},
		insertArrow(x, y, id) {
			var draw = SVG.find("#" + id);

			var path = draw.path(
				"M412.167,615.273v12l21-21l-21-21v12.301c-15,0-25.5-4.801-33-15.301 C382.167,597.273,391.167,612.273,412.167,615.273z"
			);
			path.fill("#30d158").move(x, y);
			path.stroke({
				color: "#30d158",
				width: 1,
				linecap: "round",
				linejoin: "round"
			});
			path.attr("id", "pathEntrada");
		},
		restaurarEspacio(data) {
			var espacio = document.getElementById(data);
			if (window.getComputedStyle(espacio).visibility === "hidden") {
				espacio.setAttribute("visibility", "visible");
				// espacio.style.visibility = "visible";
				const result = this.saveEspacios.espaciosDeshabilitados.find(
					elem => elem.id === data
				);
				// console.log(result);
				if (result) {
					this.saveEspacios.espaciosDeshabilitados.splice(
						this.saveEspacios.espaciosDeshabilitados.indexOf(
							result
						),
						1
					);
				} else {
					console.log("Error en el Essssssssssssspacio");
				}
			}
		},
		editarEspacio(data) {
			// console.log(data);
			// var group = document.getElementById(data.id);
			// var groupid = data.id;
			var rect = document.getElementById(data.rectId);
			var text = document.getElementById(data.textId);

			let newID = prompt("Numero Espacio", "");
			if (newID == null || newID == "") {
				console.log(newID);
			} else {
				const result = this.saveEspacios.espaciosHabilitados.find(
					elem => elem.id === data.id
				);
				if (result) {
					this.saveEspacios.espaciosHabilitados.splice(
						this.saveEspacios.espaciosHabilitados.indexOf(result),
						1
					);
					// group.setAttribute(
					// 	"id",
					// 	"G" + newID + "-" + this.settings.area
					// );
					rect.setAttribute(
						"id",
						"R" + newID + "-" + this.settings.area
					);
					text.setAttribute(
						"id",
						"T" + newID + "-" + this.settings.area
					);
					text.textContent = newID;
					var newSpace = {
						id: data.id,
						number: newID,
						code: "G" + newID + this.settings.area,
						hidden: false,
						type: "stand",
						enabled: true,
						price: this.settings.precio_stand,
						area: this.settings.area,
						credentials: this.settings.credenciales,
						event: 4,
						rectId: "R" + newID + "-" + this.settings.area,
						textId: "T" + newID + "-" + this.settings.area
					};
					this.saveEspacios.espaciosHabilitados.push(newSpace);
				} else {
					console.log("Error Edit espacio");
				}
			}
		},
		editEntrada() {
			this.entrada = !this.entrada;
		},
		EditSalida() {
			this.salida = !this.salida;
		},
		AsignNumber() {
			if (this.settings.precios === 0) {
				alert("Asignar valores al precio de los stands");
			} else if (this.settings.credenciales === 0) {
				alert("Asignar valores a las credenciales ");
			} else {
				this.asignar = !this.asignar;
				this.editar = false;
			}
		},
		// drawArrow(x, y) {
		// 	var path = draw.path(
		// 		"M412.167,615.273v12l21-21l-21-21v12.301c-15,0-25.5-4.801-33-15.301 C382.167,597.273,391.167,612.273,412.167,615.273z"
		// 	);
		// 	path.fill("#30d158").move(20, 20);
		// 	path.stroke({
		// 		color: "#30d158",
		// 		width: 1,
		// 		linecap: "round",
		// 		linejoin: "round"
		// 	});
		// },
		editSpace() {
			this.editar = !this.editar;
			this.asignar = false;
		},
		reset() {
			var draw = SVG().addTo("#espacioSVG");
			draw.remove();
			localStorage.removeItem("disablesArray");
			// this.initEspacio();
		},
		uuidv4() {
			return "xxxxxxxx".replace(/[xy]/g, function(c) {
				var r = (Math.random() * 16) | 0,
					v = c == "x" ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			});
		},
		drawSemiprivados(width, height, fakePadding, columns, rows, draw) {
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
				type: "SP",
				price: this.settings.precio_sp,
				credentials: this.settings.credenciales_sp
			};
			this.saveEspacios.semiprivados.push(insertSP1);
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
			this.saveEspacios.semiprivados.push(insertSP);
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
				type: "SP",
				price: this.settings.precio_sp,
				credentials: this.settings.credenciales_sp
			};
			this.saveEspacios.semiprivados.push(insertSP2);
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
				type: "SP",
				price: this.settings.precio_sp,
				credentials: this.settings.credenciales_sp
			};
			this.saveEspacios.semiprivados.push(insertSP3);
			// var id = this.uuidv4();
			// 		var remove = "";

			// 		group.attr("id", n + this.settings.area + id);
			// 		group.data("numero", counter);
			// 		if (getItems.indexOf(counter) === -1) {
			// 			remove = false;
			// 		} else {
			// 			group.remove();
			// 			remove = true;
			// 		}
			// 		var esp = {
			// 			id: n + this.settings.area + id,
			// 			numero: counter,
			// 			hidden: remove
			// 		};
			// 		this.settings.semiprivados.push(esp);
		}
	}
};
