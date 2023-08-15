const ModbusRTU = require("modbus-serial");

const client = new ModbusRTU();
const HOST = "10.14.139.122";
const PORT = 502;
const ADDRESS_1 = 6;
const SLAVE_ID = 13;

client.connectTCP(HOST, { port: PORT }).then(() => {
  client.setID(SLAVE_ID);
  client.readHoldingRegisters(ADDRESS_1, 2, function (err, data) {
    if (err) {
      console.error(`Error reading data : ${err}`);
    } else {
      const buffer = Buffer.from(data.buffer);
      const swappedBuffer = Buffer.alloc(4);

      buffer.copy(swappedBuffer, 0, 0, 4);
      swappedBuffer.swap16();

      const value = swappedBuffer.readFloatLE();

      console.log(value);
    }
  });
});
