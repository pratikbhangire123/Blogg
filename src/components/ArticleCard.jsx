import articleService from "../appwrite/config";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function ArticleCard({ $id, title, featuredImage, description }) {
  return (
    <Link to={`/article/${$id}`}>
      <div className="flex flex-col lg:flex-row max-w-sm md:max-w-xs lg:max-w-none lg:justify-between border lg:border-none rounded lg:rounded-none shadow-md lg:shadow-none">
        <div className="px-4 pt-2 lg:pt-4 pb-4 ">
          <h2 className="mt-1 lg:mt-0 md:text-lg xl:text-xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="mt-1 text-sm md:text-base xl:text-lg line-clamp-2 lg:line-clamp-3 text-gray-600">
            {parse(description)}
          </p>
        </div>

        <div className="lg:max-w-[10vw]">
          <img
            src={articleService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-32 lg:h-full object-cover object-center rounded-t lg:rounded"
          />
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
