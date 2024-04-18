"use client"

import React from 'react';
import Link from 'next/link';
import {IconButton,TextField, Box , CheckboxCards, Flex, Text, Avatar, Card} from '@radix-ui/themes';
import {ArrowLeftIcon} from '@radix-ui/react-icons';

export const ClientLink = () => {
  return (
    <Link href="/" className="fixed block w-5 inset-6 z-10">
      <IconButton color="gray" variant="solid" >
        <ArrowLeftIcon width="18" height="18" />
       </IconButton>
    </Link>
  );
};