import React from 'react';
import SearchBar from '@theme-original/SearchBar';

export default function CustomSearchBar(props) {
  console.log('Custom search');
  return <SearchBar {...props} placeholder="Search..."/>;
}
