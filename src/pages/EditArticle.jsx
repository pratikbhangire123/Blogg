import { useEffect, useState } from "react";
import { ArticleForm } from "../components/index";
import { useParams } from "react-router-dom";
import useArticleService from "../hooks/useArticleService";

export default function EditArticle() {
  const { readArticle } = useArticleService();
  const [article, setArticle] = useState();
  const { slug } = useParams();

  useEffect(() => {
    readArticle(slug, setArticle);
  }, []);

  return article ? <ArticleForm article={article} /> : null;
}
