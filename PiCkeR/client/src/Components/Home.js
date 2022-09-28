import React, { useContext } from "react";
import { AuthenticationContext } from "../Contexts/Authentication";
import TopBar from './TopBar';
import Paper from './Paper';
import TopicsTable from './TopicsTable';
import PCListsTable from './PCListsTable';

const Home = () => {
  const { isAuthenticated, isLoading, auth } = useContext(AuthenticationContext);

  if (auth && isLoading) {
    return <div>Loading ...</div>;
  }

  if (auth && !isAuthenticated) {
    return <div>Authenticating ...</div>;
  }
  return (
    <div className="Home">
      <TopBar auth={auth} />
      <Paper />
      <hr />
      <TopicsTable />
      <hr />
      <PCListsTable />
    </div>
  );
};

export default Home;
