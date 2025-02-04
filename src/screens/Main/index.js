import { useState } from "react";
import { ScrollView } from "react-native";
import InputArea from "./InputArea";
import Header from "./Header";
import Layout from "layouts/Main";
import WordCard from "./WordCard";

const Main = () => {
  // Set initial states for first load
  const [word, setWord] = useState("keyboard");
  const [serverResponse, setServerResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Base app layout
  return (
    <Layout>
      <Header style={{ padding: 20 }} />
      <ScrollView style={{ padding: 20 }} keyboardShouldPersistTaps="handled">
        <InputArea
          word={word}
          setWord={setWord}
          setServerResponse={setServerResponse}
          error={error}
          setError={setError}
          setLoading={setLoading}
          loading={loading}
        />
        <WordCard word={serverResponse} error={error} loading={loading} />
      </ScrollView>
    </Layout>
  );
};

export default Main;
