import { Input, Card, Button, Label, Container } from '../components/ui'
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'

function RegisterPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signup, errors: signupErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data)

    if (user) {
      navigate('/profile')
    }
  })

  return (
    <Container className='h-[calc(100vh-10rem)] flex items-center justify-center'>
      <Card>

        {
          signupErrors && (
            signupErrors.map((err, index) => (
              <p key={index} className="bg-red-500 text-white p-2 text-center">
                {err}
              </p>
            ))
          )
        }

        <h3 className="text-2xl font-bold">Registro</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor='name'>Nombres:</Label>
          <Input placeholder="Ingrese su nombre y apellido"
            {...register('name', {
              required: true,
            })}
          />

          {
            errors.name && <p className='text-red-500'> El nombre es requerido</p>
          }
          <Label htmlFor='email'>Correo:</Label>
          <Input type="email" placeholder="Ingrese su correo"
            {...register('email', {
              required: true
            })}
          />
          {
            errors.email && <p className='text-red-500'> El correo es requerido</p>
          }
          <Label htmlFor='password'>Contraseña:</Label>
          <Input type="password" placeholder="Ingrese su contraseña"
            {...register('password', {
              required: true
            })}
          />
          {
            errors.password && <p className='text-red-500'> La contraseña es requerido</p>
          }

          <Button>Registrar</Button>
          <div className='flex justify-between my-4'>
            <p> Ya estás registrado? </p>
            <Link to='/login' className='font-bold'> Inicio de sesión</Link>
          </div>
        </form>
      </Card>
    </Container>
  )
}

export default RegisterPage