import { useEffect, useState } from "react";
// import { Button } from "../components/index";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { MdDelete, MdEdit } from "react-icons/md";
import useArticleService from "../hooks/useArticleService";

export default function Article() {
  const { readArticle, deleteArticle, getFilePreview } = useArticleService();
  const [article, setArticle] = useState();
  const [articleDate, setArticleDate] = useState();
  const { userData } = useSelector((state) => state.auth.userData);
  const { slug } = useParams();
  const isAuthor =
    article && userData ? article.userId === userData.$id : false;

  useEffect(() => {
    readArticle(slug, setArticle, setArticleDate);
  }, []);

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
              <MdDelete
                onClick={() => deleteArticle(article)}
                className="cursor-pointer"
              />
            </div>
          </div>
        )}

        <img
          src={getFilePreview(article.featuredImage)}
          alt={article.title}
          width={500}
          className="mt-6"
        />

        <p>{parse(article.description)}</p>
      </div>
    </section>
  ) : null;
}
