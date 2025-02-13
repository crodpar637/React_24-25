import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const cleanResponse = (text) => {
    // Elimina las etiquetas <think> y <think/>
    return text.replace(/<think.*?>/g, "").replace(/<\/think>/g, "");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(""); // Limpiar respuesta previa

    try {
      const res = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-r1:8b",
          prompt: question,
        }),
      });

      if (!res.ok) throw new Error("Error en la solicitud");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedData = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        accumulatedData += decoder.decode(value, { stream: true });

        // Procesar los fragmentos conforme llegan
        const fragments = accumulatedData.split("\n");
        accumulatedData = fragments.pop(); // Mantener el fragmento incompleto para la siguiente lectura

        for (const fragment of fragments) {
          try {
            const parsed = JSON.parse(fragment);
            const cleanedResponse = cleanResponse(parsed.response); // Limpiar la respuesta antes de agregarla
            setResponse((prev) => prev + cleanedResponse); // Concatenar la respuesta limpia
          } catch (error) {
            console.error("Error al procesar fragmento JSON:", error);
          }
        }
      }
    } catch (error) {
      setResponse("Error al procesar la solicitud.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Consulta a Ollama
      </Typography>

      <TextField
        label="Pregunta"
        variant="outlined"
        fullWidth
        value={question}
        onChange={handleQuestionChange}
        disabled={loading}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ marginTop: 2 }}
        disabled={loading || !question}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Enviar Pregunta"
        )}
      </Button>

      <Box
        sx={{
          marginTop: 2,
          padding: 2,
          border: "1px solid #ccc",
          minHeight: 100,
        }}
      >
        <Typography variant="h6">Respuesta:</Typography>
        <Box sx={{ whiteSpace: "pre-wrap" }}>
          {response ? (
            <ReactMarkdown children={response} />
          ) : loading ? (
            "Esperando respuesta..."
          ) : (
            "No hay respuesta aún."
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
