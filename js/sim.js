import { updateTerrain } from "./meshes";
import {
  buildComputeShaders,
  resetComputeShaders,
  stepComputeShaders,
} from "./shaders/computeShaders/shaders";

const status = {
  started: false,
  running: false,
  step: 0,
  totalSteps: 0,
  particles: 0,
  dps: 0,
  startTime: null,
};

function start() {
  if (!status.started) {
    status.started = true;
    buildComputeShaders();
  }
  status.running = true;
}

function stop() {
  status.running = false;
}

function reset() {
  status.running = false;
  status.started = false;
  status.step = 0;
  status.totalSteps = 0;
  status.particles = 0;
  status.startTime = null;
  updateTerrain();
  resetComputeShaders();
}

function update(settings) {
  updateTerrain(settings);
  resetComputeShaders();
}

function step(params) {
  if (!status.running) {
    return;
  }

  if (status.step % params.steps == 0 && params.steps != 0) {
    resetComputeShaders();
    status.particles += params.droplets;
    status.dps = Math.round(
      (params.droplets / (Date.now() - status.startTime)) * 100
    );
    status.startTime = Date.now();
  }

  stepComputeShaders();

  status.step += 1;
  status.totalSteps += params.droplets;
}

export { status, start, stop, reset, update, step };
