import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'


function AddPost() {
  return (
    <div className='py-6 bg-cyan-950'>
      <Container>
        <PostForm/>
      </Container>
    </div>
  )
}

export default AddPost