import { GrArticle } from "react-icons/gr";

const RelatedArticles = ({ articles }) => (
  <div className="w-10/12 ml-auto animate-fade-in-up mb-4">
    <h4 className="text-base text-gray-700">Related Articles</h4>
    <ul className="p-2 text-sm space-y-1">
      {articles.map((art, idx) => (
        <li key={idx}>
          <a
            href={art?.link || "#"}
            target="_blank"
            className="underline cursor-pointer tracking-wide text-blue-950 flex items-center gap-x-2 font-medium"
          >
            <GrArticle />
            {art.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default RelatedArticles;
