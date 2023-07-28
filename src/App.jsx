import React from "react";
import {useForm} from 'react-hook-form'

function App() {

  const {
    register, 
    handleSubmit, 
    formState: {errors},
    watch,
    setValue,
    reset
} = useForm();

  const onSubmit = handleSubmit((data)=> {
    console.log(data)
    alert("Enviando datos...")
    reset()
  })

  return(
    <form onSubmit={onSubmit}>
      <label htmlFor="nombre">Nombre:</label>
      <input 
        type="text" 
        placeholder="Ejemplo: Juan"
        {...register("nombre", {
          required: {
            value:true,
            message: "El nombre es requerido"
          },
          minLength: {
            value: 2,
            message: "El nombre debe tener almenos 2 caracteres"
          },
          maxLength: {
            value: 20,
            message: "El nombre dedbe tener maximo 20 caracteres"
          }
        })} 
        />
        {
          errors.nombre && <span>{errors.nombre.message}</span>
        }
      <label htmlFor="correo">Correo:</label>
      <input 
        type="email"
        placeholder="Ejemplo@gmail.com"
        {...register("email", {
          required: {
            value: true,
            message: "Correo requerido"
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$/,
            message: "Correo no valido"
          }
        })} 
        />
        {
          errors.email && <span>{errors.email.message}</span>
        }
      <label htmlFor="password">Contrseña:</label>
      <input 
        type="password"
        placeholder="Minimo 6 caracteres"
        {...register("password",{
          required: {
            value: true,
            message: "password requerido"
          },
          minLength: {
            value: 6,
            message: "La constraseña debe tener al menos 6 caracteres"
          }
          })}
        />
          {
            errors.password && <span>{errors.password.message}</span>
          }
      <label htmlFor="confirmarPassword">Confirmar contraseña:</label>
      <input 
        type="password"
        {...register("confirmarPassword", {
          required: {
            value: true,
            message: "Confirmar contraseña es requerido",
          },
            validate: value => value == watch("password") || "Las contrseñas no coinciden"            
        })}
        />
        {
          errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>
        }
      <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
      <input 
        type="date"
        {...register("fechaNacimiento", {
          required: {
            value: true,
            message: "Fecha de nacimiento es requerida"
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value)
            const fechaActual = new Date()
            const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()
            console.log(edad)

            return edad >= 18 || "Debes ser mayor de edad"
          }
        })} 
        ></input>
      {
        errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>
      }
      <label 
        htmlFor="pais">Pais:</label>
      <select 
      className="pais-form"
      {...register('pais')}>
      <option value="UY">
          Uruguay
      </option>
      <option value="CO">
          Colombia
      </option>
      <option value="AR">
          Argentina
      </option>
      </select>

      {
        watch("pais") == 'ar' && (
          <>
          <input 
            type="text" 
            placeholder="Provincia"
            className="provincia-form"
            {...register('provincia', {
              required: {
                value: true,
                message: "Provincia es requerida"
              }
            })}
            ></input>
            {errors.provincia && <span>{errors.provincia.message}</span>}
            </>
      )}

    <label htmlFor="foto">Foto de perfil</label>
    <input 
      type="file" 
      className="foto-form"
      onChange={(e)=>{
        console.log(e.target.files[0])
        setValue('fotoDelUsuario', e.target.files[0].name)
      }}
      ></input>
    <div id="terminos__condiciones">
    <label htmlFor="terminos">
    Acepto los <a href="https://www.react-hook-form.com/api/useform/">terminos y condiciones</a>
    <input 
      type="checkbox"
      className="checkbox-form"
      {...register("terminos", {
        required: {
          value: true,
          message: "Debes aceptar los terminos"
        }
      })} 
    ></input>
    </label>
    </div>
    {errors.terminos && <span>{errors.terminos.message}</span>}
  
    <button 
      type="submit"
      className="boton-enviar"
    >
      Enviar
    </button>

    <pre>
      {JSON.stringify(watch(), null, 2)}
    </pre>
    </form>
  )
}

export default App