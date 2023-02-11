import { ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  Channel,
  ChannelContext,
  emptyChannel,
} from "./contexts/ChannelContext";
import { client } from "./lib/apollo";
import { urlResolver } from "./lib/UrlResolver";
import MyAccount from "./pages/account";
import CreateTest from "./pages/create-test";

import Home from "./pages/home";
import Testing from "./pages/testing";
import Testings from "./pages/testings";

function App() {
  const [channel, setChannel] = useState<Channel>(emptyChannel);

  // populate data
  useEffect(() => {
    const channelId = localStorage.getItem("channelId");
    if (channelId) setChannel({ ...channel, channelId });
  }, []);
  return (
    <div className="App">
      <ChannelContext.Provider value={{ channel, setChannel }}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route
                index
                path="/"
                element={
                  channel.channelId ? (
                    <Navigate to={urlResolver.myTests()} />
                  ) : (
                    <Home />
                  )
                }
              />
              <Route path="/tests" element={<Testings />} />
              <Route path="/tests/:id" element={<Testing />} />
              <Route path="/account" element={<MyAccount />} />
              <Route index path="/create-test" element={<CreateTest />} />
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </ChannelContext.Provider>
    </div>
  );
}

export default App;
