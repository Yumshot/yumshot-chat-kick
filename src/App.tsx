import { createSignal } from "solid-js";
const App = () => {
  const [messageList, setMessageList] = createSignal([]);
  const ws = new WebSocket("wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.4.0&flash=false");

  ws.onopen = () => {
    ws.send(JSON.stringify({
      event: "pusher:subscribe",
      data: {
        channel: 'chatrooms.1378194'
      }
    }));


    ws.onmessage = (event) => {
      let data_obj = JSON.parse(event.data.toString());
       if (data_obj.event === 'App\\Events\\ChatMessageSentEvent') {
       let role = JSON.parse(data_obj.data).message?.user?.role;
       let role_names = ["Channel Host", "Moderator", null];
        // Create an array that holds css gradients and randomly select one
        const gradients = [
          "linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)",
          "linear-gradient(90deg, hsla(152, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)",
          "linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)",
          "linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)",
          "linear-gradient(90deg, hsla(33, 100%, 53%, 1) 0%, hsla(58, 100%, 68%, 1) 100%)"
        ];


        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
        let message = JSON.parse(data_obj.data).message;
        let user = JSON.parse(data_obj.data).user;

       let message_object = {
        id: message.id,
        message: message.message,
        name: message.user?.name,
        img: user.profile_thumb,
        time: message.created_at,
        role: randomGradient
       };




       const date = new Date(message_object.time);
       const time = date.toLocaleTimeString();
        message_object.time = time;

        setTimeout(() => {
          setMessageList([...messageList(), message_object]);
        }, 5000)

        setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            if (messageList().length <= 5) {
              setMessageList(messageList().slice(1));
            }
          }
       }, 5 * 60000);
      } 
    }
  }





  return (
    <div class="max-h-full max-w-full">
      <div class="flex flex-col h-full float-right mr-10 mt-10">
      {messageList().map((item: any) => (
        <div class="chat chat-end slideInRight" style={"width:450px;"}>
        <div class="chat-image avatar">
        <div class="w-10 rounded-full">
        <img src={item.img} alt="avatar" />
        </div>
        </div>
        <div class="chat-header">
        {item.name}
        </div>

        <div class="chat-bubble outline" style={`border: 2px solid black; background:${item.role}; color: white; font-size: 18px; `}>
        {item.message}
        </div>
        <time class="text-xs opacity-50 pt-1">Sent: {item.time}</time>

        </div>
        ))}

      </div>
    </div>
  );
};

export default App;
