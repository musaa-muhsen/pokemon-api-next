"use client";

import { useState, useEffect } from "react";
import {searchResults} from "@/app/lib/server-utils";
import Image from "next/image";
import Link from "next/link";
import {TextField, Box , CheckboxCards, Flex, Text, Avatar, Card} from '@radix-ui/themes';
import {MagnifyingGlassIcon} from '@radix-ui/react-icons';


export default function PokemonList() {
  
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [searchString, setSearchString] = useState("");
  console.log("searchString", searchString);

  useEffect(() => {
    searchResults("").then((names) => setPokemonNames(names));
  }, []);

  const onClick = async () => {
    setPokemonNames(await searchResults(searchString));
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setPokemonNames(await searchResults(searchString));
    }
  };

  return (
    <div>
<TextField.Root 
    value={searchString}
    onKeyDown={handleKeyDown}
    onChange={(e) => setSearchString(e.target.value)}
    placeholder="Search the docs….." 
    radius="full" 
    size="3" 
    variant="soft"
  >
  <TextField.Slot   onClick={onClick}>
    <MagnifyingGlassIcon height="16" width="16" />
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

      <div className="flex gap-2">
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
      </div>
      <div className="text-4xl py-5">Names: {pokemonNames.join(", ")}</div>
    </div>
  );
}