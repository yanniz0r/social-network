import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import '../styles/globals.css'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  </div>
}

export default MyApp
