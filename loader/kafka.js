const { Kafka } = require('kafkajs');

const myKafka = new Kafka({
	clientId: 'my-app',
	brokers: ['kafka1:9092', 'kafka2:9092']
});
const producer = myKafka.producer();

const consumer = myKafka.consumer({ groupId: 'test-group' });

let shotCount = 0;

exports.kafkaInit = async (mode) => {
	
	if(mode === 'consume'){
		await consumer.connect()
		await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
		await consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				console.log({
					value: message.value.toString(),
				})
			},
		})
	}else if(mode === 'produce'){
		await producer.connect();
	}
	
};

exports.shot = async () => {
	await producer.send({
		topic: 'test-topic',
		messages: [
			{ value: shotCount + 'Hello KafkaJS user!' },
		],
	})
	shotCount += 1;
}
