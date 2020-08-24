import React from 'react';
import Landing from './src/pages/Landing';

import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <Landing />
      <StatusBar style="auto" />
    </>
  );
}

// <> </> elemento fragmentado, uma espécie de div sem conteúdo
// TODOS OS ELEMENTOS TEM DISPLAY FLEX
// flexDirection é 'column' e não 'row' [por default]
// densidade de pixels define que 'cabem mais pixels em 1 único pixel' / em IOS temos 3x1 de densidade de pixel