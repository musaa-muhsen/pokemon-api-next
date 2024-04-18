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
  console.log('pokemon',pokemon);
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
    console.log('data',data)
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
  className=" w-90 mx-auto max-w-2xl"
    value={searchString}
    onKeyDown={handleKeyDown}
    onChange={(e) => setSearchString(e.target.value)}
    placeholder="Search the docs….." 
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

    {pokemon.length === 0 ? (
      <>
      <div className='flex items-center justify-center h-dvh'>
        <Spinner size="3"/>
      </div>
      </>
      ) : (<> 
      <div 
     // className="grid grid-cols-4 gap-4 mt-10 ml-auto mr-auto"
      className="flex flex-wrap justify-center mt-10 max-w-[1000px]"
      >
        {pokemon?.map((p,i) => {
          //console.log(p)
          return (
            
          <Link 
          className="w-3/4 sm:w-1/2 md:w-1/4 lg:w-1/6 p-4 mx-2 my-2 flex items-center justify-center"
             key={p?.url} 
             href={`/pokemon/${p?.name}`} 
             //className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg"
          >
            
         <Box maxWidth="200px"
         className=""
         >
  <Card>
    <Flex gap="3" align="center" direction="column">
    <Image
              //src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`}
                alt={p?.name}
                width={70}
                height={70}
                style={{
                  objectFit: 'contain', // cover, contain, none
                }}
                placeholder="blur"
                blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC'}
                //placeholder="blur" // Optional blur-up while loading
               // blurDataURL={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`
        
              />
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
    </>
  );
}