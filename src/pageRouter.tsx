import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import HomePage from './container/home/';
import ReactMdPage from './container/react-md/';
import ImportLodashLoaderPage from './container/import-lodash-loader/';
import RcDeclarationWebpackPluginPage from './container/rc-declaration-webpack-plugin/';
import TerminalUrlPrintPage from './container/terminal-url-print/';

import BlueprintKoa from './container/blueprint-koa/';
import ApibJson from './container/apib-json/';
import Tscn from './container/tscn/';

const PageRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/demos'} element={<HomePage />} />
        <Route path={'/demos/react-md'} element={<ReactMdPage />} />
        <Route path={'/demos/import-lodash-loader'} element={<ImportLodashLoaderPage />} />
        <Route path={'/demos/rc-declaration-webpack-plugin'} element={<RcDeclarationWebpackPluginPage />} />
        <Route path={'/demos/terminal-url-print'} element={<TerminalUrlPrintPage />} />
        <Route path={'/demos/blueprint-koa'} element={<BlueprintKoa />} />
        <Route path={'/demos/apib-json'} element={<ApibJson />} />
        <Route path={'/demos/tscn'} element={<Tscn />} />
      </Routes>
    </HashRouter>
  );
};

export default PageRouter;
