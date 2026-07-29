import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery({
    queryKey: ['sw-species'],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
    retry: false
  });

  if (isLoading) return <div className="loading">Loading.....</div>;

  if (isError) return <div>Error: {error.toString()}</div>;

  return <>
    { isFetching && <div className="loading">Loading.....</div> }
    <InfiniteScroll 
    initialLoad={false}
    hasMore={hasNextPage}
    loadMore={() => {
      if (!isFetching) {
        fetchNextPage();
      }
    }}
    >
      {
        data?.pages?.map(page => {
          return page?.results?.map(person => 
            <Species 
            key={person?.name}
            name={person?.name}
            language={person?.language}
            averageLifespan={person?.average_lifespan}
            />
          )
        })
      }
    </InfiniteScroll>
  </>;
}
