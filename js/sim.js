const status = { running: false, step: 0 };
let display;

function start() {
  status.running = true;
}

function stop() {
  status.running = false;
}

function reset() {
  status.running = false;
  status.step = 0;
}

function step() {
  if (!status.running) {
    return;
  }

  status.step += 1;
}

export { status, start, stop, reset, step };