import React from "react"
import {firebase} from './firebase'

function App() {
  
  const [nombre,setNombre]=React.useState('')
  const [apellido,setApellido]=React.useState('')
  const [id,setId]=React.useState('')
  const [lista,setLista]=React.useState([])
  const [modoEdicion,setModoEdicion]=React.useState(false)
  const [error,setError]=React.useState(null)
  React.useEffect(()=>{
    const obtenerDatos = async()=>{
    try {
      const db= firebase.firestore()
      const data= await db.collection('usuario').get()
      
      const arrayData= data.docs.map(doc=>({id:doc.id,...doc.data()}))
      console.log(arrayData);
      setLista(arrayData)
    } catch (error) {
      console.log(error)
    }
    }
    obtenerDatos()
      },[])


  const guardarDatos= async(e)=>{
    e.preventDefault()
    if(!nombre.trim()){
      setError('Ingrese el nombre')
      return
    }
    if(!apellido.trim()){
      setError('Ingrese el apellido')
      return
    }
    try {
      const db=firebase.firestore()
      const nuevousuario={
        nombre,apellido
      }
      const dato= await await db.collection('usuario').add(nuevousuario)
      setLista([
        ...lista,
        {...nuevousuario,id:dato.id}
      ])

    } catch (error) {
      console.log(error);
    }
    setNombre('')
    setApellido('')
  
    setError(null)
  }
  const eliminarDato= async (id)=>{
    try {
      const db=firebase.firestore()
      await db.collection('usuario').doc(id).delete()
      const listaFiltrada=lista.filter((elemento)=>elemento.id!==id)
      setLista(listaFiltrada)
      }
      catch (error) {
      console.log(error);
    }
  }


  const editar=(elemento)=>{
    setModoEdicion(true) 
    setNombre(elemento.nombre)
    setApellido(elemento.apellido)
    setId(elemento.id)
  }
  const editarDatos=(e)=>{
    e.preventDefault()
    if(!nombre.trim()){
      setError('Ingrese el nombre')
      return
    }
    if(!apellido.trim()){
      setError('Ingrese el apellido')
      return
    }
    const listaEditada=lista.map(
     
      (elemento)=>elemento.id===id ? {id:id,nombre:nombre,apellido:apellido}:
      elemento)
    
    setLista(listaEditada)
   
    setModoEdicion(false)
    setNombre('')
    setApellido('')
    setId('')
    
    setError(null)
  }
  return (
    <div className="container">

       <h2 className="text-center">{
         modoEdicion ? 'Editar Usuario': 'Registro de Usuarios'
       }</h2>
      {}
      <div className="row">
        <div className="col-12">
          <form onSubmit={ modoEdicion ? editarDatos : guardarDatos}>
            {}
            {
              error ? (
                <div className="alert alert-danger" role="alert">
              {error}
            </div>
              ):
              null
            }
            {}
            <input type="text" 
            placeholder="Ingrese el Nombre"
            className="form-control mb-3"
            onChange={(e)=>{setNombre(e.target.value)}}
            value={nombre}
            />
            {}
            <input type="text" 
            placeholder="Ingrese el Apellido"
            className="form-control mb-3"
            onChange={(e)=>{setApellido(e.target.value)}}
            value={apellido}
            />
            {}
            <div className="d-grid gap-2">
              {
                modoEdicion ? <button className="btn btn-outline-warning mb-3" type="submit">Editar</button>
                : <button className="btn btn-outline-info mb-3" type="submit">Agregar</button>
              }
            </div>
          </form>
        </div>
      </div>
      {}
      <div className="row">
        <div className="col-12">
        <h4 className="text-center">Lista de Usuarios</h4>
          <ul className="list-group">
          {
            lista.length===0 ? <li className="list-group-item">No existen Usuarios</li>:
            (
              lista.map((elemento)=>(
                <li className="list-group-item" key={elemento.id}><span className="lead">
                  {elemento.nombre} {elemento.apellido}
                  </span>
                  <button className="btn btn-success btn-sm mx-2 float-end"
                  onClick={()=>editar(elemento)}
                  >Editar</button>
                  <button className="btn btn-danger btn-sm mx-2 float-end"
                  onClick={()=>eliminarDato(elemento.id)}
                  >Eliminar</button>
                </li>
              ))
            )
          }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
