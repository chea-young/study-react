const logUtil = {
  consoleLogger: (...args) => {
    let message = args.map((str, index) => {
      return index < args.length - 1 ? '[' + str + ']' : str;
    });
    message = [new Date().toISOString(), ...message];
    console.log(message.join(' '));
  },
  formatTime: () => {
    const now = new Date();
    return now.toLocaleTimeString("en-GB", { hour12: false }); // 00:00:15 형태
  },
};

export default logUtil;
