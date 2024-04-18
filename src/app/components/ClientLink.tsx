"use client"

import React from 'react';
import Link from 'next/link';
import {IconButton,TextField, Box , CheckboxCards, Flex, Text, Avatar, Card} from '@radix-ui/themes';
import {ArrowLeftIcon} from '@radix-ui/react-icons';

export const ClientLink = () => {
  return (
    <Link href="/" className="pt-6 ml-12 block w-5">
      <IconButton variant="solid" >
        <ArrowLeftIcon width="18" height="18" />
       </IconButton>
    </Link>
  );
};