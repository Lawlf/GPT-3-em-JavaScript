<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>ChatGPT em JavaScript utilizando a API da OpenAI</title>
</head>
<body>
  <div>
    <h1>ChatGPT em JavaScript utilizando a API da OpenAI</h1>
    <p>Este é um projeto que utiliza a API da OpenAI para criar um chatbot baseado no modelo GPT-3. O chatbot é
            implementado em JavaScript com o framework Node.js e a biblioteca Express.js para criar um servidor web que
            se comunica com a API da OpenAI. Para estilização, utiliza-se HTML e CSS.</p>
    <h2>Tecnologias utilizadas</h2>
    <ul>
      <li>JavaScript</li>
      <li>Node.Js</li>
      <li>Express.Js</li>
      <li>Cors</li>
      <li>dotenv</li>
      <li>OpenAI API</li>
    </ul>
    <h2>Como usar</h2>
    <ol>
      <li>Faça o download ou clone o repositório.</li>
      <li>No terminal, execute o comando <code>npm i</code> ou <code>npm install</code> dentro da pasta server e outra vez dentro da pasta client para instalar as dependências de cada parte.</li>
      <li>Crie um arquivo .env na pasta server do projeto e adicione sua chave de API da OpenAI:
        <pre>API_KEY=SUA_CHAVE_API_AQUI</pre>
      </li>
      <li>Execute o servidor local com o comando <code>npm run server</code>.</li>
      <li>Execute o client-side local com o comando <code>npm run dev</code>.</li>
      <li>Acesse o chatbot através do navegador, digitando a URL <code>http://localhost:5173/</code>.</li>
      <li>Experimente conversar com o chatbot! Ele irá responder às suas perguntas usando a API da OpenAI.</li>
    </ol>
  </div>
</body>
</html>
