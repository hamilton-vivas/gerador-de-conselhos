document.getElementById("botao").addEventListener("click", () => {
    mostrarConselho()
   })
 
 const carregarConselho = async () => {
     const response = await fetch("https://api.adviceslip.com/advice");
  
     if (!response.ok) {
         throw new Error(`O gerador de conselhos retornou o seguinte código de erro: ${response.status}`);
     }
 
     const data = await response.json();
     return data.slip;  // Acessa o objeto "slip" dentro do JSON retornado
 };
 
 const mostrarConselho = async () => {
     try {
         const conselhos = await Promise.allSettled([
             carregarConselho()
         ]);
         conselhos.forEach(conselho => { 
             if (conselho.status === "fulfilled") {
                 const { id, advice } = conselho.value;  // Desestrutura o objeto para pegar "id" e "advice"
                 //console.log(`ID: ${id}, Advice: ${advice}`);
                 let novoId = document.getElementById("advice-id");
                 novoId.innerText =`advice #${id}`
                 let novoConselho = document.getElementById("advice-description");
                 novoConselho.innerText =`${advice}`
             } else {
                 console.log(`Erro: ${conselho.reason}`);
             }
         });
     } catch (error) {
         console.log(error);  
     }
 };
 
 mostrarConselho();
 