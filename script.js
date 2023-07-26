  const inputQuestion = document.getElementById("inputQuestion");
const result = document.getElementById("result");

inputQuestion.addEventListener("keypress", (e) => {
    if(inputQuestion.value && e.key == "Enter")
    sendQuestion();
});

//api key
// const OPENAI_API_KEY = "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";

function sendQuestion(){ 

    fetch("https://api.openai.com/v1/models",{
    method: "POST",
    headers:{
        Accept: "application/json",
        "Content-Type" : "application/json",
        Authorization: "Bearer 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",
    },
    body: JSON.stringify({
        model: "text-davinci-003",
        prompt:sQuestion,
        max_tokens: 2048, //size
        temperature: 0.5, //criatividade da resposta
    }),
})

.then((response) => response.json())
.then((json) => {
    if(result.value) result.value +="\n";

    if(json.error?.message){
        result.value += `Error: ${json.error.message}`;
    }else if(json.choices?.[0].text){
        var text = json.choices[0].text || "Sem resposta";

        result.value += "Chatgpt:" +text;
    }
    result.scrollTop = result.scrollHeight;
})
.catch((error) => console.error("Error:", error))
.finally(() =>{
    inputQuestion.value = "";
    inputQuestion.disable = false;
    inputQuestion.focus();
})


    var sQuestion = inputQuestion.value;

    if(result.value) result.value += "\n\n\n";

    result.value += `Eu: ${sQuestion}`;
    inputQuestion.value = "Carregando..."
    inputQuestion.disable = true;

    result.scrollTop = result.scrollHeight;
}