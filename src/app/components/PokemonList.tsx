"use client";

import { useState, useEffect } from "react";
import {searchResults} from "@/app/lib/server-utils";
import { Pokemon } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";
import {IconButton,TextField, Box , CheckboxCards, Flex, Text, Avatar, Card} from '@radix-ui/themes';
import {MagnifyingGlassIcon} from '@radix-ui/react-icons';


export default function PokemonList() {
  
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchString, setSearchString] = useState("");
  console.log('pokemon',pokemon)
  //console.log("pokemonNames", pokemonNames);

 // console.log('searchResults', searchResults)
  

  useEffect(() => {
    searchResults("").then((p) => setPokemon(p));
  }, []);

  const onClick = async () => {
    setPokemon(await searchResults(searchString));
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setPokemon(await searchResults(searchString));
    }
  };

  return (
    <>
<TextField.Root 
  // make center and max-width of 400px and width 90%
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


{/* <Box maxWidth="240px">
  <Card>
    <Flex gap="3" align="center">
      <Avatar
        size="3"
        src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
        radius="none"
        fallback="T"
      />
      <Box>
        <Text as="div" size="2" weight="bold" style={{backgroundColor: 'yellow'}}>
          Teodros Girmay
        </Text>
        <Text as="div" size="2" color="gray" className="">
          Engineering
        </Text>
      </Box>
    </Flex>
  </Card>
</Box> */}

      {/* <div className="flex gap-2">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="border border-gray-300 rounded-lg py-4 px-4 text-base font-normal text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <button
          onClick={onClick}
          className="bg-blue-600 disabled:bg-gray-500 inline-flex items-center justify-center rounded-full py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Search
        </button>
      </div> */}
      <div 
     // className="grid grid-cols-4 gap-4 mt-10 ml-auto mr-auto"
      className="flex flex-wrap justify-center mt-10"
      >
        {pokemon?.map((p,i) => {
          //console.log(p)
          return (
          <Link 
          className="w-3/4 sm:w-1/2 md:w-1/4 lg:w-1/6 p-4 mx-2 my-2"
             key={p?.url} 
             href={`/pokemon/${p?.name}`} 
             //className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg"
          >
         <Box maxWidth="200px"
         className=""
         >
  <Card>
    <Flex gap="3" align="center" direction="column">
      <Avatar
        size="5"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`}
        radius="none"
        fallback={p?.name}
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
              {/* <Image
              //src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`}
                alt={p?.name}
                width={200}
                height={200}
              />
              <div className="text-lg font-semibold text-gray-800">{p?.name}</div> */}
         
          </Link>
          );
})}
</div>
      {/* <div className="text-4xl py-5">Names: {pokemonNames.join(", ")}</div> */}
    </>
  );
}