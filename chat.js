// Define the key-value pairs for the chatbot
const chatbotResponses = {
    "hello": "Hello! How can I help you?",
    "hi": "Hi there! What can I do for you?",
    "how are you": "I'm a chatbot, so I don't have feelings, but thanks for asking! How can I assist you?",
    "what's your name": "My name is Chatbot. What's yours?",
    "my name is [name]": "Nice to meet you, [name]!",
    "what time is it": "The current time is " + new Date().toLocaleTimeString(),
    "what's the weather like": "Sorry, I don't have access to weather data right now.",
    "what's the capital of [country]": function(country) {
      const capitals = {
        "united states": "Washington D.C.",
        "france": "Paris",
        "germany": "Berlin",
        "japan": "Tokyo",
        "india": "New Delhi"
      };
      if (country.toLowerCase() in capitals) {
        return `The capital of ${country} is ${capitals[country.toLowerCase()]}.`;
      } else {
        return `Sorry, I don't know the capital of ${country}.`;
      }
    },
    "what's the population of [city/country]": function(place) {
      const populations = {
        "new york city": 8336817,
        "los angeles": 3977683,
        "paris": 2187526,
        "berlin": 3769495,
        "tokyo": 13929286,
        "delhi": 30236362
      };
      if (place.toLowerCase() in populations) {
        return `The population of ${place} is ${populations[place.toLowerCase()].toLocaleString()}.`;
      } else {
        return `Sorry, I don't know the population of ${place}.`;
      }
    },
    "what's the exchange rate for [currency]": function(currency) {
      const exchangeRates = {
        "usd": 1,
        "eur": 0.83,
        "gbp": 0.72,
        "jpy": 109.21,
        "inr": 74.53
      };
      if (currency.toLowerCase() in exchangeRates) {
        return `The current exchange rate for ${currency.toUpperCase()} is ${exchangeRates[currency.toLowerCase()]}.`;
      } else {
        return `Sorry, I don't know the exchange rate for ${currency}.`;
      }
    }
  };
  

  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    var userMessage = document.querySelector('input').value;
    var found = 0;
    // Check if the user's message matches a key in the chatbotResponses object
    for (let key in chatbotResponses) {
        const regex = new RegExp(key.replace("[", "\\[").replace("]", "\\]").replace("/", "\\/"), "gi");
        if (userMessage.match(regex)) {
          // If there's a match, get the response from chatbotResponses
          const chatbotResponse = chatbotResponses[key];
          let response;
    
          // If the value is a string, use it as the response
          if (typeof chatbotResponse === "string") {
            response = chatbotResponse;
          } 
          // If the value is a function, call it and pass any parameters
          else if (typeof chatbotResponse === "function") {
            const matches = userMessage.match(regex);
            response = chatbotResponse(...matches.slice(1));
          }
    
          document.querySelector('.chatbox').innerHTML += '<p><strong>You:</strong> ' + userMessage + '</p><p><strong>MSOI_Bot:</strong> ' + response + '</p>';
          document.querySelector('input').value = '';
          found = 1;
          break;
        }
      }
      if (!found) {
        document.querySelector('.chatbox').innerHTML += '<p><strong>You:</strong> ' + userMessage + '</p><p><strong>MSOI_Bot:</strong> ' + 'Sorry I don\'t have any answer for this yet!'  + '</p>';
        document.querySelector('input').value = '';
      }
  });
  