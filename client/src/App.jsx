import "./App.css"
import {
  Welcome,
  Footer,
  Loader,
  Navbar,
  Services,
  Transactions,
} from "./components"

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      {/* TODO: Transactions and Footer */}
      <Transactions />
      {/* <Footer /> */}
    </div>
  )
}

export default App
