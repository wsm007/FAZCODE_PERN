import { Link, useLocation } from 'react-router-dom';
import { navigation } from './navigation';
import { Container } from '../ui';

const Navbar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <nav className='bg-zinc-950'>
      <Container className='flex justify-between py-3'>
        <Link to='/'>
          <h1 className='font-bold text-2xl'>Proyecto tareas</h1>
        </Link>

        <ul className='flex gap-x-2'>
          {navigation.map(({ path, name }) => (
            <li key={name} className={
              `text-slate-300 ${location.pathname === path && 'bg-sky-600 px-3 py-1'}`
            }>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;