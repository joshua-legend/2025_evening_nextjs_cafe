export const parseMS = (exp: string) => {
  const num = parseInt(exp.slice(0, -1), 10);
  const unit = exp.slice(-1);
  switch (unit) {
    case 'd':
      return num * 24 * 60 * 60 * 1000;
    case 'h':
      return num * 60 * 60 * 1000;
    case 'm':
      return num * 60 * 1000;
    case 's':
      return num * 1000;
    default:
      return num;
  }
};
