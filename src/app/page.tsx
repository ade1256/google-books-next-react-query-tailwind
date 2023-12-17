"use client";

import BookCard from "@/components/BookCard";
import InputSearch from "@/components/InputSearch";
import Pagination from "@/components/Pagination";
import { GET_VOLUMES } from "@/services/books.service";
import { useBookmark } from "@/state/bookmark";
import { useLayout } from "@/state/layout";
import { ListDashes, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [hydrate, setHydrate] = useState(true);
  const { bookmark, setBookmark } = useBookmark();
  const { layout, setLayout } = useLayout();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<any>({
    maxResults: 16,
    startIndex: 0,
  });
  const urlParams = new URLSearchParams(filter).toString();
  const { data, error, isLoading } = useQuery<any, any>({
    queryKey: ["todos", searchQuery, filter],
    queryFn: () => GET_VOLUMES(searchQuery, urlParams),
    enabled: !!searchQuery,
  });

  if (error) {
    return (
      <div>An error has occurred: {error.response.data.error.message}</div>
    );
  }

  useEffect(() => {
    const rehydrated = async () => {
      await useLayout.persist.rehydrate();
      setHydrate(false);
    };
    rehydrated();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-8">
      <div className="flex gap-8 items-center">
        <InputSearch value={searchQuery} onChange={setSearchQuery} />
        {!hydrate && (
          <div onClick={() => setLayout(layout === "grid" ? "list" : "grid")}>
            {layout === "grid" ? (
              <SquaresFour size={32} color="grey" weight="fill" />
            ) : (
              <ListDashes size={32} color="grey" weight="fill" />
            )}
          </div>
        )}
      </div>
      <div
        className={`flex flex-wrap gap-8 ${
          !hydrate && layout === "list" ? "flex-col" : ""
        }`}
      >
        {isLoading && <div>Loading...</div>}
        {data?.items ? (
          data.items.map((book: any) => (
            <BookCard
              key={book.id}
              title={book.volumeInfo.title}
              author={
                book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(", ")
                  : ""
              }
              imageUrl={book.volumeInfo.imageLinks?.thumbnail}
              publishedDate={book.volumeInfo.publishedDate}
              publisher={book.volumeInfo.publisher ?? ""}
              description={book.volumeInfo.description}
              variant={layout}
              onClick={() => router.push(`/${book.id}`)}
              onBookmarkClick={() => {
                if (bookmark.filter((item) => item.id === book.id).length > 0) {
                  setBookmark(bookmark.filter((item) => item.id !== book.id));
                } else {
                  setBookmark([
                    ...bookmark,
                    {
                      id: book.id,
                      title: book.volumeInfo.title,
                      authors: book.volumeInfo.authors,
                      imageUrl: book.volumeInfo.imageLinks?.thumbnail,
                      publishedDate: book.volumeInfo.publishedDate,
                      publisher: book.volumeInfo.publisher,
                      description: book.volumeInfo.description,
                    },
                  ]);
                }
              }}
              isBookmarked={
                bookmark.filter((item) => item.id === book.id).length > 0
              }
            />
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
      <div className="flex gap-2">
        {/* <button
          onClick={() =>
            setFilter({ ...filter, startIndex: filter.startIndex - 1 })
          }
          disabled={filter.startIndex === 0}
        >
          prev
        </button>
        <button
          onClick={() =>
            setFilter({ ...filter, startIndex: filter.startIndex + 1 })
          }
          disabled={data?.totalItems === 0 || data?.items === undefined}
        >
          next
        </button> */}
        <Pagination
          totalPages={Math.floor(data?.totalItems ?? 10 / filter.maxResults)}
          currentPage={filter.startIndex}
          onPageChange={(page) => setFilter({ ...filter, startIndex: page })}
          maxResults={filter.maxResults}
        />
      </div>
    </div>
  );
};

export default HomePage;
