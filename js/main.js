document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){
  let userChoice = document.querySelector('#user-choice').value
  console.log(userChoice)

  const res = await fetch(`/api?userchoice=${userChoice}`)
  const data = await res.json()

  document.querySelector("#userDisplay").textContent = data.user
  document.querySelector("#computerDisplay").textContent = data.computer
  document.querySelector('#displayResult').textContent = data.result
  
  // const res = await fetch(`/api`)
  // const data = await res.json()
  // console.log(data)

  // document.querySelector('#displayResult').textContent = data.result


  // const userName = document.querySelector("#userName").value;
  // const res = await fetch(`/api?student=${userName}`)
  // const data = await res.json()

  // console.log(data);
  // document.querySelector("#personName").textContent = data.name
  // document.querySelector("#personStatus").textContent = data.status
  // document.querySelector("#personOccupation").textContent = data.currentOccupation
}