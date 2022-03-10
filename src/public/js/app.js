// console.log("hi");

const msgList = document.querySelector("ul");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
    console.log("U connected!!!!!!");
});

socket.addEventListener('message', (msg) => {
    // console.log("just get this!!!!", msg, "from to server");
    console.log("just get this!!!!", msg.data, "from to server");
});

socket.addEventListener('close', () => {
    console.log("U has been Disconncted...");
});

// setTimeout(func, 3000); //3초 후에 실행.
// socket.send("Hello from the browser...");

const msgForm = document.querySelector("form");


function handleSubmit(event) {
    event.preventDefault(); // 서버로 요청 보내는 것을 막아줌.
    // form 태그 내의 input 태그에 입력된 값을 읽는다.
    const input = msgForm.querySelector("input");

    // 그 값을 socket를 통해 WebSocket Sever로 전송.
    console.log("Submit event occurred...", input.value);
    socket.send(input.value);
    input.value = "";
}

msgForm.addEventListener("submit", handleSubmit);