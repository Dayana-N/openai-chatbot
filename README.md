# openai-chatbot

# How to use the OpenAi API

AI is one of the hottest topics at the moment. New models with more exciting capabilities are out all the time. One of the most popular ones is ChatGPT by OpenAI. The chatbot gained an incredible amount of attention very quickly due to its amazing capabilities. In this article, we are going to explore how to make a call to the OpenAi API and utilise the power of ChatGPT.

1. **Create a new project and install the necessary packages.**

Create your project, ensure node.js is installed, and run ‘npm init’. Fill in all the fields and confirm with yes.

Next, we need to install our packages. We will need openai and dotenv which allows us to hide the API key.
```
npm install dotenv
npm install --save openai
```

Go to the package.json file and add "type": "module" to be able to use the import syntax.

![package.json](./media/package_json.PNG)

2. **Get the API Key**

Sign up to [OpenAI](https://platform.openai.com/overview) Once you sign in you can check the amount of credit currently available to you by accessing the menu on the right and then Usage

To create a new API key, navigate to the menu on the right and select API keys. Here you can create a new key. Copy the key and make sure to keep it safe. 

**Never expose API keys to the front end of an application or GitHub.**

Back in our project create a .env file and set the API_KEY variable to the API key. 
Don’t forget to add the .env file to the .gitignore file to ensure it does not get pushed to GitHub

3. **The next step is to make the call to the OpenAI API.**

First, we need to import our packages.

```
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

```

Next, we will create a new instance of the OpenAI class and pass in our API key

```
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});
```
Let's make the actual call to the API
```
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are helpful assistant' },
      { role: 'user', content: 'What is the capital of Ireland' },
    ],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0].message.content);
}

main();

```
Each request to the API requires an array of messages and the model type. In the example above we can see that we are using gpt-3.5 turbo. 

Now let’s break down the messages array. We have two objects, one with the role of system and one with the role of user. As you probably have guessed the user content is the actual question we would like to send to the API. The system content instructs the AI how to behave and what output we expect. For example, we could ask the AI to answer like a 5-year-old, etc.

4. The response
If we console.log the completion variable we get the following response. As you can see we get additional information like the model used and the amount of tokens.

![](./media/completition.PNG)

 The actual response we need is within message: object. If we console.log completion.choices[0].message we get the following response. The breakdown of the response aims to explain how exactly to access the response of the AI.

 ![](./media/messages.PNG)

 Congratulations! You have made your first call to OpenAI API. 
 
5. **Tokens**
A token is not a character, a word or a syllable. A token is a chunk of text with no specific length. On average, according to OpenAI, it is around 4 characters. You can use the [OpenAI tokenizer](https://platform.openai.com/tokenizer) below to play around with text and check how many tokens a chunk of text is. 
If you remember when we looked at the completion response we saw that there are prompt tokens, completion tokens and total tokens. It is important to note that the total tokens is what your account will be charged with.
You can set the maximum tokens per response, however if set too low it may cut off the response half way, which can produce an unsatisfying result. If you do use it make sure to set it to a safe length.

```
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are helpful assistant' },
      { role: 'user', content: 'What is the capital of Ireland' },
    ],
    max_tokens: 5,
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0].message.content);
}

main();

```

If we limit the completion tokens to 5, the reponse is incomplete. 


![](./media/max_tokens.PNG)

6. **Temperature**
The temperature controls how daring the output is. It can be set from 0 to 2 with the default value being 1. 
Lower temperature produces safer and more predictable output. It is often used for factual output. 
Higher temperature makes the model more daring and creative. However, if raised too high it may produce output that may not make sense. So make sure you use it with caution.
