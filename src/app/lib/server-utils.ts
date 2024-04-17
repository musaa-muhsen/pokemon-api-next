"use server"

export async function searchResults(search: string) {
   
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    );
    const data = await res.json();
    return data?.results
      .filter((item: { name: string }) =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
      )
      .map((item: { name: string }) => item?.name)
      .slice(0, 40);
      
  }