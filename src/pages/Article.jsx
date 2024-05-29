import { useEffect, useState } from "react";
// import { Button } from "../components/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import articleService from "../appwrite/config";
import parse from "html-react-parser";
import { MdDelete, MdEdit } from "react-icons/md";

function Article() {
  const [article, setArticle] = useState();
  const [articleDate, setArticleDate] = useState();
  const { userData } = useSelector((state) => state.auth.userData);
  const { slug } = useParams();
  const navigate = useNavigate();
  const isAuthor =
    article && userData ? article.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      articleService.readArticle(slug).then((currentArticle) => {
        if (currentArticle) {
          setArticle(currentArticle);

          setArticleDate(
            new Date(
              currentArticle.$updatedAt
                ? currentArticle.$updatedAt
                : currentArticle.$createdAt
            )
          );
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deleteArticle = () => {
    articleService.deleteArticle(article.$id).then((status) => {
      if (status) {
        articleService.deleteFile(article.featuredImage);

        navigate("/");
      }
    });
  };

  return article ? (
    <section className="p-8 md:p-12 lg:p-16 xl:p-24">
      <div className="flex flex-col xl:max-w-[60vw] mx-auto items-center gap-8">
        <h1 className="text-5xl font-semibold">{article.title}</h1>

        {isAuthor && (
          <div className="flex p-3 w-full items-center justify-between text-gray-500 border-y">
            <h5 className="text-lg">{articleDate.toDateString()}</h5>

            <div className="flex gap-3 text-2xl">
              <Link to={`/edit-article/${article.$id}`}>
                {/* <Button>Edit Article</Button> */}
                <MdEdit />
              </Link>

              {/* <Button onClick={deleteArticle}>Delete Article</Button> */}
              <MdDelete onClick={deleteArticle} className="cursor-pointer" />
            </div>
          </div>
        )}

        <img
          src={articleService.getFilePreview(article.featuredImage)}
          alt={article.title}
          width={500}
          className="mt-6"
        />

        <p>{parse(article.description)}</p>
      </div>
    </section>
  ) : null;
}

export default Article;
