import "@/styles/globals.css";
import "@/styles/swiper.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Noto_Sans_TC } from "next/font/google"
const notoSansTC = Noto_Sans_TC({ subsets: ['latin'] })
// const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>
      {getLayout(
        <>
          <style jsx global>{`
        html {
          font-family: ${notoSansTC.style.fontFamily};
        }
      `}</style>
          <Component {...pageProps} />
        </>
      )}
    </Provider>
  )
}
