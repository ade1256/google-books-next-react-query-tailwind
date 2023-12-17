"use client";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { useBookmark } from "@/state/bookmark";
import { useLayout } from "@/state/layout";
import { ListDashes, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BookmarkPage = () => {
  const router = useRouter();
  const [hydrate, setHydrate] = useState(true);
  const { bookmark, setBookmark } = useBookmark();
  const { layout, setLayout } = useLayout();
  const [pagination, setPagination] = useState({
    startIndex: 0,
    maxResults: 16,
    totalItems: bookmark.length,
  });

  useEffect(() => {
    const rehydrated = async () => {
      await useLayout.persist.rehydrate();
      setHydrate(false);
    };
    rehydrated();
  }, []);

  return hydrate ? (
    <div className="py-8">
      <Loading />
    </div>
  ) : (
    <div className="flex flex-col gap-2 p-8">
      <div className="flex gap-8 items-center justify-end">
        <div onClick={() => setLayout(layout === "grid" ? "list" : "grid")}>
          {layout === "grid" ? (
            <SquaresFour size={32} color="grey" weight="fill" />
          ) : (
            <ListDashes size={32} color="grey" weight="fill" />
          )}
        </div>
      </div>
      <div
        className={`flex flex-wrap gap-8 ${
          !hydrate && layout === "list" ? "flex-col" : ""
        }`}
      >
        {bookmark.length > 0 ? (
          bookmark
            .slice(
              pagination.startIndex,
              pagination.maxResults + pagination.startIndex
            )
            .map((book: any) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.authors ? book.authors.join(", ") : ""}
                imageUrl={book.imageUrl}
                publishedDate={book.publishedDate}
                publisher={book.publisher ?? ""}
                description={book.description}
                variant={layout}
                onClick={() => router.push(`/book/${book.id}`)}
                isBookmarked={true}
                onBookmarkClick={() => {
                  setBookmark(bookmark.filter((item) => item.id !== book.id));
                }}
              />
            ))
        ) : (
          <div>No data</div>
        )}
      </div>
      <div className="flex gap-2 justify-around">
        <Pagination
          totalPages={Math.ceil(pagination.totalItems / pagination.maxResults)}
          currentPage={pagination.startIndex}
          onPageChange={(page) =>
            setPagination({ ...pagination, startIndex: page })
          }
          maxResults={pagination.maxResults}
        />
      </div>
    </div>
  );
};

export default BookmarkPage;
