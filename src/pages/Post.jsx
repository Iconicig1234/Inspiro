import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import Button from '../components/Button';
import Container from '../components/container/Container';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import selfPic from '../assets/selfPic.jpeg'

function Post() {
  const [post, setPost] = useState({
    featuredImage: null,
    title: '',
    content: '',
    userId: '',
    $id: '',
  });
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [showAuthorInfo, setShowAuthorInfo] = useState(false);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
            console.log("Post data:", post);
            console.log("Image URL:", appwriteService.getFilePreview(post.featuredImage));
          } else {
            navigate('/');
          }
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
          navigate('/');
        });
    }
  }, [slug, navigate]);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = () => {
    appwriteService.deletePost(post.$id)
      .then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate('/');
        }
      });
  };

  const handleAuthorClick = () => {
    setShowAuthorInfo(!showAuthorInfo);
  };


  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-8 bg-lime-900 min-h-screen">
      <Container>
        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
            {post.featuredImage ? (
              <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
                <div
                  className="absolute top-4 left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg cursor-pointer"
                  onClick={handleAuthorClick}
                >
                  <img
                    src={selfPic}
                    alt="Author Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                {showAuthorInfo && (
                  <div className="absolute top-20 left-4 bg-white p-4 rounded-lg shadow-md">
                    <p className="font-semibold">{post?.author}</p>
                  </div>
                )}
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt="Post Featured"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'path/to/placeholder/image.png';
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500">
                <p>Image not available</p>
              </div>
            )}
            {isAuthor && (
              <div className="absolute top-4 right-4 flex space-x-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    Edit
                  </Button>
                </Link>
                <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{post.title}</h1>
            <div className="prose max-w-none text-gray-700">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Post;