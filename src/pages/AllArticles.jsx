import { useEffect, useState } from "react";
import { ArticleCard } from "../components/index";
import useArticleService from "../hooks/useArticleService";

export default function AllArticles() {
  const { getListOfArticles } = useArticleService();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getListOfArticles(setArticles);
  }, []);

  return (
    <section className="flex flex-col p-8 md:p-12 lg:p-16 xl:p-24">
      <h2 className="pb-6 text-3xl border-b">Your Articles</h2>

      <div className="mt-8 px-10">
        {articles?.map((article) => (
          <div key={article.$id}>
            <ArticleCard {...article} />
          </div>
        ))}
      </div>
    </section>
  );
}
