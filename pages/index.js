import Head from 'next/head'
import Header from '../components/header'
import InputForm from '../components/inputForm'
import content from '../config/content'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Git Remote Token</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={content.summary} />
      </Head>

      <Header />
      <InputForm />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
