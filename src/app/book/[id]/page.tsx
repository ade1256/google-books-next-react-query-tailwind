"use client";
import Loading from "@/components/Loading";
import { GET_VOLUME_BY_ID } from "@/services/books.service";
import { useBookmark } from "@/state/bookmark";
import { BookmarkSimple } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const DetailPage = () => {
  const { bookmark, setBookmark } = useBookmark();
  const params = useParams();
  const bookId: any = params.id;
  const { data, error, isLoading } = useQuery<any, any>({
    queryKey: ["books", bookId],
    queryFn: () => GET_VOLUME_BY_ID(bookId),
    enabled: !!bookId,
  });

  const isBookmarked = bookmark.filter((item) => item.id === bookId).length > 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 p-8">
        <div className="flex flex-col gap-8 align-center justify-center">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2 p-8">
        <div className="flex flex-col gap-8 align-center justify-center">
          <p>An error has occurred: {error.response.data.error.message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>
        {data.volumeInfo.title}
        {data.volumeInfo.subtitle ? ` - ${data.volumeInfo.subtitle}` : ""}
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <img
            className="w-[180px]"
            src={data.volumeInfo.imageLinks.thumbnail}
          />
          <div className="flex flex-col gap-2">
            <p>
              Author:{" "}
              {data.volumeInfo.authors
                ? data.volumeInfo.authors.join(", ")
                : ""}
            </p>
            <p>Published {data.volumeInfo.publishedDate}</p>
            <p>Publisher {data.volumeInfo.publisher ?? ""}</p>
            <div className="flex flex-col gap-2 mt-4">
              <button
                className="bg-blue-500 rounded-lg py-2 px-4 text-white flex items-center gap-2"
                onClick={() => {
                  if (
                    bookmark.filter((item) => item.id === bookId).length > 0
                  ) {
                    setBookmark(bookmark.filter((item) => item.id !== bookId));
                  } else {
                    setBookmark([
                      ...bookmark,
                      {
                        id: bookId,
                        title: data.volumeInfo.title,
                        authors: data.volumeInfo.authors,
                        imageUrl: data.volumeInfo.imageLinks?.thumbnail,
                        publishedDate: data.volumeInfo.publishedDate,
                        publisher: data.volumeInfo.publisher,
                        description: data.volumeInfo.description,
                      },
                    ]);
                  }
                }}
              >
                {isBookmarked ? "Delete from " : "Save to "} bookmark
                <BookmarkSimple
                  size={32}
                  color={isBookmarked ? "#ebd024" : "#d7d4c1"}
                  weight={"fill"}
                  className="hover:cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data.volumeInfo.description }}
        />
      </div>
    </div>
  );
};

export default DetailPage;
