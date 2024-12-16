import { Input, Card, Button, Label } from '../components/ui'
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'

function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signin } = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {
        await signin(data)
        navigate('/profile')
    })


    return (
        <div className='h-[calc(100vh-64px)] flex items-center justify-center'>
            <Card>
                <h1 className='text-4xl font-bold my-2 text-center'>Inicio de  sesión</h1>

                <form onSubmit={onSubmit}>
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

                    <Button>Iniciar sesión</Button>
                    <div className='flex justify-between my-4'>
                        <p> ¿No está registrado? </p>
                        <Link to='/register' className='font-bold'> Registro</Link>
                    </div>

                </form>
            </Card>
        </div>
    )
}

export default LoginPage