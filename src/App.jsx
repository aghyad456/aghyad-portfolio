
import "./App.css";
import MainLayout from "./Layout/MainLayout";
import MyProfile from "./Pages/MyProfile";
import { LanguageProvider } from "./Context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <MainLayout>
        <MyProfile />
      </MainLayout>
    </LanguageProvider>
  );
}
