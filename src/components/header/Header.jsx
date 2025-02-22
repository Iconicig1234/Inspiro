import { useState } from 'react'; // Add useState for mobile menu
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import Container from '../container/Container';
import LogoutBtn from './LogoutBtn';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const userData = useSelector((state) => state.auth.userData);

  const navItems = [
    {
      name: "Home",
      slug: '/',
      active: true,
    },
    {
      name: "Login",
      slug: '/login',
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: '/add-post',
      active: authStatus,
    },
    {
      name: "User Profile",
      slug: userData ? `/user-profile/${userData.$id}` : '/login',
      active: authStatus,
    },
  ];

  return (
    <header className='sticky top-0 z-50 py-4 shadow-lg bg-cyan-950 transition-shadow duration-300 hover:shadow-xl'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='flex-shrink-0'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className='lg:hidden text-white focus:outline-none'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <ul className='hidden lg:flex space-x-6'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='relative px-6 py-2 text-white font-semibold rounded-lg transition duration-300 hover:text-lime-300 group'
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 h-1 w-0 bg-lime-300 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <ul className='lg:hidden absolute top-16 right-0 bg-cyan-950 w-full py-4 shadow-lg'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className='text-center py-2'>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsMobileMenuOpen(false); // Close menu after navigation
                      }}
                      className='text-white font-semibold hover:text-lime-300'
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}

              {authStatus && (
                <li className='text-center py-2'>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;