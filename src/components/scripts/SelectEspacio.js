// import { SVG } from "@svgdotjs/svg.js";
export default {
	methods: {
		clicksvg(event) {
			var rect = event.target;
			const texto = rect.nextElementSibling;
			// var attrX = rect.getAttribute("x");
			// var attrY = rect.getAttribute("y");

			// const StandClass = rect.getAttribute("class");
			// const StandId = rect.getAttribute("id");
			if (event.path) {
				var group = event.path[1];
			} else {
				group = event.target.parentNode;
			}
			var groupid = group.getAttribute("id");
			var datanum = group.dataset.numero;
			if (this.asignar) {
				let newID = prompt("Numero Espacio", "");
				if (newID == null || newID == "") {
					//
				} else {
					rect.setAttribute(
						"id",
						"R" + newID + "-" + this.settings.area
					);
					texto.setAttribute(
						"id",
						"T" + newID + "-" + this.settings.area
					);
					texto.textContent = newID;
					var newSpace = {
						id: groupid,
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

					const result = this.saveEspacios.espaciosHabilitados.find(
						elem => elem.id === groupid
					);
					if (result) {
						this.saveEspacios.espaciosHabilitados.splice(
							this.saveEspacios.espaciosHabilitados.indexOf(
								result
							),
							1
						);
						this.saveEspacios.espaciosHabilitados.push(newSpace);
					} else {
						this.saveEspacios.espaciosHabilitados.push(newSpace);
					}
				}
			}

			if (this.editar) {
				if (datanum) {
					var ar = {
						id: groupid,
						number: datanum,
						code: "G" + this.settings.area + datanum,
						hidden: true,
						type: "stand"
					};

					const result = this.saveEspacios.espaciosDeshabilitados.find(
						elem => elem.id === groupid
					);
					if (result) {
						this.saveEspacios.espaciosDeshabilitados.splice(
							this.saveEspacios.espaciosDeshabilitados.indexOf(
								result
							),
							1
						);
						rect.classList.remove("cuadro-disable");
						rect.classList.add("cuadro");
						texto.classList.remove("number-disable");
						texto.classList.add("number");
					} else {
						this.saveEspacios.espaciosDeshabilitados.push(ar);
						rect.classList.remove("cuadro");
						rect.classList.add("cuadro-disable");
						texto.classList.remove("number");
						texto.classList.add("number-disable");
					}
					// group.setAttribute("visibility", "hidden");
				} else {
					alert("Espacio seleccionado no valido");
				}
			}

			if (this.entrada === true) {
				texto.textContent = "Entrada";
				rect.remove();
				var newsenal = {
					id: groupid,
					text: "Entrada",
					hidden: false,
					type: "entrada",
					enabled: true
				};
				texto.classList.remove("number");
				texto.classList.add("entrada-style");

				this.saveEspacios.entrada = newsenal;
				// console.log(attrX);
				// this.insertArrow(attrX, attrY, groupid);
			}
			if (this.salida === true) {
				texto.textContent = "Salida";
				rect.remove();
				var newsalida = {
					id: groupid,
					text: "Salida",
					hidden: false,
					type: "salida",
					enabled: true
				};
				texto.classList.remove("number");
				texto.classList.add("salida-style");
				this.saveEspacios.salida = newsalida;
			}
		},

		getItem(data) {
			this.saveEspacios.senales.push(data);
		},
		delItem(ide) {
			const result = this.saveEspacios.espaciosHabilitados.find(
				elem => elem.id === ide.ide
			);
			if (result) {
				this.saveEspacios.espaciosHabilitados.splice(
					this.saveEspacios.espaciosHabilitados.indexOf(result),
					1
				);
				// let id = ide.ide.slice(-1);
				// this.totalBadgesRemove(id);
			} else {
				console.log("Error en el Espacio");
			}
		}
	}
};
