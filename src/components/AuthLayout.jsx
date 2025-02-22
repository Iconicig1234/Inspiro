import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//this will work as kind of wrapper where components inside must be protected
function Protected({ children, authentication = true }) {

    //here we will first verify if the user is logged in or not by just querying the store
    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()

    const [loader, setLoader] = useState(true)

    //now we need to write some logic about what to do when authentication status changes
    useEffect(() => {
        //when the user is not logged in and trying to get the page that requires the user login then it will open up login page 
        //to first login to see that pages 
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        }
        else if (!authentication && authStatus !== authentication) {
            //here user is already logged in as authStatus =true
            navigate('/')
        }
        setLoader(false)
    }, [authStatus, authentication, navigate])

    return loader ? null : <>{children}</> //try to add spinner or something as loading component
}

export default Protected