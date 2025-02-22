import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice.js'


function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button
            onClick={logoutHandler}
            className=' bg-lime-600  text-white font-semibold inline-bock px-6 py-2 duration-200 hover:bg-white hover:text-cyan-800 rounded-full'
        >
            Logout
        </button>
    )
}

export default LogoutBtn