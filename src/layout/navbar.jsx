import { Link } from 'react-router-dom'


const Navbar = () => {

    return (
    <>
    <nav className='flex gap-10 justify-center py-4 bg-cyan-500 text-white'>
        <Link to={'/'}>Home</Link>
        <Link to={'/firstPage'}>First Page</Link>
        <Link to={'/secondPage'}>Second Page</Link>

    </nav>
    </>
 )
}

export default Navbar