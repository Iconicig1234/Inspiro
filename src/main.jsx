import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './App'
import Login from './pages/Login'
import Home from './pages/Home'
import Protected from './components/AuthLayout'
import SignUp from './pages/SignUp'
import AllPosts from './pages/AllPosts'
import AddPost from './pages/AddPost'
import Post from './pages/Post'
import EditPost from './pages/EditPost'
import UserProfile from './pages/UserProfile'

const router = createBrowserRouter([
  //this not the sandwich method that learnt earlier this is one of the object method
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        //trying to render the elements only after checking the authentication
        element: (
          <Protected authentication={false}> {/*this means this component does not require authentication */}
            <Login />
          </Protected>
        )
      },
      {
        path: '/signup',
        element: (
          <Protected authentication={false}>
            <SignUp />
          </Protected>
        )
      },
      {
        path: '/all-posts',
        element: (
          <Protected authentication={true}>  {/*here i want only who are logged in can only see my post */}
            <AllPosts />
          </Protected>
        )
      },
      {
        path: '/add-post',
        element: (
          <Protected authentication={true}>  {/*here i want only who are logged in can only see my post */}
            <AddPost />
          </Protected>
        )
      },
      {
        path: '/post/:slug',
        element: (
          <Protected authentication={true}>  {/*here i want only who are logged in can only see my post */}
            <Post />
          </Protected>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <Protected authentication={true}>  {/*here i want only who are logged in can only see my post */}
            <EditPost />
          </Protected>
        )
      },
      {
        path: '/user-profile/:userId',
        element: (
          <Protected authentication={true}>  {/*here i want only who are logged in can only see my post */}
            <UserProfile />
          </Protected>
        )
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*everything should be wrappped under the store then only all the components will get aware about the store*/}
    <Provider store={store}>
      {/*wrapping everything inside the router*/}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
