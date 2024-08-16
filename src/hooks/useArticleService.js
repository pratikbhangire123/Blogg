import { useNavigate } from "react-router-dom";
import articleService from "../appwrite/config";
import { useSelector } from "react-redux";

export default function useArticleService() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth.userData);

  const submitArticle = async (data) => {
    const imageFile = await articleService.uploadFile(data.featuredImage[0]);

    if (imageFile) {
      const imageFileId = imageFile.$id;
      data.featuredImage = imageFileId;

      const newArticle = await articleService.createArticle({
        ...data,
        userId: userData.$id,
      });

      if (newArticle) {
        navigate(`/article/${newArticle.$id}`);
      }
    }
  };

  const updateArticle = async (article, data) => {
    const imageFile = data.featuredImage[0]
      ? await articleService.uploadFile(data.featuredImage[0])
      : null;

    if (imageFile) {
      await articleService.deleteFile(article.featuredImage);
    }

    const updatedArticle = await articleService.updateArticle(article.$id, {
      ...data,
      featuredImage: imageFile ? imageFile.$id : undefined,
    });

    if (updatedArticle) {
      navigate(`/article/${updatedArticle.$id}`);
    }
  };

  const readArticle = async (slug, setArticle, setArticleDate) => {
    if (slug) {
      const currentArticle = await articleService.readArticle(slug);

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
    } else {
      navigate("/");
    }
  };

  const deleteArticle = async (article) => {
    const articleDeleted = await articleService.deleteArticle(article.$id);

    if (articleDeleted) {
      await articleService.deleteFile(article.featuredImage);

      navigate("/");
    }
  };

  const getListOfArticles = async (setListOfArticles) => {
    const articles = await articleService.getListOfArticles([]);

    if (articles) {
      setListOfArticles(articles.documents);
    }
  };

  const getFilePreview = (file) => {
    return articleService.getFilePreview(file);
  };

  return {
    submitArticle,
    updateArticle,
    readArticle,
    deleteArticle,
    getListOfArticles,
    getFilePreview,
  };
}
