<template>
<div class="container-fluid pt-3">
    <div class="row">
        <div class="col-md-6">
            <div class="pl-5 pr-5">
                <div id="espacioSVG" class="card-2   backsvg_conf_b" @click="clicksvg"></div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card mb-2">
                <div class="card-body">
                    <ul class="list-group" v-if="pabellones_arr.lenght>0">
                        <li class="list-group-item" v-for="pabe in pabellones_arr" :key="pabe.id">{{pabe.nombre}}</li>
                    </ul>
                    <!-- <span v-else>No existen registros</span> -->
                </div>
            </div>
            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <label for="">Nombre</label>
                            <input type="text" class="form-control" placeholder="Nombre" v-model="pabellon.nombre">
                        </div>
                        <div class="col">
                            <label for="">Inicial</label>
                            <input type="text" class="form-control" placeholder="Inicial" v-model="pabellon.area">
                        </div>
                    </div>
                    <div class="mt-2">
                        <button type="submit" class="btn btn-primary" @click.prevent="addLayout()">Generar Layout</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="card mb-2">
                        <div class="card-body">
                            <h6>1. Configurar parametros del espacio (pabellon/Area)</h6>
                            <div class="col-sm">
                                <label for="">Inicial </label>
                                <input type="text" class="form-control form-control-sm" v-model="settings.area">
                            </div>
                            <div class="col-sm">
                                <label for="">Nombre </label>
                                <input type="text" class="form-control form-control-sm" v-model="settings.area_nombre">
                            </div>
                            <div class="col-sm">
                                <label for="">Precio Stand</label>
                                <input type="text" class="form-control form-control-sm" v-model="settings.precio_stand">
                            </div>
                            <div class="col-sm">
                                <label for="">Precio SP</label>
                                <input type="text" class="form-control form-control-sm" v-model="settings.precio_sp">
                            </div>
                            <div class="col-sm">
                                <label for="">Credenciales Stand</label>
                                <input type="text" class="form-control form-control-sm" v-model="settings.credenciales">
                            </div>
                            <div class="col-sm">
                                <label for="">Credenciales SP</label>
                                <input type="text" class="form-control form-control-sm" v-model="settings.credenciales_sp">
                            </div>
                            <div class="text-center p-2">
                                <button class="btn btn-success btn-block btn-lg" @click.prevent="generarLayout()">Generar Layout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card mb-2">
                        <div class="card-body">
                            <div class="">
                                <div class="p-2">
                                    <h6>2. Configurar distribucion de espacios</h6>
                                    <!-- <pre>{{saveEspacios.espaciosDeshabilitados}}</pre> -->
                                    <!-- <ul class="  p-0 m-0">
                                    <li v-for="item in saveEspacios.espaciosDeshabilitados" :key="item.id" class="  pl-2 p-0 m-0">
                                        <a href="javascript:void(0)" @click.prevent="restaurarEspacio(item.id)"> Espacio {{item.number}}
                                            <span class="badge badge-danger"> X </span>
                                        </a>
                                    </li>
                                </ul> -->
                                    <button class="btn btn-sm btn-primary m-1" @click.prevent="editSpace">Editar Espacios</button>
                                </div>
                                <div class="p-2">
                                    <h6>3. Asignar numeracion a los espacios</h6>
                                    <!-- <pre>
                                   {{saveEspacios.espaciosHabilitados}}
                               </pre> -->
                                    <!-- <ul class="m-0 p-0">
                                    <li v-for="espacio in saveEspacios.espaciosHabilitados" :key="espacio.id" class="pl-2 p-0 m-0">
                                        <div class="d-flex justify-content-between">
                                            <div class=" ">Stand: <strong>{{espacio.number}} - {{espacio.area}}</strong>, {{espacio.enabled}}</div>
                                            <div class=" "><button class="btn btn-sm btn-primary" @click="editarEspacio(espacio)">Editar</button></div>
                                        </div>
                                    </li>
                                </ul> -->
                                    <button class="btn btn-sm btn-primary m-1" @click.prevent="AsignNumber">Asignar Numeracion</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2">
                        <div class="card-body">
                            <div>
                                <div class="p-2">
                                    <h6>Entrada</h6>
                                    {{this.saveEspacios.entrada}}
                                    <button class="btn btn-sm btn-primary m-1" @click.prevent="editEntrada()">Asignar Entrada</button>
                                    <button class="btn btn-sm btn-primary m-1" @click.prevent="rotarEntrada()">rotar</button>
                                </div>
                                <div class="p-2">
                                    <h6>Salida</h6>
                                    {{this.saveEspacios.salida}}
                                    <button class="btn btn-sm btn-primary m-1" @click.prevent="EditSalida()">Asignar Salida</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <pre>{{pabellones_arr}}</pre>
            <div class="p-1 alert-primary" role="alert" v-if="editar">
                <strong>Editar Layout pabellon {{settings.area}}</strong> <br>
                <small>Seleccione los espacios que seran deshabilitados o que formaran parte de los pasillos.</small>
            </div>
            <div class="  alert-success" role="alert" v-if="asignar">
                <strong>Asignar Numeracion pabellon {{settings.area}}</strong> <br>
                <small>Asigne la numeracion a los espacios en el orden que correposnde</small>
            </div>
            <button class="btn btn-primary btn-block" @click.prevent="submit()">Guardar</button>
            Entrada: <strong>{{entrada}}</strong> | Salida: <strong>{{salida}}</strong>
            <!-- <div class="row">
                <div class="col-md-4">
                    <strong>espacios</strong>
                    <small><pre>{{saveEspacios.espaciosGenerados}}</pre></small>
                </div>
                <div class="col-md-4">
                    <strong>stands</strong>
                    <small><pre>{{saveEspacios.espaciosHabilitados}}</pre></small>
                </div>
                <div class="col-md-4">
                    <strong>hiddens</strong>
                    <small><pre>{{saveEspacios.espaciosDeshabilitados}}</pre></small>
                </div>
            </div> -->
        </div>
    </div>
