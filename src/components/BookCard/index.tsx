import { BookmarkSimple } from "@phosphor-icons/react/dist/ssr";
import React from "react";

interface BookCardProps {
  title: string;
  author: string;
  imageUrl: string;
  publishedDate: string;
  publisher: string;
  isBookmarked?: boolean;
  variant?: "grid" | "list";
  description?: string;
  categories?: string[];
  onClick?: () => void;
  onBookmarkClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  imageUrl,
  isBookmarked,
  publishedDate,
  publisher,
  variant,
  description,
  onClick,
  onBookmarkClick,
}) => {
  const classWrapper =
    "relative rounded overflow-hidden shadow-lg rounded-lg p-2 " +
    `${variant === "grid" ? "w-[272px]" : "w-full flex"}`;
  return (
    <div className={classWrapper}>
      <img
        className={`cursor-pointer ${
          variant === "grid" ? "w-full" : "w-[180px] shrink-0"
        }`}
        src={imageUrl}
        alt="Book cover"
        onClick={onClick}
      />
      <div className="p-2 mb-4 hover:cursor-pointer" onClick={onClick}>
        <div className="font-bold text-md mb-2 line-clamp-2">{title}</div>
        <p className="text-gray-700 text-sm">{author ?? publisher}</p>
        {variant === "list" && (
          <>
            <p className="text-gray-700 text-sm mt-2">{publishedDate}</p>
            <p className="text-gray-700 text-sm py-2 pr-8 leading-[28px] line-clamp-4">
              {description}
            </p>
          </>
        )}
      </div>
      <div className="flex justify-end absolute right-[8px] bottom-[8px]">
        <BookmarkSimple
          size={32}
          color={isBookmarked ? "#ebd024" : "#d7d4c1"}
          weight={"fill"}
          onClick={onBookmarkClick}
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default BookCard;
