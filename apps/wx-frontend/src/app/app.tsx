import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Chart from './components/chart';
import { Nav } from '@wx/ui';

// Styles
import '../assets/styles.css';

const client = new ApolloClient({
  uri: 'https://localhost:3333/graphql',
});

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(window.location.search);
}

export const App = () => {
  const q = useQuery();

  console.log('App::useQuery():', q);

  return (
    <ApolloProvider client={client}>
      <Nav></Nav>
      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-900 shadow-lg h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">
          <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
            <ul className="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
              <li className="mr-3 flex-1">
                <a
                  href="#"
                  className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                >
                  <i className="fas fa-tasks pr-0 md:pr-3"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                    Tasks
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
          <div className="bg-blue-800 p-2 shadow text-xl text-white">
            <h3 className="font-bold pl-2">Snow Depth</h3>
          </div>

          <main className="p-4">
            <Chart></Chart>
          </main>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
