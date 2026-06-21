import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Hr from "./components/Hr";
import Footer from "./components/Footer";
import Tabs from "./components/Tabs";

function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Hr />
        <Tabs />
        <Hr />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
