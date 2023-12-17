"use client";
import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import InputSearch from "@/components/InputSearch";
import InputSelect from "@/components/InputSelect";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import YearPicker from "@/components/YearPicker";
import useDebounce from "@/hooks/useDebounce";
import { GET_VOLUMES } from "@/services/books.service";
import { useBookmark } from "@/state/bookmark";
import { useLayout } from "@/state/layout";
import { ListDashes, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [hydrate, setHydrate] = useState(true);
  const { bookmark, setBookmark } = useBookmark();
  const { layout, setLayout } = useLayout();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<any>({
    maxResults: 16,
    startIndex: 0,
    orderBy: "relevance",
    year: "",
  });
  const debounceSearchQuery = useDebounce(
    `${searchQuery}${filter.year !== "" ? ` ${filter.year}` : ""}`,
    500
  );
  const urlParams = new URLSearchParams(filter).toString();
  const { data, error, isLoading } = useQuery<any, any>({
    queryKey: ["books", debounceSearchQuery, urlParams],
    queryFn: () => GET_VOLUMES(debounceSearchQuery, urlParams),
    enabled: !!debounceSearchQuery,
  });
  useEffect(() => {
    const rehydrated = async () => {
      await useLayout.persist.rehydrate();
      setHydrate(false);
    };
    rehydrated();
  }, []);

  if (error) {
    return (
      <div>An error has occurred: {error.response.data.error.message}</div>
    );
  }

  return hydrate ? (
    <div className="flex flex-col gap-2 p-8">
      <div className="flex flex-col gap-8 align-center justify-center">
        <Loading />
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-2 p-8 bg-blue-200">
      <div className="flex gap-2 items-center">
        <InputSearch value={searchQuery} onChange={setSearchQuery} />
        <div>
          <YearPicker
            onYearChange={(year: Date | null) =>
              setFilter({ ...filter, year: year?.getFullYear().toString() })
            }
            value={filter.year ? new Date(filter.year) : new Date()}
          />
        </div>
        <div className="p-2 rounded-lg bg-white shrink-0">
          <InputSelect
            options={[
              {
                label: "Newest",
                value: "newest",
              },
              {
                label: "Relevance",
                value: "relevance",
              },
            ]}
            onChange={(e: any) =>
              setFilter({ ...filter, orderBy: e.target.value })
            }
            value={filter.orderBy}
          />
        </div>
        <div
          onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
          className="p-2 rounded-lg bg-white"
        >
          {layout === "grid" ? (
            <SquaresFour size={32} color="grey" weight="fill" />
          ) : (
            <ListDashes size={32} color="grey" weight="fill" />
          )}
        </div>
      </div>
      <h1 className="py-4">
        Search result: {searchQuery}{" "}
        {data?.totalItems && `(${data.totalItems} total items)`}
      </h1>
      <div
        className={`flex flex-wrap gap-8 ${
          !hydrate && layout === "list" ? "flex-col" : ""
        }`}
      >
        {isLoading && <Loading />}
        {data?.items
          ? data.items.map((book: any) => (
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
                onClick={() => router.push(`/book/${book.id}`)}
                onBookmarkClick={() => {
                  if (
                    bookmark.filter((item) => item.id === book.id).length > 0
                  ) {
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
          : !isLoading && <div>No data</div>}
      </div>
      <div className="flex gap-2 justify-around">
        <Pagination
          totalPages={Math.floor(data?.totalItems / filter.maxResults)}
          currentPage={filter.startIndex}
          onPageChange={(page) => setFilter({ ...filter, startIndex: page })}
          maxResults={filter.maxResults}
        />
      </div>
    </div>
  );
};

export default HomePage;
