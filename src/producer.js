import * as ampq from 'amqplib'
// 连接了 rabbitmq 服务
const connect = await ampq.connect(`amqp://localhost:5672`)

const channel = await connect.createChannel()

// aaa 的队列
await channel.assertQueue('aaa', {durable: true});

let i = 1
setInterval( async () => {
  const msg = 'hello' +i;
  console.log('发送消息:', msg)
  // 队列中发送了一个消息
  await channel.sendToQueue('aaa', Buffer.from(msg));
  i++;
},500)