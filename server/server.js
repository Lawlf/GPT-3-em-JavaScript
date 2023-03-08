import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config(); // carrega as variáveis de ambiente definidas no arquivo .env

// cria uma nova instância da API do OpenAI com a chave de API definida nas variáveis de ambiente
const configuration = new Configuration({ apiKey: process.env.API_KEY });
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors()); // adiciona o middleware de CORS para permitir o acesso a partir de outros domínios
app.use(express.json()); // adiciona o middleware que converte o corpo das requisições em objetos JavaScript

const PORT = process.env.PORT || 5000; // define a porta do servidor como a variável de ambiente PORT ou 5000

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Servidor online, acesse em: http://localhost:' + PORT,
  }); // envia uma mensagem de confirmação quando o servidor estiver online
});

app.post('/', async (req, res) => {
  try {
    const { prompt } = req.body; // extrai a propriedade prompt do corpo da requisição

    // faz uma requisição ao modelo de completude do OpenAI com o prompt fornecido
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0, // define o grau de criatividade da resposta gerada
      max_tokens: 3000, // define o número máximo de tokens a serem gerados na resposta
      top_p: 1, // define o número de respostas a serem geradas
      frequency_penalty: 0.5, // Número entre -2,0 e 2,0. Valores positivos penalizam novos tokens com base em sua frequência existente no texto até agora, diminuindo a probabilidade do modelo repetir a mesma linha literalmente.
      presence_penalty: 0, // Número entre -2,0 e 2,0. Valores positivos penalizam novos tokens com base em se eles aparecem no texto até agora, aumentando a probabilidade do modelo falar sobre novos tópicos.
    });

    res.status(200).send({
      robot: response.data.choices[0].text, // envia a resposta gerada pelo modelo para o cliente
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Alguma coisa deu errado'); // envia uma mensagem de erro genérica quando algo dá errado
  }
});

app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}`)); // inicia o servidor e exibe uma mensagem quando estiver pronto