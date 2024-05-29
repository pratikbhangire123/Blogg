import { useEffect, useState } from "react";
import { ArticleForm } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";
import articleService from "../appwrite/config";

function EditArticle() {
  const [article, setArticle] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      articleService.readArticle(slug).then((article) => {
        if (article) {
          setArticle(article);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  return article ? (
    <div>
      <ArticleForm article={article} />
    </div>
  ) : null;
}

export default EditArticle;