</div>
</template>

<script>
// import {
//     SVG
// } from "@svgdotjs/svg.js";
import scripts from './scripts/espacios';
import selectespacio from './scripts/SelectEspacio';
export default {
    data() {
        return {
            step: 1,
            editar: false,
            asignar: false,
            entrada: false,
            salida: false,
            espaciosgenerados: [],
            saveEspacios: {
                espaciosGenerados: [],
                espaciosDeshabilitados: [],
                espaciosHabilitados: [],
                espaciosOcultos: [],
                configuracion: [],
                semiprivados: [],
                entrada: {},
                salida: {}
            },
            pabellon: {
                nombre: "",
                area: "",
            },
            pabellones_arr: [],
            settings: {
                area: 'B',
                area_nombre: 'Parihuana',
                area_tipo: 'Pabellon',
                precio_stand: 100,
                precio_sp: 100,
                credenciales: 100,
                credenciales_sp: 100,
                codigo_from: 1,
                codigo_to: 51,
                stand_w: 47,
                stand_h: 47,
                columns: 11,
                rows: 14,
                padding: 8,
                radius: 8,
                stroke: 2,
                strokecolor: '#c5cbd4',
                firstClass: 'stand',
                standClass: 'cuadro',
                textClass: 'number',
                visibility: 'hidden'
            },
            // disables: [],
            disablesArr: [],
            hiddenSP: [1, 2, 12, 13, 10, 11, 21, 22, 133, 134, 144, 145, 142, 143, 153, 154, 23, 34, 45, 56, 67, 78, 89, 100, 111, 122, 33, 44, 55, 66, 77, 88, 99, 110, 121, 132]
        }
    },
    mixins: [
        scripts,
        selectespacio
    ],
    methods: {
        addLayout(){
            this.pabellones_arr.push(this.pabellon);
            console.log(this.pabellones_arr)
        },
        generarLayout() {
            if (this.settings.area === '') {
                alert("INGRESE LA INICIAL")
            } else if (this.settings.area_nombre === '') {
                alert("INGRESE EL NOMBRE DEL AREA")
            } else if (this.settings.precio_stand === 0) {
                alert("INGRESE EL PRECIO DE LOS STANDS")
            } else if (this.settings.precio_sp === 0) {
                alert("INGRESE EL PRECIO DE LOS STANDS SP")
            } else if (this.settings.credenciales === 0) {
                alert("INGRESE CANTIDAD DE CREDENCIALES")
            } else if (this.settings.credenciales_sp === 0) {
                alert("INGRESE CANTIDAD DE CREDENCIALES SP")
            } else {
                this.generarEspacios()
            }
        },
        submit() {
            this.saveEspacios.configuracion = this.settings;
            this.saveEspacios.espaciosOcultos = this.hiddenSP;
            localStorage.setItem('espaciosSVG', JSON.stringify(this.saveEspacios));
        },
    },
    async mounted() {
        console.clear()
    },
}
</script>
