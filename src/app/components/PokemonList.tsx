"use client";

import { useState, useEffect, Suspense } from "react";
import {searchResults} from "@/app/lib/server-utils";
import { Pokemon } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";
import {Spinner,Skeleton,IconButton,TextField, Box , CheckboxCards, Flex, Text, Avatar, Card} from '@radix-ui/themes';
import {MagnifyingGlassIcon} from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';

// const LazyImage = dynamic(() => import('./LazyImage'), {
//   loading: () => <div>Loading...</div>,
// });


export default function PokemonList() {
  
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchString, setSearchString] = useState("");
 // console.log('pokemon',pokemon);
  //console.log("pokemonNames", pokemonNames);
 // console.log('searchResults', searchResults)
  

  useEffect(() => {
    searchResults("").then((p) => {
      //console.log(p)
      setPokemon(p)
    });
  }, []);

  const onClick = async () => {
    const data = await searchResults(searchString);
   // console.log('data',data)
    setPokemon(data);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setPokemon(await searchResults(searchString));
    }
  };

  return (
    <>
    <TextField.Root 
  className="mt-8 w-90 mx-auto max-w-2xl"
    value={searchString}
    onKeyDown={handleKeyDown}
    onChange={(e) => setSearchString(e.target.value)}
    placeholder="Search the pokemons..." 
    radius="full" 
    size="3" 
    variant="soft"
  >
  <TextField.Slot  
    side="right"
    onClick={onClick}
    gap="3"    
    className="hover:bg-blue-300  text-white  font-bold py-2 px-4 rounded-full cursor-pointer" 
 
  >
     <IconButton size="1" variant="ghost" 
     className="hover:bg-blue-300  text-white  font-bold py-2 px-4 rounded-full cursor-pointer">
     <MagnifyingGlassIcon height="16" width="16" />

     </IconButton>
  </TextField.Slot>
</TextField.Root>

    {pokemon?.length === 0 ? (
      <>
      <div className='flex items-center justify-center h-dvh'>
        <Spinner size="3"/>
      </div>
      </>
      ) : (<> 
      <div 
     // className="grid grid-cols-4 gap-4 mt-10 ml-auto mr-auto"
      className="flex flex-wrap justify-center mt-10 max-w-[1000px] ml-auto mr-auto"
      >
        {pokemon?.map((p,i) => {
          //console.log(p)

          const url = new URL(p?.url);
const segments = url.pathname.split("/");
const number = Number(segments[segments?.length - 2]); // 24
          return (
            
          <Link 
          className="w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/6 p-4 mx-2 my-2 flex items-center justify-center"
             key={p?.url} 
             href={`/pokemon/${p?.name}`} 
             //className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg"
          >
            
         <Box 
         maxWidth="200px"
         
         >
  <Card className="p-3 hover:bg-slate-200 rounded-lg">
    <Flex gap="3" align="center" direction="column">
          {number && <Image
              //src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
                alt={p?.name}
                width={70}
                height={70}
                style={{
                  objectFit: 'contain', 
                }}
                placeholder="blur"
                blurDataURL={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAyADIDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9B6/aD81CgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAA/9k='}
                //placeholder="blur" // Optional blur-up while loading
               // blurDataURL={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`
        
              />}
      <Box>
        <Text as="div" size="2" weight="bold"
        className='capitalize ' 
        //style={{backgroundColor: 'yellow'}}
        >
          {p?.name}
        </Text>
       
      </Box>
    </Flex>
  </Card>
</Box> 
          </Link>
          );
})}
</div>
      </>)

}
<p className='text-center mb-10'>
          <a className='underline text-black uppercase' href='https://www.musaamuhsen.co.uk/'  target="_blank" 
            rel="noopener noreferrer">musaamuhsen.co.uk</a> &copy; {new Date().getFullYear()}</p>
    </>
  );
}