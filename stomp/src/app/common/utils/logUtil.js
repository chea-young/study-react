export default logUtil = {
  consoleLogger: () => {
    let message = args.map((str, index) => {
      return index < args.length - 1 ? '[' + str + ']' : str;
    });
    message = [new Date().toISOString(), ...message];
    console.log(message.join(' '));
  },
};
