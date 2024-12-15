import { Link } from "react-router-dom"
import { Card } from '../components/ui'

export function NotFound() {
    return (
        <div className='h-[calc(100vh-64px)] flex items-center justify-center'>
            <Card>
                <h1 className='text-4xl font-bold my-2'>Página no encontrada</h1>
                <h3 className='text-2xl'>404</h3>
                <Link to='/'>Ir a la página de inicio</Link>
            </Card>
        </div>
    )
}