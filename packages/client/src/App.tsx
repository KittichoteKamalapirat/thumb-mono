import { ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChannelContext } from "./contexts/ChannelContext";
import { UserContext } from "./contexts/UserContext";
import { Channel, User } from "./generated/graphql";
import { client } from "./lib/apollo";
import { urlResolver } from "./lib/UrlResolver";
import MyAccount from "./pages/account.page";
import CreateTest from "./pages/create-test.page";

import Home from "./pages/home.page";
import Pricing from "./pages/pricing.page";
import Testing from "./pages/testing.page";
import Testings from "./pages/testings.page";

function App() {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // populate data
  useEffect(() => {
    const channelStr = localStorage.getItem("channel");
    const userStr = localStorage.getItem("user");
    if (channelStr) {
      const channel = JSON.parse(channelStr);
      setChannel(channel);
    }
    if (userStr) {
      const user = JSON.parse(userStr);
      setUser(user);
    }
  }, []);
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <ChannelContext.Provider value={{ channel, setChannel }}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <Routes>
                <Route
                  index
                  path="/"
                  element={
                    channel?.ytChannelId ? (
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
                <Route index path="/pricing" element={<Pricing />} />
              </Routes>
            </BrowserRouter>
          </ApolloProvider>
        </ChannelContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
