import { Input, Card, Button } from '../components/ui'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit( async (data) => {
        const res = await axios.post('http://localhost:3000/api/signup', data, {
            withCredentials: true
        })
        console.log(res)
    })

    return (
        <div className='h-[calc(100vh-64px)] flex items-center justify-center'>
            <Card>
                <h3 className="text-2xl font-bold">Registro</h3>

                <form onSubmit={onSubmit}>
                    <Input placeholder="Ingrese su nombre y apellido"
                        {...register('name', {
                            required: true,
                        })}
                    />

                    {
                        errors.name && <p className='text-red-500'> El nombre es requerido</p>
                    }

                    <Input type="email" placeholder="Ingrese su correo"
                        {...register('email', {
                            required: true
                        })}
                    />
                    {
                        errors.email && <p className='text-red-500'> El email es requerido</p>
                    }
                    <Input type="password" placeholder="Ingrese su contraseña"
                        {...register('password', {
                            required: true
                        })}
                    />
                    {
                        errors.password && <p className='text-red-500'> El password es requerido</p>
                    }

                    <Button>Registrar</Button>
                </form>
            </Card>
        </div>
    )
}

export default RegisterPage