const inputQuestion = document.getElementById("inputQuestion");
const result = document.getElementById("result");

inputQuestion.addEventListener("keypress", (e) => {
    if(inputQuestion.value && e.key == "Enter")
    sendQuestion();
});

//api key
const apiKey = "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";
const url = "https://api.openai.com/v1/chat/completions"

function sendQuestion(){ 
    fetch(url,{
    method: 'POST',
    headers:{
        Accept: "application/json",
        "Content-Type" : "application/json",
        'Authorization': `Bearer ${apiKey}`
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