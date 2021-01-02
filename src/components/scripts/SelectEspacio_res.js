export default {
	methods: {
		clicksvg(event) {
			var rect = event.target;
			const texto = rect.nextElementSibling;
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
				} else {
					group.setAttribute(
						"id",
						"G" + newID + "-" + this.settings.area
					);
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
						codigo: "G" + newID + this.settings.area,
						numero: newID,
						estado: "DISPONIBLE",
						idCuadro: datanum,
						precio: this.settings.precios,
						area: this.settings.area,
						cred: this.settings.credenciales,
						evento_id: 4
					};
					this.saveEspacios.espacios.push(newSpace);
				}
			}
			// let data = {
			// 	ide: StandId
			// };
			if (this.editar) {
				this.SaveDataToLocalStorage(groupid, datanum);
				// group.style.visibility = "hidden";
				group.setAttribute("visibility", "hidden");
			} else {
				// console.log(StandClass, data);
				// if (
				//     StandClass == "cuadro" ||
				//     StandClass == "reservado-empty"
				// ) {
				//     this.getItem(data);
				//     rect.classList.remove("cuadro");
				//     rect.classList.remove("reservado-empty");
				//     rect.classList.add("cuadro-off");
				//     texto.classList.remove("number");
				//     texto.classList.add("number-off");
				// } else if (StandClass == "cuadro-off") {
				//     rect.classList.remove("cuadro-off");
				//     rect.classList.add("cuadro");
				//     texto.classList.remove("number-off");
				//     texto.classList.add("number");
				//     this.delItem(data);
				// } else if (StandClass == "reservado") {
				//     alert("Espacio ocupado, seleccione otro por favor. ")
				// } else {
				//     alert("Error en el Mapeo SVG")
				// }
				// console.log(StandClass + '----' + StandId + '******' + textos)
				// console.log(JSON.stringify(this.espacios))
			}
		},
		SaveDataToLocalStorage(data, datanum) {
			console.log(data + "---" + datanum);
			if (datanum) {
				var ar = {
					id: data,
					numero: datanum
				};
				// console.log(localStorage.getItem('disablesArray'))
				// let getItems = JSON.parse(localStorage.getItem("disablesArray"));
				// getItems.push(ar);
				this.saveEspacios.disablesArr.push(ar);
				// localStorage.setItem("disablesArray", JSON.stringify(getItems));
			} else {
				alert("Espacio seleccionado no valido");
			}
		},
		getItem(data) {
			this.saveEspacios.espacios.push(data);
		},
		delItem(ide) {
			// const result = this.espacios.find(
			//     item => item.codigo === ide.ide
			// );
			// console.log(ide)
			const result = this.saveEspacios.espacios.find(
				elem => elem.ide === ide.ide
			);
			if (result) {
				this.saveEspacios.espacios.splice(
					this.saveEspacios.espacios.indexOf(result),
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
