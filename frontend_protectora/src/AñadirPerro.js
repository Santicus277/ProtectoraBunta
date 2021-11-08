import React from 'react';
import Ruta from './Ruta';


class AñadirPerro extends React.Component{

    constructor(props){

        super(props);
        this.state={

            perro:{

                "nombre": "",
                "direccion":"",
                "descripcion":"",


            },

        };
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
        

    }

    async manejarEnvioDeFormulario(e) {

        e.preventDefault();
    

        const cargaUtil = JSON.stringify(this.state.perro);
      
        const respuesta = await fetch(`${Ruta.PHP}/AñadirPerro.php`, {
            method: "POST",
            body: cargaUtil,
        });
        const exitoso = await respuesta.json();
        if (exitoso) {
            window.alert("Se ha guardado con exito");
            
            this.setState({
                perro: {
                    nombre: "",
                    direccion: "",
                    descripcion: "",
                }
            });
        } else {
            window.alert("No se ha podido guardar");
        }
    }


    manejarCambio(e) {
       
        const clave = e.target.id;
        let valor = e.target.value;
        this.setState(state => {
            const perroUpdate = state.perro;
           
           
            
            perroUpdate[clave] = valor;
            return {
                perro: perroUpdate,
            }
        });


}

render() {
    return (
        <div className="mb-3">
            <h1 className="form-label">Añadir perro</h1>
           
            <form className="field" onSubmit={this.manejarEnvioDeFormulario}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="nombre">Nombre:</label>
                    <input autoFocus required placeholder="Nombre" type="text" id="nombre" onChange={this.manejarCambio} value={this.state.perro.nombre} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="direccion">Dirección:</label>
                    <textarea required placeholder="Dirección" type="text" id="direccion" onChange={this.manejarCambio} value={this.state.perro.direccion} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="descripcion">Descripción:</label>
                    <textarea  required placeholder="Descripción" type="text" id="descripcion" onChange={this.manejarCambio} value={this.state.perro.descripcion} className="form-control" />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary">Guardar</button>
                    &nbsp;
                    
                </div>
            </form>
        </div>
    );





}
}

export default AñadirPerro;